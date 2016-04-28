import {
  resolve,
} from 'path';

import gulp from 'gulp';
import sprintf from 'zero-fmt/sprintf';
import {
  each,
} from 'zero-lang';

import {
  scriptDirs,
  templateDirs,
} from './config';

gulp.task('watch', () => {
  // watch script directories
  each(scriptDirs, (dir) => {
    gulp.watch(resolve(__dirname, sprintf('../%s/**/*.es6', dir)), [sprintf('babel-%s', dir)]);
  });

  // watch template directories
  each(templateDirs, (dir) => {
    gulp.watch(resolve(__dirname, sprintf('../%s/**/*.html', dir)), [sprintf('template2module-%s', dir)]);
  });
});

