/**
 * canvas.queryNodes(query, fuzzy) implement.
 * @module component/canvas/query-nodes
 * @see module:component/canvas
 * @see module:component/canvas/query-d3-nodes
 */

import {
  forIn,
  isString,
} from 'zero-lang';

export default function queryNodes(query, fuzzy) {
  /**
   * query nodes.
   * @function
   * @param {string} query - query.
   * @param {boolean} fuzzy - should query be fuzzy.
   * @return {array} nodes - nodes.
   */
  const me = this;
  const nodes = [];
  if (query && isString(query)) {
    forIn(me.nodeById, (node, id) => {
      if (fuzzy) {
        if (id.indexOf(query) > -1) {
          nodes.push(node);
        }
      } else {
        if (id === query) {
          nodes.push(node);
        }
      }
    });
  }
  return nodes;
}
