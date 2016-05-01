import {
  each,
  extend,
} from 'zero-lang';

import nodeLabelTemplate from '../../template/node-label';

function classnameByType(/* type */) {
  // if (!type) {
  //     return 'type-default';
  // }
  // switch (true) {
  //     case /^pastry/.test(type):
  //         return 'type-core';
  //     case /^amd/.test(type):
  //         return type === 'amd/define' ? 'type-default' : 'type-core';
  //     case /shim\//.test(type):
  //         return 'type-common';
  //     case /fmt\//.test(type):
  //         return 'type-common';
  //     default:
  //         return 'type-default';
  // }
  return '';
}

function getType(/* node */) {
  // TODO
  return '';
}

export default function preprocessNodes(nodes) {
  /**
   * pre-processing nodes.
   * @param nodes {array} - nodes
   */
  each(nodes, (node) => {
    extend(node, {
      classname: classnameByType(node.type),
      id: node.name,
      label: nodeLabelTemplate(node),
      labelType: 'html',
      rx: 3,
      ry: 3,
      type: node.type ? node.type : getType(node),
    });
  });
}
