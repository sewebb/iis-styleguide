module.exports = {
	status: 'ready',

	context: {
		background_color: '#ffce2e',
		icon_fill_color: '#1f2a36',
		icon_background_hover_color: '#ffce2e',
	},
	variants: [
		{
			status: 'prototype',
			name: 'With icons',
			context: {
				has_sublevel: true,
				has_icons: true,
				sublevel_has_icon: true
			}
		},
		{
			name: 'With sublevel',
			context: {
				has_sublevel: true,
				sublevel_has_icon: false
			}
		}
	]
};
