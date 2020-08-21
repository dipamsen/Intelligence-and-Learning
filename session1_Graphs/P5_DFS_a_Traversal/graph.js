
/** Vertex Class */
class Vertex {
  constructor(val, x, y) {
    this.val = val;
    this.neighbours = [];
    this.visited = false;
    this.parent = null;
    [this.x, this.y] = [x, y];
  }
  highlight() {
    push();
    stroke(0);
    // console.log(col);
    if (this.curr) fill("green")
    else if (this.visited) fill('purple')
    else fill(255);
    ellipse(this.x, this.y, 50);
    if (this.visited) fill(255)
    else fill(0);
    noStroke();
    text(this.val, this.x, this.y);
    pop();
  }
  setCurrent() {
    for (let vt in graph) {
      graph[vt].curr = false;
    }
    this.curr = true;
  }
  getUnvisitedNeighbours() {
    let neighbours = this.neighbours.slice();
    neighbours.filter(elt => !elt.visited);
    return neighbours;
  }
  addEdges(edges) {
    this.neighbours = edges;
  }
  drawEdges() {
    push();
    for (let edge of this.neighbours) {
      stroke(0);
      line(this.x, this.y, edge.x, edge.y);
    }
    pop();
  }
}
