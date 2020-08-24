/** Phenotype and Genotyope of System */
class Mover {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.dna = [];
    this.reached = false;
    this.dead = false;
  }

  display() {
    push();
    translate(this.pos);
    rotate(this.vel.heading());
    rectMode(CENTER)
    if (population.bestFitness == this) stroke(0, 255, 0);
    else stroke(255);
    strokeWeight(2);
    fill(255, 100);
    beginShape();
    vertex(-10, 8);
    vertex(-10, -8);
    vertex(10, 0)
    endShape(CLOSE);
    pop();
  }

  update() {
    if (this.pos.dist(target) < 25) {
      this.reached = true;
      this.dna[currentFrame] = createVector(0, 0)
    } else if (collideRectCircle(obs.x, obs.y, obs.w, obs.h, this.pos.x, this.pos.y, 10)) {
      this.dead = true;
      this.dna[currentFrame] = createVector(0, 0)
    } else {
      this.pos.add(this.vel);
      this.vel.add(this.acc);

      this.acc.mult(0);
    }

  }


  applyForce(f) {
    this.acc.add(f);
  }

  calcFitness() {
    let fit = this.pos.dist(target);
    this.fitness = 100 / (fit + 0.1);
    if (this.reached) this.fitness *= 5;
    if (this.dead) this.fitness /= 10;
  }

  mutate() {
    for (let i = 0; i < this.dna.length; i++) {
      if (random() < population.mutationRate) {
        let vt = p5.Vector.random2D();
        vt.setMag(0.5);
        this.dna[i] = vt;
      }
    }
  }

  static crossover(a, b) {
    let pt = new Mover();
    let midpoint = random(lifetime)
    for (let i = 0; i < lifetime; i++) {
      if (i < midpoint) {
        pt.dna[i] = a.dna[i];
      } else {
        pt.dna[i] = b.dna[i];
      }
    }
    pt.pos.x = 0;
    pt.pos.y = height / 2
    return pt;
  }

  static createRandom() {
    let pt = new Mover();
    for (let i = 0; i < lifetime; i++) {
      let vt = p5.Vector.random2D();
      vt.setMag(0.5);
      pt.dna[i] = vt;
    }
    pt.pos.x = 0;
    pt.pos.y = height / 2;
    return pt;
  }
}

/** Particle Holder */
class Population extends Array {
  constructor(gen = 0) {
    super();
    this.generation = gen;
    this.mutationRate = 0.01;
  }
  static create(len) {
    let popu = new Population();
    for (let i = 0; i < len; i++) {
      popu[i] = Mover.createRandom();
    }
    return popu;
  }
  animate() {
    for (let pt of this) {
      pt.display();
      pt.update();
      pt.applyForce(pt.dna[currentFrame]);
      pt.calcFitness();

    }
  }

  get reachedTarget() {
    return this.filter(mv => mv.reached).length;
  }

  get bestFitness() {
    let best = { fitness: 0 }
    for (let pt of this) {
      if (pt.fitness > best.fitness) {
        best = pt;
      }
    }
    return best;
  }

  generate() {
    let newPop = new Population(this.generation + 1);
    // Create Mating Pool
    let matingPool = [];
    for (let mv of this) {
      let times = mv.fitness * 100;
      for (let i = 0; i < times; i++) {
        matingPool.push(mv);
      }
    }

    for (let i = 0; i < popSize; i++) {
      // Select two parents
      let a = random(matingPool);
      let b = random(matingPool);
      let child = Mover.crossover(a, b);
      child.mutate();
      newPop[i] = child;
    }
    return newPop;
  }

}

function collidePointRect(p, r) {
  //2d
  return (p.x >= r.x - r.w / 2 &&         // right of the left edge AND
    p.x <= r.x + r.w / 2 &&    // left of the right edge AND
    p.y >= r.y - r.h / 2 &&         // below the top AND
    p.y <= r.y + r.h / 2)     // above the bottom

};

function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx) {
    testX = rx       // left edge
  } else if (cx > rx + rw) { testX = rx + rw }   // right edge

  if (cy < ry) {
    testY = ry       // top edge
  } else if (cy > ry + rh) { testY = ry + rh }   // bottom edge

  // // get distance from closest edges
  var distance = dist(cx, cy, testX, testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter / 2) {
    return true;
  }
  return false;
};