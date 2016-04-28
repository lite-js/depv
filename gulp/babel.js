'use strict';

var _path = require('path');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _sprintf = require('zero-fmt/sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _zeroLang = require('zero-lang');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _zeroLang.each)(_config.scriptDirs, function (dir) {
    _gulp2.default.task((0, _sprintf2.default)('babel-%s', dir), function () {
        return _gulp2.default.src((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/**/*.es6', dir))).pipe((0, _gulpPlumber2.default)()).pipe((0, _gulpBabel2.default)({
            presets: ['es2015']
        })).on('error', function (err) {
            _gulpUtil2.default.log(_gulpUtil2.default.colors.red(err.message));
        }).pipe((0, _gulpRename2.default)(function (path) {
            path.extname = '.js';
        })).pipe(_gulp2.default.dest((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/', dir))));
    });
});

_gulp2.default.task('babel', (0, _zeroLang.map)(_config.scriptDirs, function (dir) {
    return (0, _sprintf2.default)('babel-%s', dir);
}));