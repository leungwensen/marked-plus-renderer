/**
 * Created by liangwensen on 1/20/16.
 */
var gulp = require('gulp');
var compileTemplate = require('./zero-template');
var gutil = require('gulp-util');
var path = require('path');

gulp.task('template', function () {
    return gulp.src([
            path.resolve(__dirname, '../theme/src/template/*.html')
        ])
        .pipe(compileTemplate())
        .pipe(gulp.dest(path.resolve(__dirname, '../theme/src/template/')));
});
