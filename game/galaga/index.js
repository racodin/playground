import Player from './Player.js'
import PlayerMissile from './PlayerMissile.js'
import Grid from './Grid.js'
import Particle from './Particle.js'

const scoreEl = document.querySelector('.scoreNum')
window.canvas = document.querySelector('canvas')
window.ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


const player = new Player()
const playerMissiles = []
const grids = []
window.enemyMissiles = []
const particles = []

const CONFIG = {
	SPEED: 5
}

const KEYS = {
	A: {
		pressed: false
	}, 
	D: {
		pressed: false
	}, 
	SPACE: {
		pressed: false
	}
}

let frames = 0
let randomInterval = Math.floor((Math.random() * 500) + 500)
let game = {
	over: false,
	active: true
}
let score = 0

for (let i = 0; i < 100; i++) {
	particles.push(new Particle({
		position: {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height
		},
		velocity: {
			x: 0,
			y: 0.4
		},
		radius: Math.random() * 3,
		color: 'white'
	}))
}

function createParticle ({object, color, fades}) {
	for (let i = 0; i < 15; i++) {
		particles.push(new Particle({
			position: {
				x: object.position.x + object.width / 2,
				y: object.position.y + object.height / 2
			},
			velocity: {
				x: (Math.random() - 0.5) * 10,
				y: (Math.random() - 0.5) * 10
			},
			radius: Math.random() * 3,
			color: color || 'orange',
			fades
		}))
	}
}

function animate () {
	if (!game.active) return
	requestAnimationFrame(animate)
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	player.update()

	particles.forEach((particle, particleIndex) => {

		if (particle.position.y - particle.radius >= canvas.height) {
			particle.position.x = Math.random() * canvas.width
			particle.position.y = -particle.radius
		}

		if (particle.opacity <= 0) {
			setTimeout(() => {
				particles.splice(particleIndex, 1)
			}, 0)
		} else {
			particle.update()
		}
	})

	enemyMissiles.forEach((enemyMissile, enemyMissileIndex) => {
		if (enemyMissile.position.y + enemyMissile.height >= canvas.height) {
			setTimeout(() => {
				enemyMissiles.splice(enemyMissileIndex, 1)
			}, 0)
		} else {
			enemyMissile.update()
		}

		if (
			enemyMissile.position.y + enemyMissile.height >= player.position.y &&
			enemyMissile.position.x + enemyMissile.width >= player.position.x &&
			enemyMissile.position.x <= player.position.x + player.width
		) {
			console.log('you lose')
			setTimeout(() => {
				enemyMissiles.splice(enemyMissileIndex, 1)
				player.opacity = 0
				game.over = true
			}, 0)

			setTimeout(() => {
				game.active = false
			}, 2000)
			
			createParticle({
				object: player,
				color: 'white',
				fades: true
			})
		}
	})

	// console.log(enemyMissiles)

	playerMissiles.forEach((missile, missileIndex) => {
		if (missile.position.y + missile.radius <= 0) {
			playerMissiles.splice(missileIndex, 1)
		} else {
			missile.update()
		}
	})

	grids.forEach((grid, gridIndex) => {
		grid.update()

		if (frames % 100 === 0 && grid.enemies.length > 0) {
			grid.enemies[Math.floor(Math.random() * grid.enemies.length)].shoot(enemyMissiles)
		}

		grid.enemies.forEach((enemy, enemyIndex) => {
			enemy.update({velocity: grid.velocity})

			playerMissiles.forEach((missile, missileIndex) => {
				if (
					missile.position.y - missile.radius <= enemy.position.y + enemy.height &&
					missile.position.y + missile.radius >= enemy.position.y &&
					missile.position.x - missile.radius <= enemy.position.x + enemy.width &&
					missile.position.x + missile.radius >= enemy.position.x
				) {
				
					setTimeout(() => {
						const enemyFound = grid.enemies.find(enemy2 => enemy2 === enemy)
						const missileFound = playerMissiles.find(missile2 => missile2 === missile)

						if (enemyFound && missileFound) {
							score += 100
							scoreEl.innerHTML = score

							createParticle({
								object: enemy,
								fades: true
							})

							grid.enemies.splice(enemyIndex, 1)
							playerMissiles.splice(missileIndex, 1)
							
							if (grid.enemies.length > 0){
								const firstEnemy = grid.enemies[0]
								const lastEnemy = grid.enemies[grid.enemies.length - 1]

								grid.width = lastEnemy.position.x - firstEnemy.position.x + lastEnemy.width
								grid.position.x = firstEnemy.position.x
							} else {
								grids.splice(gridIndex, 1)
							}
						}
					}, 0)
				}
			})
		})
	})
	
	if (KEYS.A.pressed && player.position.x >= CONFIG.SPEED) {
		player.velocity.x = -CONFIG.SPEED
	} else if (KEYS.D.pressed && player.position.x + player.width + CONFIG.SPEED <= canvas.width) {
		player.velocity.x = CONFIG.SPEED
	} else {
		player.velocity.x = 0
	}

	if (frames % randomInterval === 0) {
		grids.push(new Grid())
		randomInterval = Math.floor((Math.random() * 1000) + 500)
	}

	frames++
}

function addEvent () {
	addEventListener('keydown', ({key}) => {
		if (game.over) return
		switch (key) {
			case 'a':
				console.log('left')
				KEYS.A.pressed = true
				break
			case 'ArrowLeft':
				console.log('left')
				KEYS.A.pressed = true
				break
			case 'd':
				console.log('right')
				KEYS.D.pressed = true
				break
			case 'ArrowRight':
				console.log('right')
				KEYS.D.pressed = true
				break
			case ' ':
				console.log('fire')
				playerMissiles.push(new PlayerMissile({
					position: {
						x: player.position.x + player.width / 2,
						y: player.position.y
					},
					velocity: {
						x: 0,
						y: -10
					}
				}))
				console.log(playerMissiles)
				break
		}
	})

	addEventListener('keyup', ({key}) => {
		if (game.over) return
		switch (key) {
			case 'a':
				console.log('left')
				KEYS.A.pressed = false
				break
			case 'ArrowLeft':
				console.log('left')
				KEYS.A.pressed = false
				break
			case 'd':
				console.log('right')
				KEYS.D.pressed = false
				break
			case 'ArrowRight':
				console.log('right')
				KEYS.D.pressed = false
				break
			case ' ':
				console.log('fire')
				KEYS.SPACE.pressed = false
				break
		}
	})
}

function init () {
	addEvent()
	animate()
}

init ()