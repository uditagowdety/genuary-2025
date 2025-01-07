let t = 0; // Time variable

function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(5, 5, 5, 20); // Black with higher transparency for trails
  translate(width / 2, height / 2); // Center canvas

  let maxRings = 30; // Number of ripples
  let baseRadius = 50; // Minimum ripple size
  let ringSpacing = 20; // Distance between ripples
  let mouseEffect = map(mouseY, 0, height, 0.8, 1.5); // Mouse Y controls distortion intensity

  for (let i = 0; i < maxRings; i++) {
    let radius = baseRadius + i * ringSpacing + sin(t + i * 0.2) * 30 * mouseEffect; // Dynamic radius
    let brightness = map(i, 0, maxRings, 50, 200); // Wider grayscale range for contrast
    let alpha = 5
    fill(brightness, alpha); // Grayscale with dynamic alpha

    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += PI / 300) {
      let xOffset = cos(angle) * radius;
      let yOffset = sin(angle) * radius;
      let noiseFactor = noise(xOffset * 0.01, yOffset * 0.01, t * 0.05); // Noise for distortion
      let x = xOffset * noiseFactor;
      let y = yOffset * noiseFactor;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  // Increment time for smooth motion
  t += map(mouseX, 0, width, 0.01, 0.03); // Mouse X controls motion speed
}
