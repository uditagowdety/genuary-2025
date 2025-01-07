let t = 0; // Time variable
let walkers = [];
let numWalkers = 100;

function setup() {
  createCanvas(600, 600);
  noStroke();
  for (let i = 0; i < numWalkers; i++) {
    walkers.push({
      x: width / 2,
      y: height / 2,
      angle: random(TWO_PI),
      speed: random(1, 3),
      color: color(random(255), random(150, 255), random(100, 255), 150),
      size: random(3, 7),
    });}}

function draw() {
  background(10, 10, 20, 20);

  for (let w of walkers) {
    fill(red(w.color), green(w.color), blue(w.color), 100);
    ellipse(w.x, w.y, w.size);

    w.x += cos(w.angle) * w.speed;
    w.y += sin(w.angle) * w.speed;

    // Apply Perlin noise to simulate organic firework bursts
    w.angle += map(noise(w.x * 0.01, w.y * 0.01, t), 0, 1, -0.1, 0.1);
    w.speed *= 0.98; // Gradually reduce speed

    // Reset when the firework fades
    if (w.speed < 0.1) {
      w.x = width / 2;
      w.y = height / 2;
      w.angle = random(TWO_PI);
      w.speed = random(1, 3);
      w.color = color(random(255), random(150, 255), random(100, 255), 150);}
  }

  t += 0.01; // Time increment
}