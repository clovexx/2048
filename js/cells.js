class Cells {
  constructor() {
    this.horizontalCellCount = config.horizontalCellCount
    this.verticalCellCount = config.verticalCellCount
    this.cellsArray = []
  }

  initCell(x, y) {
    const cell = new Cell(x, y)

    return cell
  }

  initCells() {
    for (let x = 1; x <= this.horizontalCellCount; x++) {
      for (let y = 1; y <= this.verticalCellCount; y++) {
        const cell = this.initCell(x, y)
        this.cellsArray.push(cell)
      } 
    }
  }

  draw(ctx) {
    this.cellsArray.forEach((cell) => {
      cell.draw(ctx)
    })
  }
}