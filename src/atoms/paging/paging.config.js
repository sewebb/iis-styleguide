module.exports = {
	status: 'wip',

	context: {
		text: 'Paging',
		modifiers: ['icon'],
		icon: 'arrow-down'
	},
	variants: [
		{
			name: 'Forwards',
			context: {
				text: 'Framåt',
				modifiers: ['icon'],
				icon: 'arrow-forwards'
			}
		},
		{
			name: 'Backwards',
			context: {
				text: 'Bakåt',
				modifiers: ['icon'],
				icon: 'arrow-backwards'
			}
		}
	]
}
