let colors = [];
let gradientSpeed = 0.01; // Speed of gradient shifts

function setup() {
  createCanvas(800, 800);
  noLoop();

  // Initialize colors for gradients
  for (let i = 0; i < 4; i++) {
    colors.push([random(255), random(255), random(255)]);
  }
}

function draw() {
  noStroke();

  // Create a moving gradient
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let color1 = lerpColor(color(colors[0]), color(colors[1]), inter);
    let color2 = lerpColor(color(colors[2]), color(colors[3]), inter);

    for (let x = 0; x < width; x++) {
      let xInter = map(x, 0, width, 0, 1);
      let gradientColor = lerpColor(color1, color2, xInter);
      fill(gradientColor);
      rect(x, y, 1, 1); // Draw gradient pixel by pixel
    }
  }

  // Update colors slowly
  for (let c of colors) {
    c[0] = (c[0] + random(-gradientSpeed, gradientSpeed)) % 255;
    c[1] = (c[1] + random(-gradientSpeed, gradientSpeed)) % 255;
    c[2] = (c[2] + random(-gradientSpeed, gradientSpeed)) % 255;
  }

  // Loop for a smooth transition
  setTimeout(() => redraw(), 50);
}
    