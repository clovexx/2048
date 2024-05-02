let __main = function () {
  if(detectMob()){
    config.canvasWidth = window.innerWidth
    config.canvasHeight = window.innerHeight
  }

  let scene = new SceneMain()
  let game = Game.instance(scene)
  game.__start()
}

__main()