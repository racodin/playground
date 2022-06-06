import Utils from '../../lib/Utils.js';
import Vector from '../../lib/Vector.js';

export default class Particle {
  constructor(location) {
    this.location = location;
    // this.acceleration = new Vector(0, 0.05);
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(Utils.random(-1, 1), Utils.random(-2, 0));
    this.lifetime = 255;
    this.size = 5;
    this.mass = 1;
  }

  run(ctx) {
    this.update();
    this.draw(ctx);
  }

  applyForce(force) {
    // const f = force.clone();
    this.acceleration.add(force.div(this.mass));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.lifetime -= 2.0;
  }

  draw(ctx) {
    let alpha = this.lifetime / 180;
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.size, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,' + alpha + ')';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = 'rgba(175,175,175,' + alpha + ')';
    ctx.fill();
  }

  isDead() {
    return this.lifetime < 0;
  }
}
