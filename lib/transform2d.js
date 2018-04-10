function apply(v, m) {
  /*
   * [
   *    xScale(0), ySkew(1), dx(2),
   *    xSkew(3), yScale(4), dy(5),
   *    0, 0, 1
   * ]
   */
  return [
    m[0] * v[0] + m[1] * v[1] + m[2],
    m[3] * v[0] + m[4] * v[1] + m[5],
  ];
}

function invertMatrix(m) {
  // M = a * d - b * c
  const M = m[0] * m[4] - m[3] * m[1];
  if (!M) {
    return null;
  }
  /*
   [ d/M  -c/M  (c*dy - d*dx)/M ]
   [ b/M   a/M  (b*dx - a*dy)/M ]
   [  0     0          1        ]
   */
  return [
    m[4] / M, -m[1] / M, (m[1] * m[5] - m[4] * m[2]) / M,
    m[3] / M, m[0] / M, (m[3] * m[2] - m[0] * m[5]) / M,
    0, 0, 1,
  ];
}

function invert(v, m) {
  const inm = invertMatrix(m);
  if (inm) {
    return apply(v, inm);
  }
  return v;
}

const transform2d = {
  invert,
  apply,
  applyPoint(p, m) {
    const [x, y] = apply([p.x, p.y], m);
    return { x, y };
  },
  invertPoint(p, m) {
    const [x, y] = invert([p.x, p.y], m);
    return { x, y };
  },
};

module.exports = transform2d;
