let score = 0;
let perClick = 1;
let floatText = "";
let floatA = 0;
let floatY = 0;

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(20);
  fill(255);
  textSize(32);
  text("Score: " + score, width/2, 50);

  fill(255,200,0);
  ellipse(width/2, 200, 200);
  textSize(80);
  fill(0);
  text("😊", width/2, 200);

  if (floatA > 0) {
    fill(255, floatA);
    textSize(32);
    text(floatText, width/2, floatY);
    floatY -= 1;
    floatA -= 4;
  }
}

function mousePressed() {
  if (dist(mouseX, mouseY, width/2, 200) < 100) {
    score += perClick;
    floatText = "+" + perClick;
    floatA = 255;
    floatY = 200;
  }
}
