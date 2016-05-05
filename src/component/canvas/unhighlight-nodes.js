/**
 * canvas.unhighlightNodes(query) implement.
 * @module component/canvas/unhighlight-nodes
 * @see module:component/canvas
 * @see module:component/canvas/highlight-nodes
 */

import {
  forIn,
} from 'zero-lang';

export default function highlightNodes() {
  /**
   * unhighlight all nodes.
   * @function
   * @return {object} canvas - canvas context.
   */
  const me = this;
  forIn(me.d3NodeById, (d3Node) => {
    d3Node.classed(me.CLASSNAME.nodeHighlight, false);
  });
  return me;
}
