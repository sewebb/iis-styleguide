module.exports = {
	status: 'ready',

	context: {
		default_value: null,
		add: false,
	},

	variants: [
		{
			name: 'default',
		},
		{
			name: 'pre selected',
			context: {
				default_value: 'stockholm'
			}
		},
		{
			name: 'custom items',
			context: {
				add: true
			}
		}
	]
};
