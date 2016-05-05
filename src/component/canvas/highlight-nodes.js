/**
 * canvas.highlightNodes(query) implement.
 * @module component/canvas/highlight-nodes
 * @see module:component/canvas
 * @see module:component/canvas/unhighlight-nodes
 */

import {
  each,
} from 'zero-lang';

export default function highlightNodes(query) {
  /**
   * highlight nodes.
   * @function
   * @param {string} query - query to filter which nodes to highlight.
   * @return {object} canvas - canvas context.
   */
  const me = this;
  const d3Nodes = me.queryD3Nodes(query, true);
  each(d3Nodes, (d3Node) => {
    d3Node.classed(me.CLASSNAME.nodeHighlight, true);
  });
  return me;
}
