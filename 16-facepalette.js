let video;
let faceapi;
let detections = [];

// Emotion palettes
const palettes = {
  happy: ["#FFD700", "#FFE4B5", "#FF8C00", "#FFDAB9", "#FFFACD"],
  sad: ["#1E90FF", "#4682B4", "#708090", "#B0C4DE", "#A9A9A9"],
  surprised: ["#FF4500", "#FF6347", "#FF7F50", "#FFD700", "#FFA500"],
  angry: ["#B22222", "#FF0000", "#DC143C", "#8B0000", "#A52A2A"],
  neutral: ["#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080", "#696969"]
};
let currentPalette = palettes.neutral;

function setup() {
  createCanvas(640, 480);

  // Setup webcam
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Initialize Face API
  const faceOptions = { withLandmarks: true, withDescriptors: false };
  faceapi = ml5.faceApi(video, faceOptions, modelReady);
}

function modelReady() {
  console.log("Face API ready");
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
    return;
  }

  detections = result;
  if (detections && detections.length > 0) {
    let emotions = detections[0].expressions;
    let dominantEmotion = Object.keys(emotions).reduce((a, b) =>
      emotions[a] > emotions[b] ? a : b
    );

    // Update the palette based on detected emotion
    currentPalette = palettes[dominantEmotion] || palettes.neutral;
  }
  faceapi.detect(gotResults); // Detect again
}

function draw() {
  background(30);

  // Draw a dynamic generative background with the current palette
  noStroke();
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let c = color(random(currentPalette));
    c.setAlpha(random(50, 150)); // Add transparency
    fill(c);
    ellipse(x, y, random(10, 50));
  }

  // Mirror the video feed for reference
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();
}
