module.exports = {
  clear(ctx, bbox) {
    ctx.resetTransform();
    ctx.clearRect(bbox.x, bbox.y, bbox.width, bbox.height);
  },


};
