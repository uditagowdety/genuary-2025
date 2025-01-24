let cols, rows;
let cellSize = 50;

function setup() {
  createCanvas(800, 600);
  cols = width / cellSize;
  rows = height / cellSize;
  noLoop();
}

function draw() {
  background(20);
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      push();
      translate(x * cellSize, y * cellSize);
      
      // Randomize block height
      let blockHeight = random(10, cellSize);
      let shades = random(50, 200);
      
      // Draw base of the block
      fill(shades);
      rect(0, -blockHeight, cellSize, blockHeight);
      
      // Add details to make it architectural
      fill(shades + 20);
      rect(0, -blockHeight / 3, cellSize, blockHeight / 3);
      
      // Add "windows" as lines
      stroke(255, 50);
      strokeWeight(2);
      line(0, -blockHeight / 2, cellSize, -blockHeight / 2);
      pop();
    }
  }
}
