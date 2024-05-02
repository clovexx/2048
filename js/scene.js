class Scene {
  constructor(imgs) {
    this.imgs = imgs
    this.redirect = false
    this.afterScene = null
    this.initStatus = false
  }

  drawThing(ctx, thing) {
    if (Array.isArray(thing)) {
      for (let e of thing) {
          ctx.drawImage(e.img, e.x, e.y)
      }
      return
    }
    ctx.drawImage(thing.img, thing.x, thing.y, thing.w / config.imgsRatio, thing.h / config.imgsRatio)
  }

  drawImage(ctx, img, x = 0, y = 0, w, h) {
    w = w || img.width / config.imgsRatio
    h = h || img.height / config.imgsRatio
    if (Array.isArray(img)) {
      for (let e of img) {
          ctx.drawImage(e, x, y, w, h)
      }
      return
    }
    ctx.drawImage(img, x, y, w, h)
  }

  init() {

  }
  
  update() {
    
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }
}