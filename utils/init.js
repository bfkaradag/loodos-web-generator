const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = ({ clear = true }) => {
	unhandled();
	welcome({
		title: `loodos`,
		tagLine: `by bfkaradag`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#3AB0BF',
		color: '#FFF',
		bold: true,
		clear
	});
};
