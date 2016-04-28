'use strict';

var _path = require('path');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _sprintf = require('zero-fmt/sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _zeroLang = require('zero-lang');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('watch', function () {
  // watch script directories
  (0, _zeroLang.each)(_config.scriptDirs, function (dir) {
    _gulp2.default.watch((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/**/*.es6', dir)), [(0, _sprintf2.default)('babel-%s', dir)]);
  });

  // watch template directories
  (0, _zeroLang.each)(_config.templateDirs, function (dir) {
    _gulp2.default.watch((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/**/*.html', dir)), [(0, _sprintf2.default)('template2module-%s', dir)]);
  });
});