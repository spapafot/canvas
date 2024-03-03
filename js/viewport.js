class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.zoom = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);
    this.drag = {
      start: new Point(0, 0),
      start: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };
    this.#addEventListeners();
  }

  reset() {
    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1 / this.zoom, 1 / this.zoom);
    const offset = this.getOffset();
    this.ctx.translate(offset.x, offset.y);
  }

  getMouse(e, subtractOffset = false) {
    const p = new Point(
      (e.offsetX - this.center.x) * this.zoom - this.offset.x,
      (e.offsetY - this.center.y) * this.zoom - this.offset.y
    );

    return subtractOffset ? subtract(p, this.drag.offset) : p;
  }

  getOffset(e) {
    return add(this.offset, this.drag.offset);
  }

  #addEventListeners() {
    this.canvas.addEventListener(
      "mousewheel",
      this.#mouseWheelHandler.bind(this)
    );
    this.canvas.addEventListener(
      "mousedown",
      this.#mouseDownHandler.bind(this)
    );
    this.canvas.addEventListener(
      "mousemove",
      this.#mouseMoveHandler.bind(this)
    );
    this.canvas.addEventListener("mouseup", this.#mouseUpHandler.bind(this));
  }

  #mouseWheelHandler(e) {
    const direction = Math.sign(e.deltaY);
    const step = 0.1;
    this.zoom += direction * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }

  #mouseDownHandler(e) {
    if (e.button == 1) {
      this.drag.start = this.getMouse(e);
      this.drag.active = true;
    }
  }

  #mouseMoveHandler(e) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(e);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #mouseUpHandler(e) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        start: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }
}
