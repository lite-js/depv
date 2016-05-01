import {
  readFile,
} from 'fs';
import {
  resolve,
  isAbsolute,
} from 'path';

import request from 'request-promise';
import sprintf from 'zero-fmt/sprintf';
import {
  forIn,
} from 'zero-lang';

function generateDependenciesFromPkg(pkg) {
  const nodes = [{
    name: pkg.name,
    version: pkg.version,
    type: 'entry',
  }];
  const edges = [];
  forIn(pkg.dependencies, (version, name) => {
    nodes.push({
      name,
      version,
      type: 'main',
    });
    edges.push({
      source: name,
      target: pkg.name,
    });
  });
  // forIn(pkg.devDependencies, (version, name) => {
  //   nodes.push({
  //     name,
  //     version,
  //     type: 'dev',
  //   });
  //   edges.push({
  //     source: name,
  //     target: pkg.name,
  //   });
  // });
  return {
    nodes,
    edges,
  };
}

export default (config, callback) => {
  /**
   * @param {object} config - configurations
   * @param {string} config.name - name of the published npm module.
   * @param {string} config.entry - package.json of an npm project.
   * @param {string} config.root - npm project directory that has an package.json in it.
   * @param {function} callback - callback that use the result as parameter
   */
  if (config.name) {
    request(sprintf('https://r.cnpmjs.org/%s', config.name))
      .then((jsonStr) => {
        const result = JSON.parse(jsonStr);
        const latestTag = result['dist-tags'].latest;
        callback(generateDependenciesFromPkg(result.versions[latestTag]));
      });
  } else {
    let pkgPath;
    if (config.entry) {
      pkgPath = config.entry;
    } else if (config.root) {
      pkgPath = resolve(config.root, './package.json');
    }
    if (pkgPath) {
      pkgPath = isAbsolute(pkgPath) ? pkgPath : resolve(process.cwd(), pkgPath);
    }
    readFile(pkgPath, (err, content) => {
      if (err) {
        callback({});
      } else {
        callback(generateDependenciesFromPkg(JSON.parse(content)));
      }
    });
  }
};
