const gulp = require('gulp');
const log = require('./utils/log');

module.exports = function copy({
	from,
	to,
	task = 'copy'
}) {
	return function copy() {
		return gulp.src(from)
			.on('error', log.err(`${log.red('err:')} ${task}`))
			.pipe(gulp.dest(to))
			.pipe(log(`${log.green('success:')} ${task}`));
	};
};