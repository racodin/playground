import Stage from "./Stage.js"
import Particle from "./Particle.js"

const mouse = {
  x: undefined,
  y: undefined
}
const config = {
  particle: {
    remove: 2
  },
  line: {
    distance: 100,
    width: 0.5
  },
  hue: {
    step: 2
  }
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
let hue = 0


function addParticle(event) {
  mouse.x = event.x
  mouse.y = event.y
  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle({
      x: mouse.x,
      y: mouse.y,
      dx: Math.random() * 8 - 4,
      dy: Math.random() * 8 - 4,
      size: Math.random() * 8 + 4,
      color: 'hsl(' + hue + ', 100%, 50%, 1)'
    }))
  }
}

function connectLine(current) {
  for (let j = current; j < particlesArray.length; j++) {
    const dx = particlesArray[current].x - particlesArray[j].x
    const dy = particlesArray[current].y - particlesArray[j].y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < config.line.distance) {
      stage.ctx.beginPath()
      stage.ctx.strokeStyle = particlesArray[current].color
      stage.ctx.lineWidth = config.line.width
      stage.ctx.moveTo(particlesArray[current].x, particlesArray[current].y)
      stage.ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
      stage.ctx.stroke()
      stage.ctx.closePath()
    }
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(stage.ctx)
    connectLine(i)
    if (particlesArray[i].size <= config.particle.remove) {
      particlesArray.splice(i, 1)
      i--
    }
  }
}

function addEvent() {
  window.addEventListener('mousedown', () => {
    window.addEventListener('mousemove', addParticle)
  })
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', addParticle)
  })
}

function animate() {
  stage.clear()
  hue += config.hue.step
  handleParticles()
  requestAnimationFrame(animate)
}

function init() {
  addEvent()
  animate()
}

init()
