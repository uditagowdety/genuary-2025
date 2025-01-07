let t = 0; // Time variable
let walkers = []; // Array for Perlin walkers
let numWalkers = 50; // Number of walkers

function setup() {
  createCanvas(600, 600); // Canvas size
  noStroke(); // No outlines
  for (let i = 0; i < numWalkers; i++) {
    walkers.push({
      x: random(width), // Initial x position
      y: random(height), // Initial y position
      color: color(random(255), random(255), random(255), 150), // Random colors
      size: random(5, 15), // Random size
    });
  }
}

function draw() {
  background(10, 10, 30, 20); // Transparent background for trails

  for (let w of walkers) {
    fill(w.color); // Use each walker's color
    ellipse(w.x, w.y, w.size); // Draw walker

    // Update position with Perlin noise
    w.x += map(noise(t, w.y * 0.01), 0, 1, -2, 2);
    w.y += map(noise(t, w.x * 0.01), 0, 1, -2, 2);

    // Keep walkers within bounds
    w.x = (w.x + width) % width;
    w.y = (w.y + height) % height;
  }

  t += 0.01; // Increment time for noise
}
