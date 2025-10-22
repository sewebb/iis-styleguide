module.exports = {
	status: 'wip',

	context: {
		has_label: true,
		value: '40',
		max: '100',
		max_width: false,
		additional_classes: false,
		meter: false
	},
	variants: [
		{
			name: 'Heat',
			context: {
				heat: true,
				meter: false,
				value: '100',
				hidden_label: true
			}
		},
		{
			name: 'Meter',
			context: {
				meter: true
			}
		}
	]
};
