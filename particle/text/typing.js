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
let particlesArray = []
let particlesLength = null
let adjustX = 10
let adjustY = 0

const particle = {
  size: 2,
  space: {
    width: 15,
    height: 15
  },
  distance: 30
}

let textCoordinates
let textArray = []

function moveTo (event) {
  mouse.x = event.x
  mouse.y = event.y
}

function guideText () {
  stage.ctx.fillStyle = 'white'
  stage.ctx.font = '12px Verdana'
  for (let i = 0; i < textArray.length; i++) {
    stage.ctx.fillText(textArray[i], 0, (i + 1) * 12)
  }
  // stage.ctx.fillText('HELLO', 0, 12)
  // stage.ctx.fillText('WORLD', 0, 24)

  // stage.ctx.rect(0, 0, 80, 40);
  // stage.ctx.lineWidth = 1;
  // stage.ctx.strokeStyle = 'white'
  // stage.ctx.stroke()
}

function drawText () {
  particlesArray = [] 
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
        let positionX = x + adjustX
        let positionY = y + adjustY
        
        particlesArray.push(new Particle({
          x: positionX * particle.space.width,
          y: positionY * particle.space.height,
          size: particle.size
        }))
        // console.log(particlesArray)
      }
    }
  }
  particlesLength = particlesArray.length
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(stage.ctx, mouse)
  }
}

function connect () {
  for (let a = 0; a < particlesLength; a++) {
    for (let b = a; b < particlesLength; b++) {

      let dx = particlesArray[a].x - particlesArray[b].x
      let dy = particlesArray[a].y - particlesArray[b].y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < particle.distance) {
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
  guideText()
  requestAnimationFrame(animate)
}

function init () {
  addEvent()
  
  // animate()
}

init()

addEventListener('click', function(){
  // stage.clear()
})

const msg = document.getElementById('msg')
msg.addEventListener('keyup', enterkey)
function enterkey () {
  if (window.event.keyCode == 13) {
    stage.clear()
    if (textArray.length >= 2) textArray.splice(0 , 1)
    textArray.push(msg.value)
    guideText()
    textCoordinates = stage.ctx.getImageData(0,0,stage.canvas.width,stage.canvas.height)
    drawText()
    connect()
    msg.value = ''
  }
}