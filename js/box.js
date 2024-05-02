class Box {
  constructor() {
    this.cellLength = config.cellLength
    this.gapLength = config.gapLength
    this.horizontalCellCount = 4
    this.verticalCellCount = 4
  }

  init() {
    this.cells = new Cells()
    this.blocks = new Blocks()
    this.cells.initCells()
    this.blocks.initBlocks(2)
  }

  draw(ctx) {
    ctx.fillStyle = '#bbada0'
    ctx.fillRect(0, 0, this.horizontalCellCount * (this.cellLength + this.gapLength) + this.gapLength, this.verticalCellCount * (this.cellLength + this.gapLength) + this.gapLength)
    
    this.cells.draw(ctx)
    this.blocks.draw(ctx)
  }
}