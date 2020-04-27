module.exports = {
	status: "ready",

	context: {
		alt: "Hands typing on laptop",
		img_url: "/assets/images/ALX_0876.jpg",
		title: "Gymnasieskolor med hög bandbredd har bättre skolresultat",
		url: "http://www.google.se",
		exerpt:
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
			name: "With image overlay icon",
			context: {
				date: true,
				read_time: false,
				has_icon_overlay: true,
				overlay_icon: "play",
			},
		},
	],
};
