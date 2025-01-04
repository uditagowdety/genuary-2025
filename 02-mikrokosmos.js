let sound, fft;
let timeRadius = 200; // Base radius for the spiral
let maxTime = 60; // Total time for the cycle (in seconds)
let angleStep; // Angle increment per frame
let currentAngle = 0; // Tracks the current angle
let colors = []; // Array to hold rainbow colors

function preload() {
  sound = loadSound('clair.mp3'); // Replace with your audio file
}

function setup() {
  createCanvas(500, 500);
  sound.loop(); // Play the audio file on loop
  fft = new p5.FFT(0.9, 512); // Smoothing and bins

  // Calculate angle increment per frame
  angleStep = TWO_PI / (maxTime * 60); // Angle increment for 60 FPS over 60 seconds

  // Generate rainbow colors for smooth transitions
  for (let i = 0; i < 256; i++) {
    let hue = map(i, 0, 255, 0, 360); // Map to hue spectrum
    colors.push(color(`hsl(${hue}, 100%, 50%)`)); // HSL color format
  }
}

function draw() {
  background(30, 30); // Dark background with slight transparency for trails
  translate(width / 2, height / 2); // Center the canvas

  let spectrum = fft.analyze(); // Get frequency spectrum
  let amplitude = fft.getEnergy("bass"); // Get energy of bass for radius modulation

  // Map amplitude to dynamic radius for the spiral
  let dynamicRadius = timeRadius + map(amplitude, 0, 255, 0, 100);

  // Calculate the x, y position based on the current angle
  let x = cos(currentAngle) * dynamicRadius;
  let y = sin(currentAngle) * dynamicRadius;

  // Calculate the color based on the angle (wraps along the rainbow spectrum)
  let colorIndex = floor(map(currentAngle, 0, TWO_PI, 0, colors.length)) % colors.length;
  let c = colors[colorIndex];

  // Draw the point on the spiral
  noStroke();
  fill(c);
  ellipse(x, y, 8, 8);

  // Increment the angle
  currentAngle += angleStep;

  // Reset the spiral after completing one cycle
  if (currentAngle >= TWO_PI) {
    currentAngle = 0;
    timeRadius += 20; // Increase radius for next cycle
    if (timeRadius > width / 2) timeRadius = 200; // Reset radius if too large
  }
}
