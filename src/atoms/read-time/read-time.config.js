module.exports = {
	status: 'ready',

	context: {
		time: '20 min',
		reading: 'läsning'
	},
	variants: [
		{
			name: 'Light',
			context: {
				time: '20 min',
				reading: 'läsning',
				is_light: true
			}
		}
	]
}
