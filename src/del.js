const delet = require('del');
const log = require('./utils/log');

module.exports = function del(globs, task = 'del') {
	return function del() {
		return Promise.resolve()
			.then(() => {
				return typeof globs === 'string' ?
					delet(globs) :
					Promise.all(globs.map(glob => delet(glob)));
			})
			.then(() => log.message(`${log.green('success:')} ${task}`));
	};
};