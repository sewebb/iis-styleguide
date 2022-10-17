module.exports = {
	status: 'ready',

	context: {
		text: '2018-11-26',
		icon: false,
		is_light: false,
		lowercase: false,
		additional_classes: false,
	},
	variants: [
		{
			name: 'light',
			context: {
				is_light: true
			}
		},
		{
			name: 'With icon',
			context: {
				text: 'poddradio',
				icon: 'play',
			}
		},
		{
			name: 'colored icon',
			context: {
				text: 'artikel',
				icon: 'article',
				color: 'ruby',
			}
		},
		{
			name: 'Lower case',
			context: {
				text: '20 min <span class="u-hide-sm">läsning</span>',
				icon: 'time',
				lowercase: true,
			}
		},
	]
}
