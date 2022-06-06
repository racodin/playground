import Utils from '../../lib/Utils.js';
import Vector from '../../lib/Vector.js';
import Confetti from './Confetti.js';
import Particle from './Particle.js';

export default class ParticleSystem {
  constructor(location) {
    this.origin = location;
    this.particles = new Array();
    this.confetti = new Array();
  }

  iterator(array) {
    let index = 0;
    return {
      next() {
        if (index < array.length) {
          return { value: array[index++], done: false }; // next 메서드 반환값
        } else {
          return { value: undefined, done: true }; // next 메서드 반환값
        }
      },
      hasNext() {
        return index < array.length;
      },
      remove() {
        array.splice(index, 1);
      },
    };
  }

  addParticle() {
    this.particles.push(new Particle(new Vector(this.origin.x, this.origin.y)));
    // if (Utils.random(0, 1) < 0.5) {
    //   this.particles.push(new Particle(new Vector(this.origin.x, this.origin.y)));
    // } else {
    //   this.particles.push(new Confetti(new Vector(this.origin.x, this.origin.y)));
    // }
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  applyRepeller(repeller) {
    for (let particle of this.particles) {
      let force = repeller.repel(particle);
      particle.applyForce(force);
    }
  }

  run(context) {
    const it = this.iterator(this.particles);
    while (it.hasNext()) {
      const particle = it.next().value;
      particle.run(context);
      if (particle.isDead()) {
        it.remove();
      }
    }
  }
}
