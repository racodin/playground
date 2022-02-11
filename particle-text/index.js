import Stage from "./Stage.js"
import Particle from "./Particle.js"

const mouse = {
  x: undefined,
  y: undefined,
  radius: 200
}

const stage = new Stage({
  styles: {
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0'
  }
})
const particlesArray = []
let particlesLength = null
let adjustX = 5
let adjustY = 15

function moveTo (event) {
  mouse.x = event.x
  mouse.y = event.y
}

stage.ctx.fillStyle = 'white'
stage.ctx.font = '20px Verdana'
stage.ctx.fillText('TEXT', 0, 15)
const textCoordinates = stage.ctx.getImageData(0,0,100,20)

function connect () {
  for (let a = 0; a < particlesLength; a++) {
    for (let b = a; b < particlesLength; b++) {

      let dx = particlesArray[a].x - particlesArray[b].x
      let dy = particlesArray[a].y - particlesArray[b].y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 50) {
        stage.ctx.strokeStyle = 'rgba(255,255,255,0.3)'
        stage.ctx.lineWidth = 1
        stage.ctx.beginPath()
        stage.ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
        stage.ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
        stage.ctx.closePath()
        stage.ctx.stroke()
      }
    }
  }
}

function addEvent(){
  window.addEventListener('mousemove', moveTo)
}

function animate () {
  stage.clear()
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(stage.ctx, mouse)
  }
  connect()
  requestAnimationFrame(animate)
}

function init () {
  addEvent()
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
        let positionX = x + adjustX
        let positionY = y + adjustY
        particlesArray.push(new Particle({
          x: positionX * 20,
          y: positionY * 20,
          size: 3
        }))
      }
    }
  }
  particlesLength = particlesArray.length
  animate()
}

init()