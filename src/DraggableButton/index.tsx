import React, { ReactNode, RefObject, useEffect, useRef } from 'react'
import './styles.css'
import hexToRgba from 'hex-to-rgba';
import { Keyframes } from '../keyframe';

export function DraggableButton({
  containerRef,
  device,
  backgroundColor,
  height,
  width,
  children,
  borderRadius,
  initialBottom,
  initialRight,
  borderMargin,
  animationTimig = 0.5,
  resizeTaxOnMove = 0.1,
  zIndex = 100,
  onClick,
  pressTimeToClick = 0.4
}: {
  containerRef: RefObject<HTMLDivElement>,
  device: "mobile" | "desktop" | "auto",
  width: number,
  height: number,
  borderRadius: number,
  backgroundColor: string,
  initialBottom: number,
  initialRight: number,
  children?: ReactNode,
  borderMargin: number,
  animationTimig?: number,
  resizeTaxOnMove?: number,
  zIndex?: number,
  onClick: () => void,
  pressTimeToClick?: number

}) {

  const boxRef = useRef<HTMLDivElement>(null)
  const isClicked = useRef<boolean>(false)

  const screenHeight = useRef<number>(0)

  const eventNames = useRef<{
    start: "touchstart" | "mousedown",
    end: "touchend" | "mouseup",
    move: "touchmove" | "mousemove",
    cancel: "touchcancel" | "mouseleave"
  }>({
    start: "touchstart",
    end: "touchend",
    move: "touchmove",
    cancel: "touchcancel"
  })

  const times = useRef<{
    start: number,
    end: number
  }>({
    end: 0,
    start: 0
  })

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  })

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return
    const box = boxRef.current
    const container = containerRef.current

    box.style.backgroundColor = backgroundColor
    box.style.width = `${width}px`
    box.style.height = `${height}px`
    box.style.borderRadius = `${borderRadius}px`
    box.style.right = `${initialRight}px`
    box.style.bottom = `${initialBottom}px`
    box.style.zIndex = `${zIndex}`
    box.style.display = 'flex'
    box.style.alignItems = 'center'
    box.style.justifyContent = 'center'
    box.style.position = 'absolute'

    if (borderMargin < 0) {
      borderMargin = 0
    }

    switch (device) {
      case "desktop":
        box.style.cursor = "pointer"
        eventNames.current.start = "mousedown"
        eventNames.current.end = "mouseup"
        eventNames.current.move = "mousemove"
        eventNames.current.cancel = "mouseleave"
        break;
      case "mobile":
        eventNames.current.start = "touchstart"
        eventNames.current.end = "touchend"
        eventNames.current.move = "touchmove"
        eventNames.current.cancel = "touchcancel"
        break;
      default:
        const currentDevice = checkDevice()
        device = currentDevice
        eventNames.current.start = currentDevice === "mobile" ? "touchstart" : "mousedown"
        eventNames.current.end = currentDevice === "mobile" ? "touchend" : "mouseup"
        eventNames.current.move = currentDevice === "mobile" ? "touchmove" : "mousemove"
        eventNames.current.cancel = currentDevice === "mobile" ? "touchcancel" : "mouseleave"
        break;
    }

    const screenWidth = container.clientWidth

    const onTouchStart = (e: TouchEvent | MouseEvent) => {
      isClicked.current = true;
      if (device === "mobile") {
        const evt = e as TouchEvent
        coords.current.startX = evt.changedTouches[0].clientX;
        coords.current.startY = evt.changedTouches[0].clientY;
      } else {
        const evt = e as MouseEvent
        coords.current.startX = evt.clientX;
        coords.current.startY = evt.clientY;
      }
      times.current.start = e.timeStamp
      container.style.overflow = "hidden"
    }

    const onTouchEnd = (e: TouchEvent | MouseEvent) => {
      isClicked.current = false;
      box.style.width = `${width}px`
      box.style.height = `${height}px`
      box.style.borderRadius = `${borderRadius}px`
      box.style.removeProperty("animation")
      times.current.end = e.timeStamp
      const beggin = new Date(times.current.start)
      const end = new Date(e.timeStamp)
      /*@ts-ignore*/
      const diff = new Date(end - beggin) / 1000
      let nextX: number = 0

      if (device === "mobile") {
        const evt = e as TouchEvent
        nextX = evt.changedTouches[0].clientX - coords.current.startX + coords.current.lastX;
      } else {
        const evt = e as MouseEvent
        nextX = evt.clientX - coords.current.startX + coords.current.lastX;
      }

      const percent = nextX * 100 / (screenWidth - (width))

      if (diff < pressTimeToClick) {
        onClick()
      }

      if (percent < 50) {
        box.style.left = `${borderMargin}px`
      } else {
        box.style.left = `${screenWidth - (width + borderMargin)}px`
      }
      coords.current.lastX = box.offsetLeft
      coords.current.lastY = box.offsetTop
      container.style.overflow = "auto"
    }

    const onTouchMove = (e: TouchEvent | MouseEvent) => {
      if (!isClicked.current) return;
      box.style.width = `${width + (width * (resizeTaxOnMove))}px`
      box.style.height = `${height + (height * (resizeTaxOnMove))}px`
      box.style.borderRadius = `${borderRadius + (borderRadius * (resizeTaxOnMove))}px`
      box.style.animation = `pulse ${animationTimig}s ease infinite`

      let nextX: number = 0
      let nextY: number = 0
      if (device === "mobile") {
        const evt = e as TouchEvent
        nextX = evt.changedTouches[0].clientX - coords.current.startX + coords.current.lastX;
        nextY = evt.changedTouches[0].clientY - coords.current.startY + coords.current.lastY;
      } else {
        const evt = e as MouseEvent
        nextX = evt.clientX - coords.current.startX + coords.current.lastX;
        nextY = evt.clientY - coords.current.startY + coords.current.lastY;
      }

      if (nextX > borderMargin && nextX <= (screenWidth - (width + borderMargin))) {
        box.style.left = `${nextX}px`
      }
      if (nextY > borderMargin && nextY < Number(screenHeight.current - (height + borderMargin))) {
        box.style.top = `${nextY}px`
      }

      screenHeight.current = container.scrollHeight
    }

    box.addEventListener(eventNames.current.start, onTouchStart, { passive: true })
    box.addEventListener(eventNames.current.end, onTouchEnd, { passive: true })
    container.addEventListener(eventNames.current.move, onTouchMove, { passive: true })
    container.addEventListener(eventNames.current.cancel, onTouchEnd, { passive: true });

    const cleanup = () => {
      box.removeEventListener(eventNames.current.start, onTouchStart)
      box.removeEventListener(eventNames.current.end, onTouchEnd)
      container.removeEventListener(eventNames.current.move, onTouchMove)
      container.removeEventListener(eventNames.current.cancel, onTouchEnd)
    }

    return cleanup
  }, [])

  const checkDevice = (): "mobile" | "desktop" => {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      || navigator.userAgent.match(/Tablet/i)
      || navigator.userAgent.match(/Mobile/i)
    ) {
      return "mobile"
    }
    else {
      return "desktop"
    }
  }

  return (
    <>
      <div ref={boxRef}>
        {children && children}

      </div>
      <Keyframes
        name='pulse'
        _0={{ transform: 'scale(0.95)', boxShadow: `0 0 0 0 ${hexToRgba(backgroundColor, 0.5)}`}}
        _70={{ transform: 'scale(1)', boxShadow: `0 0 0 10px ${hexToRgba(backgroundColor, 0.5)}`}}
        _100={{ transform: 'scale(0.95)', boxShadow: `0 0 0 0 ${hexToRgba(backgroundColor, 0.5)}`}}
      />
    </>
  )
}