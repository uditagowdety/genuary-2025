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
      t.vy = 0; // Stop vertical motion
      t.vx = 0; // Stop horizontal motion
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
    let dx = abs(triangle.x - g.x);
    let dy = abs(triangle.y - g.y);

    // Check if triangle overlaps another
    if (dx < (triangle.size / 2) && dy < (triangle.size / 2)) {
      triangle.y = g.y - triangle.size / 2; // Adjust position
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
    this.rotation = random(TWO_PI); // Random initial rotation
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
    rotate(this.rotation); // Use random rotation for diversity
    triangle(
      -this.size / 2, this.size / 2,
      this.size / 2, this.size / 2,
      0, -this.size / 2
    );
    pop();
  }
}
