'use strict';

var _path = require('path');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpJsdoc = require('gulp-jsdoc3');

var _gulpJsdoc2 = _interopRequireDefault(_gulpJsdoc);

var _sprintf = require('zero-fmt/sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _zeroLang = require('zero-lang');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _zeroLang.each)(_config.jsdocDirs, function (dir) {
  var config = (0, _zeroLang.merge)({}, _config.jsdocConfig, {
    opts: {
      destination: (0, _path.resolve)(__dirname, (0, _sprintf2.default)('../doc/jsdoc/%s', dir)) }
  });
  // TO BE OVERRIDE
  _gulp2.default.task((0, _sprintf2.default)('jsdoc-%s', dir), function () {
    return _gulp2.default.src((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/**/*.js', dir)), { read: false }).pipe((0, _gulpPlumber2.default)()).pipe((0, _gulpJsdoc2.default)(config)).on('error', function (err) {
      _gulpUtil2.default.log(_gulpUtil2.default.colors.red(err.message));
    });
  });
});

_gulp2.default.task('jsdoc', (0, _zeroLang.map)(_config.jsdocDirs, function (dir) {
  return (0, _sprintf2.default)('jsdoc-%s', dir);
}));