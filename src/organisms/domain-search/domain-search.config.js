module.exports = {
	status: 'ready',

	context: {
		hidden: 'false',
		id: 'domain-search-page',
		addidional_classes: 'o-domain-search-page--narrow',
		label: 'sök en .se- eller .nu-domän',
		white_background: true,
		result: false,
		available: false,
	},
	variants: [
		{
			name: 'result-available',
			context: {
				result: false,
				available: true,
				wildcard: false,
				duplicate: false,
			}
		},
		{
			name: 'result-unavailable',
			context: {
				result: true,
				available: false,
				wildcard: false,
				duplicate: false,
			}
		},
		{
			name: 'result-wildcard',
			context: {
				result: true,
				available: false,
				wildcard: true,
				duplicate: false,
			}
		},
		{
			name: 'result-duplicate',
			context: {
				result: true,
				available: false,
				wildcard: false,
				duplicate: true,
			}
		}
	]
};
