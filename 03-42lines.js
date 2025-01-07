let t = 0; // Time variable
let colors = ["#F92672", "#66D9EF", "#A6E22E", "#E6DB74", "#FD971F"]; // Color palette

function setup() {
  createCanvas(600, 600); // Canvas size
  noStroke(); // No outline for shapes
}

function draw() {
  background(10, 10, 30, 20); // Transparent background for trails
  translate(width / 2, height / 2); // Center the canvas

  for (let i = 0; i < 42; i++) { // Exactly 42 shapes
    let angle = TWO_PI / 42 * i; // Angle for each shape
    let radius = 200 + sin(t + i * 0.2) * 50; // Radius varies over time
    let x = cos(angle) * radius; // x-coordinate
    let y = sin(angle) * radius; // y-coordinate

    let c = color(colors[i % colors.length]); // Cycle through colors
    c.setAlpha(150 + 100 * sin(t + i * 0.1)); // Pulsating transparency
    fill(c); // Set fill color

    ellipse(x, y, 20 + 10 * sin(t + i), 20 + 10 * sin(t + i)); // Draw circle
  }

  t += 0.02; // Increment time for animation
}
