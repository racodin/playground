import Stage from "../lib/Stage.js"
import Spot from "./Spot.js"

const stage = new Stage(400, 400, {styles: {backgroundColor: 'black'}});
const cols = 25;
const rows = 25;
let grid = new Array(cols);

let animate;
let openSet = [];
let closedSet = [];
let start;
let end;
let w;
let h;
let current;
let path = [];

function removeFromArray(arr, elt){
  for(let i = arr.length - 1; i >= 0; i--){
    if(arr[i] == elt){
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b){
  const d = Math.sqrt( Math.pow((a.i - b.i), 2) + Math.pow((a.j - b.j), 2) );
  return d;
}

function setup(){
  w = stage.width / cols;
  h = stage.height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j, w, h);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid, cols, rows);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);

  console.log(grid);
}

function draw(){
  if(openSet.length > 0){
    let winner = 0;
    for(let i = 0; i < openSet.length; i++){
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    current = openSet[winner];

    removeFromArray(openSet, current);
    closedSet.push(current);

    const neighbors = current.neighbors;
    for(let i = 0; i < neighbors.length; i++){
      let neighbor = neighbors[i];
      if(!closedSet.includes(neighbor)){
        const tempG = current.g + 1;
        if(openSet.includes(neighbor)){
          if(tempG < neighbor.g){
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  } else {

  }

  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(stage.ctx, 'white');
    }
  }

  for(let i = 0; i < closedSet.length; i++){
    closedSet[i].show(stage.ctx, 'red');
  }

  for(let i = 0; i < openSet.length; i++){
    openSet[i].show(stage.ctx, 'green');
  }

  path = [];
  let temp = current;
  path.push(temp);
  while(temp.previous){
    path.push(temp.previous);
    temp = temp.previous;
  }

  for (let i = 0; i < path.length; i++){
    path[i].show(stage.ctx, 'blue');
  }

  if (current === end){
    console.log('DONE');
    return cancelAnimationFrame(animate);
  }
  
  animate = requestAnimationFrame(draw);
  console.log('animate');
}

function init() {
  setup();
  draw();
}

init();
