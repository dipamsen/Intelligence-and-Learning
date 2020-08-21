// Intelligence and Learning
// codingtra.in
// natureofcode.com

/** The DNA of an object (Genotype) */
class DNA {
  constructor(genes = [], ft = null) {
    this.genes = genes;
    this.fitness = ft;
  }
  // Main Functions
  // a.mutate();
  // DNA.crossover(a, b);
  // a.calculateFitness() (not getter)
  // a.toPhenotype

  calcFitness() {
    let counter = 0;
    for (let i = 0; i < target.length; i++) {
      if (this.genes[i] == target[i]) counter++
    }
    this.fitness = counter
  }

  static crossover(a, b) {
    let newString = []
    for (let i = 0; i < target.length; i++) {
      if (random() < 0.5) newString[i] = a.genes[i];
      else newString[i] = b.genes[i];
    }
    return new DNA(newString)
  }

  copy() {
    return new DNA(this.toPhenotype(), this.fitness)
  }

  mutate() {
    for (let i = 0; i < target.length; i++) {
      if (random() < population.mutationRate) this.genes[i] = randomLetter();
    }
  }

  static createRandom() {
    let dna = new DNA();
    for (let i = 0; i < target.length; i++) {
      dna.genes[i] = randomLetter();
    }
    return dna;
  }

  toPhenotype() {
    return this.genes.join('')
  }

}

/** The Population (Array of DNAs) */
class Population extends Array {
  constructor(gen = 1) {
    super();
    this.generation = gen;
    this.mutationRate = 0.1;
  }
  static create(len) {
    let popul = new Population();
    for (let i = 0; i < len; i++) {
      popul[i] = DNA.createRandom();
    }
    return popul;
  }
  evaluate() {
    for (let dna of this) {
      dna.calcFitness();
    }
  }
  get bestFitness() {
    let highest = { fitness: 0 }
    for (let dna of this) {
      if (dna.fitness >= highest.fitness) {
        highest = dna;
      }
    }
    return highest;
  }
  reproduce() {
    // Create Mating Pool
    let matingPool = [];
    for (let dna of this) {
      for (let i = 0; i < dna.fitness ** 2; i++) {
        matingPool.push(dna);
      }
    }
    let nextGen = new Population();
    for (let i = 0; i < population.length; i++) {
      // Choose 2 parents
      if (matingPool.length > 0) {
        // console.log
        let parentA = random(matingPool);
        let parentB = random(matingPool);
        let child = DNA.crossover(parentA, parentB);
        child.mutate()
        nextGen[i] = child;
      } else console.log("OOP");
    }
    nextGen.generation = population.generation + 1
    // console.log(nextGen)
    return nextGen;
  }
}

// Function directly adapted without changes from 
// The Coding Train NOC example 9.01
function randomLetter() {
  let c = floor(random(65, 122));
  return String.fromCharCode(c);
}