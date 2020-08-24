class Obstacle {
  constructor(x=mouseX, y=mouseY, w=200, h=30) {
    this.pos = createVector(x, y);
    this.dim = createVector(w, h);
  }
  display() {
    push();
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    pop();
  }
  collides(point) {
    return point.x > this.pos.x && point.x < this.pos.x + this.dim.x && point.y > this.pos.y && point.y < this.pos.y + this.dim.y;
  }
}