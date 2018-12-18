module.exports = {
	status: 'wip',

	context: {
		name: 'Checkbox default',
		id: 'radiobutton-0',
		label: 'Checkbox',
		value: '0',
		is_inline: false,
		is_disabled: false
	},

	variants: [
		{
			name: 'Checkbox inline',
			context: {
				id: 'checkbox-1',
				label: 'Checkbox inline',
				value: '1',
				is_inline: true,
				is_disabled: false
			}
		},
		{
			name: 'Checkbox disabled',
			context: {

				id: 'checkbox-2',
				label: 'Checkbox disabled',
				value: '2',
				is_inline: false,
				is_disabled: true
			}
		}
	]
}
