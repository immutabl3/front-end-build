const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const scopeSelector = require('postcss-scope-selector');
const mqpacker = require('css-mqpacker');
const minify = require('gulp-cssnano');
const gulpif = require('gulp-if');
const log = require('./utils/log');
const rename = require('./utils/rename');
const {
	watch,
	production
} = require('./utils/env');

module.exports = function scripts(opts) {
	return function scripts() {
		const {
			source,
			map,
			file,
			dest,
			browsers = ['last 2 version'],
			selectorScope = ['.no-touchevents', ':hover']
		} = opts;

		const build = function() {
			return gulp.src(source)
				.on('error', log.err(log.red('err: styles')))
				.pipe(gulpif(!production, sourcemaps.init()))
				.pipe(sass().on('error', sass.logError))
				.pipe(postcss([
					autoprefixer({ browsers }),
					mqpacker({ sort: true }),
					scopeSelector(...selectorScope)
				]))
				.pipe(gulpif(!production, sourcemaps.write(map)))
				.pipe(gulpif(production, minify()))
				.pipe(rename(file))
				.pipe(gulp.dest(dest))
				.pipe(log(`${log.green('success:')} ${file}`));
		};

		if (watch) {
			gulp.watch(opts.watch, build);
			log.message(log.green('watching styles'));
		}

		return build();
	};
};