import { Controller } from 'stimulus'
import Star from '../lib/star'

export default class extends Controller {
  initialize () {
    this.ctx = this.element.getContext('2d')
    this.stars = []
    this.mouse = {
      x: undefined,
      y: undefined,
      px: 0,
      py: 0
    }
    this.resizeReset()
    this.animationLoop()
  }

  connect () {
    window.addEventListener('resize', this.resizeReset)
    document.addEventListener('being:moved', this.move)
  }

  disconnect () {
    window.removeEventListener('resize', this.resizeReset)
    document.removeEventListener('being:moved', this.move)
  }

  resizeReset = () => {
    this.w = this.element.width = window.innerWidth
    this.h = this.element.height = window.innerHeight
  }

  animationLoop = () => {
    this.ctx.clearRect(0, 0, this.w, this.h)
    if (
      this.mouse.x !== undefined &&
      this.mouse.y !== undefined &&
      this.mouse.x !== this.mouse.px &&
      this.mouse.y !== this.mouse.py
    ) {
      const offsetX = this.mouse.px < this.mouse.x ? 0 : 30
      const offsetY = this.mouse.py < this.mouse.y ? 0 : 30
      this.mouse.px = this.mouse.x
      this.mouse.py = this.mouse.y
      this.stars.push(
        new Star(this.mouse.x, this.mouse.y, this.ctx, offsetX, offsetY)
      )
    }
    if (this.stars.length > 200) {
      this.stars = this.stars.slice(1)
    }
    this.paint()
    requestAnimationFrame(this.animationLoop)
  }

  paint = () => {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].update()
      this.stars[i].draw()
    }
  }

  move = e => {
    this.mouse.x = e.detail.x
    this.mouse.y = e.detail.y
  }
}
