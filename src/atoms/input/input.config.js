module.exports = {
	status: 'ready',

	context: {
		label: 'Namn',
		type: 'text',
		id: 'name',
		value: false,
		placeholder: 'Förnamn',
		autocomplete: 'off',
		has_icon: false,
		required: false,
		disabled: false
	},
	variants: [
		{
			name: 'Help text',
			context: {
				required: false,
				has_help: false,
				has_icon: false
			}
		},
		{
			name: 'With icon',
			context: {
				label: 'Sök',
				placeholder: 'Söktext',
				required: false,
				has_icon: true
			}
		},
		{
			name: 'Disabled',
			context: {
				is_disabled: true,
				has_icon: false
			}
		},
		{
			name: 'Invalid',
			context: {
				is_invalid: true,
				required: true,
				has_icon: false
			}
		},
		{
			name: 'Discreet',
			context: {
				modifier: 'a-input--discreet',
				has_icon: false
			}
		}
	]
}
