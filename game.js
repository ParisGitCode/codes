//REMEMBER TO MANUALLY PUT EVEEYTHING FROM VISUAL STUDIO, IT'S NOT SYNCED

background(255, 105, 180); // for background colour

let score = 0;
let perClick = 1;
let floatText = "";
let floatA = 0; //float numbers and scores all set to zero for the increments
let floatY = 0;

let emojis = [];
let currentIndex = 0;

function preload() {
  // this is for preloading the emojis, nothing changes here other than the number of emoji which adjusts the expression
  for (let i = 1; i <= 6; i++) {
    emojis.push(loadImage("Emoji" + i + ".png"));
  }
}

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER); // this aligns the text to the centre of the page instead of the corners of any side, but can also be adjusted by halving
  //the canvas size which i did before.
  imageMode(CENTER);
}

function draw() {
  background(20);

  fill(255);
  textSize(32);
  text("Score: " + score, width/2, 50);

  // this draws the current emoji index
  image(emojis[currentIndex], width/2, 200, 200, 200);

  // and this adds a floating text animation, just wanted to test out because i had read about it but it's not necessary for the game
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

    // Floating text
    floatText = "+" + perClick;
    floatA = 255;
    floatY = 200;

    // Switch to next emoji
    currentIndex = (currentIndex + 1) % emojis.length;
  }
}
