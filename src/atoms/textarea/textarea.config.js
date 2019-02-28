module.exports = {
	status: 'ready',

	context: {
		label: 'Meddelande',
		labelClasses: 'is-required',
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
			name: 'Invalid',
			context: {
				is_invalid: true,
				required: true
			}
		}
	]
}
