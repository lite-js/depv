'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _amd = require('./amd');

var _amd2 = _interopRequireDefault(_amd);

var _commonjs = require('./commonjs');

var _commonjs2 = _interopRequireDefault(_commonjs);

var _es = require('./es6');

var _es2 = _interopRequireDefault(_es);

var _npm = require('./npm');

var _npm2 = _interopRequireDefault(_npm);

var _perl = require('./perl');

var _perl2 = _interopRequireDefault(_perl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  amd: _amd2.default,
  commonjs: _commonjs2.default,
  es6: _es2.default,
  npm: _npm2.default,
  perl: _perl2.default
};