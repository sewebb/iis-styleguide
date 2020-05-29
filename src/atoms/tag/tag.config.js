module.exports = {
	status: 'ready',

	context: {
		text: 'cyberspace',
		href: '#'
	},
	variants: [
		{
			name: 'Light',
			context: {
				text: 'light',
				href: '#',
				is_light: true
			}
		},
		{
			name: 'Background',
			context: {
				text: 'background',
				href: '#',
				is_light: false,
				background_color: 'jade'
			}
		},
		{
			name: 'Combined',
			context: {
				text: 'combined',
				href: '#',
				is_light: true,
				background_color: 'ruby'
			}
		}
	]
}
