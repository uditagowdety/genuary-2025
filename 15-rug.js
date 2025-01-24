let colors;

function setup() {
  createCanvas(600, 800);
  noLoop();

  // Define a gradient color palette
  colors = [
    color("#E63946"), // Deep red
    color("#F1FAEE"), // Soft white
    color("#A8DADC"), // Light teal
    color("#457B9D"), // Muted blue
    color("#1D3557")  // Dark blue
  ];
}

function draw() {
  background(220);

  // Draw border
  drawBorder(40, colors[4], colors[1]);

  // Draw central wavy pattern
  drawWavyPattern(60, 540, 80);
}

// Function to draw a border around the rug
function drawBorder(borderWidth, color1, color2) {
  noFill();
  for (let i = 0; i < borderWidth; i++) {
    let inter = map(i, 0, borderWidth, 0, 1);
    stroke(lerpColor(color1, color2, inter));
    rect(i, i, width - 2 * i, height - 2 * i);
  }
}

// Function to draw wavy patterns
function drawWavyPattern(xStart, xEnd, spacing) {
  noFill();
  for (let y = 100; y < height - 100; y += spacing) {
    beginShape();
    for (let x = xStart; x <= xEnd; x++) {
      let waveHeight = sin(x * 0.05 + y * 0.01) * 20;
      let col = lerpColor(colors[0], colors[3], map(y, 100, height - 100, 0, 1));
      stroke(col);
      strokeWeight(2);
      vertex(x, y + waveHeight);
    }
    endShape();
  }
}
