import gulp from 'gulp';

gulp.task('template', ['template2module']);

gulp.task('default', [
  'babel',
  'template2module',
  'watch',
]);

