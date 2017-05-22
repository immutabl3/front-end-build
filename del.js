const delet = require('del');
const Promise = require('bluebird');

module.exports = function del(globs) {
	return function del() {
		return typeof globs === 'string' ?
			delet(globs) :
			Promise.all(globs.map(glob => delet(glob)));
	};
};