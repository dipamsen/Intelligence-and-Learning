let cities = [];
let order = [];
let visited = [];
let totalCities = 10;

let bestDist = Infinity, bestOrder = [];

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < totalCities; i++) {
    cities[i] = createRandomPosition(width, height);
    order[i] = i;
    visited[i] = false;
  }
  for (let i in cities) {
    order = getOrder(i);
    let thisdist = pathDistance();
    if (thisdist < bestDist) {
      bestDist = thisdist;
      bestOrder = order.slice();
    }
    // console.log(thisdist, order.slice())
    resetVisit();
  }
  console.log("this is best.")
  console.log(bestDist)
  console.log(bestOrder)
}

function draw() {
  background(51);
  drawCities(cities);
  drawPath(cities, bestOrder)
}

function createRandomPosition(w = width, h = height) {
  return createVector(random(w), random(h));
}