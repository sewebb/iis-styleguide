module.exports = {
	status: 'ready',

	context: {
		label: 'Namn',
		labelClasses: 'is-required',
		type: 'text',
		select_id: 'select-id',
		textarea_id: 'textarea-id',
		value: false,
		placeholder: 'Förnamn',
		autocomplete: 'off',
		has_icon: true,
		required: true,
		disabled: false,
		button_type: 'button',
		button_text: 'Sök',
		checkbox_value: '1',
		checkbox_id: 'checkbox',
		checkbox_name: 'checkbox',
		radiobutton_id: 'radiobutton',
		radiobutton_name: 'radiobutton',
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
			name: 'Large',
			context: {
				modifier_class: 'm-form-control--large',
				checkbox_id: 'checkbox-large',
				checkbox_name: 'checkbox-large',
				radiobutton_id: 'radiobutton-large',
				radiobutton_name: 'radiobutton-large'
			}
		},
		{
			name: 'Small',
			context: {
				modifier_class: 'm-form-control--small',
				checkbox_id: 'checkbox-small',
				checkbox_name: 'checkbox-small',
				radiobutton_id: 'radiobutton-small',
				radiobutton_name: 'radiobutton-small'
			}
		}
	]
};
