// Grid settings
let cols = 50; // Number of columns
let rows = 50; // Number of rows
let grid;
let cellSize;

function setup() {
  createCanvas(400, 400);
  cellSize = width / cols; // Calculate cell size based on canvas
  grid = createInitialGrid(); // Initialize grid with Cell objects
  frameRate(5); // Speed of evolution
}

function draw() {
  background(255); // White background
  drawGrid(grid); // Render all cells
  grid = updateGrid(grid); // Apply rules for each "game" and evolve the grid
}

// Cell Class
class Cell {
  constructor(x, y, state, game) {
    this.x = x; // Column position
    this.y = y; // Row position
    this.state = state; // 0: dead, 1: alive
    this.game = game; // "black", "red", "yellow", or "blue"
  }

  // Render the cell based on its state and game
  render() {
    let color = 255; // Default: white
    if (this.state === 1) {
      if (this.game === "black") color = 0; // Black when alive
      if (this.game === "red") color = [255, 0, 0]; // Red when alive
      if (this.game === "yellow") color = [255, 255, 0]; // Yellow when alive
      if (this.game === "blue") color = [0, 0, 255]; // Blue when alive
    }
    fill(color);
    noStroke();
    rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
  }

  // Count neighbors for the current game
  countNeighbors(grid) {
    let counts = { black: 0, red: 0, yellow: 0, blue: 0 }; // Count for each game
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // Skip self
        let nx = this.x + i;
        let ny = this.y + j;
        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
          let neighbor = grid[ny][nx];
          if (neighbor.state === 1) counts[neighbor.game]++;
        }
      }
    }
    return counts;
  }

  // Apply game rules to decide the next state
  evolve(grid) {
    let neighbors = this.countNeighbors(grid);
    let totalNeighbors = neighbors[this.game]; // Neighbors of the same game
    if (this.state === 1) {
      // Survival: stays alive with 2-3 neighbors
      if (totalNeighbors < 1 || totalNeighbors > 3) return 0; // Dies if under/overpopulated
      return 1; // Stays alive
    } else {
      // Reproduction: comes to life with exactly 3 neighbors
      if (totalNeighbors ===2) return 1;
      return 0; // Stays dead
    }
  }
}

// Create the initial grid with random Cell objects
function createInitialGrid() {
  let grid = [];
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      // Randomly assign initial state and game
      let state = random() < 0.5 ? 1 : 0; // 20% chance of being alive
      let gameOptions = ["black", "red", "yellow", "blue"]; // New game options
      let game = random(gameOptions); // Randomly assign a game
      grid[y][x] = new Cell(x, y, state, game);
    }
  }
  return grid;
}

// Draw the entire grid
function drawGrid(grid) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].render(); // Render each cell
    }
  }
}

// Update the grid based on the evolution rules
function updateGrid(grid) {
  let nextGrid = [];
  for (let y = 0; y < rows; y++) {
    nextGrid[y] = [];
    for (let x = 0; x < cols; x++) {
      let cell = grid[y][x];
      // Create a new Cell object with the evolved state
      let nextState = cell.evolve(grid);
      nextGrid[y][x] = new Cell(x, y, nextState, cell.game);
    }
  }
  return nextGrid; // Return the updated grid
}
