import domStyle from 'zero-dom/style';

export default function getCenterPoint(scale) {
  /**
   * get center point of the canvas.
   * @function
   * @returns {object} point.
   */

  const me = this;
  const zoomScale = scale || me.zoom.scale();
  const outerDom = me.outerDom;
  const graph = me.graph;

  const x = (domStyle.get(outerDom, 'width') - graph.graph().width * zoomScale) / 2;
  const y = (domStyle.get(outerDom, 'height') - graph.graph().height * zoomScale) / 2;

  return {
    x,
    y,
  };
}
