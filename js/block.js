class Block {
  constructor(x, y, level = 1, status = 'initial') {
    this.x = x
    this.y = y
    this.cellLength = config.cellLength
    this.gapLength = config.gapLength
    this.centerX = this.x * this.gapLength + (this.x - .5) * this.cellLength
    this.centerY = this.y * this.gapLength + (this.y - .5) * this.cellLength
    this.level = level
    this.status = status // stationary moving initial
    this.mergeStatus = false
    this.scale = 0
    this.time = 0
  }

  changeStatus(status) {
    this.status = status
  }

  changeCoordinate(x, y) {
    this.x = x
    this.y = y
  }

  blockDataRefresh() {
    this.centerX = this.x * this.gapLength + (this.x - .5) * this.cellLength
    this.centerY = this.y * this.gapLength + (this.y - .5) * this.cellLength
    this.changeStatus('stationary')
    this.time = 0
    this.cancelBlocksMergeStatus()
  }

  cancelBlocksMergeStatus() {
    this.mergeStatus = false
  }

  movingDraw(ctx) {
    this.time++

    let targetCenterX = this.x * this.gapLength + (this.x - .5) * this.cellLength,
        targetCenterY = this.y * this.gapLength + (this.y - .5) * this.cellLength

    if (this.centerX === targetCenterX) {
      this.centerY = easeOut(this.time, this.centerY, targetCenterY, 10)
    } else if (this.centerY === targetCenterY) {
      this.centerX = easeOut(this.time, this.centerX, targetCenterX, 10)
    }

    if (this.time === 10) {
      this.changeStatus('stationary')
      this.time = 0
    }
  }

  initialDraw(ctx) {
    let scale = easeOut(this.time, 0, 1, 16)
    scaleByCenter(ctx, this.centerX, this.centerY, scale)
    this.time++

    if (scale >= 1) {
      this.time = 0
      scaleByCenter(ctx, this.centerX, this.centerY, scale)
      this.changeStatus('stationary')
    }
  }

  draw(ctx) {
    ctx.save()
    if (this.status === 'initial') {
      this.initialDraw(ctx)
    }
  
    if (this.status === 'moving') {
      this.movingDraw(ctx)
    }

    ctx.fillStyle = config.blockBgColor[this.level - 1]
      fillRectByCenter(ctx, this.centerX, this.centerY, this.cellLength)

      ctx.font = '700 60px sans-serif'
      ctx.fillStyle = config.blockTextColor[this.level - 1]
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(
        Math.pow(2, this.level) + '',
        this.centerX, this.centerY
      )

    ctx.restore()
  }
}