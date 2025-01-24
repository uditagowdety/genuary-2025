let colors;

function setup() {
  createCanvas(600, 600);
  noLoop();

  // Define a gradient color palette
  colors = [
    color("#ff6b6b"), // Coral
    color("#feca57"), // Yellow
    color("#1dd1a1"), // Mint
    color("#5f27cd"), // Purple
    color("#54a0ff")  // Blue
  ];
}

function draw() {
  background(255);
  noStroke();

  let cellSize = 50; // Size of each block
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      // Pick random colors for gradient
      let c1 = random(colors);
      let c2 = random(colors);

      // Create a gradient in each cell
      drawGradientSquare(x, y, cellSize, c1, c2);
    }
  }

  // Add some woven patterns over the gradient
  stroke(0, 50);
  strokeWeight(2);
  for (let y = 0; y < height; y += cellSize) {
    line(0, y, width, y); // Horizontal lines
  }
  for (let x = 0; x < width; x += cellSize) {
    line(x, 0, x, height); // Vertical lines
  }
}

function drawGradientSquare(x, y, size, c1, c2) {
  for (let i = 0; i < size; i++) {
    let inter = map(i, 0, size, 0, 1);
    let c = lerpColor(c1, c2, inter);
    fill(c);
    rect(x, y + i, size, 1); // Horizontal gradient
  }
}
