class SceneMain extends Scene {
  constructor() {
    super()

    this.score = new Score()
    this.box = new Box()
    this.box.init()
    this.currentMoveDirect = null;
  }

  eventChange() {
    document.addEventListener('keyup', (e) => {
      switch(e.keyCode) {
        case 37: //left
        this.box.blocks.active = false
        this.box.blocks.blocksDataRefresh()
        this.box.blocks.moveLeft()
        if (this.box.blocks.detectGameEnd()) {
          alert('game over')
        }
        if (this.box.blocks.active) {
          if (this.score.score <= 24) {
            this.box.blocks.initBlocks(1)
          } else {
            this.box.blocks.initBlocks(1, [1, 3])
          } 
        }
        break
        case 38: //up
        this.box.blocks.active = false
        this.box.blocks.blocksDataRefresh()
        this.box.blocks.moveUp()
        if (this.box.blocks.detectGameEnd()) {
          alert('game over')
        }
        if (this.box.blocks.active) {
          if (this.score.score <= 24) {
            this.box.blocks.initBlocks(1)
          } else {
            this.box.blocks.initBlocks(1, [1, 3])
          }
        }
        break
        case 39: //right
        this.box.blocks.active = false
        this.box.blocks.blocksDataRefresh()
        this.box.blocks.moveRight()
        if (this.box.blocks.detectGameEnd()) {
          alert('game over')
        }
        if (this.box.blocks.active) {
          if (this.score.score <= 24) {
            this.box.blocks.initBlocks(1)
          } else {
            this.box.blocks.initBlocks(1, [1, 3])
          }
        }
        break
        case 40: //down
        this.box.blocks.active = false
        this.box.blocks.blocksDataRefresh()
        this.box.blocks.moveDown()
        if (this.box.blocks.detectGameEnd()) {
          alert('game over')
        }
        if (this.box.blocks.active) {
          if (this.score.score <= 24) {
            this.box.blocks.initBlocks(1)
          } else {
            this.box.blocks.initBlocks(1, [1, 3])
          }
        }
        break
      }
    }, false)
  }

  init() {
    this.eventChange()
    this.initStatus = true
  }

  update() {
    this.score.changeScore(this.box.blocks.score)
  }

  draw(ctx) {
    this.box.draw(ctx)
    this.score.draw(ctx)
  }
}