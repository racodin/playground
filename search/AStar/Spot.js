export default class Spot {
  constructor(i, j, width, height){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.width = width;
    this.height = height;
  }

  show(ctx, color){
    ctx.fillStyle = color;
    ctx.fillRect(this.i * this.width, this.j * this.height, this.width - 1, this.height - 1);
    // ctx.strokeStyle = color;
    // ctx.strokeRect(this.x * this.width, this.y * this.height, this.width - 1, this.height - 1);
  }

  addNeighbors (grid, cols, rows){
    const i = this.i;
    const j = this.j;
    if (i < cols - 1){
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0){
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1){
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0){
      this.neighbors.push(grid[i][j - 1]);
    }
  }
}