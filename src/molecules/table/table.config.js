module.exports = {
	status: 'ready',

	context: {
		th: 'Table header',
		td: 'Table cell',
		tfoot: 'Table footer',
		td_num1: '42',
		td_unit1: 'mkr',
		td_num2: '10 000',
		td_unit2: 'Mbit',
		td_num3: '175 000 000',
		td_unit3: '.se',
		td_num4: '99',
		td_unit4: 'kr/mån',
		modifier: false,
		caption: false
	},
	variants: [
		{
			name: 'columns',
			context: {
				modifier: 'm-table--columns',
				scrollable: false
			}
		},
		{
			name: 'rows',
			context: {
				modifier: 'm-table--rows',
				scrollable: false
			}
		},
		{
			name: 'Auto increment',
			context: {
				modifier: 'm-table--increment',
				increment: true
			}
		},
		{
			name: 'lines',
			context: {
				modifier: 'm-table--lines',
				scrollable: false
			}
		},
		{
			name: 'scrollable',
			context: {
				modifier: 'm-table--scrollable m-table--rows',
				scrollable: true
			}
		},
		{
			name: 'With caption',
			context: {
				modifier: 'm-table--columns',
				scrollable: false,
				caption: true
			}
		},
	]
};
