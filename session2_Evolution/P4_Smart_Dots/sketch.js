let obstacles = [];

let cycles = 150;
let frame = 0;
let population;

let popsize = 150;

let target;
let gen = 1;

function setup() {
  createCanvas(600, 700);
  population =  Population.create(popsize);
  target = createVector(width / 2, 50);
}

function draw() {
  background(255);
  strokeWeight(3);
  population.update();
  stroke(0);
  strokeWeight(1);
  ellipse(target.x, target.y, 10);
  noStroke();
  fill(0);
  textSize(15);
  text("Generation: "+gen, 20, 20); 
  text("Population Size: "+popsize, 20, 40); 
  
  for (let obs of obstacles) {
    obs.display();
  }
  
  frame++;
  if (frame == cycles && frame > 0) {

    let dots = new Population();
    for (let i = 0; i < popsize; i++) {
      let pa = selectParent();
      let pb = selectParent();
      let child = Dot.crossover(pa, pb);
      child.mutate();
      dots[i] = child;
    }
    gen++
    population = dots;
    frame = 0;
  }
}

function selectParent() {
  let fitnessSum = population.totalFitness;
  let rand = random(fitnessSum);
  
  let runningSum= 0;
  for (let dot of population) {
    runningSum += dot.fitness;
    if(runningSum>rand) return dot;
  }
}

function mousePressed() {
  obstacles.push(new Obstacle);
}