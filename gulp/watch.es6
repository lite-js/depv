import {
    resolve
} from 'path';

import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import sprintf from 'zero-fmt/sprintf';
import {
    each,
    map
} from 'zero-lang';

import {
    scriptDirs
} from './config'

gulp.task('watch', () => {
    // watch script directories
    each(scriptDirs, (dir) => {
        gulp.watch(resolve(__dirname, sprintf('../%s/**/*.es6', dir)), [sprintf('babel-%s', dir)]);
    });
});

