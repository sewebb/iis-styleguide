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
		excerpt: 'Eget nulla <strong>facilisi etiam</strong> dignissim diam quis enim lobortis scelerisque. Faucibus a pellentesque sit amet porttitor.',
		is_padded: true,
		is_wide: true,
		has_shadow: false,
		has_button: false,
		read_time: true,
		role: "default",
	},

	variants: [
			{
		name: 'excerpt-button',
		context: {
			url: false,
			content_text: 'Nätneutraliteten och den svenska lagstiftningen',
			background_image: '/assets/images/KPA_5090-5-4.jpg',
			icon: 'arrow-forwards',
			alt: 'Hands typing on laptop',
			img_url: '/assets/images/ALX_0876.jpg',
			title: 'Gymnasieskolor med hög bandbredd har bättre skolresultat',
			excerpt: 'Eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Faucibus a pellentesque sit amet porttitor.',
			button_text: 'lorem ipsum',
			button_url: 'http://www.iis.se',
			is_padded: true,
			is_wide: true,
			has_shadow: false,
			has_button: false,
			read_time: true,
			role: "excerpt-button",
			excerpt_button: true
			}
		}
	]
}
