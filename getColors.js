const sass = require('node-sass');
const sassExtract = require('sass-extract');
const colors = {};

const rendered = sass.renderSync({
	file: 'src/components/colors/_colors.scss'
});

const vars = sassExtract.extractSync(rendered, {
	file: 'src/components/colors/_colors.scss'
});

for (var prop in vars.global) {
	colors[prop] = vars.global[prop].value.hex;
	console.log(colors[prop]);
}

module.exports = colors;
