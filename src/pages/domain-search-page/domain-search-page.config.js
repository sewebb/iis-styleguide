module.exports = {
	status: 'wip',

	context: {
		noResult: true,
		singleResult: false,
		wildcardResult: false,
		duplicateResult: false,
	},
	variants: [
		{
			name: 'result',
			context: {
				noResult: false,
				singleResult: true,
				wildcardResult: false,
				duplicateResult: false
			}
		},
		{
			name: 'result-wildcard',
			context: {
				noResult: false,
				singleResult: false,
				wildcardResult: true,
				duplicateResult: false,
			}
		},
		{
			name: 'result-duplicate',
			context: {
				noResult: false,
				singleResult: false,
				wildcardResult: false,
				duplicateResult: true,
			}
		}
	]
};
