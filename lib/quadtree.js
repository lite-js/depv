const _ = require('lodash');

function rectSeparated(r1, r2) {
  return r1.x > r2.x + r2.w || r1.x + r1.w < r2.x || r1.y > r2.y + r2.h || r1.y + r1.h < r2.y;
}

function rectIntersects(r1, r2) {
  return !rectSeparated(r1, r2);
}

function rectContainsPoint(r, p) {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

function rectContainsRect(r1, r2) {
  return rectContainsPoint(r1, r2) && rectContainsPoint(r1, {
    x: r2.x + r2.w,
    y: r2.y + r2.h,
  });
}

class Quadtree {
  constructor(bounds, capacity = 10, level = 0) {
    const me = this;
    _.assign(me, {
      bounds,
      capacity,
      level,
      objects: [],
      divided: false,
    });
  }

  divide() {
    const me = this;
    const { capacity, bounds, level } = me;
    const {
      x,
      y,
    } = bounds;
    let {
      w,
      h,
    } = bounds;
    w /= 2;
    h /= 2;

    const nextLevel = level + 1;

    me.ne = new Quadtree({
      x: x + w,
      y,
      w,
      h,
    }, capacity, nextLevel);
    me.nw = new Quadtree({
      x,
      y,
      w,
      h,
    }, capacity, nextLevel);
    me.se = new Quadtree({
      x: x + w,
      y: y + h,
      w,
      h,
    }, capacity, nextLevel);
    me.sw = new Quadtree({
      x,
      y: y + h,
      w,
      h,
    }, capacity, nextLevel);

    me.divided = true;
  }

  insert(rect) {
    const me = this;
    const { bounds, objects, capacity } = me;
    if (!rectIntersects(bounds, rect)) {
      return false;
    }

    if (objects.length < capacity) {
      objects.push(rect);
      return true;
    }

    if (!me.divided) {
      me.divide();
    }

    return me.ne.insert(rect) || me.nw.insert(rect) || me.se.insert(rect) || me.sw.insert(rect);
  }

  isOverlapping(rect) {
    const me = this;

    if (!rectIntersects(me.bounds, rect)) {
      return false;
    }

    if (me.level > 3 && me.objects.length === me.capacity) {
      return rectContainsRect(me.bounds, rect);
    }

    if (me.objects.some(r => rectContainsRect(r, rect))) {
      return true;
    }

    if (me.divided) {
      return me.nw.isOverlapping(rect) || me.ne.isOverlapping(rect) ||
        me.sw.isOverlapping(rect) || me.se.isOverlapping(rect);
    }
    return false;
  }
}

module.exports = Quadtree;
