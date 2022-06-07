export default class Particle {
  constructor ({x, y, dx, dy, size, color}) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.size = size
    this.color = color
  }

  draw () {
    this.x += this.dx
    this.y += this.dy
    if (this.size > 0.1) {
      this.size -= 0.1
    }
  }

  update (ctx) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    this.draw()
  }
}