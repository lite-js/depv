import {
  each,
} from 'zero-lang';

export default (moduleName, dependencies) => {
  const moduleNames = [moduleName];
  each(dependencies.edges, (edge) => {
    if (edge.source === moduleName) {
      moduleNames.push(edge.target);
    }
    if (edge.target === moduleName) {
      moduleNames.push(edge.source);
    }
  });
  return moduleNames;
};
