import {
  each,
  indexOf,
} from 'zero-lang';

import getRelatedModuleNames from './get-related-module-names';

export default (moduleName, dependencies) => {
  const modules = [];
  const moduleNames = getRelatedModuleNames(moduleName, dependencies);
  each(dependencies.nodes, (node) => {
    if (indexOf(moduleNames, node.name) > -1) {
      modules.push(node);
    }
  });
  return modules;
};
