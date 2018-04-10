
module.exports = (ctx, bbox) => {
  ctx.save();
  ctx.setLineDash([12]);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
  ctx.restore();
};
