class Dot {
  constructor(dna, x = width / 2, y = height - 20) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.fitness  = 0;
    if (dna) this.dna = dna;
    else {
      let dnaa = [];
      for (let i = 0; i < cycles; i++) {
        dnaa[i] = p5.Vector.random2D();
      }
      this.dna = dnaa;
    }
    this.dead = false;
    this.reached = false;
    this.steps = null;
  }
  static crossover(a, b) {
    let dna = []
    let midpoint = random(cycles);
    for (let i = 0; i < cycles; i++) {
      if (i < midpoint) dna[i] = a.dna[i];
      else dna[i] = b.dna[i];
    }
    return new Dot(dna);
  }
  mutate() {
    for (let i = 0; i < this.dna.length; i++) {
      if (random() < 0.01) this.dna[i] = p5.Vector.random2D();
    }
  }
  applyForce(force) {
    this.acc.add(force);
  }
  display() {
    point(this.pos.x, this.pos.y);
  }
  move() {
    if (!this.dead && !this.reached) {
      this.pos.add(this.vel);
      this.vel.add(this.acc);

      this.acc.mult(0);
    }
    this.vel.limit(10);
  }
  calcFitness() {
    let d = this.pos.dist(target);
    this.fitness = 1 / (d * d);
    if (this.reached) {
      this.fitness *= 2;
      this.fitness *= cycles / this.steps;
    } else if (this.dead) this.fitness /= 4;
  }
}

class Population extends Array {
  constructor(len) {
    super();
    
  }
  static create(len) {
    let ppoo = new this();
    for (let i = 0; i < len; i++) {
      ppoo[i] = new Dot();
    }
    return ppoo
  }
  get bestFitness() {
    let record = {
      fitness: 0
    };
    for (let dot of this) {
      if (dot.fitness > record.fitness) {
        record = dot;
      }
    }
    return record;
  }
  update() {
    for (let dot of this) {
      if (this.bestFitness == dot) stroke(0, 255, 0);
      else stroke(0);
      dot.display();
      dot.move();
      dot.applyForce(dot.dna[frame]);
      dot.calcFitness();
      if (dot.pos.offScreen() || obstacles.collides(dot.pos)) {
        dot.dead = true;
      }
      if (!dot.reached && dot.pos.dist(target) < 10) {
        dot.reached = true;
        dot.steps = cycles - frame
      }
      
    }
  }
  get totalFitness() {
    let sum = 0;
    for (let dot of this) {
      sum += dot.fitness;
    }
    return sum;

  }
}

obstacles.collides = function(pos) {
  for (let obs of this) {
    if(obs.collides(pos)) return true;
  }
  return false;
}


// p5 Vector offScreen Function
p5.Vector.prototype.offScreen = function() {
  return this.x > width || this.x < 0 || this.y > height || this.y < 0
}