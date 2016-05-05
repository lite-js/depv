/**
 * analyse perl modules.
 * @module analyser/perl
 */
import walk from 'walk';
import fs from 'fs';
import path from 'path';

import {
  each,
  indexOf,
  trim,
} from 'zero-lang';

import getType from './get-module-type';

const separator = '::';
const REGEXP = {
  dependencies: /use\s+(.+);/gm,
  depPackage: /use\s+(.+);/,
  ext: /\.(pm|pl)$/i,
  package: /package\s+(.+)\s*;/,
};

function getDepPackage(str) {
  let packageName;
  const result = REGEXP.depPackage.exec(str);
  if (result) {
    packageName = trim(result[1])
      .replace('base ', '')
      .replace('parent ', '');

    packageName = packageName.split(/\s/)[0]
      .replace('qw(', '')
      .replace('qw/', '')
      .replace(/'/g, '')
      .replace(/"/g, '')
      .replace(/\s/g, '')
      .replace(')', '');
  }
  if (
    !!packageName && packageName.length > 0 &&
    (indexOf(['my'], trim(packageName)) === -1) && !packageName.match(/[^\w:]/)
  ) {
    return packageName;
  }
  return '';
}

export default (config, callback) => {
  const root = path.resolve(process.cwd(), config.root || './');
  const nodes = [];
  const edges = [];
  const nodesAdded = {};
  const edgesAdded = {};

  function addNode(name) {
    if (!nodesAdded[name]) {
      nodesAdded[name] = true;
      nodes.push({
        name,
        type: getType(name, separator),
      });
    }
  }

  function addLink(source, target) {
    const id = `S${source}T${target}`;
    if (!edgesAdded[id]) {
      edgesAdded[id] = true;
      edges.push({
        source,
        target,
      });
    }
  }

  const walker = walk.walk(root, {
    followLinks: false,
  });

  walker.on('directories', (r, dirStatsArray, next) => {
    next();
  });

  walker.on('file', (r, fileStats, next) => {
    fs.readFile(path.join(r, fileStats.name), 'utf8', (err, content) => {
      if (err) {
        next();
      }
      if (REGEXP.ext.test(fileStats.name)) {
        const packageResult = REGEXP.package.exec(content);
        if (packageResult) {
          const node = packageResult[1];
          addNode(node);

          const deps = content.match(REGEXP.dependencies);
          each(deps, (dep) => {
            dep = getDepPackage(dep);
            if (dep) {
              addNode(dep);
              addLink(dep, node);
            }
          });
        }
      }
      next();
    });
  });

  walker.on('errors', (r, nodeStatsArray, next) => {
    next();
  });

  walker.on('end', () => {
    callback({
      edges,
      nodes,
      separator,
    });
  });
};
