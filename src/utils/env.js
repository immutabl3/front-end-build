const { argv } = require('yargs');
const watch = argv._.length ? argv._[0] === 'watch' : false;
const {
	production = false,
	silent = false
} = argv;

const isProduction = production || process.env.NODE_ENV === 'production';

module.exports = {
	watch,
	silent,
	production: isProduction
};