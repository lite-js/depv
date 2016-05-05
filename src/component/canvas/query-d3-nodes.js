/**
 * canvas.queryD3Nodes(query, fuzzy) implement.
 * @module component/canvas/query-d3-nodes
 * @see module:component/canvas
 * @see module:component/canvas/query-nodes
 */

import {
  each,
} from 'zero-lang';

export default function queryD3Nodes(query, fuzzy) {
  /**
   * query d3 nodes.
   * @function
   * @param {string} query - query.
   * @param {boolean} fuzzy - should query be fuzzy.
   * @return {array} d3Nodes - d3 nodes.
   */
  const me = this;
  const nodes = me.queryNodes(query, fuzzy);
  const d3Nodes = [];
  each(nodes, (node) => {
    d3Nodes.push(me.d3NodeById[node.id]);
  });
  return d3Nodes;
}
