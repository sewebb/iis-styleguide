module.exports = {
	status: 'ready',

	context: {
		disabled: false
	},
	variants: [
		{
			name: 'Disabled',
			context: {
				disabled: true
			}
		}
	]
};
