const fs = require('fs');
let sprite = fs.readFileSync(__dirname + '/../../_icon-sprite.hbs');
sprite = sprite.toString().replace(/ /g, '').replace(/\n/g, '').split('id="');
const icons = [];

for (let i = 0; i < sprite.length; i++) {
	if (sprite[i].substr(0, 4) === 'icon') {
		icons.push({
			id: sprite[i].substr(0, sprite[i].indexOf('"')).replace('icon-', '')
		});
	}
}

module.exports = {
	status: 'ready',
	title: 'Icons',

	collated: true,

	preview: '@layout-icons',

	collator: function(markup, item) {
		if (item.isDefault) {
			return ''; // Don't render default empty icon
		}
		return `<div class="icon-wrapper">${markup}</div>`;
	},

	context: {
		additional_classes: '',
		fill: '',
		aria_labelledby: '',
		role: false
	},

	variants: icons.map((icon) => {
		const {id} = icon;
		return {
			name: id,
			context: {
				id: id
			}
		};
	})
};
