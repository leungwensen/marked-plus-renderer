/**
 * Created by liangwensen on 1/26/16.
 */
var gulp = require('gulp');

gulp.task('build', [
    'pack'
], function (done) {
    done();
});

gulp.task('default', [
    'build'
], function (done) {
    done();
});

