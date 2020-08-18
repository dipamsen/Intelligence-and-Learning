/** @type {Vertex[][]} */
let nodes = [];
let span, rows, cols;
let q;
let start, end;

function setup() {
  createCanvas(500, 500);
  span = 50;
  [rows, cols] = [width, height].map(num => num / span)
  for (let i = 0; i < rows; i++) {
    nodes[i] = [];
    for (let j = 0; j < cols; j++) {
      nodes[i][j] = new Vertex(j, i)
    }
  }
  q = new Queue();
  start = setVertex("start");
  end = setVertex("end")
  start.visited = true;
  q.enqueue(start)
  setEdges();

}

function draw() {
  background(0);
  drawGraph();
  if (q.length !== 0) {
    node = q.dequeue();
    node.highlight();

    if (node == end) {
      let path = getPath(node);
      console.log(path)
      path.forEach(vt => {
        vt.inPath = true;
      });
      noLoop();
      drawGraph();
    }

    for (let neighbour of node.neighbours) {
      if (!neighbour.visited) {
        neighbour.visited = true;
        neighbour.parent = node;
        q.enqueue(neighbour);
      }
    }
  }
}

function drawGraph() {
  for (let row of nodes) {
    for (let vertex of row) {
      vertex.drawEdge();
    }
  }
  for (let row of nodes) {
    for (let vertex of row) {
      vertex.draw();
    }
  }
}

function setVertex(type) {
  let y = floor(random(rows));
  let x = floor(random(cols));
  if (type == "start") [x, y] = [0, 0]
  let thisNode = nodes[y][x];
  thisNode.toFind = true;
  return thisNode;
}

function setEdges() {
  for (let row of nodes) {
    for (let vertex of row) {
      vertex.addEdges();
    }
  }
}

function getPath(node, arr = []) {
  if (node.parent == null) return arr;
  arr.push(node);
  return getPath(node.parent, arr);
}