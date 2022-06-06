import Utils from '../../lib/Utils.js';
import Particle from './Particle.js';

export default class Confetti extends Particle {
  constructor(location) {
    super(location);
    this.size = 10;
  }

  draw(ctx) {
    let theta = Utils.map(this.location.x, 0, 1278, 0, Math.PI * 2 * 2);
    let alpha = this.lifetime / 180;

    const halfSize = this.size / 2;
    ctx.translate(halfSize + this.location.x, halfSize + this.location.y);
    ctx.rotate(theta);

    ctx.fillStyle = 'rgba(175,175,175,' + alpha + ')';
    // ctx.fillRect(this.location.x, this.location.y, this.size, this.size);
    ctx.fillRect(-halfSize, -halfSize, this.size, this.size);
    ctx.strokeStyle = 'rgba(0,0,0,' + alpha + ')';
    ctx.lineWidth = 2;
    ctx.strokeRect(-halfSize, -halfSize, this.size, this.size);

    ctx.rotate(-theta);
    ctx.translate(-halfSize - this.location.x, -halfSize - this.location.y);
  }
}
