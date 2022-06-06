import Utils from './Utils.js';

/**
 * @class Particle
 */
export default class Particle {
  /**
   * @constructor
   * @param {Number} x
   * @param {Number} y
   */
  // constructor (x, y) {
  //   this.position = new Vector(x, y)
  //   this.velocity = Vector.random2D()
  //   this.velocity.mult(Math.random() * 2 + 0.5);
  //   this.accelerator = new Vector(0, 0)
  //   this.radius = 4
  //   this.lifetime = 255
  // }

  constructor() {
    const arg = arguments[0];
    this.position = arg.position;
    this.velocity = arg.velocity;
    this.velocity.mult(Math.random() * 2 + 0.5);
    this.accelerator = arg.accelerator;
    this.radius = arg.radius || 5;

    this.fade = arg.fade || false;
    this.color = arg.color ? (arg.color[0] === '#' ? arg.color : Utils.colorNameToHex(arg.color)) : '#ffffff';
    this.rgb = this.fade && Utils.hexToRgb(this.color);

    this.lifetime = arg.lifetime || 255;
    this._lifetime = this.lifetime;
  }

  done() {
    return this.lifetime < 0;
  }

  apply(force) {
    this.accelerator.add(force);
  }

  boundary(width, height) {
    if (this.position.y >= height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }

    if (this.position.x >= width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x <= this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
  }

  update() {
    this.velocity.add(this.accelerator);
    this.position.add(this.velocity);
    this.accelerator.set(0, 0);
    this.lifetime -= 5;
  }

  draw(context) {
    if (context === undefined) return console.warn('Cannot find context');
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.fade ? 'rgba(' + this.rgb + ',' + this.lifetime / this._lifetime + ')' : this.color;
    context.fill();
    // context.strokeStyle = 'rgba(255,255,255,' + this.lifetime / 255 + ')'
    // context.stroke();
  }
}
