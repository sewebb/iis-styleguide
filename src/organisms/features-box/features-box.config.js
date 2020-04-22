module.exports = {
	status: "wip",
	context: {
		headline: false,
		large: false,
	},
	variants: [
		{
			name: "With headline",
			context: {
				headline: true,
			},
		},
		{
			name: "With larger text",
			context: {
				large: true,
			},
		},
	],
};
