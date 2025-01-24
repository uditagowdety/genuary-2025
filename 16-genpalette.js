let starryNightPalette = ["#081D58", "#3563A7", "#F4D03F", "#F39C12", "#FDFEFE"];
let gridSize = 10;

function setup() {
  createCanvas(600, 600);
  noLoop(); // Static visual
}

function draw() {
  let cellSize = width / gridSize;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let c = starryNightPalette[int(random(starryNightPalette.length))];
      fill(c);
      noStroke();
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
