import {
  each,
} from 'zero-lang';

export default function addEdges(edges) {
  const me = this;
  const graph = me.graph;

  each(edges, (edge) => {
    if (graph.hasNode(edge.source) && graph.hasNode(edge.target)) {
      if (!graph.hasEdge(edge.id)) {
        graph.setEdge(edge.source, edge.target, edge);
      }
    }
  });
  return me;
}
