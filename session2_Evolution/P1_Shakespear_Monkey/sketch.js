
let target = "DipamSen";
let population;

function setup() {
  createCanvas(500, 500);
  textFont('monospace')
  population = Population.create(100)
}

function draw() {
  background(51);
  x = 50
  noStroke()
  fill(255);
  population.evaluate();
  textSize(20);
  text(population.slice(0, 20).map(dna => dna.toPhenotype()).join('\n'), 50, 50);
  textSize(40)
  text(population.bestFitness.toPhenotype(), 300, 100)
  text(population.generation, 300, 300)


  if (population.bestFitness.fitness == target.length) {
    noLoop();
  }
  population = population.reproduce();


}