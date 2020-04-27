module.exports = {
	status: 'ready',

	context: {
		url: 'http://www.iis.se',
		link_text: 'Nätneutraliteten och den svenska lagstiftningen',
		background_image: '/assets/images/KPA_5090-5-4.jpg',
		icon: 'arrow-forwards',
		alt: 'Hands typing on laptop',
		img_url: '/assets/images/ALX_0876.jpg',
		title: 'Gymnasieskolor med hög bandbredd har bättre skolresultat',
		is_padded: true,
		is_wide: true,
		has_shadow: false,
		has_button: false,
		read_time: true
	},

	variants: [
			{
		name: 'excerpt-button',
		context: {
			content_text: 'Nätneutraliteten och den svenska lagstiftningen',
			excerpt: 'Eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Faucibus a pellentesque sit amet porttitor.',
			button_text: 'lorem ipsum',
			button_url: 'http://www.iis.se',
			role: "excerpt-button",
			excerpt_button: true,
			}
		}
	]
}
