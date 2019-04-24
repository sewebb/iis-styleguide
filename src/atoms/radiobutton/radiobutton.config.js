module.exports = {
	status: 'ready',

	context: {
		name: 'Radio button default',
		id: 'radiobutton-0',
		label: 'Radiobutton',
		value: '0',
		is_inline: false,
		is_disabled: false
	},

	variants: [
		{
			name: 'Radio button inline',
			context: {
				id: 'radiobutton-1',
				label: 'Radio button inline',
				value: '1',
				is_inline: true,
				is_disabled: false
			}
		},
		{
			name: 'Radio button disabled',
			context: {

				id: 'radiobutton-2',
				label: 'Radio button disabled',
				value: '2',
				is_inline: false,
				is_disabled: true
			}
		},
		{
			name: 'Radio button invalid',
			context: {

				id: 'radiobutton-3',
				label: 'Radio button invalid',
				value: '3',
				is_inline: false,
				is_invalid: true
			}
		}
	]
}
