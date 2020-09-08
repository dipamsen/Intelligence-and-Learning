
let popSize = 8;
let faceSize = 100;
let gap = 10;

let faces = [];

function setup() {
  createCanvas((faceSize + gap) * popSize, faceSize)
  for (let i = 0; i < popSize; i++) {
    faces[i] = new Face;
  }
}

function draw() {

}