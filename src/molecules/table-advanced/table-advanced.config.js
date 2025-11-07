module.exports = {
	status: 'wip',
	default: 'Small table',

	context: {
		json: './table-small.json',
		minHeight: '345px',
		id: 'tableSmall',
		expandable: false
	},
	variants: [
		{
			name: 'Large table',
			context: {
				json: './table.json',
				minHeight: '600px',
				id: 'tableLarge',
				expandable: true
			}
		},
	],
};
