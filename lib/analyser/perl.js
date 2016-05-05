'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _walk = require('walk');

var _walk2 = _interopRequireDefault(_walk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _zeroLang = require('zero-lang');

var _getModuleType = require('./get-module-type');

var _getModuleType2 = _interopRequireDefault(_getModuleType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var separator = '::'; /**
                       * analyse perl modules.
                       * @module analyser/perl
                       */

var REGEXP = {
  dependencies: /use\s+(.+);/gm,
  depPackage: /use\s+(.+);/,
  ext: /\.(pm|pl)$/i,
  package: /package\s+(.+)\s*;/
};

function getDepPackage(str) {
  var packageName = void 0;
  var result = REGEXP.depPackage.exec(str);
  if (result) {
    packageName = (0, _zeroLang.trim)(result[1]).replace('base ', '').replace('parent ', '');

    packageName = packageName.split(/\s/)[0].replace('qw(', '').replace('qw/', '').replace(/'/g, '').replace(/"/g, '').replace(/\s/g, '').replace(')', '');
  }
  if (!!packageName && packageName.length > 0 && (0, _zeroLang.indexOf)(['my'], (0, _zeroLang.trim)(packageName)) === -1 && !packageName.match(/[^\w:]/)) {
    return packageName;
  }
  return '';
}

exports.default = function (config, callback) {
  var root = _path2.default.resolve(process.cwd(), config.root || './');
  var nodes = [];
  var edges = [];
  var nodesAdded = {};
  var edgesAdded = {};

  function addNode(name) {
    if (!nodesAdded[name]) {
      nodesAdded[name] = true;
      nodes.push({
        name: name,
        type: (0, _getModuleType2.default)(name, separator)
      });
    }
  }

  function addLink(source, target) {
    var id = 'S' + source + 'T' + target;
    if (!edgesAdded[id]) {
      edgesAdded[id] = true;
      edges.push({
        source: source,
        target: target
      });
    }
  }

  var walker = _walk2.default.walk(root, {
    followLinks: false
  });

  walker.on('directories', function (r, dirStatsArray, next) {
    next();
  });

  walker.on('file', function (r, fileStats, next) {
    _fs2.default.readFile(_path2.default.join(r, fileStats.name), 'utf8', function (err, content) {
      if (err) {
        next();
      }
      if (REGEXP.ext.test(fileStats.name)) {
        var packageResult = REGEXP.package.exec(content);
        if (packageResult) {
          (function () {
            var node = packageResult[1];
            addNode(node);

            var deps = content.match(REGEXP.dependencies);
            (0, _zeroLang.each)(deps, function (dep) {
              dep = getDepPackage(dep);
              if (dep) {
                addNode(dep);
                addLink(dep, node);
              }
            });
          })();
        }
      }
      next();
    });
  });

  walker.on('errors', function (r, nodeStatsArray, next) {
    next();
  });

  walker.on('end', function () {
    callback({
      edges: edges,
      nodes: nodes,
      separator: separator
    });
  });
};