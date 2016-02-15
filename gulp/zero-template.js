'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var template = require('zero-text/template');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit(
                'error',
                new gutil.PluginError('zero-template', 'Streaming not supported')
            );
        }

        try {
            file.contents = new Buffer(
                'export default ' +
                template.compile(file.contents.toString('utf8')).toString() +
                ';'
            );

            file.path = gutil.replaceExtension(file.path, '.js');
        } catch (err) {
            this.emit('error', new gutil.PluginError('zero-template', err.toString()));
        }

        this.push(file);
        cb();
    });
};
