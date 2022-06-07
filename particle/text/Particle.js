export default class Particle {
  constructor ({x, y, size}) {
    this.x = x
    this.y = y
    this.originX = this.x
    this.originY = this.y
    this.size = size
    this.density = Math.random() * 40 + 5
  }

  draw (ctx) {
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  update (ctx, mouse) {
    this.draw(ctx)
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    let forceDirectionX = dx / distance
    let forceDirectionY = dy / distance
    let maxDistance = mouse.radius
    let force = (maxDistance - distance) / maxDistance
    let directionX = forceDirectionX * force * this.density
    let directionY = forceDirectionY * force * this.density

    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.originX) {
        let dx = this.x - this.originX
        this.x -= dx / 5
      }
      if (this.y !== this.originY) {
        let dy = this.y - this.originY
        this.y -= dy / 5
      }
    }
  }
}