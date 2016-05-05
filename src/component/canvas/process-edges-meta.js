/**
 * canvas.processEdges(edges) implement.
 * @module component/canvas/process-edges-meta
 * @see module:component/canvas
 * @see module:component/canvas/process-nodes-meta
 */

import {
  each,
  extend,
} from 'zero-lang';

export default function preprocessEdges(edges) {
  /**
   * pre-processing edges.
   * @function
   * @param {array} edges - edges.
   * @return {object} canvas - canvas context.
   */
  const me = this;
  each(edges, (edge) => {
    extend(edge, {
      id: edge.id || `${edge.source}TO${edge.target}`,
      lineInterpolate: 'basis',
      arrowheadStyle: 'fill: #999',
    });
  });
  return me;
}
