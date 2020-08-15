

function setup() {
  createCanvas(500, 500);
  initGraph(grAdj);
  let start = getVertex(0);
  DFS(start)
  textAlign(CENTER, CENTER);
  textSize(28);
  textFont('monospace');
}
function draw() {
  background(200)

  drawGraph();



}

// function DFS(v) {
//   let S = new Stack();
//   S.push(v);
//   while (S.length > 0) {
//     v = S.pop()
//     if (!v.visited) {
//       v.visited = true;
//       for (let w of v.neighbours) {
//         S.push(w)
//       }
//     }
//   }
// }

let next;

let stack = new Stack();

// function DFS(v) {
//   v.visited = true;
//   console.log(v.val)
//   stack.push(v);
//   next = getRandomUnvisited(v);
//   if (!next) {
//     next = stack.pop();
//   }
//   // if (stack.length > 0)
//   DFS(next);
// }

// Global or class scope variables
// n = number of nodes in the graph
// g = adjacency list representing graph
// visited = [false, …, false] # size n
function DFS(at) {
  if (at.visited) {
    // setTimeout
    return
  }

  at.visited = true
  console.log(at.val)
  neighbours = at.neighbours
  for (let n of neighbours) {
    DFS(n);
  }
}


// function keyPressed() {
//   DFS(next);

// }

let grAdj = { 0: [1, 9], 1: [0, 8], 2: [3], 3: [2, 4, 5, 7], 4: [3], 5: [3, 6], 6: [5, 7], 7: [3, 6, 8, 10, 11], 8: [1, 7, 9], 9: [], 10: [11], 11: [7] }

let graph = {}

function initGraph(gr) {
  let count = 0;
  for (let vt in gr) {
    pos = p5.Vector.fromAngle(radians(count * 360 / Object.keys(gr).length - 90), width / 3)
    let vertex = new Vertex(vt, pos.x + width / 2, pos.y + height / 2);
    graph[vt] = vertex;
    count++;
  }
  for (let vt in graph) {
    let vertex = graph[vt];
    vertex.addEdges(gr[vt].map(getVertex));
  }
}

function getVertex(v) {
  return graph[v];
}

function drawGraph() {
  for (let vt in graph) {
    graph[vt].drawEdges();
  }
  for (let vt in graph) {

    graph[vt].highlight()
  }
}

function allVisited() {

  for (let vt in graph) {
    if (!graph[vt].visited) return false;
  }
  return true;
}

function getRandomUnvisited(v) {
  // Hello
  let unvisited = v.neighbours.filter(vertex => !vertex.visited);
  if (unvisited) return random(unvisited)
}