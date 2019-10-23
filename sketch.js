// Conway's Game of Life
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

let grid;
let margin = 50;
let cellSize = 100;

function setup() {
  createCanvas(600, 600);
  background('#CCC');
  let ncols = floor((width - 2*margin) / cellSize);
  let nrows = floor((height - 2*margin) / cellSize);
  grid = new Grid(nrows, ncols);
  setInterval(display, 500);
}

const display = function disp() {
  translate(margin, margin);
  grid.round();
  grid.show(cellSize);
}

function draw() {
}

class Grid {

  constructor(nrows, ncols) {
    this.nrows = nrows;
    this.ncols = ncols;
    this.grid = [];
    for (let i = 0; i < nrows; i++)
      for (let j = 0; j < ncols; j++)
        this.grid.push(new Cell(i, j));
  }

  round(){
    for(let i = 0; i < this.grid.length; i++) {
      let nAlive = this.countAliveNeighbors(this.grid[i]);
      if (this.grid[i].getStatus()){
        if (nAlive < 2 || nAlive > 3) {
          this.grid[i].switchStatus();
        }
      } else {
        if (nAlive === 3) {
          this.grid[i].switchStatus();
        }
      }
    }
  }

  getIndex(row, col){
    return row * this.ncols + col;
  }

  countAliveNeighbors(cell){
    let count = 0;
    let index = this.getIndex(cell.getRow(), cell.getCol());

    let topLeft = this.grid[index - this.ncols - 1];
    let top = this.grid[index - this.ncols];
    let topRight = this.grid[index - this.ncols + 1];

    let left = this.grid[index - 1];
    let right = this.grid[index + 1];

    let bottomLeft = this.grid[index + this.ncols - 1];
    let bottom = this.grid[index + this.ncols];
    let bottomRight = this.grid[index + this.ncols + 1];

    if (topLeft && topLeft.getStatus())
      count++;
    if (top && top.getStatus())
      count++;
    if (topRight && topRight.getStatus())
      count++

    if (left && left.getStatus()) 
      count++;
    if (right && right.getStatus()) 
      count++;
    
    if (bottomLeft && bottomLeft.getStatus()) 
      count++;
    if (bottom && bottom.getStatus()) 
      count++;
    if (bottomRight && bottomRight.getStatus()) 
      count++;
    
    return count;
  }

  show(size) {
    for (let i = 0; i < this.grid.length; i++) {
      let x = this.grid[i].getRow() * size;
      let y = this.grid[i].getCol() * size;
      stroke('#777');
      strokeWeight(3);
      if (this.grid[i].getStatus()) {
        fill('#000');
      } else {
        fill('#FFF')
      }
      rect(x, y, size, size);
    } 
  }
}

class Cell {

  constructor(row, col){
    this.row = row;
    this.col = col;
    this.alive = random([true, false, false]);
  };

  getRow() {
    return this.row;
  }

  getCol() {
    return this.col;
  }

  getStatus() {
    return this.alive;
  }

  switchStatus() {
    this.alive = !this.alive;
  }
}