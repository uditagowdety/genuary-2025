let sound, fft, amplitude;
let numLayers = 20; // Number of circle layers
let colors = ["#F92672", "#66D9EF", "#A6E22E", "#E6DB74", "#FD971F"]; // Monokai-inspired palette

function preload() {
  sound = loadSound('mikro.mp3'); // Replace with your audio file
}

function setup() {
  createCanvas(800, 800);
  sound.loop(); // Play the audio file on loop

  // Initialize FFT and Amplitude
  fft = new p5.FFT(0.8, 512); // Smoothing and bins
  amplitude = new p5.Amplitude();
}

function draw() {
  background(30); // Dark Monokai background
  translate(width / 2, height / 2); // Center the canvas

  let spectrum = fft.analyze(); // Get frequency spectrum
  let level = amplitude.getLevel(); // Get overall amplitude level
  let maxRadius = map(level, 0, 1, 100, width / 2); // Map amplitude to max radius

  noFill();

  for (let i = 0; i < numLayers; i++) {
    // Map each layer's size to a portion of the max radius
    let radius = map(i, 0, numLayers, 50, maxRadius);

    // Calculate color for each layer based on spectrum and palette
    let spectrumValue = spectrum[i * 10] || 0; // Sample spectrum at intervals
    let colorIndex = floor(map(spectrumValue, 0, 255, 0, colors.length));
    let c = color(colors[colorIndex]);

    // Add transparency based on spectrum value
    let alpha = map(spectrumValue, 0, 255, 50, 255);
    c.setAlpha(alpha);

    stroke(c);
    strokeWeight(map(level, 0, 1, 1, 4)); // Dynamic stroke weight based on amplitude
    ellipse(0, 0, radius * 2); // Draw the layer
  }
}
