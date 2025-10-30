module.exports = {
	status: 'wip',
	default: 'Small table',

	context: {
		json: './table-small.json',
		minHeight: '345px',
		id: 'tableSmall'
	},
	variants: [
		{
			name: 'Large table',
			context: {
				json: './table.json',
				minHeight: '600px',
				id: 'tableLarge'
			}
		},
	],
};
