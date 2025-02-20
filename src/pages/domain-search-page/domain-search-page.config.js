module.exports = {
	status: 'wip',

	context: {
		noResult: true,
		singleResult: false,
		availableResult: false,
		wildcardResult: false,
		duplicateResult: false,
	},
	variants: [
		{
			name: 'result-available',
			context: {
				noResult: false,
				availableResult: true,
				singleResult: false,
				wildcardResult: false,
				duplicateResult: false
			}
		},
		{
			name: 'result-unavailable',
			context: {
				noResult: false,
				availableResult: false,
				singleResult: true,
				wildcardResult: false,
				duplicateResult: false
			}
		},
		{
			name: 'result-wildcard',
			context: {
				noResult: false,
				availableResult: false,
				singleResult: false,
				wildcardResult: true,
				duplicateResult: false,
			}
		},
		{
			name: 'result-duplicate',
			context: {
				noResult: false,
				availableResult: false,
				singleResult: false,
				wildcardResult: false,
				duplicateResult: true,
			}
		}
	]
};
