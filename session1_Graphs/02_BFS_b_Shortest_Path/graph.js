class Vertex {
  constructor(val) {
    this.value = val;
    this.neighbours = [];
    this.visited = false;
    this.parent = null;
    this.children = [];
  }
  highlight(col) {
    push();
    fill(col);
    ellipse(nodePos[this.value].x, nodePos[this.value].y, 50);
    fill(0);
    text(this.value, nodePos[this.value].x, nodePos[this.value].y + 1)
    pop();
  }
}

let gr = {
  'A': ['B', 'E'],
  'B': ['A', 'C', 'D', 'E'],
  'C': ['B', 'D'],
  'D': ['B', 'C', 'E'],
  'E': ['A', 'B', 'D']
}
let graph = {};
let graphNodes = [];

function initGraph(loadedG = gr) {

  gr = loadedG;

 graph = {};
 graphNodes = [];
  for (let v in gr) {
    let vertex = new Vertex(v);
    graphNodes.push(vertex);
  }
  let angle = TWO_PI / graphNodes.length;
  c = 0;
  for (let vertex of graphNodes) {
    vertex.neighbours = gr[vertex.value].map(getVertex);
    graph[vertex.value] = vertex;
    nodePos[vertex.value] = p5.Vector.fromAngle(c * angle - PI / 2, width * 2 / 5);
    nodePos[vertex.value].x += width / 2;
    nodePos[vertex.value].y += height / 2;
    c++;
  }
}

function getVertex(str) {
  for (let v of graphNodes) {
    if (v.value == str) return v;
  }
}

function drawGraph(graph) {

  for (let n in graph) {
    let node = getVertex(n);
    let edges = graph[n].neighbours;
    for (let edge of edges) {
      line(nodePos[node.value].x, nodePos[node.value].y, nodePos[edge.value].x, nodePos[edge.value].y);
    }
  }

  for (let node in graph) {
    textSize(40);
    if (getVertex(node).visited) fill('lightgreen');
    else fill(255);
    ellipse(nodePos[node].x, nodePos[node].y, 50);
    fill(0);
    text(node, nodePos[node].x, nodePos[node].y + 1)
  }
}