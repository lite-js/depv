'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zeroLang = require('zero-lang');

var _madge = require('madge');

var _madge2 = _interopRequireDefault(_madge);

var _getModuleType = require('./get-module-type');

var _getModuleType2 = _interopRequireDefault(_getModuleType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (format) {
  return function (config, callback) {
    /**
     * @param {object} config - configurations
     * @param {string} config.entry - package.json of an npm project.
     * @param {string} config.root - npm project directory that has an package.json in it.
     * @param {string} config.ignores - npm project directory that has an package.json in it.
     * @param {function} callback - callback that use the result as parameter
     */
    var nodes = [];
    var edges = [];
    var nodeLoaded = {};

    function addNode(name) {
      if (!nodeLoaded[name]) {
        nodes.push({
          name: name,
          type: (0, _getModuleType2.default)(name)
        });
        nodeLoaded[name] = true;
      }
    }

    var madgeOptions = {
      format: format,
      exclude: config.ignore,
      mainRequireModule: config.entry
    };
    (0, _zeroLang.extend)(madgeOptions, config);

    if ((0, _zeroLang.isString)(madgeOptions.extensions)) {
      madgeOptions.extensions = madgeOptions.extensions.split(',');
    }

    try {
      var madgeResult = (0, _madge2.default)(config.root, madgeOptions);
      var tree = madgeResult.tree;
      var circular = madgeResult.circular();
      var names = (0, _zeroLang.keys)(tree);

      (0, _zeroLang.each)(names, function (name) {
        addNode(name);
      });
      (0, _zeroLang.forIn)(tree, function (deps, name) {
        (0, _zeroLang.each)(deps, function (dep) {
          dep = dep.replace(/\.\.\//g, '').replace(/\.\//g, '').replace('node_modules/', '');
          addNode(dep);
          edges.push({
            source: dep,
            target: name
          });
        });
      });

      callback({
        circles: circular.getArray(),
        edges: edges,
        nodes: nodes
      });
    } catch (e) {
      callback({});
    }
  };
};