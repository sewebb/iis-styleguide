module.exports = {
	status: 'prototype',

	context: {
		legend: 'Radiobutton advanced',
		name: 'radiobutton-advanced',
		options: [
			{
				id: 'radiobutton-advanced-1',
				label: 'First option',
				description: 'Use this option for the default flow.',
				value: 'first'
			},
			{
				id: 'radiobutton-advanced-2',
				label: 'Second option',
				description: 'Use this option when extra context is needed.',
				value: 'second'
			},
			{
				id: 'radiobutton-advanced-3',
				label: 'Third option',
				description: 'Use this option for an alternative advanced choice.',
				value: 'third'
			}
		]
	},

	variants: [
		{
			name: 'Disabled',
			context: {
				is_disabled: true
			}
		},
		{
			name: 'Invalid',
			context: {
				is_invalid: true,
				is_required: true
			}
		}
	]
};
