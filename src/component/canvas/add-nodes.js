/**
 * canvas.addNodes(nodes) implement.
 * @module component/canvas/add-nodes
 * @see module:component/canvas
 * @see module:component/canvas/add-nodes
 */

import {
  each,
} from 'zero-lang';

export default function addNodes(nodes) {
  /**
   * add nodes to canvas.
   * @function
   * @param {array} nodes - nodes.
   * @return {object} canvas - canvas context.
   */
  const me = this;
  const graph = me.graph;

  each(nodes, (node) => {
    if (node.id && !graph.hasNode(node.id)) {
      graph.setNode(node.id, node);
    }
  });
  return me;
}
