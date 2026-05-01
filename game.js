//REMEMBER TO MANUALLY PUT EVEEYTHING FROM VISUAL STUDIO, IT'S NOT SYNCED

// notes: add background motion later
// notes: make emojis bigger for gameplay so it can be clicked on easier
// fix all the syntax errors ESPECIALLY REGARDING THE PROGRESS BAR!!
// finish for may 1st so there's time to debug
// REMOVE SECOND DRAW FUNCTION  TOMORROW ONLY ONE IS ALLOWED

// for the initial background colour (this only runs once in setup, not here)
let clickSound; // sound that plays when the emoji is clicked (just to give feedback so the game feels more responsive)

// the array that stores all my emoji images
// originally I loaded each one manually, but it got messy, so I switched to an array + loop
let emojis = [];

function preload() {
  // load the click sound BEFORE the game starts
  clickSound = loadSound("click.mp3");

  // preload runs before setup and is where I load all external files
  // I’m loading all the emoji images here so the game doesn’t lag later
  for (let i = 1; i <= 9; i++) {
    emojis.push(loadImage("Emoji" + i + ".png")); // loads Emoji1.png to Emoji9.png automatically and increments
  }
}

function draw() {
  // background colour changes with mouse movement
  // this was just for aesthetic reasons, also was my main idea to make a visual game anyway so i decided to keep it from my original code to
  // make the game feel more active, it's more of a gradient rather than something that follows the mouse, but i like how it is
  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let b = 150;

  background(r, g, b); // trying to make the background colour change with the mouse movement
  // the array that stores all my emoji images
// originally I loaded each one manually, but it got messy, so I switched to an array + loop
 // loads the click sound before the game starts

// here i did the shrinking if statement, it starts the shrinking animation instead of instantly changing emoji
  // because i wanted something that indicated that something had been clicked,
    // i sort of regret this decision though because most of my bugs come from this shrinking feature, but i just felt the click sound effect wasnt enough.
  if (shrinking) {
    shrinkSize -= 10; // this -= 10 is something i learnt along the way, basically it reduces 10 from the original emoji size.

    // once it's shrunken to 0 then another emoji is triggered. for some reason the if statement wasn't working but i managed to get it to work, 
    if (shrinkSize <= 0) {
      shrinking = false; // this STOPS the emoji from shrinking so it doesnt shrink forever. 
      shrinkSize = emojiSize; // reset size
      spawnEmoji();
    }
  } else {
    shrinkSize = emojiSize; // this is normal size of the emoji when not shrinking
  }
  
  
function preload() {
  // preload runs before setup and is where I load all external files
  // I’m loading all the emoji images here so the game doesn’t lag later
  for (let i = 1; i <= 9; i++) {
    emojis.push(loadImage("Emoji" + i + ".png")); // loads Emoji1.png to Emoji9.png automatically
  }
}

// this line is for the emoji currently being shown on screen
let currentEmoji;

// x and y position of the emoji on the canvas
// I keep these separate so I can randomise them easily, not sure if there's a better way to do it but i think this is sleeker
let emojiX, emojiY;
// this is the size before any shrinking animation happens
let emojiSize = 120; // supposed to change the emoji size to 120 so it's not too small like before
let shrinking = false; // i needs to be false, it checks whether the emoji is currently shrinking after being clicked
let shrinkSize = 120; //  this is not the same as emojiSize, i only made the number the same so it could shrink initially from this point.
let score = 0;
let timeLeft = 30; // 30 seciond countdown timer when this hits 0 then the game ends
// letthegamesbegin controls which screen is shown, this is the "start" title screen
let letthegamesbegin = "start";
// stores the time ( i think in milliseconds? i think the base for p5.js is milliseconds but i'm not sure. use milliseconds anyway for everything)
  //when the last emoji spawned
// I use this to spawn a new emoji every second
let lastSpawnTime = 0;

function setup() {
  createCanvas(400, 600); // main canvas and size
  textAlign(CENTER, CENTER); // text is aligned to the centre
  spawnEmoji(); // spawns the first emoji so the game isn’t empty at the start
}

// this is the progression bar code. i didnt set values at first so it was giving me all sorts of errors at the start but i managed to fix it up.
  // this draws the time bar at the top of the screen
// I added this so the player has a visual sense of urgency, i didnt think the countdown timer was enough since it looks a bit like a point system
function drawProgressBar() {
  let barX = 50;
  let barY = 100;
  let barW = 300;
  let barH = 15;
  // most important part for the progression bar

  // background of the bar (the empty part) 
  fill(50, 50, 50, 150);
  noStroke();
  rect(barX, barY, barW, barH, 8); // changes the size of the bar

  // convert timeLeft (30 to 0) into bar width (full to empty)
  // this makes the bar shrink smoothly as time runs out
  let progress = map(timeLeft, 30, 0, 300, 0); // for the progress bar, because timeLeft is 30 and progress should be 300
  // when timeLeft is 0 the progress needs to be 0 so it can all be scaled down nicely
  progress = constrain(progress, 0, barW); // just making sure it never goes negative

  // filled part of the bar
  fill(0, 255, 150);
  rect(barX, barY, progress, barH, 8);
}
  // choose what to draw based on the game state
  if (letthegamesbegin == "start") {
    drawStartScreen();
  } else if (letthegamesbegin == "playing") {
    drawGame();
  } else if (letthegamesbegin == "gameover") {
    drawGameOver();
  }

  // this is me calling the progress bar so it shows up
  drawProgressBar();
}
// for my title screen at the start of the game. i've decided to go with a game alongside my visual stuff just because a lot of what i wanted to do wouldn't be possible on p5.js
  // a game is more fitting (and a little easier for me to code)
