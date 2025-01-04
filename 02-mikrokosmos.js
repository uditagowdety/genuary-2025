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
  createCanvas(600, 600);
  sound.loop(); // Play the audio file on loop
  fft = new p5.FFT(0.9, 1024); // Smoothing and bins

  // Calculate angle increment per frame
  angleStep = TWO_PI / (maxTime * 60); // Angle increment for 60 FPS over 60 seconds
}

function draw() {
  background(0, 0, 0, 15); // Transparent background for smooth trails
  translate(width / 2, height / 2); // Center the canvas

  let spectrum = fft.analyze(); // Get frequency spectrum

  // Find the frequency with the maximum amplitude
  let maxIndex = spectrum.indexOf(max(spectrum));
  let frequency = fft.getFreq(maxIndex); // Convert the index to frequency

  // Convert frequency to MIDI note
  let midiNote = 69 + 12 * Math.log2(frequency / 440);

  // Map MIDI note to a radius and angle
  let dynamicRadius = timeRadius + map(midiNote, 21, 108, 0, 200); // Map to piano range (A0 to C8)
  let x = cos(currentAngle) * dynamicRadius;
  let y = sin(currentAngle) * dynamicRadius;

  // Generate a smooth rainbow color based on the MIDI note
  let hueValue = map(midiNote, 21, 108, 0, 360) % 360; // Map note to hue
  let r = sin(radians(hueValue)) * 127 + 128; // Red channel
  let g = sin(radians(hueValue + 120)) * 127 + 128; // Green channel
  let b = sin(radians(hueValue + 240)) * 127 + 128; // Blue channel

  // Draw the main point on the spiral
  noStroke();
  fill(r, g, b, 200); // Higher alpha for more vibrant colors
  ellipse(x, y, 10, 10); // Slightly larger for vibrancy

  // Draw additional surrounding points for a "bloom" effect
  for (let i = 0; i < 5; i++) {
    let offsetX = random(-5, 5);
    let offsetY = random(-5, 5);
    fill(r, g, b, 150); // Lower alpha for surrounding points
    ellipse(x + offsetX, y + offsetY, 8, 8); // Smaller, faded circles
  }

  // Increment the angle and hue offset
  currentAngle += angleStep;
  hueOffset += 0.5; // Adjust for smoother color transitions

  // Reset the spiral after completing one cycle
  if (currentAngle >= TWO_PI) {
    currentAngle = 0;
    timeRadius += 20; // Increase radius for next cycle
    if (timeRadius > width / 2) timeRadius = 100; // Reset radius if too large
  }
}
