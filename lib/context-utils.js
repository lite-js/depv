module.exports = {
  clear(ctx, bbox) {
    ctx.resetTransform();
    ctx.clearRect(bbox.x, bbox.y, bbox.width, bbox.height);
  },
  setMatrix(ctx, m) {
    ctx.setTransform(m[0], m[3], m[1], m[4], m[2], m[5]);
  },
};
