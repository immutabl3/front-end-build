var through  = require('through2');
var gulpUtil = require('gulp-util');

var log = function(message) {
    return through.obj(function(file, enc, callback) {
        this.push(file);

        gulpUtil.log(message);
        callback();
    });
};

var color = function(color) {
    return function(message) {
        return gulpUtil.colors[color](message);
    };
};

module.exports = Object.assign(log, {
    message: function(message) {
        return gulpUtil.log(message);
    },

    err: function(message) {
        return function(e) {
            gulpUtil.log(message);
            throw e;
        };
    },

    // all available text colors
    black:   color('black'),
    red:     color('red'),
    green:   color('green'),
    yellow:  color('yellow'),
    blue:    color('blue'),
    magenta: color('magenta'),
    cyan:    color('cyan'),
    white:   color('white'),
    gray:    color('gray'),

    beep: function() {
        gulpUtil.beep();
    }
});
