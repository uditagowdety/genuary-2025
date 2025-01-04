let sound, fft;
let timeRadius = 100; // Smaller base radius for the spiral
let maxTime = 60; // Total time for the cycle (in seconds)
let angleStep; // Angle increment per frame
let currentAngle = 0; // Tracks the current angle
let hueOffset = 0; // For dynamic color transitions

function preload() {
  sound = loadSound('clair.mp3'); // Replace with your audio file
}

function setup() {
  createCanvas(500, 500);
  sound.loop(); // Play the audio file on loop
  fft = new p5.FFT(0.9, 512); // Smoothing and bins

  // Calculate angle increment per frame
  angleStep = TWO_PI / (maxTime * 60); // Angle increment for 60 FPS over 60 seconds
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

  // Generate a smooth rainbow color in RGB
  let hueValue = (hueOffset + map(currentAngle, 0, TWO_PI, 0, 360)) % 360; // Continuous hue cycling
  let r = sin(radians(hueValue)) * 127 + 128; // Red channel
  let g = sin(radians(hueValue + 120)) * 127 + 128; // Green channel
  let b = sin(radians(hueValue + 240)) * 127 + 128; // Blue channel

  // Draw the point on the spiral
  noStroke();
  fill(r, g, b); // Use the computed RGB color
  ellipse(x, y, 6, 6); // Slightly smaller points for a delicate visual effect

  // Increment the angle and hue offset
  currentAngle += angleStep;
  hueOffset += 0.1; // Adjust for smoother color transitions

  // Reset the spiral after completing one cycle
  if (currentAngle >= TWO_PI) {
    currentAngle = 0;
    timeRadius += 20; // Increase radius for next cycle
    if (timeRadius > width / 2) timeRadius = 100; // Reset radius if too large
  }
}
