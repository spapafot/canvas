class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.zoom = 1;
    this.offset = new Point(0, 0);
    this.drag = {
      start: new Point(0, 0),
      start: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };
    this.#addEventListeners();
  }

  getMouse(e) {
    return new Point(e.offsetX * this.zoom, e.offsetY * this.zoom);
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

  #mouseDownHandler(e) {}

  #mouseMoveHandler(e) {}

  #mouseUpHandler(e) {}
}
