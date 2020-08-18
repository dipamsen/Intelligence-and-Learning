class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -2);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
  this.maxforce = 0.1;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading()+PI/2+PI/2);
    triangle(20, -6,  20, 6, 0, 0);
    pop();
  }
  move() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(dist(mouseX, mouseY, this.pos.x, this.pos.y) / 10);
    this.acc.mult(0);
  }
  steer(x, y) {
    let target = createVector(x, y);
    var desired = p5.Vector.sub(target,this.pos);  // A vector pointing from the location to the target
    var d = desired.mag();
    // Scale with arbitrary damping within 100 pixels
    if (d < 100) {
      var m = map(d,0,100,0,this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.acc.add(steer);
  }
}