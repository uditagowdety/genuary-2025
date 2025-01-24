let circles = [];
let rectangles = [];

function setup() {
  createCanvas(800, 600);

  // Generate random circles
  for (let i = 0; i < 10; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      r: random(20, 50),
      vx: random(-2, 2),
      vy: random(-2, 2),
    });
  }

  // Generate random rectangles
  for (let i = 0; i < 5; i++) {
    rectangles.push({
      x: random(width),
      y: random(height),
      w: random(50, 100),
      h: random(30, 80),
      vx: random(-1, 1),
      vy: random(-1, 1),
    });
  }
}

function draw() {
  background(20);

  // Update and draw circles
  for (let c of circles) {
    moveCircle(c);
    fill(200, 100, 100, 150);
    ellipse(c.x, c.y, c.r * 2);

    // Check collision with other circles
    for (let other of circles) {
      if (c !== other && circleCircleCollision(c, other)) {
        fill(255, 0, 0);
        ellipse(c.x, c.y, c.r * 2); // Highlight collision
      }
    }
  }

  // Update and draw rectangles
  for (let r of rectangles) {
    moveRectangle(r);
    fill(100, 200, 100, 150);
    rect(r.x, r.y, r.w, r.h);

    // Check collision with other rectangles
    for (let other of rectangles) {
      if (r !== other && rectRectCollision(r, other)) {
        fill(0, 0, 255, 150);
        rect(r.x, r.y, r.w, r.h); // Highlight collision
      }
    }
  }
}

// Circle movement
function moveCircle(circle) {
  circle.x += circle.vx;
  circle.y += circle.vy;

  // Bounce off walls
  if (circle.x - circle.r < 0 || circle.x + circle.r > width) circle.vx *= -1;
  if (circle.y - circle.r < 0 || circle.y + circle.r > height) circle.vy *= -1;
}

// Rectangle movement
function moveRectangle(rect) {
  rect.x += rect.vx;
  rect.y += rect.vy;

  // Bounce off walls
  if (rect.x < 0 || rect.x + rect.w > width) rect.vx *= -1;
  if (rect.y < 0 || rect.y + rect.h > height) rect.vy *= -1;
}

// Circle-Circle Collision
function circleCircleCollision(c1, c2) {
  let distSq = (c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2;
  let radiiSumSq = (c1.r + c2.r) ** 2;
  return distSq < radiiSumSq;
}

// Rectangle-Rectangle Collision
function rectRectCollision(r1, r2) {
  return (
    r1.x < r2.x + r2.w &&
    r1.x + r1.w > r2.x &&
    r1.y < r2.y + r2.h &&
    r1.y + r1.h > r2.y
  );
}
