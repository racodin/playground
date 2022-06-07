export default class Stage {
  constructor ({styles} = {}) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.styles = styles
    this.create()
  }

  create () {
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(this.canvas);
    for (const prop in this.styles) this.canvas.style[prop] = this.styles[prop]
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
  }

  resize () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}