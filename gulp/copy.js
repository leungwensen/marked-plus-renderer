/**
 * Created by liangwensen on 1/26/16.
 */
var gulp = require('gulp');
var path = require('path');

gulp.task('copy', function () {
    gulp.src([
            path.resolve(__dirname, '../node_modules/flowchart.js/release/*.js'),
            path.resolve(__dirname, '../node_modules/flowchart.js/release/*.map'),
            path.resolve(__dirname, '../node_modules/github-markdown-css/github-markdown.css'),
            path.resolve(__dirname, '../node_modules/mermaid/dist/*.css'),
            path.resolve(__dirname, '../node_modules/mermaid/dist/mermaid.min.js'),
            path.resolve(__dirname, '../node_modules/mermaid/dist/*.map'),
            path.resolve(__dirname, '../node_modules/raphael/raphael.js'),
            path.resolve(__dirname, '../node_modules/raphael/raphael-min.js'),
            path.resolve(__dirname, '../node_modules/katex-all/dist/katex.min.css')
        ])
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/lib/')));
    gulp.src([
            path.resolve(__dirname, '../node_modules/highlight.js/styles/*.css')
        ])
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/lib/highlight-styles')));
    gulp.src([
            path.resolve(__dirname, '../node_modules/katex-all/dist/fonts/*')
        ])
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/lib/fonts/')));
    gulp.src([
            path.resolve(__dirname, '../node_modules/katex-all/dist/fonts/*')
        ])
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/fonts/')));
});
