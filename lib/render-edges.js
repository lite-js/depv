const transform = require('./transform2d');

module.exports = function renderEdges(edges2draw = [], ctx, m, opacity = 0.45) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  // setMatrixOnCtx(ctx, m);
  // const scale = m[0];
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  edges2draw.forEach((edge) => {
    const sourcePoint = transform.applyPoint(edge.source, m);
    const targetPoint = transform.applyPoint(edge.target, m);
    ctx.beginPath();
    ctx.moveTo(sourcePoint.x, sourcePoint.y);
    ctx.lineTo(targetPoint.x, targetPoint.y);
    ctx.stroke();
  });
};
