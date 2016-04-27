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

each(scriptDirs, (dir) => {
    gulp.task(sprintf('babel-%s', dir), () =>
            gulp.src(resolve(__dirname, sprintf('../%s/**/*.es6', dir)))
                .pipe(babel({
                    presets: [
                        'es2015'
                    ]
                }))
                .on('error', console.error.bind(console))
                .pipe(rename((path) => {
                    path.extname = '.js';
                }))
                .pipe(gulp.dest(resolve(__dirname, sprintf('../%s/', dir))))
    );
});

gulp.task('babel', map(scriptDirs, (dir) => sprintf('babel-%s', dir)));
