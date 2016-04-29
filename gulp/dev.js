'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _sprintf = require('zero-fmt/sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _webpackDev = require('../webpack-dev.config');

var _webpackDev2 = _interopRequireDefault(_webpackDev);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOCALHOST = '127.0.0.1';

_gulp2.default.task('dev', function () /** done */{
  var compiler = (0, _webpack2.default)(_webpackDev2.default);
  var devSvr = new _webpackDevServer2.default(compiler, {
    contentBase: _webpack4.default.output.path,
    publicPath: _webpackDev2.default.output.publicPath,
    hot: true,
    stats: _webpackDev2.default.devServer.stats
  });

  devSvr.listen(_config.devPort, LOCALHOST, function (err) {
    if (err) {
      throw new _gulpUtil2.default.PluginError('webpack-dev-server', err);
    }
    _gulpUtil2.default.log('[webpack-dev-server]', (0, _sprintf2.default)('http://%s:%d/webpack-dev-server/index.html', LOCALHOST, _config.devPort));
    // keep the devSvr alive
    // done();
  });
});