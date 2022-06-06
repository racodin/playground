/**
 * @class Canvas
 */
export default class Canvas {
  constructor(id) {
    this._canvas = document.createElement('canvas');
    // let i = 0;
    // while (document.getElementById(`defaultCanvas${i}`)) {
    //   i++;
    // }
    // defaultId = `defaultCanvas${i}`;
    // canvas.id = defaultId;
    // canvas.classList.add(defaultClass);
    this._canvas.id = id || 'canvasId';
    // window.ctx = this._canvas.getContext('2d')
    this._context = this._canvas.getContext('2d');
    if (!this._context) {
      throw new Error('Canvas ' + this._canvas + ' is unable to provide a 2D context.');
    }
    document.getElementsByTagName('body')[0].appendChild(this._canvas);
  }

  resize(width, height) {
    this._canvas.width = width;
    this._canvas.height = height;
  }
  clear() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  /**
   * canvas width
   */
  get width() {
    return this._canvas.width;
  }

  set width(value) {
    if (value) {
      this._canvas.width = value;
    }
  }

  /**
   * canvas height
   */
  get height() {
    return this._canvas.height;
  }

  set height(value) {
    if (value) {
      this._canvas.height = value;
    }
  }

  /**
   * canvas id
   */
  get id() {
    return this._canvas.id;
  }

  set id(value) {
    if (value) {
      this._canvas.id = value;
    }
  }

  /**
   * canvas context
   */
  get context() {
    return this._context;
  }

  /**
   * canvas style
   */
  set styles(value) {
    if (value) {
      for (const property in value) {
        this._canvas.style[property] = value[property];
      }
    }
  }

  set bgColor(value) {
    this._canvas.style.backgroundColor = value;
  }
}
