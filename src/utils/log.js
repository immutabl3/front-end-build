const through = require('through2');
const gulpUtil = require('gulp-util');
const { silent } = require('./env');

const log = function(message) {
	return through.obj(function(file, enc, callback) {
		this.push(file);

		gulpUtil.log(message);
		callback();
	});
};

const color = function(color) {
	return function(message) {
		return gulpUtil.colors[color](message);
	};
};

module.exports = Object.assign(log, {
	message(message) {
		return gulpUtil.log(message);
	},

	err(message) {
		return function(e) {
			gulpUtil.log(message);
			!silent && gulpUtil.beep();
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

	beep() {
		gulpUtil.beep();
	}
});
