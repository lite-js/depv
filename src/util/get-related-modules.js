import {
  each,
  indexOf,
} from 'zero-lang';

import getRelatedModuleNames from './get-related-module-names';
import dependenciesStore from '../store/dependencies';

export default (moduleName) => {
  const modules = [];
  const moduleNames = getRelatedModuleNames(moduleName);
  each(dependenciesStore.get('nodes'), (node) => {
    if (indexOf(moduleNames, node.name) > -1) {
      modules.push(node);
    }
  });
  return modules;
};
