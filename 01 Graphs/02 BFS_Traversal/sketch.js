// for visualization
let nodePos = {}

let q = new Queue();

function setup() {
  createCanvas(500, 500);
  initGraph();
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont('monospace');
  createDiv('<br>Press Space to move to next step.<br><br>')
  console.log(graph);
  noLoop();
  start = graph[Object.keys(graph)[0]]
  q.enqueue(start);
  start.visited = true;
  background(220);
  let button = createButton('Load Another Graph');
  button.mousePressed(() => {
    let ng = prompt(
      `Enter a new Graph adjacency list in JSON format.\nFor Example: {"A":["B","E"],"B":["A","C","D","E"],"C":["B","D"],"D":["B","C","E"],"E":["A","B","D"]}`
    );
    newGraph = JSON.parse(ng);
    if (newGraph) {
      initGraph(newGraph);
      start = graph[Object.keys(graph)[0]]
      q.enqueue(start);
      start.visited = true;
      redraw();
    }
  })
}

function keyPressed() {
  if (keyCode == 32) {
    redraw();
  }
}

function draw() {
  background(150);
  drawGraph(graph);

  if (q.length !== 0) {
    node = q.dequeue();
    node.highlight('lightblue');
    for (let neighbour of node.neighbours) {
      if (!neighbour.visited) {
        neighbour.visited = true;
        q.enqueue(neighbour);
      }
    }
  }
}