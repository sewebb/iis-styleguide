module.exports = {
	status: 'ready',

	context: {
		label: 'Meddelande',
		placeholder: 'Meddelande',
		id:'message',
		required: false,
		disabled: false,
		button_primary_color: '#e0bff5',
		button_primary_hover_color: '#c27fec',
		button_primary_border_color: '#c27fec',
		button_primary_text_color: '#1f2a36',
		button_secondary_color: '#ff9fb4',
		button_secondary_hover_color: '#ff4069',
		button_secondary_border_color: '#ff4069',
		button_secondary_text_color: '#1f2a36',
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
			status: 'wip',
			context: {
				is_richtext: true,
				has_help: false
			}
		},
		{
			name: 'Counter (max)',
			status: 'wip',
			context: {
				is_richtext: false,
				has_help: false,
				max: 300,
			},
		},
		{
			name: 'Counter (min)',
			status: 'wip',
			context: {
				is_richtext: false,
				has_help: false,
				min: 30,
			},
		},
		{
			name: 'Counter (min and max)',
			status: 'wip',
			context: {
				is_richtext: false,
				has_help: false,
				min: 30,
				max: 300,
			},
		},
		{
			name: 'Rich text with counter',
			status: 'wip',
			context: {
				is_richtext: true,
				has_help: true,
				min: 30,
				max: 300,
			},
		}
	]
};
