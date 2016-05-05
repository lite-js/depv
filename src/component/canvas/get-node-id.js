/**
 * canvas.getNodeId(node) implement.
 * @module component/canvas/get-node-id
 * @see module:component/canvas
 */

export default function getNodeId(node) {
  /**
   * get node id.
   * @function
   * @param {object} node - node.
   * @return {string} id - node id.
   */
  const me = this;
  const id = node.id;
  return id.replace(me.NS.node, '');
}
