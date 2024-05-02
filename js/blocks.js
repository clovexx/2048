class Blocks {
  constructor() {
    this.horizontalCellCount = config.horizontalCellCount
    this.verticalCellCount = config.verticalCellCount
    this.score = 0
    this.mergeStatus = false
    this.initBlocksArray()
  }

  initBlock(x, y, level) {
    const block = new Block(x, y, level)

    return block
  }

  initBlocksArray() {
    this.blocksArray = []

    for (let x = 1; x <= this.horizontalCellCount; x++) {
      let xArray = new Array(this.verticalCellCount).fill(null)

      this.blocksArray.push(xArray)
    }
  }

  initBlocks(count, levelRange = [1, 2]) {
    for (let i = 0; i < count; i++) {
      let x = rondomBetweenNumbers(1, this.horizontalCellCount + 1, true),
          y = rondomBetweenNumbers(1, this.verticalCellCount + 1, true),
          level = rondomBetweenNumbers(levelRange[0], levelRange[1], true)
          
      if (!this.detectHasBlock(x, y)) {
        const block = this.initBlock(x, y, level)

        this.addBlock(block, x, y)
      } else {
        count++
      }
    }
  }

  detectHasBlock(x, y) {
    return !(this.blocksArray[x - 1][y - 1] === null)
  }

  getBlock(x, y) {
    return this.blocksArray[x - 1][y - 1]
  }

  addBlock(block, x, y) {
    this.blocksArray[x - 1][y - 1] = block
  }

  removeBlockByCoordinate(x, y) {
    this.blocksArray[x - 1][y - 1] = null
  }

  removeBlock(block) {
    this.blocksArray.forEach((blocks) => {
      let index = blocks.indexOf(block)
      if (index > -1)
        blocks[index] = null
    })
  }

  blocksDataRefresh() {
    this.blocksArray.forEach((blocks) => {
      blocks.forEach((block) => {
        block !== null && block.blockDataRefresh()
      })
    })
  }

  detectGameEnd() {
    for (let x = 1; x <= this.horizontalCellCount; x++) {
      for (let y = 1; y <= this.verticalCellCount; y++) {
        let block = this.getBlock(x, y)

        if (block === null) return false
        
        if (x <= this.horizontalCellCount - 1 && y <= this.verticalCellCount - 1) {
          let rightBlock = this.getBlock(x + 1, y),
              downBlock = this.getBlock(x, y + 1)
            
          if (rightBlock === null || downBlock === null || block.level === rightBlock.level || block.level === downBlock.level) return false
        }

        if (x === this.horizontalCellCount && y <= this.verticalCellCount - 1) {
          let downBlock = this.getBlock(x, y + 1)
            
          if (downBlock === null || block.level === downBlock.level) return false
        }

        if (x <= this.horizontalCellCount - 1 && y === this.verticalCellCount) {
          let rightBlock = this.getBlock(x + 1, y)
            
          if (rightBlock === null || block.level === rightBlock.level) return false
        }
      } 
    }

    return true
  }

  moveLeft() {
    for (let y = 1; y <= this.verticalCellCount; y++) {
      for (let x = 2; x <= this.horizontalCellCount; x++) {
        if (this.detectHasBlock(x, y)) {
          this.blockMoveLeft(this.getBlock(x, y))
        }
      }
    }
  }

  moveRight() {
    for (let y = 1; y <= this.verticalCellCount; y++) {
      for (let x = this.horizontalCellCount - 1; x >= 1; x--) {
        if (this.detectHasBlock(x, y)) {
          this.blockMoveRight(this.getBlock(x, y))
        }
      }
    }
  }

  moveUp() {
    for (let x = 1; x <= this.horizontalCellCount; x++) {
      for (let y = 2; y <= this.horizontalCellCount; y++) {
        if (this.detectHasBlock(x, y)) {
          this.blockMoveUp(this.getBlock(x, y))
        }
      }
    }
  }

  moveDown() {
    for (let x = 1; x <= this.horizontalCellCount; x++) {
      for (let y = this.verticalCellCount - 1; y >= 1; y--) {
        if (this.detectHasBlock(x, y)) {
          this.blockMoveDown(this.getBlock(x, y))
        }
      }
    }
  }

  blockMoveLeft(block) {
    let x = block.x - 1, dx = block.x

    for (let i = x; i >= 1; i--) {
      if (!this.detectHasBlock(i, block.y)) {
        dx = i
        if (dx === 1) {
          this.addBlock(block, dx, block.y)
          this.removeBlockByCoordinate(block.x, block.y)
          block.changeCoordinate(dx, block.y)
          block.changeStatus('moving')
          this.active = true
          break
        }
      } else if (this.getBlock(i, block.y).level === block.level && !this.getBlock(i, block.y).mergeStatus) {
        dx = i
        this.addBlock(block, dx, block.y)
        this.removeBlockByCoordinate(block.x, block.y)
        block.changeCoordinate(dx, block.y)
        block.level += 1
        block.changeStatus('moving')
        block.mergeStatus = true
        this.active = true
        this.score += 2 ** block.level
        break
      } else {
        if (dx !== block.x) {
          this.addBlock(block, dx, block.y)
          this.removeBlockByCoordinate(block.x, block.y)
          block.changeCoordinate(dx, block.y)
          block.changeStatus('moving')
          this.active = true
        }
        break
      }
    }
  }

  blockMoveRight(block) {
    let x = block.x + 1, dx = block.x

    for (let i = x; i <= this.horizontalCellCount; i++) {
      if (!this.detectHasBlock(i, block.y)) {
        dx = i
        if (dx === this.horizontalCellCount) {
          this.addBlock(block, dx, block.y)
          this.removeBlockByCoordinate(block.x, block.y)
          block.changeCoordinate(dx, block.y)
          block.changeStatus('moving')
          this.active = true
          break
        }
      } else if (this.getBlock(i, block.y).level === block.level && !this.getBlock(i, block.y).mergeStatus) {
        dx = i
        this.addBlock(block, dx, block.y)
        this.removeBlockByCoordinate(block.x, block.y)
        block.changeCoordinate(dx, block.y)
        block.level += 1
        block.changeStatus('moving')
        block.mergeStatus = true
        this.active = true
        this.score += 2 ** block.level
        break
      } else {
        if (dx !== block.x) {
          this.addBlock(block, dx, block.y)
          this.removeBlockByCoordinate(block.x, block.y)
          block.changeCoordinate(dx, block.y)
          block.changeStatus('moving')
          this.active = true
        }
        break
      }
    }
  }

  blockMoveUp(block) {
    let y = block.y - 1, dy = block.y

    for (let i = y; i >= 1; i--) {
      if (!this.detectHasBlock(block.x, i)) {
        dy = i
        if (dy === 1) {
          this.addBlock(block, block.x, dy)
          this.removeBlockByCoordinate(block.x, block.y)
          block.changeCoordinate(block.x, dy)
          block.changeStatus('moving')
          this.active = true
          break
        }
      } else if (this.getBlock(block.x, i).level === block.level && !this.getBlock(block.x, i).mergeStatus) {
        dy = i
        this.addBlock(block, block.x, dy)
        this.removeBlockByCoordinate(block.x, block.y)
        block.changeCoordinate(block.x, dy)
        block.level += 1
        block.changeStatus('moving')
        block.mergeStatus = true
        this.active = true
        this.score += 2 ** block.level
        break
      } else {
        if (dy !== block.y) {
          this.addBlock(block, block.x, dy)
          this.removeBlockByCoordinate(block.x, block.y)
          block.changeCoordinate(block.x, dy)
          block.changeStatus('moving')
          this.active = true
        }
        break
      }
    }
  }

  blockMoveDown(block) {
    let y = block.y + 1, dy = block.y

    for (let i = y; i <= this.verticalCellCount; i++) {
      if (!this.detectHasBlock(block.x, i)) {
        dy = i
        if (dy === this.verticalCellCount) {
          this.addBlock(block, block.x, dy)
          this.removeBlockByCoordinate(block.x, block.y)
          block.changeCoordinate(block.x, dy)
          block.changeStatus('moving')
          this.active = true
          break
        }
      } else if (this.getBlock(block.x, i).level === block.level && !this.getBlock(block.x, i).mergeStatus) {
        dy = i
        this.addBlock(block, block.x, dy)
        this.removeBlockByCoordinate(block.x, block.y)
        block.changeCoordinate(block.x, dy)
        block.level += 1
        block.changeStatus('moving')
        block.mergeStatus = true
        this.active = true
        this.score += 2 ** block.level
        break
      } else {
        if (dy !== block.y) {
          this.addBlock(block, block.x, dy)
          this.removeBlockByCoordinate(block.x, block.y)
          block.changeCoordinate(block.x, dy)
          block.changeStatus('moving')
          this.active = true
        }
        break
      }
    }
  }

  draw(ctx) {
    this.blocksArray.forEach((blocks) => {
      blocks.forEach((block) => {
        block !== null && block.draw(ctx)
      })
    })
  }
}