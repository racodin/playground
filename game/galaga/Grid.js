import Enemy from "./Enemy.js"

export default class Grid {
	constructor () {
		this.position = {
			x: 0,
			y: 0
		}

    this.velocity = {
			x: 3,
			y: 0
		}

    this.enemies = []

    const column = Math.floor(Math.random() * 6 + 4)
    const rows = Math.floor(Math.random() * 4 + 2)

    this.enemy = {
      width: 38,
      height: 28
    }
    this.width = column * this.enemy.width

    for (let x = 0; x < column; x++) {
      for (let y = 0; y < rows; y++) {
        this.enemies.push(
          new Enemy({
            position: {
              x: x * this.enemy.width,
              y: y * this.enemy.height
            }
          })
        )
      }
    }
  }

  update () {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.y = 0
    if (
      this.position.x + this.width >= canvas.width ||
      this.position.x <= 0
    ) {
      this.velocity.x = -this.velocity.x
      this.velocity.y = this.enemy.height
    }
  }
}