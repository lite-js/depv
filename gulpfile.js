/* jshint undef: true, unused: true, node: true */
/* global require */

var
    gulp        = require('gulp'),
    gulputil    = require('gulp-util'),
    less        = require('gulp-less'),
    // pastry      = require('pastry'),

    files = {
        less: {
            all   : 'less/*.less',
            style : 'less/style.less'
        },
        css: {
            style: 'css/style.css'
        }
    },

    paths = {
        less : 'less/',
        css  : 'css/'
    };

gulp.task('less', function () {
    return gulp
        .src(files.less.style)
        .pipe(less().on('error', function (e) {
            gulputil.log(e);
        }))
        .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function () {
    gulp.watch(files.less.all, ['less']);
});

