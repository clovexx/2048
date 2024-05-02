class Score {
  constructor() {
    this.score = 0
  }

  clearScore() {
    this.score = 0
  }

  addScore(number) {
    this.score += number
  }

  changeScore(number) {
    this.score = number
  }

  draw(ctx) {
    ctx.fillStyle = config.blockBgColor[0]
    fillRectByCenter(ctx, 600, 40, 200, 80)

    ctx.font = '700 40px sans-serif'
    ctx.fillStyle = config.blockTextColor[0]
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      this.score + '',
      600, 40
    )
  }
}