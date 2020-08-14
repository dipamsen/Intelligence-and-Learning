// for visualization
let nodePos = {}
let result;
let q = new Queue();

let done = false, found = false;

function setup() {
  createCanvas(500, 500);
  initGraph();
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont('monospace');
  createDiv('<br>Press Space to move to next step.<br><br>')
  noLoop();
  resultDiv = createDiv();
  resultDiv.style('color', 'red');
  console.log(graph);
  q.enqueue(getVertex(start));
  getVertex(start).visited = true;
  background(220);
  let button = createButton('Load Another Graph');
  button.mousePressed(() => {
    let ng = prompt(
      `Enter a new Graph adjacency list in JSON format.\nFor Example: {"A":["B","E"],"B":["A","C","D","E"],"C":["B","D"],"D":["B","C","E"],"E":["A","B","D"]}`, '{"A":["B","E"],"B":["A","C","D","E"],"C":["B","D"],"D":["B","C","E"],"E":["A","B","D"]}'
    );
    let startend = prompt(
      `Enter Start node and End node separated by ->. For example: A->D`, "A->D"
    )
    newGraph = JSON.parse(ng);
    se = startend.trim().split('->');
    if (newGraph) {
      initGraph(newGraph);
      start = se[0];
      end = se[1]
      q.enqueue(getVertex(start));
      getVertex(start).visited = true;
      resultDiv.html(null);
      found = false; done = false;
      redraw();
      
    }
  })
}

let start = 'A'
let end = 'B';

function keyPressed() {
  if(keyCode == 32) {
    if(!done) redraw();
    // else loop();
  }
}

function draw() {
  background(150);
  drawGraph(graph);

  if (q.length !== 0) {
    node = q.dequeue();
    node.highlight('lightblue');
    
    if(node == getVertex(end)) {
      let array = []
      getPath(node, array);
      result = (array.reverse().join(' ⇒ '));
      resultDiv.html(`The shortest path from ${start} to ${end} is ${result}`);
      found = true;
      resultDiv.style('font-size', '20px');
    }
    
    for (let neighbour of node.neighbours) {
      if (!neighbour.visited) {
        neighbour.visited = true;
        neighbour.parent = node;
        node.children.push(neighbour);
        q.enqueue(neighbour);
      }
    }
  } else {
    done = true;
    if(!found) {
      resultDiv.html(`No path found from ${start} to ${end}.`);
    }
  }
}

function getPath(node, arr = []) {
  arr.push(node.value);
  if(node.parent == null) return arr;
  return getPath(node.parent, arr);
}