import {
  resolve,
} from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import jsdoc from 'gulp-jsdoc3';
import sprintf from 'zero-fmt/sprintf';
import {
  each,
  map,
  merge,
} from 'zero-lang';

import {
  jsdocDirs,
  jsdocConfig,
} from './config';

each(jsdocDirs, (dir) => {
  const config = merge({}, jsdocConfig, {
    opts: {
      destination: resolve(__dirname, sprintf('../doc/jsdoc/%s', dir)), // TO BE OVERRIDE
    },
  });
  gulp.task(sprintf('jsdoc-%s', dir), () =>
      gulp.src(resolve(__dirname, sprintf('../%s/**/*.es6', dir)), { read: false })
        .pipe(plumber())
        .pipe(jsdoc(config))
        .on('error', (err) => {
          gutil.log(gutil.colors.red(err.message));
        })
  );
});

gulp.task('jsdoc', map(jsdocDirs, (dir) => sprintf('jsdoc-%s', dir)));
