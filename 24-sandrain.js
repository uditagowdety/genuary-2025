let triangles = []; // Array to store falling triangles
let gravity = 0.5; // Gravity constant
let ground = []; // Array to store stationary triangles

function setup() {
  createCanvas(800, 600);
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
      t.y = constrain(t.y, 0, height - t.size / 2); // Ensure it doesn’t go below ground
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
    // Get vertices of both triangles
    let tVertices = triangle.getVertices();
    let gVertices = g.getVertices();

    // Check if any vertex of the falling triangle is inside the ground triangle
    for (let v of tVertices) {
      if (pointInTriangle(v.x, v.y, gVertices)) {
        triangle.y = g.y - triangle.size / 2; // Adjust position to stack properly
        return true;
      }
    }
  }
  return false;
}

// Function to check if a point is inside a triangle
function pointInTriangle(px, py, vertices) {
  let [v1, v2, v3] = vertices;

  let areaOrig = abs((v1.x * (v2.y - v3.y) + v2.x * (v3.y - v1.y) + v3.x * (v1.y - v2.y)) / 2.0);
  let area1 = abs((px * (v2.y - v3.y) + v2.x * (v3.y - py) + v3.x * (py - v2.y)) / 2.0);
  let area2 = abs((v1.x * (py - v3.y) + px * (v3.y - v1.y) + v3.x * (v1.y - py)) / 2.0);
  let area3 = abs((v1.x * (v2.y - py) + v2.x * (py - v1.y) + px * (v1.y - v2.y)) / 2.0);

  return (area1 + area2 + area3) <= areaOrig;
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

  getVertices() {
    // Get the vertices of the triangle after rotation and translation
    let angle = this.rotation;
    let halfSize = this.size / 2;

    let v1 = createVector(
      this.x + cos(angle) * -halfSize - sin(angle) * halfSize,
      this.y + sin(angle) * -halfSize + cos(angle) * halfSize
    );
    let v2 = createVector(
      this.x + cos(angle) * halfSize - sin(angle) * halfSize,
      this.y + sin(angle) * halfSize + cos(angle) * halfSize
    );
    let v3 = createVector(
      this.x + cos(angle) * 0 - sin(angle) * -halfSize,
      this.y + sin(angle) * 0 + cos(angle) * -halfSize
    );

    return [v1, v2, v3];
  }
}
