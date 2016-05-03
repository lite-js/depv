import {
  each,
  extend,
} from 'zero-lang';

export default function preprocessEdges(edges) {
  /**
   * pre-processing edges.
   * @param edges {array} - edges
   */
  each(edges, (edge) => {
    extend(edge, {
      id: edge.id || `${edge.source}TO${edge.target}`,
      lineInterpolate: 'basis',
      arrowheadStyle: 'fill: #999',
    });
  });
}
