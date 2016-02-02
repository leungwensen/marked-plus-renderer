/**
 * Created by liangwensen on 1/20/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var webpack = require('webpack');

var webpackConf = require(path.resolve(__dirname, '../webpack.config'));
var webpackDevConf = require(path.resolve(__dirname, '../webpack-dev.config'));

gulp.task('dev', function (done) {
    var WebpackDevServer = require('webpack-dev-server');
    var compiler = webpack(webpackDevConf);
    var devSvr = new WebpackDevServer(compiler, {
        contentBase: webpackConf.output.path,
        publicPath: webpackDevConf.output.publicPath,
        hot: true,
        stats: webpackDevConf.devServer.stats,
    });

    devSvr.listen(8080, '0.0.0.0', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);

        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');

        // keep the devSvr alive
        // done();
    });
});
