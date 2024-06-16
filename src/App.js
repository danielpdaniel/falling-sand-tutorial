import logo from './logo.svg';
import './App.css';
import Sandbox from './Sandbox';
import { useEffect, useRef } from 'react';
import p5 from 'p5';

function sketch(p) {
    p.setup = function() {
      p.createCanvas(400, 400);
      p.background(0);
      p.circle(200, 200, 400);
  }

  p.draw = function() {
      // your draw code here
  }
}

function App() {
  const p5ContainerRef = useRef()
  useEffect(()=>{
    const p5instance = new p5(sketch, p5ContainerRef.current)

    return()=>{
      p5instance.remove()
    }
  },[])

  return (
    <>
      <h2>Yayyy Sand !</h2>
      <div ref={p5ContainerRef} ></div>
    </>
  );
}

export default App;
