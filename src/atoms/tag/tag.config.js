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
			name: 'Background variation',
			context: {
				text: 'background',
				href: '#',
				is_light: false,
				border: true,
				border_color: 'ocean',
				background_color: 'ocean',
				hover_color: 'light',
				color: 'ocean'
			}
		},
		{
			name: 'Border variation',
			context: {
				text: 'border',
				href: '#',
				is_light: false,
				border: true,
				border_color: 'sandstone',
				background_color: 'sandstone-light',
				hover_color: 'light',
				color: 'sandstone'
			}
		},
		{
			name: 'With right icon',
			context: {
				text: 'with right icon',
				href: '#',
				icon: 'pin',
				icon_align_right: true,
				is_light: false,
				border: true,
				border_color: 'lemon',
				background_color: 'lemon-light',
				hover_color: 'dark',
				color: 'lemon'
			}
		},
		{
			name: 'With left icon',
			context: {
				text: 'with left icon',
				href: '#',
				icon: 'pin',
				icon_align_left: true,
				is_light: false,
				border: true,
				border_color: 'jade',
				background_color: 'jade-light',
				hover_color: 'dark',
				color: 'jade'
			}
		}
	]
}