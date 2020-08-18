// NOC Intelligence and Learning
// https://github.com/nature-of-code/NOC-S17-2-Intelligence-Learning/tree/master/week1-graphs
// Course by The Coding Train (codingtra.in)
// Coding Challenge #65 Binary Search Tree

// Created by Dipam Sen

let tree;
let xSpace, ySpace;
let sorted;

function setup() {
  createCanvas(windowWidth, windowHeight);
  xSpace = width;
  ySpace = height / 10;
  fill(0);
  sorted = createDiv('');
  sorted.position(0, 90);
  sorted.style('color', 'white');
  sorted.style('font-weight', 'bold');
  noStroke();
  textAlign(CENTER, CENTER);
  textFont('monospace');
  textSize(20);
  tree = new Tree();



  let box = createInput();
  box.attribute('type', 'number');
  box.position(0, 0);
  box.attribute('placeholder', "Write Node Value");
  let button = createButton('Add Node');
  button.position(0, 30);
  let remove = createButton('Remove Node');
  remove.position(0, 60);
  let tra = createButton('Traverse');
  tra.position(width / 2 - 15, 0);
  tra.mousePressed(() => {
    if (tree.root) {
      let array = [];
      tree.root.inOrder(array);
      sorted.html(array)
    }
  })
  button.mousePressed(() => {
    let val = parseInt(box.value());
    if (val) tree.addNode(val);
    box.value(null);
  })
  remove.mousePressed(() => {
    let val = parseInt(box.value());
    if (val) tree.remove(val);
    box.value(null);
  })
  let box2 = createInput();
  box2.attribute('type', 'number');
  box2.position(width - 110, 0);
  box2.style('width', '100px');
  box2.attribute('placeholder', "Search Node");
  let button2 = createButton('Search');
  button2.position(width - 60, 30);
  button2.mousePressed(() => {
    tree.root.unColor();
    let val = parseInt(box2.value());
    if (val && tree.root) {
      found = (tree.root.search(val));
      if (found) {
        found.green = true;
      }
    }
    box2.value(null);
  })
}

function draw() {
  background(51);

  xSpace = width;
  ySpace = height / 10;
  tree.display();
}