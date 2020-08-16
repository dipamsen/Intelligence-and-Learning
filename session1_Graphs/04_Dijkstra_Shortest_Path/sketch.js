
let graph = {
  "A": { "B": 6, "D": 1 },
  "B": { "A": 6, "C": 5, "D": 2, "E": 2 },
  "C": { "E": 5 },
  "D": { "A": 1, "B": 2 },
  "E": { "D": 1, "B": 2 }
}


let source = 'B';
let dist = {}, prev = {};

function setup() {
  createCanvas(500, 500);
  let output = createDiv();

  let slider = createSelect();
  slider.option("A");
  slider.option("B");
  slider.option("C");
  slider.option("D");
  slider.option("E");
  textSize(28);
  textAlign(CENTER, CENTER);
  initGraph();
  source = slider.value();
  slider.changed(() => {
    source = slider.value();
    Object.values(drawingGraph).forEach(val => val.visited = false)
    result = dijkstra(graph, source);
    dist = result[0];
    prev = result[1];
    output.html(getAllPaths(source, prev, graph).join('<br>'))

  })
  result = dijkstra(graph, source);
  dist = result[0];
  prev = result[1];
  output.html(getAllPaths(source, prev, graph).join('<br>'))

}

function draw() {
  background(200);

  drawGraph();
  push();
  textSize(18);
  text(`Distance from source (${source}):`, width / 2, height - 70)
  drawJSONTable(dist, width / 2, height - 40, width - 200);
  pop();
}


let drawingGraph = {}
function initGraph() {
  let count = 0;
  for (let vt in graph) {
    let angle = count * 360 / Object.keys(graph).length;
    let pos = p5.Vector.fromAngle(radians(angle - 90), width / 3);
    mmyvertex = new Vertex(vt, pos.x + width / 2, pos.y + height / 2);
    mmyvertex.neighbours = graph[vt];
    drawingGraph[vt] = mmyvertex;
    count++;
  }
}

function drawGraph() {

  // Draw Edges
  for (let vt in drawingGraph) {
    drawingGraph[vt].drawEdges();
  }

  // Draw Vertices
  for (let vt in drawingGraph) {
    drawingGraph[vt].display();
  }

}

function dijkstra(graph, source) {
  let dist = {};
  let prev = {};
  for (let vt in graph) {
    dist[vt] = Infinity;
    if (vt == source) dist[vt] = 0;
  }
  let vt = source;
  while (true) {
    if (!vt) break;
    drawingGraph[vt].visited = true;
    let unvisited = drawingGraph[vt].getUnvisitedNeighbours();
    for (let cell of unvisited) {
      let newD = dist[vt] + distance(vt, cell.val);
      if (newD < dist[cell.val]) {
        dist[cell.val] = newD;
        prev[cell.val] = vt;
      }
    }
    if (!drawingGraph[vt].getNearestUnvisitedNeighbour()) {
      break;
    }
    vt = drawingGraph[vt].getNearestUnvisitedNeighbour().val;

  }
  // }

  console.log(dist);
  console.log(prev);
  return [dist, prev];


}

function drawJSONTable(json, x, y, w) {
  push();
  let keys = Object.keys(json).map(elt => source + "⇒" + elt);
  let vals = Object.values(json);
  textSize(18);
  textStyle(BOLD)
  for (let i = 0; i < keys.length; i++) {
    noStroke();
    text(keys[i], x - w / 2 + i * w / keys.length + w / keys.length * 1 / 2, y - 10)
    text(vals[i], x - w / 2 + i * w / keys.length + w / keys.length * 1 / 2, y + 10);
    stroke(0);
    line(x - w / 2 + i * w / keys.length, y - 20, x - w / 2 + i * w / keys.length, y + 20)
    line(x - w / 2 + i * w / keys.length + w / keys.length, y - 20, x - w / 2 + i * w / keys.length + w / keys.length, y + 20)
  }
  stroke(0);
  line(x - w / 2, y - 20, x + w / 2, y - 20)
  line(x - w / 2, y + 20, x + w / 2, y + 20)
  line(x - w / 2, y, x + w / 2, y)
  pop();
}

function getPath(prev, vt, arr = [vt]) {
  if (!prev[vt]) return arr;
  arr.push(prev[vt]);
  return getPath(prev, prev[vt], arr);
}

function getAllPaths(source, prev, graph) {
  let vertices = Object.keys(graph);
  let output = [];
  for (let vt of vertices) {
    let path = getPath(prev, vt).reverse().join('=>');
    output.push(`${source} to ${vt} : ${path}`)
  }
  return output;
}