import {
  each,
} from 'zero-lang';

export default function queryD3Nodes(query, fuzzy) {
  const me = this;
  const nodes = me.queryNodes(query, fuzzy);
  const d3Nodes = [];
  each(nodes, (node) => {
    d3Nodes.push(me.d3NodeById[node.id]);
  });
  return d3Nodes;
}
