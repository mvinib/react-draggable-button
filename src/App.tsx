import React, { useRef } from 'react';
import './App.css';
import { DraggableButton } from './components/index';
import Icon from './assets/logo192.png'

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
        borderRadius={50}
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

export default App;
