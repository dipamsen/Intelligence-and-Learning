let vh;

function setup() {
  createCanvas(windowWidth, windowHeight);
  vh = new Vehicle(width/2, height/2);
}

function draw() {
  background(51);
  stroke(255);
  strokeWeight(2);
  fill(255, 150);
  ellipse(mouseX, mouseY, 50);
  
  vh.display();
  vh.move();
  vh.steer(mouseX, mouseY);
}