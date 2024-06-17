import { createCanvas, width, height, background, stroke, square } from 'p5'
import { useEffect, useRef } from 'react';
import p5 from 'p5';

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for(let i = 0; i<arr.length; i++){
        arr[i] = new Array(rows);
        for(let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0
        }
    }

    return arr;
}

let grid;
let w = 10
let cols, rows;

function setup(p) {
    p.createCanvas(400, 400);
    p.background(255)
    cols = p.width / w;
    rows = p.height / w;
    grid = make2DArray(cols, rows);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }

    grid[20][10] = 1
}



function draw(p) {
    p.background(0, 0, 0, 10);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * w;
            p.square(x, y, w);
            p.stroke(255);
            p.fill(grid[i][j]*255); // grid[i][j] returns 1 or 0 so it will be 255 or 0, white or black
            
        }
    }

    let nextGrid = make2DArray(cols, rows); // create copy of grid to make edits to for next frame of animation
  
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let currentCell = grid[i][j];
            if(currentCell === 1) { //not sure what's goin on here it cellBelow SHOULD resolve to either 1, 0, or undefined and set the bottom layer to 1 as is....
              let cellBelow = grid[i][j + 1];
              if(cellBelow === 0) {
                  nextGrid[i][j + 1] = 1;
              }else {
                  nextGrid[i][j] = 1;
                }
            }
        }
    }

    grid = nextGrid;

    p.mouseDragged = () => {
      let col = Math.floor(p.mouseX / w);
      let row = Math.floor(p.mouseY / w);

      grid[col][row] = 1;
    }
}

function sketch(p) {
    
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