module.exports = {
	status: 'ready',

	context: {
		headers: [
			'Plan',
			'Monthly cost',
			'Bandwidth',
			'Domains included',
			'Contract'
		],
		rows: [
			{
				title: 'Starter',
				href: '#',
				cells: [
					'99 <small>kr/mån</small>',
					'100 <small>Mbit</small>',
					'1 <small>domain</small>',
					'Rolling'
				]
			},
			{
				title: 'Growth',
				href: '#',
				cells: [
					'149 <small>kr/mån</small>',
					'1 000 <small>Mbit</small>',
					'10 <small>domains</small>',
					'12 <small>months</small>'
				]
			},
			{
				title: 'Business',
				href: '#',
				cells: [
					'349 <small>kr/mån</small>',
					'10 000 <small>Mbit</small>',
					'100 <small>domains</small>',
					'12 <small>months</small>'
				]
			},
			{
				title: 'Enterprise',
				href: '#',
				cells: [
					'Custom <small>pricing</small>',
					'Tailored <small>capacity</small>',
					'Unlimited <small>domains</small>',
					'By agreement'
				]
			}
		],
		footer: [
			'Support',
			'Email',
			'Priority email',
			'Dedicated manager',
			'SLA included'
		],
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
			name: 'stacked',
			context: {
				modifier: 'm-table--stacked',
				scrollable: false
			}
		},
		{
			name: 'sticky first column',
			context: {
				modifier: 'm-table--rows m-table--sticky-first',
				scrollable: true
			}
		},
		{
			name: 'With caption',
			context: {
				modifier: 'm-table--columns',
				scrollable: false,
				caption: 'Pricing plans overview'
			}
		},
	]
};
