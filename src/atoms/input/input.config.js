module.exports = {
	status: 'ready',

	context: {
		label: 'Namn',
		type: 'text',
		id: 'name',
		value: false,
		placeholder: 'Förnamn',
		autocomplete: 'off',
		has_icon: true,
		required: false,
		disabled: false
	},
	variants: [
		{
			name: 'Help text',
			context: {
				required: false,
				has_help: true
			}
		},
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
				required: true
			}
		}
	]
}
