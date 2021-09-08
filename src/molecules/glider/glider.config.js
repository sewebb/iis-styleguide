module.exports = {
	status: 'ready',

	context: {
		dots: false,
	},
	variants: [
		{
			name: 'With dots',
			context: {
				dots: true
			}
		},
		{
			name: 'Single',
			status: 'wip',
			context: {
				single: true
			}
		}
	]
}
