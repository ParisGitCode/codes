//REMEMBER TO MANUALLY PUT EVEEYTHING FROM VISUAL STUDIO, IT'S NOT SYNCED

// notes: add background motion later
let clickSound;

function preload() {
  clickSound = loadSound("click.mp3");
  // for click sound effect when the emoji is clicked
}

function mousePressed() {
  if (dist(mouseX, mouseY, width/2, 200) < 100) { // for when the mouse is in the range of the emoji they're clicking on, i just put a range instead since i didn't know how else to
    clickSound.play();
  }
}


background(255, 105, 180); // for background colour
function draw() {
  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let b = 150;

  background(r, g, b) // trying to make the background colour change with the mouse movement.

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

    // the floating text or the mmoji's index. don't really think it's needed anymore because i already called it above but it breaks when i remove it.
    floatText = "+" + perClick;
    floatA = 255;
    floatY = 200;
    currentIndex = (currentIndex + 1) % emojis.length; // the toggle between the first and the next
  }
}
