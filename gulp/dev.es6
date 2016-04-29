import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import sprintf from 'zero-fmt/sprintf';

import webpackConf from '../webpack.config';
import webpackDevConf from '../webpack-dev.config';

import {
  devPort,
} from './config';

const LOCALHOST = '127.0.0.1';

gulp.task('dev', (/** done */) => {
  const compiler = webpack(webpackDevConf);
  const devSvr = new WebpackDevServer(compiler, {
    contentBase: webpackConf.output.path,
    publicPath: webpackDevConf.output.publicPath,
    hot: true,
    stats: webpackDevConf.devServer.stats,
  });

  devSvr.listen(devPort, LOCALHOST, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', sprintf('http://%s:%d/webpack-dev-server/index.html', LOCALHOST, devPort));
    // keep the devSvr alive
    // done();
  });
});
