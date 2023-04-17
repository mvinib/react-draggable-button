import React, { useRef } from 'react';
import './App.css';
import Icon from './assets/logo192.png'
import { DraggableButton } from 'react-draggable-button'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="container">
      <DraggableButton
        containerRef={containerRef} 
        device='auto'
        backgroundColor='#000'
        height={100}
        width={100}
        borderRadius={50}
        initialBottom={0}
        initialRight={0}
        borderMargin={10}
        animationTimig={2}
        resizeTaxOnMove={0.1}
        zIndex={10}
        children={<img src={Icon} alt={"alt Image"} style={{width: '30px', height: '30px',}}/>}
        // children={<h1 style={{textAlign: 'center', color: '#fff'}}>oi</h1>}
        onClick={(() => console.log('clicked'))}
        pressTimeToClick={0.1}
        />
    </div>
  );
}

export default App;
