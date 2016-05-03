'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _sprintf = require('zero-fmt/sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _zeroLang = require('zero-lang');

var _getModuleType = require('./get-module-type');

var _getModuleType2 = _interopRequireDefault(_getModuleType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateDependenciesFromPkg(pkg) {
  var nodes = [{
    name: pkg.name,
    version: pkg.version,
    type: (0, _getModuleType2.default)(pkg.name)
  }];
  var edges = [];
  (0, _zeroLang.forIn)(pkg.dependencies, function (version, name) {
    nodes.push({
      name: name,
      version: version,
      type: (0, _getModuleType2.default)(name)
    });
    edges.push({
      source: name,
      target: pkg.name
    });
  });
  // forIn(pkg.devDependencies, (version, name) => {
  //   nodes.push({
  //     name,
  //     version,
  //     type: getType(name),
  //   });
  //   edges.push({
  //     source: name,
  //     target: pkg.name,
  //   });
  // });
  return {
    nodes: nodes,
    edges: edges
  };
}

exports.default = function (config, callback) {
  /**
   * @param {object} config - configurations
   * @param {string} config.name - name of the published npm module.
   * @param {string} config.entry - package.json of an npm project.
   * @param {string} config.root - npm project directory that has an package.json in it.
   * @param {function} callback - callback that use the result as parameter
   */
  if (config.name) {
    (0, _requestPromise2.default)((0, _sprintf2.default)('https://r.cnpmjs.org/%s', config.name)).then(function (jsonStr) {
      var result = JSON.parse(jsonStr);
      var latestTag = result['dist-tags'].latest;
      callback(generateDependenciesFromPkg(result.versions[latestTag]));
    });
  } else {
    var pkgPath = void 0;
    if (config.entry) {
      pkgPath = config.entry;
    } else if (config.root) {
      pkgPath = (0, _path.resolve)(config.root, './package.json');
    }
    if (pkgPath) {
      pkgPath = (0, _path.isAbsolute)(pkgPath) ? pkgPath : (0, _path.resolve)(process.cwd(), pkgPath);
    }
    (0, _fs.readFile)(pkgPath, function (err, content) {
      if (err) {
        callback({});
      } else {
        callback(generateDependenciesFromPkg(JSON.parse(content)));
      }
    });
  }
};