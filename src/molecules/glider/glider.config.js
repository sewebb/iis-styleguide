module.exports = {
	status: 'wip',

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
			context: {
				single: true
			}
		}
	]
}
