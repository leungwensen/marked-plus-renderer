/**
 * Created by liangwensen on 1/26/16.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var webpack = require('webpack');

var webpackConf = require(path.resolve(__dirname, '../webpack.config'));

gulp.task('pack', [
    'copy',
    'jscs'
], function (done) {
    webpack(webpackConf, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        done();
    });
});
