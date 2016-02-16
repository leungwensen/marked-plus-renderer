/**
 * Created by liangwensen on 1/25/16.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var path = require('path');

gulp.task('concat', [
    'pack'
], function () {
    gulp.src([
            path.resolve(__dirname, '../dist/lib/raphael-min.js'),
            path.resolve(__dirname, '../dist/lib/flowchart.min.js'),
            path.resolve(__dirname, '../dist/lib/mermaid.min.js')
        ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/')));

    gulp.src([
            path.resolve(__dirname, '../dist/lib/github-markdown.css'),
            path.resolve(__dirname, '../dist/lib/highlight-styles/default.css'),
            path.resolve(__dirname, '../dist/lib/katex.min.css'),
            path.resolve(__dirname, '../dist/lib/mermaid.css')
        ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/')));

    gulp.src([
            path.resolve(__dirname, '../dist/libs.js'),
            path.resolve(__dirname, '../dist/renderer.js')
        ])
        .pipe(concat('renderer.all.js'))
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/')));
});
