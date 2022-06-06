import Canvas from '../../lib/Canvas.js';
import Vector from '../../lib/Vector.js';
import Particle from '../../lib/Particle.js';

const canvas = new Canvas('canvasIdName');
const particles = [];
const wind = new Vector(0.1, 0);
const gravity = new Vector(0, 0.2);
window.state = {
  radius: 5,
  life: 255,
  color: '#ffffff',
  fade: true,
  wind: false,
  gravity: false,
};
window.isWind = false;
window.isGravity = false;

function init() {
  canvas.bgColor = 'black';
  addEventListener('resize', resize);
  // addEventListener('click', function () {
  //   isGravity = !isGravity
  // })
  resize();
  loop();
}

function resize() {
  canvas.resize(window.innerWidth, window.innerHeight);
}

function loop() {
  canvas.clear();

  for (let i = 0; i < 3; i++) {
    particles.push(
      new Particle({
        position: new Vector(canvas.width / 2, canvas.height / 2),
        velocity: Vector.random2D(),
        accelerator: new Vector(0, 0),
        color: state.color,
        fade: state.fade,
        radius: state.radius,
        lifetime: state.life,
      })
    );
  }

  for (let particle of particles) {
    if (state.gravity) particle.apply(gravity);
    if (state.wind) particle.apply(wind);
    particle.update();
    particle.draw(canvas.context);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(loop);
}

init();
