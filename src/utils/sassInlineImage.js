// Credit to:
// https://coderwall.com/p/fhgu_q/inlining-images-with-gulp-sass
const fs = require('fs');
const path = require('path');
const types = require('node-sass').types;

const svg = function(buffer) {
	const svg = buffer.toString()
		.replace(/\n/g, '')
		.replace(/\r/g, '')
		.replace(/#/g, '%23')
		.replace(/"/g, '\'');

	return `"data:image/svg+xml;utf8,${svg}"`;
};

const img = function(buffer, ext) {
	return `"data:image/${ext};base64,${buffer.toString('base64')}"`;
};

module.exports = function(options = {}) {
	const base = options.base || process.cwd();
	return {
		'inline-image($file)': file => {
			// we want to file relative to the base
			const relativePath = `./${file.getValue()}`;
			const filePath = path.resolve(base, relativePath);

			// get the file ext
			const ext = filePath.split('.').pop();

			// read the file
			const data = fs.readFileSync(filePath);

			const buffer = new Buffer(data);
			const str = ext === 'svg' ? svg(buffer, ext) : img(buffer, ext);
			return types.String(str);
		}
	};
};