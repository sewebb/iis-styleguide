module.exports = {
	status: "ready",

	context: {
		id: false,
		alt: "Hands typing on laptop",
		img_url: "/assets/images/ALX_0876.jpg",
		title: "Gymnasieskolor med hög bandbredd har bättre skolresultat",
		url: "http://www.google.se",
		excerpt:
			"Eget nulla <strong>facilisi etiam</strong> dignissim diam quis enim lobortis scelerisque. Faucibus a pellentesque sit amet porttitor.",
		is_padded: true,
		is_wide: true,
		has_shadow: false,
		has_button: false,
		has_border: false,
		has_meta: true,
		read_time: true,
		date: true,
		has_map: false,
		has_contact_info: false,
		has_icon_overlay: false,
		overlay_icon: false,
		teaser: false,
		top_level: false,
		icon: false,
		button_color: false,
		button_text: 'Button',
		modifier: false
	},
	variants: [
		{
			name: "Without meta",
			context: {
				has_meta: false,
			},
		},
		{
			name: "With button",
			context: {
				has_button: true,
			},
		},
		{
			name: "With map and contact",
			context: {
				has_meta: false,
				img_url: false,
				url: false,
				exerpt: false,
				has_map: true,
				has_contact_info: true,
			},
		},
		{
			name: "With Youtube video",
			context: {
				date: false,
				youtube: 'n8hPhZwV8a0',
				read_time: false,
				has_icon_overlay: true,
				url: false,
				img_url: false,
				top_level: true
			},
		},
		{
			name: "Teaser",
			context: {
				teaser: true,
				has_meta: true,
				img_url: '/assets/images/KPA_5090-5-4.jpg',
				is_wide: false,
				is_padded: false,
				top_level: true,
				icon: 'arrow-forwards',
				title: 'Nätneutraliteten och den svenska lagstiftningen',
				excerpt: false,
			},
		},
		{
			name: "Teaser with excerpt",
			context: {
				teaser: true,
				has_meta: false,
				img_url: '/assets/images/KPA_5090-5-4.jpg',
				is_wide: false,
				is_padded: false,
				top_level: true,
				icon: 'arrow-forwards',
				title: 'Nätneutraliteten och den svenska lagstiftningen',
			},
		},
		{
			name: "Teaser with button and excerpt",
			context: {
				teaser: true,
				has_meta: false,
				img_url: '/assets/images/KPA_5090-5-4.jpg',
				is_wide: false,
				is_padded: false,
				top_level: true,
				icon: false,
				title: 'Nätneutraliteten och den svenska lagstiftningen',
				has_button: true,
				button_color: 'lemon',
				url: false,
			},
		},
	],
};
