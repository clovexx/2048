class Animation {
  constructor(imgsPath) {
    //imgsPath is Array
    this.imgsPath = imgsPath
    this.imgsObj = this.imgsChange()
    this.currentImgIndex = 0
    this.currentImgObj = this.imgsObj[this.currentImgIndex]
    this.switchSpeed = 4
  }

  imgsChange() {
    return this.imgsPath.map(function(e) {
      return ImgsLoader.imgByUrl(e)
    }, this)
  }

  update() {
    if (this.switchSpeed == 0) {
      this.currentImgIndex = (this.currentImgIndex + 1) % this.imgsObj.length
      this.currentImgObj = this.imgsObj[this.currentImgIndex]
      this.switchSpeed = 4
    }
    this.switchSpeed --
  }

  draw(ctx, x = 0, y = 0, w = this.imgsObj[0].width / config.imgsRatio, h = this.imgsObj[0].height / config.imgsRatio) {
    ctx.drawImage(this.currentImgObj, x, y, w, h)
    this.update()
  }
}