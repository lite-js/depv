import {
  each,
  extend,
  forIn,
  keys,
  isString,
} from 'zero-lang';
import madge from 'madge';

function getType(name) {
  return name.split('/')[0];
}

export default (format) => (config, callback) => {
  /**
   * @param {object} config - configurations
   * @param {string} config.entry - package.json of an npm project.
   * @param {string} config.root - npm project directory that has an package.json in it.
   * @param {string} config.ignores - npm project directory that has an package.json in it.
   * @param {function} callback - callback that use the result as parameter
   */
  const nodes = [];
  const edges = [];
  const nodeLoaded = {};

  function addNode(name) {
    if (!nodeLoaded[name]) {
      nodes.push({
        name,
        type: getType(name),
      });
      nodeLoaded[name] = true;
    }
  }

  const madgeOptions = {
    format,
    exclude: config.ignore,
    mainRequireModule: config.entry,
  };
  extend(madgeOptions, config);

  if (isString(madgeOptions.extensions)) {
    madgeOptions.extensions = madgeOptions.extensions.split(',');
  }

  try {
    const madgeResult = madge(config.root, madgeOptions);
    const tree = madgeResult.tree;
    const circular = madgeResult.circular();
    const names = keys(tree);

    each(names, (name) => {
      addNode(name);
    });
    forIn(tree, (deps, name) => {
      each(deps, (dep) => {
        dep = dep.replace(/\.\.\//g, '').replace(/\.\//g, '');
        addNode(dep);
        edges.push({
          source: dep,
          target: name,
        });
      });
    });

    callback({
      nodes,
      edges,
      circles: circular.getArray(),
    });
  } catch (e) {
    callback({});
  }
};
