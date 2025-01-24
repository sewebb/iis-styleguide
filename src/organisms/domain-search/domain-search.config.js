module.exports = {
	status: 'ready',

	context: {
		hidden: 'false',
		id: 'domain-search-page',
		addidional_classes: 'o-domain-search-page--narrow',
		label: 'sök en .se- eller .nu-domän',
		white_background: true,
		result: false
	},
	variants: [
		{
			name: 'result',
			context: {
				result: true,
				wildcard: false,
				duplicate: false,
			}
		},
		{
			name: 'result-wildcard',
			context: {
				result: true,
				wildcard: true,
				duplicate: false,
			}
		},
		{
			name: 'result-duplicate',
			context: {
				result: true,
				wildcard: false,
				duplicate: true,
			}
		}
	]
};
