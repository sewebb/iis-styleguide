module.exports = {
	status: 'wip',
	default: 'Links',

	context: {
		links: true,
	},
	variants: [
		{
			name: 'Buttons',
			context: {
				links: false,
			},
		},
	],
};
