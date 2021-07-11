function getRandomInt (min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

const rgb = [
  [26, 188, 156],
  [46, 204, 113],
  [52, 152, 219],
  [155, 89, 182],
  [241, 196, 15],
  [230, 126, 34],
  [231, 76, 60]
]

export default class Star {
  constructor (mx, my, ctx, offsetX, offsetY) {
    this.x = mx + getRandomInt(-20, 20) + offsetX
    this.y = my + getRandomInt(-20, 20) + offsetY
    this.size = getRandomInt(4, 10)
    this.rgb = rgb[getRandomInt(0, rgb.length - 1)]
    this.style =
      'rgba(' + this.rgb[0] + ',' + this.rgb[1] + ',' + this.rgb[2] + ',.5)'
    this.spikes = getRandomInt(5, 9)
    this.ctx = ctx
  }
  draw () {
    let rot = (Math.PI / 2) * 3
    let x = this.x
    let y = this.y
    const step = Math.PI / this.spikes

    this.ctx.fillStyle = this.style
    this.ctx.beginPath()
    this.ctx.moveTo(x, y - this.size)
    for (let j = 0; j < this.spikes; j++) {
      x = this.x + Math.cos(rot) * this.size
      y = this.y + Math.sin(rot) * this.size
      this.ctx.lineTo(x, y)
      rot += step

      x = this.x + Math.cos(rot) * (this.size / 2)
      y = this.y + Math.sin(rot) * (this.size / 2)
      this.ctx.lineTo(x, y)
      rot += step
    }
    this.ctx.lineTo(this.x, this.y - this.size)
    this.ctx.closePath()
    this.ctx.fill()
  }
  update () {
    if (this.size > 0) {
      let s = this.size - 0.3
      this.size = s <= 0 ? 0 : s
    }
  }
}
