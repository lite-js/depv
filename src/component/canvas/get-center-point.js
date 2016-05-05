/**
 * canvas.getCenterPoint(scale) implement.
 * @module component/canvas/get-center-point
 * @see module:component/canvas
 */

import domStyle from 'zero-dom/style';
import {
  isNumber,
} from 'zero-lang';

export default function getCenterPoint(scale) {
  /**
   * get center point of the canvas.
   * @function
   * @returns {object} point - {x, y}.
   */

  const me = this;
  const zoomScale = scale || me.zoom ? me.zoom.scale() : 1;
  const canvasDom = me.canvasDom;
  const graph = me.graph.graph();

  const width = graph.width;
  const height = graph.height;

  if (!isNumber(width) || !isNumber(height) || width === -Infinity) { // @FIXME the init value is -Infinity
    return {
      x: 0,
      y: 0,
    };
  }

  const x = (domStyle.get(canvasDom, 'width') - width * zoomScale) / 2;
  const y = (domStyle.get(canvasDom, 'height') - height * zoomScale) / 2;

  return {
    x,
    y,
  };
}
