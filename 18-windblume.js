let particles = [];
let numParticles = 400; // Dynamic particle count

// Dynamic color variables
let bgColor = [255]; // White background
let particleColor = [0]; // Black particles

// Variables to track mouse movement
let prevMouseX, prevMouseY;
let windX = 0, windY = 0; // Wind variables for momentum effect

function setup() {
  createCanvas(500, 500);
  noStroke();
  initializeParticles(); // Initialize particles
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function draw() {
  background(...bgColor, 30); // Fading trail effect

  // Calculate mouse movement
  let mouseDeltaX = (mouseX - prevMouseX) * 0.1;
  let mouseDeltaY = (mouseY - prevMouseY) * 0.1;

  // Update wind momentum
  windX = lerp(windX, mouseDeltaX, 0.1); // Smooth transition for momentum
  windY = lerp(windY, mouseDeltaY, 0.1);

  for (let p of particles) {
    p.applyWind(windX, windY); // Apply wind effect
    p.update();
    p.show();
  }

  // Update previous mouse position
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

// Function to initialize particles
function initializeParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

// Particle class
class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(0.5, 2); // Wind-like horizontal velocity
    this.vy = random(-0.5, 0.5); // Slight vertical wobble
    this.alpha = random(50, 150); // Transparency for wind effect
    this.size = random(1, 3); // Smaller particle size
  }

  applyWind(windX, windY) {
    // Add randomness to the wind effect
    let randomFactorX = random(-0.1, 0.1); // Small random deviation in X
    let randomFactorY = random(-0.1, 0.1); // Small random deviation in Y

    this.vx += (windX + randomFactorX) * 0.2; // Apply randomized wind to X velocity
    this.vy += (windY + randomFactorY) * 0.2; // Apply randomized wind to Y velocity
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Apply damping to velocities for smoother motion
    this.vx *= 0.98; // Stronger damping to retain smooth motion
    this.vy *= 0.98;

    // Wrap around edges
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }

  show() {
    fill(...particleColor, this.alpha); // Dynamic particle color
    ellipse(this.x, this.y, this.size);
  }
}
