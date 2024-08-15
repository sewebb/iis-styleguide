module.exports = {
	status: 'ready',
	default: 'Toggle text',

	context: {
		target_id: 'boo',
		external_target: false,
		toggle_text: true,
		toggle_text_primary_value: 'Toggle text',
		toggle_icon: false,
	},
	variants: [
		{
			name: 'External target',
			context: {
				target_id: 'boo',
				external_target: true,
				toggle_text_primary_value: 'Toggle text',
				toggle_text_secondary_value: 'I am an external target',
				toggle_text: true,
				toggle_icon: false,
			}
		},
		{
			name: 'Toggle icon',
			context: {
				target_id: 'boo',
				external_target: false,
				toggle_text_primary_value: 'Toggle icon',
				toggle_text: false,
				toggle_icon: true,
			}
		},
		{
			name: 'Toggle text and icon',
			context: {
				target_id: 'boo',
				external_target: false,
				toggle_text_primary_value: 'Toggle text and icon ',
				toggle_text: true,
				toggle_icon: true,
			}
		},
	]
}
