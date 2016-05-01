export default function getNodeId(node) {
  const me = this;
  const id = node.id;
  return id.replace(me.NS.node, '');
}
