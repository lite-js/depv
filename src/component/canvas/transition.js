import {
  every,
  isNumber,
} from 'zero-lang';

export default function transition(option) {
  /**
   * graph transition.
   * @param option.x {number} - x
   * @param option.y {number} - y
   * @param option.scale {number} - scale
   * @param option.duration {number} - duration
   */
  const me = this;
  const x = option.x;
  const y = option.y;
  const scale = option.scale || 1;
  const duration = option.duration || 300;

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
