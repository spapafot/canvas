class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.selected = null;
    this.hovered = null;
    this.ctx = this.canvas.getContext("2d");
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      if (e.button == 2) {
        if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }

      if (e.button == 0) {
        const mouse = new Point(e.offsetX, e.offsetY);

        if (this.hovered) {
          this.selected = this.hovered;
          return;
        }
        this.graph.addPoint(mouse);
        this.selected;
      }
    });
    this.canvas.addEventListener("mousemove", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points, 10);
    });

    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    this.selected = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
