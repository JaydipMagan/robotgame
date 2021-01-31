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

// game
let init = false;
let finished = false;
let collectables = [];
let score = 0;

// grid 
let cols, rows;
let w = 40;
let grid = [];

// maze gen
let current;
let stack = [];

// robot
let robot;
let goal;

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
    collectables.forEach(collectable => {
      if(!grid[collectable].collected && grid[collectable].i==robot.i && grid[collectable].j==robot.j){
        grid[collectable].collected=true;
        score+=10;
        document.getElementById("score").innerText = "Score : "+score;
      }
    });
  }
}


function initEventHandlers(){
  document.getElementById("mode-easy").onclick = function(){
    w = 40;
    initSetup();
    document.getElementById("difficulty-mode").style.visibility="hidden";
    document.getElementById("options").style.visibility="visible";
  }
  document.getElementById("mode-medium").onclick = function(){
    w = 30;
    initSetup();
    document.getElementById("difficulty-mode").style.visibility="hidden";
    document.getElementById("options").style.visibility="visible";
  }
  document.getElementById("mode-hard").onclick = function(){
    w = 25;
    initSetup();
    document.getElementById("difficulty-mode").style.visibility="hidden";
    document.getElementById("options").style.visibility="visible";
  }
  document.getElementById("options").onclick = function(){
    resetGame();
    document.getElementById("options").style.visibility="hidden";
  }
}

function initSetup(){
  cols = floor(width / w);
  rows = floor(height / w);

  generateGrid();
  generateCollectables();
  current = grid[0];
  current.userVisited = true;
  goal = grid[index(rows-1,cols-1)];
  generateMaze();

  robot = new Robot(0,0,w);
  init = true;
}

function resetGame(){
  document.getElementById("difficulty-mode").style.visibility="visible";
  window.location.reload();
}

function keyPressed() {
    let atCell = grid[index(robot.i,robot.j)];
    console.log(keyCode);
    if(!finished){
      let newPosition = robot.move(keyCode,atCell);
      grid[index(newPosition[0],newPosition[1])].userVisited = true;
    }
}

function generateCollectables(){
  let amount = w;
  while(amount>0){
    let randomNumber = floor(random(1, grid.length-1));
    console.log(randomNumber);
    if(!(randomNumber in collectables)){
      grid[randomNumber].collectable = true;
      collectables.push(randomNumber);
      amount--;
    }
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