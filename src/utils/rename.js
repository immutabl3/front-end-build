const path = require('path');
const gutil = require('gulp-util');
const through = require('through2');

module.exports = function rename(originalName) {
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