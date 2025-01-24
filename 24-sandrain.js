let triangles = []; // Array to store falling triangles
let gravity = 0.5; // Gravity constant
let ground = []; // Array to store stationary triangles

function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(20);

  // Add a new triangle randomly from the top
  if (frameCount % 10 === 0) {
    triangles.push(new Triangle(random(width), 0, random(10, 20)));
  }

  // Update and display falling triangles
  for (let i = triangles.length - 1; i >= 0; i--) {
    let t = triangles[i];
    t.update();
    t.show();

    // Check if the triangle lands on the ground or another triangle
    if (t.y + t.size / 2 >= height || checkCollision(t)) {
      ground.push(t); // Add to stationary ground triangles
      triangles.splice(i, 1); // Remove from falling triangles
    }
  }

  // Display ground triangles
  for (let t of ground) {
    t.show();
  }
}

// Function to check collision with other triangles
function checkCollision(triangle) {
  for (let g of ground) {
    let d = dist(triangle.x, triangle.y, g.x, g.y);
    if (d < triangle.size) {
      return true;
    }
  }
  return false;
}

// Triangle class
class Triangle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = random(-1, 1); // Random horizontal velocity
    this.vy = 0; // Initial vertical velocity
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }

  update() {
    this.vy += gravity; // Apply gravity
    this.x += this.vx; // Apply horizontal movement
    this.y += this.vy; // Apply vertical movement

    // Keep triangle within horizontal bounds
    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
  }

  show() {
    fill(this.color);
    push();
    translate(this.x, this.y);
    rotate(PI / 3); // Add slight rotation for randomness
    triangle(
      -this.size / 2, this.size / 2,
      this.size / 2, this.size / 2,
      0, -this.size / 2
    );
    pop();
  }
}
