i = 0.5;
y = 2;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(100);
  circle(200, 300, 70 + i)
  circle(100, 300, 70)
  line(30, 20, 85, 75)
  line(30, 50, 85, 75)
  ellipse(50, 60, 105, 75)
  triangle(50, 90, 105, 75)
  
  i = i+0.5;
  y = y+2;
}
