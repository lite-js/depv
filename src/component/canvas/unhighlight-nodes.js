import {
  forIn,
} from 'zero-lang';

export default function highlightNodes() {
  /**
   * highlight nodes.
   */
  const me = this;
  forIn(me.d3NodeById, (d3Node) => {
    d3Node.classed(me.CLASSNAME.nodeHighlight, false);
  });
  return me;
}
