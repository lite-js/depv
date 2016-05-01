import {
  each,
} from 'zero-lang';

export default function addNodes(nodes) {
  const me = this;
  const graph = me.graph;

  each(nodes, (node) => {
    if (node.id && !graph.hasNode(node.id)) {
      graph.setNode(node.id, node);
    }
  });
  return me;
}
