const gulp = require('gulp');
const log = require('./utils/log');

module.exports = function copy(opts) {
	return function copy() {
		return gulp.src(opts.from)
			.on('error', log.err(`${log.red('err:')} ${opts.task}`))
			.pipe(gulp.dest(opts.to))
			.pipe(log(`${log.green('success:')} ${opts.task}`));
	};
};