const domUtils = {
  getCanvasPointByMouseEvent(canvas, e) {
    return {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop,
    };
  },
};

module.exports = domUtils;
