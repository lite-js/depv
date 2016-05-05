import {
  each,
} from 'zero-lang';

import dependenciesStore from '../store/dependencies';

export default (moduleName) => {
  const moduleNames = [moduleName];
  each(dependenciesStore.get('edges'), (edge) => {
    if (edge.source === moduleName) {
      moduleNames.push(edge.target);
    }
    if (edge.target === moduleName) {
      moduleNames.push(edge.source);
    }
  });
  return moduleNames;
};
