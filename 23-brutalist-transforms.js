let img;
let edges;
let lines = [];

function preload() {
  img = loadImage("brutalist.jpeg"); // Replace with your image
}

function setup() {
  createCanvas(800, 800);
  img.resize(width, height);
  edges = createGraphics(width, height);
  
  // Detect edges using Sobel filter
  detectEdges();

  // Simulate Hough Line Transform
  findLines();
}

function draw() {
  background(20);

  // Display original image with reduced opacity
  tint(255, 100);
  image(img, 0, 0);

  // Draw detected lines
  for (let l of lines) { // Changed 'line' to 'l' here
    stroke(255);
    strokeWeight(2);
    line(l.x1, l.y1, l.x2, l.y2); // Use 'l' instead of 'line'
  }
}

// Edge detection using Sobel filter
function detectEdges() {
  edges.image(img, 0, 0);
  edges.filter(GRAY);
  edges.filter(POSTERIZE, 3); // Simplify tones
  edges.filter(THRESHOLD, 0.3); // Binary edge map
}

// Simulate Hough Line Transform
function findLines() {
  edges.loadPixels();
  let d = edges.pixelDensity();
  let pixels = edges.pixels;

  for (let y = 0; y < height; y += 10) {
    for (let x = 0; x < width; x += 10) {
      let index = (y * width + x) * d * 4;
      let brightness = pixels[index]; // Get brightness of the pixel

      // If the pixel is part of an edge
      if (brightness < 128) {
        // Generate a random line based on the edge
        let x1 = x;
        let y1 = y;
        let x2 = x + random(-50, 50);
        let y2 = y + random(-50, 50);

        // Save the line
        lines.push({ x1, y1, x2, y2 });
      }
    }
  }
}
