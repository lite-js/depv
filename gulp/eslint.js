'use strict';

var _path = require('path');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

var _sprintf = require('zero-fmt/sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _zeroLang = require('zero-lang');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

(0, _zeroLang.each)(_config.lintingDirs, function (dir) {
  _gulp2.default.task((0, _sprintf2.default)('eslint-%s', dir), function () {
    return _gulp2.default.src((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/**/*.es6', dir))).pipe((0, _gulpEslint2.default)()).on('error', function (err) {
      _gulpUtil2.default.log(_gulpUtil2.default.colors.red(err.message));
    }).pipe(_gulpEslint2.default.format()).pipe((0, _gulpIf2.default)(isFixed, _gulp2.default.dest((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/', dir))))).pipe(_gulpEslint2.default.failAfterError());
  });
});

_gulp2.default.task('eslint', (0, _zeroLang.map)(_config.lintingDirs, function (dir) {
  return (0, _sprintf2.default)('eslint-%s', dir);
}));