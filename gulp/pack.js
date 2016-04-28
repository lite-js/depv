'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('pack', ['eslint', 'babel'], function (done) {
  (0, _webpack2.default)(_webpack4.default, function (err, stats) {
    if (err) {
      throw new _gulpUtil2.default.PluginError('webpack', err);
    }
    _gulpUtil2.default.log('[webpack]', stats.toString({
      colors: true
    }));
    done();
  });
});