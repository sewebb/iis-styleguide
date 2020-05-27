module.exports = {
	status: 'ready',

	context: {
		label: 'Meddelande',
		placeholder: 'Meddelande',
		id:'message',
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
		},
		{
			name: 'Discreet',
			context: {
				modifier: 'a-input--discreet',
				has_icon: false
			}
		},
		{
			name: 'Rich text',
			context: {
				is_richtext: true,
			}
		}
	]
}
