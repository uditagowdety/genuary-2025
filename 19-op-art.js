let t = 0; // Time variable for animation

function setup() {
  createCanvas(800, 800);
  noFill();
  strokeWeight(2);
}

function draw() {
  background(20);
  translate(width / 2, height / 2); // Center the pattern

  for (let i = 0; i < 30; i++) {
    let r = i * 15; // Radius of each circle
    let offset = sin(t + i * 0.1) * 30; // Dynamic offset for the illusion
    stroke(255);
    ellipse(0, 0, r + offset, r - offset); // Draw concentric ellipses
  }

  t += 0.05; // Increment time for animation
}
