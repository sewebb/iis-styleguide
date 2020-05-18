const fs = require('fs');

let sprite = fs.readFileSync(`${__dirname}/src/_icon-sprite.hbs`);
sprite = sprite.toString().replace(/ /g, '').replace(/\n/g, '').split('id="');

const icons = sprite.map((icon) => {
	if (icon.substr(0, 4) === 'icon') {
		const id = icon.substr(0, icon.indexOf('"')).replace('icon-', '');

		return {
			id,
			name: id.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
		};
	}

	return undefined;
}).filter(Boolean);

fs.writeFileSync(`${__dirname}/src/configurations/icons.json`, JSON.stringify(icons), 'utf-8');
