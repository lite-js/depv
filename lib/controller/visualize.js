'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = visualize;

var _visualize = require('../template/visualize');

var _visualize2 = _interopRequireDefault(_visualize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function visualize(config) {
  return function (req, res /* , next */) {
    res.htmlRes((0, _visualize2.default)({
      config: JSON.stringify(config)
    }));
  };
} /**
   * controller module.
   * @module ./visualize
   */