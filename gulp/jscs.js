/**
 * Created by liangwensen on 1/25/16.
 */
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var path = require('path');

gulp.task('jscs', [
    'template'
], function () {
    return gulp.src([
            path.resolve(__dirname, '../src/**/*js')
        ])
        .pipe(jscs({
            fix: true
        }))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest(path.resolve(__dirname, '../src/')));
});
