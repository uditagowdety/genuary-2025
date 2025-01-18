// Visualization: Circles if PI = 4

let t = 0; // Time variable
let numCircles = 10; // Number of circles to draw
let maxRadius = 200; // Maximum radius of the largest circle

function setup() {
  createCanvas(600, 600);
  noFill(); // No fill for circles
  strokeWeight(2);
}

function draw() {
  background(10); // Dark background
  translate(width / 2, height / 2); // Center the canvas

  for (let i = 1; i <= numCircles; i++) {
    let radius = (i / numCircles) * maxRadius; // Radius for this circle
    let distortion = map(sin(t + i), -1, 1, 0.5, 1.5); // Distortion factor

    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += radians(10)) {
      let distortedAngle = angle * distortion; // Distorted angle due to \u03c0 = 4
      let x = cos(distortedAngle) * radius;
      let y = sin(distortedAngle) * radius;
      stroke(lerpColor(color("#FF5733"), color("#33C1FF"), i / numCircles)); // Gradient stroke
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  t += 0.012; // Increment time for dynamic animation
}
