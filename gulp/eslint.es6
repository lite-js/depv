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
  gulp.task(
    sprintf('eslint-%s', dir), () => {
      const srcPath = resolve(__dirname, sprintf((dir === 'src') ? '../%s/**/*.js' : '../%s/**/*.es6', dir));
      const ignorePath = `!${resolve(__dirname, sprintf('../%s/template/**/*.js', dir))}`;
      gulp.src([srcPath, ignorePath])
        .pipe(eslint())
        .on('error', (err) => {
          gutil.log(gutil.colors.red(err.message));
        })
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(resolve(__dirname, sprintf('../%s/', dir)))))
        .pipe(eslint.failAfterError());
    }
  );
});

gulp.task('eslint', map(lintingDirs, (dir) => sprintf('eslint-%s', dir)));
