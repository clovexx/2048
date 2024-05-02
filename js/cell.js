class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.cellLength = config.cellLength
    this.gapLength = config.gapLength
    this.centerX = this.x * this.gapLength + (this.x - .5) * this.cellLength
    this.centerY = this.y * this.gapLength + (this.y - .5) * this.cellLength
  }
  
  draw(ctx) {
    ctx.fillStyle = config.cellColor
    fillRectByCenter(ctx, this.centerX, this.centerY, this.cellLength)
  }
}