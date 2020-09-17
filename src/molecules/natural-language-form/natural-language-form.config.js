module.exports = {
	status: 'wip',
	default: 'select',

	context: {
		title: 'select',
		textElement: 'h1',
		elementClass: 'supersize'

	},

	variants: [
		{
		name: 'Other text element',
			context: {
				textElement: 'h2',
				elementClass: false
			}
		}
	]
}
