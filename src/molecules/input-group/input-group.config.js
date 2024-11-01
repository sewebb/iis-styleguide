module.exports = {
	status: 'wip',

	context: {
		type: 'url',
		placeholder: 'Website',
		before: 'https://',
		after: null,
		multipleInputs: false,
	},
	variants: [
		{
			name: 'With after',
			context: {
				type: 'email',
				placeholder: 'firstname.lastname',
				before: null,
				after: '\\@internetstiftelsen.se',
			},
		},
		{
			name: 'With before and after',
			context: {
				type: 'number',
				placeholder: 'Amount',
				before: '$',
				after: '.00',
			},
		},
		{
			name: 'Multiple inputs',
			context: {
				multipleInputs: true,
			},
		},
	],
};
