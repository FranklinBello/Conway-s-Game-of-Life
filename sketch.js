// Conway's Game of Life
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

let grid;
let margin = 50;
let cellSize = 20;

function setup() {
  createCanvas(700, 700);
  background('#CCC');
  let ncols = floor(width / cellSize);
  let nrows = floor(height / cellSize);
  grid = new Grid(nrows, ncols);
  grid.show(cellSize);
  setInterval(display, 100);
}

function display() {
  grid.show(cellSize);
  grid.round();
}

function draw() {}

class Grid {

  constructor(nrows, ncols) {
    this.nrows = nrows;
    this.ncols = ncols;
    this.generation = 0;
    this.list = [];
    for (let i = 0; i < nrows; i++)
      for (let j = 0; j < ncols; j++)
        this.list.push(new Cell(i, j));
  }

  transformIndex(row, col) {
    if (row < 0 || row > this.nrows - 1 || col < 0 || col > this.ncols - 1) {
      return -1;
    }
    return row * this.ncols + col;
  }

  round() {
    this.generation++;
    let aux = [];
    for (let i = 0; i < this.list.length; i++) {
      let r = this.list[i].getRow();
      let c = this.list[i].getCol();
      let s = this.list[i].isAlive();
      let count = 0;
      if (this.list[i].isAlive())
        count = count - 1;
      for (let h = -1; h <= 1; h++) {
        for (let k = -1; k <= 1; k++) {
          let index = this.transformIndex(r + h, c + k);
          if (index >= 0) {
            if (this.list[index].isAlive()){
              count = count + 1;
            }
          }
        }
      }
      aux.push(count);
    }
    for (let i = 0; i < this.list.length; i++) {
      let n = aux[i];
      if (this.list[i].isAlive()) {
        if (n < 2 || n > 3)
          this.list[i].setStatus(false);
      } else {
        if (n === 3)
          this.list[i].setStatus(true);
      }
    }
  }

  show(size) {
    for (let i = 0; i < this.list.length; i++) {
      let x = this.list[i].getCol() * size;
      let y = this.list[i].getRow() * size;
      stroke('#777');
      strokeWeight(3);
      if (this.list[i].isAlive())
        fill('#000');
      else
        fill('#FFF');
      rect(x, y, size, size);
    }
  }

}

class Cell {

  constructor(row, col) {
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

  isAlive() {
    return this.alive;
  }

  setStatus(status) {
    this.alive = status;
  }
}