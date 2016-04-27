'use strict';

var _path = require('path');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

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
});