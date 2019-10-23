// Conway's Game of Life
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

let grid = [];
let nrows, ncols;
let cellSize;
let margin;

function setup() {
  createCanvas(600, 600);
  cellSize = 50;
  margin = 50;
  ncols = floor((width - 2*margin) / cellSize);
  nrows = floor((height - 2*margin) / cellSize);
  for (let i = 0; i < nrows; i++) {
    for (let j = 0; j < ncols; j++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }
}

function draw() {
  background('#CCC');
  translate(margin, margin);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

function getIndex(i, j){
  return i * ncols + j;
}

function Cell(row, col) {
  this.row = row;
  this.col = col;
  this.alive = random([true, false, false]);
  this.neighbors = function(){
    return 1;
  };

  this.show = function() {
    let x = this.row * cellSize;
    let y = this.col * cellSize;
    stroke('#777');
    strokeWeight(3);
    if (this.alive) {
      fill('#000');
    } else {
      fill('#FFF')
    }
    rect(x, y, cellSize, cellSize);
  }

}