function drawStartScreen() {
  fill(255);
  textSize(40);
  text("THE CLICKER GAME", width/2, 200); // wasn't sure what to name my game so i decided i'd go above and beyond and get really creative so i called it "the clicker game"

  textSize(20);
  text("Click the emoji before it disappears!", width/2, 260);
  text("You have 30 seconds.", width/2, 290);
  text("Click anywhere to start", width/2, 350);
}

// this is the main game screen
function drawGame() {
  // decrease timer every frame (i made this 60fps)
  timeLeft -= 1 / 60;

  // this is basically the code that ends the game in terms of the timer, if timer hits 0 then end the game
  if (timeLeft <= 0) {
    timeLeft = 0;
    letthegamesbegin = "gameover";
  }

  //  here spawn a new emoji every second. millis()  gives me the number of milliseconds from since the code started running.
// i’m using it like a timer so it can count down in the game (not sure if there's a more efficient way to do it but this just worked for me.)


  if (millis() - lastSpawnTime > 1000) {   // UPDATE!! FRAMECOUNT IS ANOTHER WAY but i don't know how to do it and honestly this one just works.
// so if more than 1000 milliseconds have passed, I know it's time to spawn another emoji since that's a second. its 1 emoji per second
    spawnEmoji();
  }
}

  // so here the emoji is being drawn
  imageMode(CENTER);
  image(currentEmoji, emojiX, emojiY, shrinkSize, shrinkSize); // i alterred the image with the coordinates and values

  //  this is the score and timer widget text, the size matters quite a bit i found that when i made the text size 40 it would keep overlapping the emojis.
  // matter of fact the progress bar keeps overlapping the emojis when it hits the top sometimes but i'm not sure why, i've tried to fix it but it doesn't woork
  fill(255);
  textSize(20);
  text("Score: " + score, width/2, 40);
  text("Time: " + ceil(timeLeft), width/2, 80);
}

// this essentially is the game over screen when everything is done.
function drawGameOver() {
  background(0, 150, 80); // different colour to show the game is finished

  fill(255);
  textSize(40);
  text("TIME'S UP!", width/2, 200);
  textSize(28);
  text("Final Score: " + score, width/2, 260);
  textSize(20);
  text("Click to play again", width/2, 330);
}
// the main part of the game is randomizing the emoji placement
  // picks a random emoji + random position
function spawnEmoji() {
  currentEmoji = random(emojis); // i used random () to grab a random emoji image from the array

  // then i put it in a random position, but i put a little bit of leeway so it doesn't get too close to the edges (still did somehow though)
  emojiX = random(80, width - 80);
  emojiY = random(150, height - 150);

  lastSpawnTime = millis(); // i have to add this line so my code doesn't break, this is what's causing the issues because it doesn't know the last time something happened.
}

function mousePressed() { // mousePressed() behaves differently depending on which screen the player is on.
// I used letthegamesbegin for indicating which part of the game the focus is on.
  if (letthegamesbegin == "start") {
    startGame();
    return;
  } // so naturally on the start screen, clicking starts the game

  if (letthegamesbegin == "playing") {
    handleGameClick(); // during the game, clicking either is clicking on the emoji or checking if the emoji was already clicked on
    return;
  }
  if (letthegamesbegin == "gameover") {
    resetGame();
    return; //  and then finally when the game is over clciking on it indicates that the game is done
// the "return;" stops the function so only one action happens per click
  }
}  
function startGame() { // so now everything can be called
  score = 0;
  timeLeft = 30;
  letthegamesbegin = "playing";
  spawnEmoji();
}

// checks if the player clicked the emoji
function handleGameClick() {
  // using dist() to check if the click is inside the emoji. if it is then the score increases
  if (dist(mouseX, mouseY, emojiX, emojiY) < emojiSize * 0.5) {
    score += 5;
    // basically asks if the image has shrunken or not. if it has then it's been clicked
    shrinking = true;
  } else {
    // if they don't click it then they lose 2 points
    score -= 2;
    if (score < 0) score = 0; // don’t let score go negative 
  }
}
function resetGame() { // that's the reset game function
  score = 0;
  timeLeft = 30;
  letthegamesbegin = "start"; // this restarts the game and takes it back to title screen
}

