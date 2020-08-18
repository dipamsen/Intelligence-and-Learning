function drawPath(cities, path) {
  for (let i = 0; i < path.length - 1; i++) {
    let indexA = path[i];
    let indexB = path[i + 1];
    stroke(255);
    strokeWeight(3);
    line(cities[indexA].x, cities[indexA].y, cities[indexB].x, cities[indexB].y);
  }
}

function drawCities(cities) {
  for (let i in cities) {
    city = cities[i]
    strokeWeight(4);
    stroke(255);
    noFill();
    ellipse(city.x, city.y, 10);
    fill(255);
    noStroke();
    text(i, city.x + 10, city.y + 10)
  }
}

function getOrder(src, path = []) {
  let nextNode = nearestUnvisited(src);
  path.push(src);
  visit(src);
  if (nextNode >= 0) return getOrder(nextNode, path)
  else return (path.map(elt => parseInt(elt)))
}

let distLookUp = [];
function distance(i, j) {
  if (typeof distLookUp[i] == "object") {
    if (distLookUp[i][j]) return distLookUp[i][j];
    else {
      let actualDist = dist(cities[i].x, cities[i].y, cities[j].x, cities[j].y,);
      distLookUp[i][j] = actualDist;
    }
  } else {
    let actualDist = dist(cities[i].x, cities[i].y, cities[j].x, cities[j].y,);
    distLookUp[i] = [];
    distLookUp[i][j] = actualDist;
  }
  return distLookUp[i][j]
}

function nearestUnvisited(index) {
  let distancesFromIndex = [];
  let visitedNodes = getVisitedNodes();
  for (let i = 0; i < totalCities; i++) {
    if (visitedNodes.includes(i)) continue;
    if (i == index) distancesFromIndex[i] = Infinity;
    else distancesFromIndex[i] = distance(index, i);
  }
  lowestD = Infinity;
  lowestI = -1;
  distancesFromIndex.forEach((dist, index) => {
    if (dist < lowestD) {
      lowestD = dist
      lowestI = index;
    };
  })
  return parseInt(lowestI);
}


function getVisitedNodes() {
  let ayy = [];
  for (let v in visited) {
    if (visited[v]) ayy.push(v)
  }
  return ayy.map(elt => parseInt(elt));
}

function visit(node) {
  visited[node] = true;
}

function resetVisit() {
  visited.fill(false);
}

function pathDistance(path = order) {
  let sum = 0;
  for (let i = 0; i < path.length - 1; i++) {
    sum += distance(path[i], path[i + 1])
  }
  return sum;
}