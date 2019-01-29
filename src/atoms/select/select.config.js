module.exports = {
	status: 'wip',

	context: {
		label: 'Select',
		labelClasses: 'is-required',
		id:'select',
		has_icon: true,
		modifier: false,
		required: false,
		disabled: false,
		options: [
			{
				value: '',
				text:'Välj',
				is_disabled: true,
				is_selected: true
			},
			{
				value: 'value-1',
				text:'Option 1',
				is_disabled: false,
				is_selected: false
			},
			{
				value: 'value-2',
				text:'Option 2',
				is_disabled: false,
				is_selected: false
			},
			{
				value: 'value-3',
				text:'Option 3',
				is_disabled: false,
				is_selected: false
			},
			{
				value: 'value-4',
				text:'Option 4',
				is_disabled: false,
				is_selected: false
			}
		]
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
