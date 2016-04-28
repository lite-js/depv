import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';

import webpackConf from '../webpack.config';

gulp.task('pack', ['eslint', 'babel'], (done) => {
  webpack(webpackConf, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: true,
    }));
    done();
  });
});
