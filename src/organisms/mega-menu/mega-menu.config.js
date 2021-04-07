module.exports = {
	status: 'ready',

	context: {
		hidden: 'false',
		id: 'mega-menu'
	},
	variants: [
		{
			name: 'With search',
			context: {
				search: true
			}
		},
		{
			name: 'With domain search',
			context: {
				domain_search: true
			}
		}
	]
}
