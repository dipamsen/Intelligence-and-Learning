let lifetime = 100;
let popSize = 50;
let population;
let currentFrame = 0;
let domElts = [];

let target;

function setup() {
  createCanvas(600, 400);
  population = Population.create(popSize);
  target = createVector(500, 200);
  domElts[0] = createDiv();
  domElts[1] = createDiv();
  domElts[2] = createDiv();
  domElts[3] = createDiv();
  domElts[4] = createDiv();
  domElts[5] = createDiv();
}

function draw() {
  background(0);
  // Set current frame
  currentFrame = floor(frameCount / 2) % lifetime;

  // Set DOM elements
  domElts[0].html("<b>Generation Frame Count: </b>" + currentFrame)
  domElts[1].html("<b>Generation #: </b>" + population.generation)
  domElts[2].html("<b># of movers reached: </b>" + population.reachedTarget)
  domElts[3].html("<b>Total Population: </b>" + population.length)
  domElts[4].html("<b>Mutation Rate: </b>" + population.mutationRate * 100 + '%')
  domElts[5].html("<b>Best Fitness Value: </b>" + population.bestFitness.fitness * 100)

  // Show Target
  push();
  fill("lightgreen")
  ellipse(target.x, target.y, 36)
  pop();

  // Draw and do Physics with Movers
  population.animate();

  // Next Generation
  if (frameCount % 200 == 0) {
    population = population.generate();
  }

}

function mousePressed() {
  target = createVector(mouseX, mouseY);
}