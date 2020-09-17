module.exports = {
	status: 'wip',
	default: 'select',

	context: {
		title: 'select',
		select: true,
		textElement: 'h1',
		elementClass: 'supersize'

	},

	variants: [
		{
		name: 'Other text element',
			context: {
				select: true,
				textElement: 'h2',
				elementClass: false
			}
		},
		{
		name: 'Input',
			context: {
				select: false,
				textElement: 'h1',
				elementClass: false
			}
		}
	]
}
