module.exports = {
	status: 'wip',
	default: 'Single file',

	context: {
		label: 'Välj fil',
		type: 'file',
		id: 'file',
		value: false,
		placeholder: 'Välj fil',
		icon: 'upload',
		icon2: 'trashcan'
	},
	variants: [
		{
			name: 'Multiple files',
			context: {
				modifier: 'a-file---multiple',
				is_multiple: true,
				placeholder: 'Välj filer'
			}
		}
	]
}
