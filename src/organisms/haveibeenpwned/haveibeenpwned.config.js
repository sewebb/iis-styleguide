module.exports = {
	status: 'wip',

	context: {
		result: false
	},
	variants: [
		{
			name: 'With result',
			context: {
				result: true,
				hits: true
			}
		},
		{
			name: 'No leaks',
			context: {
				result: true,
				hits: false
			}
		}
	]
};
