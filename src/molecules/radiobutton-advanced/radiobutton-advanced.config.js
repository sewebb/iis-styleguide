module.exports = {
	status: 'prototype',

	context: {
		legend: 'Vad vill du söka efter?',
		name: 'radiobutton-advanced',
		options: [
			{
				id: 'radiobutton-advanced-1',
				label: 'Domän',
				description: 'Sök efter .se eller .nu-domän.',
				value: 'first',
				placeholder: 't.ex. volvo.se'
			},
			{
				id: 'radiobutton-advanced-2',
				label: 'Nyckelord',
				description: 'Sök efter alla domäner med detta nyckelord.',
				value: 'second',
				placeholder: 't.ex. volvo'
			},
			{
				id: 'radiobutton-advanced-3',
				label: 'Organisationsnummer',
				description: 'Sök alla domäner registrerade med detta organisationsnummer.',
				value: 'third',
				placeholder: 't.ex. 556810-8988'
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
