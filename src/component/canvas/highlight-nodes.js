import {
  each,
} from 'zero-lang';

export default function highlightNodes(query) {
  /**
   * highlight nodes.
   */
  const me = this;
  const d3Nodes = me.queryD3Nodes(query, true);
  each(d3Nodes, (d3Node) => {
    d3Node.classed(me.CLASSNAME.nodeHighlight, true);
  });
  return me;
}
