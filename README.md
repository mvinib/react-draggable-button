# react-draggable-button
## Botão móvel para componentes react


react-draggable-button surgiu de uma necessidade em um projeto mobile, então resolvi transformar em um componente personalizável.

## Instalação
Usando `npm`

```
npm install react-draggable-button
```

Usando `yarn`

```
yarn add react-draggable-button
```
## Importação

```js
import { DraggableButton } from 'react-draggable-button';
```

## Exemplo de uso

```js
function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="container">
      <DraggableButton
        containerRef={containerRef} 
        device='auto'
        backgroundColor='#000'
        height={50}
        width={50}
        borderRadius={25}
        initialBottom={0}
        initialRight={0}
        borderMargin={10}
        animationTimig={2}
        resizeTaxOnMove={0.1}
        zIndex={10}
        children={<img src={Icon} alt={"alt Image"} style={{width: '50%', height: '50%'}}/>}
        onClick={(() => console.log('clicked'))}
        pressTimeToClick={0.1}
        />
    </div>
  );
}
```

![](https://tc-online-invoices.s3.sa-east-1.amazonaws.com/images-templates/GIF+-+react-draggable-button+-+Feito+com+o+Clipchamp_1681589248815.gif)

## Propriedades
- ```containerRef: RefObject<HTMLDivElement> (obrigatório)``` - Ref do container que envolverá o componente

- ```device: "mobile" | "desktop" | "auto" (obrigatório)``` - Tipo de dispositivo onde será utilizado. Quando for "auto" uma função que detecta o tipo de dispositivo será acionada.

- ```width: number (obrigatório)``` - width do componente.

- ```height: number (obrigatório)``` - height do componente.

- ```borderRadius: number (obrigatório)``` - border-radius do componente.

- ```backgroundColor: string (obrigatório)``` - background-color do componente.

- ```initialBottom: number (obrigatório)``` - bottom inicial do componente.

- ```initialRight: number (obrigatório)``` - right inicial do componente.

- ```children: ReactNode (opcional)``` - Elemento html que ficará dentro do componente.

- ```borderMargin: number (obrigatório)``` - Margem em que o componente ficará das bordas da tela.

- ```animationTimig: number (opcional)``` - Tempo da aninamação pulse ao mover o componente. Por padrão é 0.5.

- ```resizeTaxOnMove: number (opcional)``` - Quanto em porcentagem (0 - 1) o compomente irá aumentar (widht & height) ao ser movido. Por padrão é 0.1.

- ```zIndex: number (opcional)``` - z-index do componente. Por padrão é 100.

- ```onClick: () => void (obrigatório)``` - Função que será executada ao clicar no componente.

- ```pressTimeToClick: number (opcional)``` - Tempo máximo para ser considerado clique. Por padrão é 0.4s.

