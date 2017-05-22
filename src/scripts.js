const gulp = require('gulp');
const gulpif = require('gulp-if');
const babelify = require('babelify');
const watchify = require('watchify');
const envify = require('envify/custom');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const unpathify = require('bundle-collapser/plugin');
const uglify = require('gulp-uglify');
const log = require('./utils/log');
const {
	watch,
	production
} = require('./utils/env');

module.exports = function styles(opts) {
	return function styles() {
		const {
			env = {},
			noparse = [],
			cache = {},
			packageCache = {},
			file,
			dest
		} = opts;

		let stream = browserify(opts.source, {
			noparse,
			cache,
			packageCache,
			debug: !production,
		})
		.transform(babelify)
		.transform(
			envify(
				Object.assign({
					NODE_ENV: production ? 'production' : 'development'
				}, process.env, env)
			)
		);

		if (production) {
			stream = stream.plugin(unpathify);
		}

		const build = function() {
			return stream.bundle()
				.on('error', log.err(log.red('err: scripts')))
				.pipe(source(file))
				.pipe(gulpif(production, buffer()))
				.pipe(gulpif(production, uglify()))
				.pipe(gulp.dest(dest))
				.pipe(log(`${log.green('success:')} ${file}`));
		};

		if (watch) {
			stream = watchify(stream);
			stream.on('update', build);
			log.message(log.green('watching scripts'));
		}

		return build();
	};
};
