
/** Vertex Class */
class Vertex {
  constructor(x, y) {
    this.neighbours = [];
    this.visited = false;
    this.parent = null;
    [this.x, this.y] = [x, y];
  }
  drawEdge() {
    let x = this.x * span + span / 2;
    let y = this.y * span + span / 2;
    push();
    stroke(255);
    for (let edge of this.neighbours) {
      let ex = edge.x * span + span / 2;
      let ey = edge.y * span + span / 2;
      line(x, y, ex, ey)
      let ax = (x + ex) / 2;
      let ay = (y + ey) / 2;
      if (x == ax) {
        let mult = ay < y ? -1 : 1;
        // console.log(ay, y)
        push();
        translate(ax, ay);
        noFill();
        beginShape();
        vertex(4, mult * 5);
        vertex(0, mult * 10);
        vertex(-4, mult * 5);
        endShape();
        pop();
      } else if (y == ay) {
        let mult = ax < x ? -1 : 1;
        // console.log(ay, y)
        push();
        translate(ax, ay);
        noFill();
        beginShape();
        vertex(mult * 5, 4);
        vertex(mult * 10, 0);
        vertex(mult * 5, -4);
        endShape();
        pop();
      }
    }
    pop();
  }
  draw() {
    let x = this.x * span + span / 2;
    let y = this.y * span + span / 2;
    push();
    stroke(255)
    if (this.toFind) {
      fill("lightgreen")
    } else if (this.inPath) {
      fill("lightblue")
    } else if (this.visited) {
      fill("purple")
    } else {
      fill(0)
    }
    ellipse(x, y, 28);
    pop();
  }
  highlight() {
    push();
    stroke(255);
    fill("lightblue")
    ellipse(this.x * span + span / 2, this.y * span + span / 2, 28);
    pop();
  }
  addEdges() {
    this.neighbours = [];
    let leftEdge, rightEdge, topEdge, bottomEdge;

    // if (this.x > 0 && random() < 0.2) {
    //   // LEFT
    //   leftEdge = nodes[this.y][this.x - 1];
    //   this.neighbours.push(leftEdge)
    // }
    if (this.x < (cols - 1) && random() < 0.8) {
      // RIGHT
      rightEdge = nodes[this.y][this.x + 1]
      this.neighbours.push(rightEdge)
    }
    // if (this.y > 0 && random() < 0.2) {
    //   // TOP
    //   topEdge = nodes[this.y - 1][this.x]
    //   this.neighbours.push(topEdge)
    // }
    if (this.y < (rows - 1) && random() < 0.8) {
      // BOTTOM
      bottomEdge = nodes[this.y + 1][this.x]
      this.neighbours.push(bottomEdge)
    }

  }
}
