import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConf from '../webpack.config';
import webpackDevConf from '../webpack-dev.config';

gulp.task('dev', (/** done */) => {
  const compiler = webpack(webpackDevConf);
  const devSvr = new WebpackDevServer(compiler, {
    contentBase: webpackConf.output.path,
    publicPath: webpackDevConf.output.publicPath,
    hot: true,
    stats: webpackDevConf.devServer.stats,
  });

  devSvr.listen(8080, '0.0.0.0', (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    // keep the devSvr alive
    // done();
  });
});
