import { createCanvas, width, height, background, stroke, square } from 'p5'
import { useEffect, useRef } from 'react';
import p5 from 'p5';

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for(let i = 0; i<arr.length; i++){
        arr[i] = new Array(rows);
    }

    return arr;
}

let grid;
let w = 10
let cols, rows;

function setup(p) {
    p.createCanvas(400, 400);
    p.background(0)
    cols = p.width / w;
    rows = p.height / w;
    grid = make2DArray(cols, rows);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

function draw(p) {
    p.background(0);

    // grid[10][20]

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            p.stroke(255);
            p.fill(grid[i][j]*255);
            let x = i * w;
            let y = j * w;
            p.square(x, y, w);
        }
    }
}

function sketch(p) {
//     p.setup = function() {
//       p.createCanvas(400, 400);
//       p.background(0);
//       p.circle(200, 200, 400);
//   }

    p.setup = function() {
        setup(p);
    }

  p.draw = function() {
      // your draw code here
      draw(p);
  }
}


function Sandbox() {
    const p5ContainerRef = useRef()

    useEffect(()=>{
      const p5instance = new p5(sketch, p5ContainerRef.current)
  
      return()=>{
        p5instance.remove()
      }
    },[])

    
    return(
        <>
          <div ref={p5ContainerRef} ></div>
        </>
    )
}

export default Sandbox