/**
 * canvas.transition(option) implement.
 * @module component/canvas/transition
 * @see module:component/canvas
 */

import {
  every,
  isNumber,
} from 'zero-lang';

export default function transition(option) {
  /**
   * graph transition.
   * @function
   * @param {number} option.x - x.
   * @param {number} option.y - y.
   * @param {number} option.scale - scale.
   * @param {number} option.duration - duration.
   * @return {object} canvas - canvas context.
   */
  const me = this;
  const x = option.x;
  const y = option.y;
  const scale = option.scale || 1;
  const duration = option.duration || 300;

  // ensuring all params to be numbers
  const isAllNumbers = every([
    x,
    y,
    scale,
    duration,
  ], (num) => isNumber(num));
  if (!isAllNumbers) {
    return me;
  }

  me.d3G
    .transition()
    .duration(duration)
    .attr(
    'transform',
    `translate(${x}, ${y})scale(${scale})`
  );

  // update the cached scale and translate in d3.event
  me.zoom.translate([x, y]);
  me.zoom.scale(scale);

  return me;
}
