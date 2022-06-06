import Utils from '../../lib/Utils.js';
import Vector from '../../lib/Vector.js';

export default class Repeller {
  constructor(x, y) {
    this.location = new Vector(x, y);
    this.strength = 100;
    this.radius = 20;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = 'rgba(175,175,175,1)';
    ctx.fill();
  }

  repel(particle) {
    let dir = Vector.sub(this.location, particle.location);
    let d = dir.mag();
    dir.normalize();
    d = Utils.constrain(d, 5, 100);
    let force = (-1 * this.strength) / (d * d);
    dir.mult(force);
    return dir;
  }
}
