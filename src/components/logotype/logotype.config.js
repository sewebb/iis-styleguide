const fs = require('fs');
let sprite = fs.readFileSync(__dirname + '/../../_logotype-sprite.hbs');
sprite = sprite.toString().replace(/\ /g, '').replace(/\n/g, '').split('id="');
const logotypes = [];

for (let i = 0; i < sprite.length; i++) {
	if (sprite[i].substr(0, 8) === 'logotype') {
		logotypes.push({
			id: sprite[i].substr(0, sprite[i].indexOf('"')).replace('logotype-', '')
		});
	}
}

module.exports = {
	status: 'wip',
	title: 'Logotype',

	collated: true,

	preview: '@layout-logotypes',

	collator: function(markup, item) {
		return `<div class="logotype-wrapper">${markup}</div>`
	},

	context: {
		additional_classes: ''
	},

	variants: logotypes.map((logotype) => {
		const {id} = logotype;
		return {
			name: id,
			context: {
				id: id
			}
		};
	})
};
