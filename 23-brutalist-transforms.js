function setup() {
    createCanvas(800, 800);
    noLoop(); // Static art
  }
  
  function draw() {
    background(20);
  
    let cols = int(random(4, 8)); // Random number of columns
    let rows = int(random(4, 8)); // Random number of rows
    let cellWidth = width / cols;
    let cellHeight = height / rows;
  
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let w = cellWidth * random(0.8, 1.5); // Random width for brutalist effect
        let h = cellHeight * random(0.8, 1.5); // Random height for brutalist effect
        let xPos = x * cellWidth + random(-20, 20); // Slight offset
        let yPos = y * cellHeight + random(-20, 20); // Slight offset
  
        fill(random([50, 100, 150, 200])); // Muted color palette
        rect(xPos, yPos, w, h);
      }
    }
  }
  