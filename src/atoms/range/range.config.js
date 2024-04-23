module.exports = {
	status: 'wip',

	context: {
		label: 'Värde',
		id: 'value',
		disabled: false,
		value: '0',
		min: '0',
		max: '100',
		step: '1',
	},
	variants: [
		{
			name: 'Decimals',
			context: {
				disabled: false,
				value: '0',
				min: '0',
				max: '1',
				step: '0.01'
			}
		},
		{
			name: 'Minus value',
			context: {
				disabled: false,
				value: '0',
				min: '-100',
				max: '100',
				step: '01',
			}
		},
		{
			name: 'Disabled',
			context: {
				disabled: true,
				value: '0',
				min: '0',
				max: '100',
				step: '1',
			}
		},
		{
			name: 'Text input',
			context: {
				input: true,
				value: '0',
				min: '0',
				max: '100',
				step: '1',
			}
		},
		{
			name: 'No preview',
			context: {
				no_preview: true,
				input: true,
				value: '0',
				min: '0',
				max: '100',
				step: '1',
			}
		}
	]
}
