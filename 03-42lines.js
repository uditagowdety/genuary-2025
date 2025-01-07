let t = 0; // Time variable
let gridSize = 10; // Grid size (10x10)

function setup() {
  createCanvas(600, 600); // Canvas size
  noStroke(); // No outlines
  rectMode(CENTER); // Center rectangles
}

function draw() {
  background(10, 10, 30, 30); // Transparent background for trails

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let angle = TWO_PI / gridSize * x + t; // Animation angle
      let size = map(sin(t + x * 0.5 + y * 0.5), -1, 1, 10, 40); // Dynamic size
      let hue = map(x + y, 0, gridSize * 2, 0, 255); // Smooth color mapping

      push(); // Save current transformation state
      translate(width / gridSize * x + width / (2 * gridSize), height / gridSize * y + height / (2 * gridSize)); // Move to grid cell
      rotate(angle + y * 0.1); // Rotate dynamically
      fill(hue, 200, 255, 150); // Fill color
      rect(0, 0, size, size); // Draw rectangle
      pop(); // Restore original state
    }
  }

  t += 0.02; // Increment time for animation
}
