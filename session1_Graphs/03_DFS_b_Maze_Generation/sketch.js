/** @type {Cell[][]} */
let maze = []
let span, rows, cols;

let current;

let stack = new Stack();

function setup() {
  createCanvas(500, 500);
  // strokeCap(PROJECT);
  strokeJoin(ROUND);
  span = 50;
  rows = width / span;
  cols = height / span;

  for (let i = 0; i < rows; i++) {
    maze[i] = []
    for (let j = 0; j < cols; j++) {
      maze[i][j] = new Cell(j, i);
    }
  }

  forEachCell((cell) => {
    cell.getNeighbours();
  })
  let start = maze[0][0];
  start.visited = true;
  current = start;
}

function draw() {
  background(51);

  forEachCell((cell) => {
    cell.display();
  })
  current.display('green')
  let next = current.getRandomUnvisited();
  if (next) {
    Cell.removeWall(current, next);


    stack.push(current);

    current = next;


    next.visited = true;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  if (stack.length == 0) {
    console.log('done!');
    forEachCell(cell => cell.display())
    noLoop();
    createButton("DOWNLOAD!").mousePressed(() => save("maze.jpeg"))
  }
}

function forEachCell(callback) {
  for (let row of maze) {
    for (let cell of row) {
      callback(cell)
    }
  }
}