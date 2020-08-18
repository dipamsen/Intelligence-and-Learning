let data;
let current;
let gameState = "WELCOME";
let yesButton, noButton, startButton;
let buttons = [yesButton, noButton];
let answer = "";

function preload() {
  data = loadJSON('./data.json')
}

function setup() {
  createCanvas(500, 500);
  textSize(30);
  current = data;
  console.log(data);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  yesButton = new Clickable(width / 4, height * 2 / 3, 100, 50, "YES!");
  noButton = new Clickable(width * 3 / 4, height * 2 / 3, 100, 50, "NO!");
  startButton = new Clickable(width / 2, height * 2 / 3, 200, 50, "Start Game!");
  startButton.onPress = () => { gameState = "PLAY" }
  ///buttons = [yesButton, noButton]
}

function draw() {
  background(51);
  fill(255);
  noStroke()
  if (gameState == "WELCOME") {
    text("Welcome to Animal Guessr!", width / 2, height / 2);
    buttons = [startButton]
  } else if (gameState == "PLAY") {
    textSize(20);
    text("Think of an animal.", width / 2, height / 3);
    textSize(30);
    noStroke();
    fill(255);
    text(current.data, width / 2, height / 2, width * 3 / 4, 80);
    stroke(255);
    noFill();
    rect(width / 2, height / 2, width, 80)
    if (current.yes && current.no) {
      buttons = [yesButton, noButton]
      yesButton.onPress = () => { current = current.yes };
      noButton.onPress = () => { current = current.no };
    } else {
      answer = current.data;
      gameState = "END";
    }

  } else if (gameState == "END") {
    select('#defaultCanvas0').style('cursor', "default");

    textSize(20);
    text("Result!", width / 2, height / 3);
    textSize(30);
    text(`You thought of ${/[aeiou]/.test(answer[0]) ? "an" : "a"} ${answer}.`, width / 2, height / 2);
    buttons = [];
  }

  let cursor = "default";
  buttons.forEach((bt) => {
    bt.draw();
    if (mouseX < bt.x + bt.w / 2 && mouseX > bt.x - bt.w / 2 && mouseY > bt.y - bt.h / 2 && mouseY < bt.y + bt.h / 2) {
      cursor = "pointer";
      if (mouseIsPressed) {
        bt.onPress();
      }
    }
    select('#defaultCanvas0').style('cursor', cursor);
  })

}

// function keyPressed() {
//   switch (keyCode) {
//     case LEFT_ARROW:
//       if (current.yes && current.no)
//         current = current.no;
//       break;
//     case RIGHT_ARROW:
//       if (current.yes && current.no)
//         current = current.yes;
//       break;
//     default: break;
//   }
// }

class Clickable {
  constructor(x, y, w, h, val) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.val = val;
    this.col = "white";
    this.onPress = () => { };
  }
  draw() {
    fill(this.col);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    text(this.val, this.x, this.y);
    if (mouseX >= this.x - this.w / 2 && mouseY >= this.y - this.h / 2 &&
      mouseX < this.x + this.w / 2 && mouseY < this.y + this.h / 2) {
      this.col = "lightgreen";
      if (mouseIsPressed) { this.onPress(); mouseIsPressed = false };
    } else {
      this.col = "white"
    }

  }
}