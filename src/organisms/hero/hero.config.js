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
		},
		{
			name: 'Video',
			context: {
				no_image_class: 'o-hero--border-radius',
				video_class: 'o-hero--video',
				limited_width: true,
				has_video: true,
				has_image: false
			}
		}
	]
}
