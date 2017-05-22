const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const scopeSelector = require('postcss-scope-selector');
const mqpacker = require('css-mqpacker');
const minify = require('gulp-cssnano');
const gulpif = require('gulp-if');
const through = require('through2');
const log = require('./utils/log');
const {
	watch,
	production
} = require('./env');
const prefix = '.no-touchevents';
const selector = ':hover';

const rename = function(originalName) {
	const name = path.basename(originalName, '.css');

	return through.obj(function(file, enc, callback) {
		// do nothing if no contents
		if (file.isNull()) { return callback(null, file); }

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('template:compile', 'Streaming not supported'));
			return callback();
		}

		const ext = path.extname(file.path) === '.map' ? '.css.map' : '.css';
		const basename = name + ext;
		const dirname = path.dirname(file.path);

		file.path = path.join(dirname, basename);

		return callback(null, file);
	});
};

module.exports = function scripts(opts) {
	return function scripts() {
		const build = function() {
			return gulp.src(opts.source)
				.on('error', log.err(log.red('err: styles')))
				.pipe(gulpif(!production, sourcemaps.init()))
				.pipe(sass().on('error', sass.logError))
				.pipe(postcss([
					autoprefixer({
						browsers: [
							'last 2 version'
						]
					}),
					mqpacker({
						sort: true
					}),
					scopeSelector(prefix, selector)
				]))
				.pipe(gulpif(!production, sourcemaps.write(opts.map)))
				.pipe(gulpif(production, minify()))
				.pipe(rename(opts.file))
				.pipe(gulp.dest(opts.dest))
				.pipe(log(`${log.green('success:')} ${opts.file}`));
		};

		if (watch) {
			gulp.watch(opts.watch, build);
			log.message(log.green('watching styles'));
		}

		return build();
	};
};