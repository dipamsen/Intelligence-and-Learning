class Vertex {
  constructor(val, x, y) {
    this.val = val;
    this.x = x;
    this.y = y;
    this.neighbours = {};
    this.visited = false;
  }
  display() {
    stroke(0);
    fill(255);
    ellipse(this.x, this.y, 50);
    noStroke();
    fill(0);
    text(this.val, this.x, this.y)
  }
  drawEdges() {
    let edges = Object.keys(this.neighbours).map(getVertex);
    for (let edge of edges) {
      stroke(0);
      let angle = round(degrees(p5.Vector.sub(createVector(edge.x, edge.y), createVector(this.x, this.y)).heading()));
      let len = p5.Vector.sub(createVector(edge.x, edge.y), createVector(this.x, this.y)).mag()
      // console.log(angle);
      push();
      translate(this.x, this.y)
      rotate(radians(angle));
      line(0, 0, len, 0);
      triangle(len - 30, 4, len - 25, 0, len - 30, -4);
      textSize(15);
      translate(len / 2, 0)
      text(this.neighbours[edge.val], 0, -7)
      pop();
    }
  }
  // neighbours = {A:2,B:3,V:3}
  getNearestUnvisitedNeighbour() {
    return Object.keys(this.neighbours).map(getVertex).filter(vt => !vt.visited).sort((a, b) => this.neighbours[a.val] - this.neighbours[b.val])[0]
  }
  getUnvisitedNeighbours() {
    return Object.keys(this.neighbours).map(getVertex).filter(vt => !vt.visited);
  }
}


function getVertex(v) {
  return drawingGraph[v];
}

function distance(v1, v2) {
  return graph[v1][v2];
}