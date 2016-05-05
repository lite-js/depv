/**
 * canvas.addEdges(edges) implement.
 * @module component/canvas/add-edges
 * @see module:component/canvas
 * @see module:component/canvas/add-nodes
 */

import {
  each,
} from 'zero-lang';

export default function addEdges(edges) {
  /**
   * add edges to canvas.
   * @function
   * @param {array} edges - edges.
   * @return {object} canvas - canvas context.
   */
  const me = this;
  const graph = me.graph;

  each(edges, (edge) => {
    if (graph.hasNode(edge.source) && graph.hasNode(edge.target)) {
      if (!graph.hasEdge(edge.id)) {
        graph.setEdge(edge.source, edge.target, edge);
      }
    }
  });
  return me;
}
