let artworks = [
    { title: "Starry Night", palette: ["#081D58", "#3563A7", "#F4D03F", "#F39C12", "#FDFEFE"] },
    { title: "Mona Lisa", palette: ["#3A2F1B", "#B79D74", "#705E3C", "#D7C59A", "#2F2A20"] },
];
let currentArtwork = 0;
let gridSize = 10;

function setup() {
    createCanvas(600, 600);
    noLoop(); // Static visual
}

function draw() {
    background(255);
    let cellSize = width / gridSize;
    let palette = artworks[currentArtwork].palette;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
        let c = palette[int(random(palette.length))];
        fill(c);
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Simulating user interaction for guessing
function keyPressed() {
    let userInput = prompt("Guess the artwork:");
    if (userInput.toLowerCase() === artworks[currentArtwork].title.toLowerCase()) {
        alert("Correct!");
        currentArtwork++;
        if (currentArtwork < artworks.length) {
        redraw();
        } else {
        alert("You completed the quiz! Here's your star! ⭐");
        }
    } else {
        alert("Incorrect! Try again.");
    }
}
