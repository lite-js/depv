import {
  resolve,
} from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpIf from 'gulp-if';
import eslint from 'gulp-eslint';
import sprintf from 'zero-fmt/sprintf';
import {
  each,
  map,
} from 'zero-lang';

import {
  lintingDirs,
} from './config';

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

each(lintingDirs, (dir) => {
  gulp.task(sprintf('eslint-%s', dir), () =>
      gulp.src(resolve(__dirname, sprintf('../%s/**/*.es6', dir)))
        .pipe(eslint())
        .on('error', (err) => {
          gutil.log(gutil.colors.red(err.message));
        })
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(resolve(__dirname, sprintf('../%s/', dir)))))
        .pipe(eslint.failAfterError())
  );
});

gulp.task('eslint', map(lintingDirs, (dir) => sprintf('eslint-%s', dir)));
