import Canvas from '../../lib/Canvas.js';
import Vector from '../../lib/Vector.js';
import ParticleSystem from './ParticleSystem.js';
import Repeller from './Repeller.js';

let canvas;
let particleSystem = [];
let repeller;
let gravity = new Vector(0, 0.1);

function init() {
  canvas = new Canvas();
  canvas.resize(window.innerWidth, window.innerHeight);
  repeller = new Repeller(canvas.width / 2 - 30, canvas.height / 2);
  loop();
  addEventListener('click', mousePressed);
}

function mousePressed(e) {
  particleSystem.push(new ParticleSystem({ x: e.clientX, y: e.clientY }));
}

function loop() {
  canvas.clear();

  repeller.draw(canvas.context);

  for (let ps of particleSystem) {
    ps.addParticle();
    ps.applyForce(gravity);
    ps.applyRepeller(repeller);
    ps.run(canvas.context);
  }
  requestAnimationFrame(loop);
}

init();
