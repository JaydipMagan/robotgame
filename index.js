// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm
/**
 * Maze generation code modified from above source
 */
let init = false;
let cols, rows;
let w = 40;
let grid = [];
let current;
let stack = [];
let robot;
let goal;
let finished = false;

function setup() {
  createCanvas(600, 600);
  initEventHandlers();
}

function draw() {
  background(51);
  if(init){
    renderGrid();
    robot.render();
    if(!finished && goal.i==robot.i && goal.j==robot.j){
      alert("You won!");
      finished = true;
    }
  }
}


function initEventHandlers(){
  document.getElementById("mode-easy").onclick = function(){
    w = 40;
    initSetup();
    document.getElementById("difficulty-mode").style.visibility="hidden";
  }
  document.getElementById("mode-medium").onclick = function(){
    w = 30;
    initSetup();
    document.getElementById("difficulty-mode").style.visibility="hidden";
  }
  document.getElementById("mode-hard").onclick = function(){
    w = 25;
    initSetup();
    document.getElementById("difficulty-mode").style.visibility="hidden";
  }
}

function initSetup(){
  cols = floor(width / w);
  rows = floor(height / w);

  generateGrid();
  current = grid[0];
  current.userVisited = true;
  goal = grid[index(rows-1,cols-1)];
  generateMaze();

  robot = new Robot(0,0,w);
  init = true;
}

function keyPressed() {
    let atCell = grid[index(robot.i,robot.j)];
    console.log(keyCode);
    if(!finished){
      let newPosition = robot.move(keyCode,atCell);
      grid[index(newPosition[0],newPosition[1])].userVisited = true;
    }
}

function generateMaze(){
    while(!grid.every(a=>a.visited==true)){
        current.visited = true;
        let next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            
            stack.push(current);
            
            removeWalls(current, next);
            
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    }
    grid[index(rows-1,cols-1)].goal = true;
}

function generateGrid(){
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          var cell = new Cell(i, j);
          grid.push(cell);
        }
    }
}

function renderGrid(){
  for (let i = 0; i < grid.length; i++) {
    grid[i].render();
  }
}

function index(i, j) 
{
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}