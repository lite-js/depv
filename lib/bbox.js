const transform = require('./transform2d');
const _ = require('lodash');

class BBox {
  constructor(props) {
    const me = this;
    me.x = 0;
    me.y = 0;
    me.width = 0;
    me.height = 0;
    me.setProps(props);
  }

  setProps(props) {
    const me = this;
    _.assign(me, props);
    me.maxX = me.x + me.width;
    me.maxY = me.y + me.height;
    return me;
  }

  scaleByCenter(xScale = 1, yScale) {
    if (!yScale) {
      yScale = xScale;
    }
    const me = this;
    const cp = me.getCenterPoint();
    const width = me.width * xScale;
    const height = me.height * yScale;
    me.setProps({
      x: cp.x - width / 2,
      y: cp.y - height / 2,
      width,
      height,
    });
    return me;
  }

  scaleByPoint(p, xScale = 1, yScale) {
    if (!yScale) {
      yScale = xScale;
    }
    const me = this;
    const {
      x, y, width, height,
    } = me;
    me.setProps({
      x: x * xScale + (1 - xScale) * p.x,
      y: y * yScale + (1 - yScale) * p.y,
      width: width * xScale,
      height: height * yScale,
    });
    return me;
  }

  translate(dx = 0, dy = 0) {
    const me = this;
    const { x, y } = me;
    me.setProps({
      x: x + dx,
      y: y + dy,
    });
    return me;
  }

  clone() {
    const {
      x, y, width, height,
    } = this;
    return new BBox({
      x, y, width, height,
    });
  }

  getCenterPoint() {
    const {
      x, y, width, height,
    } = this;
    return {
      x: x + width / 2,
      y: y + height / 2,
    };
  }

  getEdgePoints() {
    const me = this;
    const {
      x, y, width, height,
    } = me;
    return [
      { x, y },
      { x: (x + width), y },
      { x: (x + width), y: (y + height) },
      { x, y: (y + height) },
    ];
  }

  /*
   * matrix: [
   *    xScale(0), ySkew(1), dx(2),
   *    xSkew(3), yScale(4), dy(5),
   *    0, 0, 1
   * ]
   */
  getMatrixToBBoxWithoutSkewing(bbox) {
    const me = this;
    if (!(bbox instanceof BBox)) {
      throw new TypeError('Invalid BBox instance.');
    }
    const {
      x, y, width, height,
    } = me;
    const xScale = bbox.width / width;
    const yScale = bbox.height / height;
    const scale = Math.min(xScale, yScale);
    return [
      scale, 0, scale * (bbox.x - x) - (scale * width - bbox.width) / 2,
      0, scale, scale * (bbox.y - y) - (scale * height - bbox.height) / 2,
      0, 0, 1,
    ];
  }

  applyMatrix(m) {
    const me = this;
    const {
      x, y, width, height,
    } = me;
    const p1 = transform.applyPoint({ x, y }, m);
    const p2 = transform.applyPoint({ x: x + width, y: y + height }, m);
    me.setProps(BBox.fromPoints([p1, p2]).getProps());
    return me;
  }

  invertMatrix(m) {
    const me = this;
    const {
      x, y, width, height,
    } = me;
    const p1 = transform.invertPoint({ x, y }, m);
    const p2 = transform.invertPoint({ x: x + width, y: y + height }, m);
    me.setProps(BBox.fromPoints([p1, p2]).getProps());
    return me;
  }

  isPointInside(p) {
    const me = this;
    const { x, y } = p;
    return x > me.x && x < me.maxX && y > me.y && y < me.maxY;
  }

  isPointOutside(p) {
    const me = this;
    const { x, y } = p;
    return x < me.x || x > me.maxX || y < me.y || y > me.maxY;
  }

  isRectInside(rect) {
    const me = this;
    const {
      x, y, width, height,
    } = rect;
    return me.isPointInside({ x, y }) && me.isPointInside({
      x: x + width,
      y: y + height,
    });
  }

  getProps() {
    const {
      x, y, width, height,
    } = this;
    return {
      x, y, width, height,
    };
  }
}

BBox.fromPoints = (points = []) => {
  if (points.length === 0) {
    return new BBox();
  }
  if (points.length === 1) {
    return new BBox(points[0]);
  }
  const xs = [];
  const ys = [];
  points.forEach((p) => {
    xs.push(p.x);
    ys.push(p.y);
  });
  const x = Math.min(...xs);
  const maxX = Math.max(...xs);
  const y = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = maxX - x;
  const height = maxY - y;

  return new BBox({
    x,
    y,
    height,
    width,
  });
};

module.exports = BBox;
