module.exports = {
	status: 'ready',

	context: {
		heading: 'There is nothing quite so permanent as a quick fix',
		text: 'Internetstiftelsen lanserar ett nytt innovativt verktyg för att avslöja trollen på internet. Och nu behöver vi behöver din hjälp att jaga trollen.',
		has_image: true,
		has_radius: false
	},
	variants: [
		{
			name: 'No image',
			context: {
				no_image_class: 'o-hero--no-image',
				has_image: false
			}
		}
	]
}
