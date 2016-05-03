import domStyle from 'zero-dom/style';
import {
  isNumber,
} from 'zero-lang';

export default function getCenterPoint(scale) {
  /**
   * get center point of the canvas.
   * @function
   * @returns {object} point.
   */

  const me = this;
  const zoomScale = scale || me.zoom ? me.zoom.scale() : 1;
  const outerDom = me.outerDom;
  const graph = me.graph.graph();

  const width = graph.width;
  const height = graph.height;

  if (!isNumber(width) || !isNumber(height) || width === -Infinity) { // the init value is -Infinity
    return {
      x: 0,
      y: 0,
    };
  }

  const x = (domStyle.get(outerDom, 'width') - width * zoomScale) / 2;
  const y = (domStyle.get(outerDom, 'height') - height * zoomScale) / 2;

  return {
    x,
    y,
  };
}
