export default class Player {
	constructor () {
		this.velocity = {
			x: 0,
			y: 0
		}

    this.opacity = 1

		const image = new Image()
		image.src = './images/spaceship.png'
		image.onload = () => {
			const scale = 0.3
			this.image = image
			this.width = image.width * scale
			this.height = image.height * scale
			this.position = {
				x: canvas.width / 2 - this.width / 2,
				y: canvas.height - this.height - 15
			}
		}
	}

	draw () {
    ctx.save()
    ctx.globalAlpha = this.opacity
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    ctx.restore()
	}

	update () {
		if (this.image) {
			this.draw()
			this.position.x += this.velocity.x
		}
	}
}
