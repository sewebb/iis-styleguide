module.exports = {
	status: 'ready',
	default: 'select',

	context: {
		title: 'Select',
		select: true,
		textElement: 'h1',
		elementClass: 'supersize',
		modifier: false,

	},

	variants: [
		{
		name: 'Select with arrow',
			context: {
				select: true,
				textElement: 'h1',
				elementClass: 'supersize',
				modifier:'arrow'
			}
		},
		{
		name: 'Other text element',
			context: {
				select: true,
				textElement: 'h2',
				elementClass: false,
				modifier: false,
			}
		},
		{
		name: 'Input',
			context: {
				select: false,
				textElement: 'h1',
				elementClass: false,
				modifier: false
			}
		}
	]
};
