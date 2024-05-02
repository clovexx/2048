class Game {
  constructor(scene) {
    this.canvas = config.canvas
    this.context = this.canvas.getContext('2d')
    this.currentScene = scene

    this.canvas.width = config.canvasWidth
    this.canvas.height = config.canvasHeight
  }

  static instance (...args) {
    this.i = this.i || new this(...args)
    return this.i
  }

  replaceScene(scene) {
    this.currentScene = scene
  }

  __start() {
    requestAnimationFrame(() => {
      this.currentScene.initStatus || this.currentScene.init()
      this.currentScene.update()
      this.currentScene.draw(this.context)
      if (this.currentScene.redirect) {
        this.replaceScene(this.currentScene.afterScene)
      }
      this.__start()
    })
  }
}