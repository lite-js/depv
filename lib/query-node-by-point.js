const distance = require('./distance');

module.exports = function queryNodeByPoint(nodes, point, scale, callback) {
  for (let i = nodes.length - 1; i >= 0; i -= 1) {
    const node = nodes[i];
    const d = distance(node, point);
    if (d <= node.radius / scale) {
      callback(node);
      break;
    }
  }
};
