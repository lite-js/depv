/**
 * canvas.styleNodes() implement.
 * @module component/canvas/style-nodes
 * @see module:component/canvas
 * @see module:component/canvas/style-edges
 */
import {
  forIn,
  keys,
} from 'zero-lang';
import Color from 'zero-colors/Color';
import domQuery from 'zero-dom/query';
import domStyle from 'zero-dom/style';
import namedColor from 'zero-colors/named';
const colorNames = keys(namedColor);

const colorByType = {};
const fontColorByType = {};

function getSumOfStringCharCodes(str) {
  /**
   * sum of string char codes
   * @function
   * @param {string} str - string to count.
   * @return {string} color - color.
   */
  const len = str.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += str.charCodeAt(i);
  }
  return sum;
}

function getColorByType(type) {
  /**
   * get color by type.
   * @function
   * @param {string} type - type of node.
   * @return {string} color - color.
   */
  if (colorByType[type]) {
    return colorByType[type];
  }
  const randomId = getSumOfStringCharCodes(type) % colorNames.length;

  colorByType[type] = namedColor[colorNames[randomId]];
  return colorByType[type];
}

function getFontColorByType(type) {
  /**
   * get font color by type.
   * @function
   * @param {string} type - type of node.
   * @return {string} color - font color.
   */
  if (fontColorByType[type]) {
    return fontColorByType[type];
  }
  const rectColor = colorByType[type];
  const greyColor = new Color(rectColor).toGrey();
  const hex = parseInt(greyColor.toHex().replace('#', 0), 16);

  if (hex > parseInt('7fffff.8', 16)) {
    fontColorByType[type] = 'black';
  } else {
    fontColorByType[type] = 'white';
  }
  return fontColorByType[type];
}


export default function stylingNodes() {
  /**
   * styling nodes.
   * @function
   * @return {object} canvas - canvas context.
   */
  const me = this;

  forIn(me.d3NodeById, (d3Node, id) => {
    const node = me.nodeById[id];
    const rectColor = getColorByType(node.type);
    const fontColor = getFontColorByType(node.type);
    const d3Rect = d3Node.select('rect');
    const nodeLabel = domQuery.one('div.node-label', d3Node[0][0]);

    if (d3Node) {
      d3Rect.attr('fill', rectColor);
    }
    if (nodeLabel) {
      domStyle.set(nodeLabel, 'color', fontColor);
    }
  });
  return me;
}
