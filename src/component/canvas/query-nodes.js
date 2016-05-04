import {
  forIn,
  isString,
} from 'zero-lang';

export default function queryNodes(query, fuzzy) {
  const me = this;
  const nodes = [];
  if (query && isString(query)) {
    forIn(me.nodeById, (node, id) => {
      if (fuzzy) {
        if (id.indexOf(query) > -1) {
          nodes.push(node);
        }
      } else {
        if (id === query) {
          nodes.push(node);
        }
      }
    });
  }
  return nodes;
}
