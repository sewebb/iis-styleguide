module.exports = {
	status: 'ready',

	context: {
		color: null,
		modifier: null,
	},
	variants: [
		{
			name: 'alignfull',
			context: {
				class: 'alignfull',
				color: 'color-cyberspace',
				modifier: 'alignfull',
			}
		},
		{
			name: 'alignwide',
			context: {
				class: 'alignwide',
				color: 'color-cyberspace',
				modifier: 'alignwide',
			}
		},
		{
			name: 'aligncenter',
			context: {
				class: null,
				color: 'color-cyberspace',
				modifier: 'aligncenter',
			}
		},
		{
			name: 'alignleft',
			context: {
				class: null,
				color: 'has-cyberspace-color',
				modifier: 'alignleft',
			}
		}
	]
};
