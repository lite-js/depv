const d3 = require('d3');
const transform = require('./transform2d');

const labelSize = 24;

// draw points
module.exports = function renderNodes(nodes2draw = [], ctx, m, opacity = 0.9, withLabel) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  // setMatrixOnCtx(ctx, m);
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  const offset = labelSize / 2;
  nodes2draw.forEach((node, index) => {
    const { radius } = node;
    const { x, y } = transform.applyPoint(node, m);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    // ctx.fillStyle = colorByType(node.id);
    ctx.fillStyle = d3.schemeCategory10[index % 10];
    ctx.fill();
    ctx.stroke();
    if (withLabel) {
      const label = node.id;
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.font = `${labelSize}px serif`;
      const text = ctx.measureText(label);
      ctx.fillStyle = 'white';
      ctx.fillRect(x + radius, y - offset, text.width + offset * 2, offset * 2);
      ctx.strokeStyle = '#222';
      ctx.strokeRect(x + radius, y - offset, text.width + offset * 2, offset * 2);
      ctx.fillStyle = '#222';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + radius + offset, y);
      ctx.restore();
    }
  });
};
