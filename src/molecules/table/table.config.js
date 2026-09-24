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
				increment: true,
				headers: false,
				footer: false
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
				stickyFirst: true,
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
		{
			name: 'Colored Cells',
			context: {
				modifier: 'm-table--sticky-first m-table--colored-cells',
				scrollable: true,
				stickyFirst: true,
				footer: false,
				columnWidths: [
					{ width: '10rem' },
					{ span: 9 }
				],
				headerRows: [
					{
						cells: [
							{ label: 'Internetanvändare 8+ år. Andel användare (varje dag/vecka/senaste 12 mån)', rowspan: 2 },
							{ label: 'Generation:', colspan: 9, className: 'u-nowrap' }
						]
					},
					{
						cells: [
							{ label: 'Total' },
							{ label: '20-/30-/40-talister', className: 'u-nowrap' },
							{ label: '50-talister', className: 'u-nowrap' },
							{ label: '60-talister', className: 'u-nowrap' },
							{ label: '70-talister', className: 'u-nowrap' },
							{ label: '80-talister', className: 'u-nowrap' },
							{ label: '90-talister', className: 'u-nowrap' },
							{ label: '00-talister', className: 'u-nowrap' },
							{ label: '10-talister', className: 'u-nowrap' }
						]
					}
				],
				rows: [
					{
						cells: [
							{ content: 'Youtube', isHeader: true, scope: 'row' },
							{ content: '77%' },
							{ content: '38%', className: 'background-ruby-light' },
							{ content: '62%', className: 'background-ruby-light' },
							{ content: '73%', className: 'background-ruby-light' },
							{ content: '80%' },
							{ content: '83%', className: 'background-jade-light' },
							{ content: '93%', className: 'background-jade-light' },
							{ content: '93%', className: 'background-jade-light' },
							{ content: '81%' }
						]
					},
					{
						cells: [
							{ content: 'Facebook', isHeader: true, scope: 'row' },
							{ content: '69%' },
							{ content: '58%', className: 'background-ruby-light' },
							{ content: '70%' },
							{ content: '77%', className: 'background-jade-light' },
							{ content: '82%', className: 'background-jade-light' },
							{ content: '83%', className: 'background-jade-light' },
							{ content: '85%', className: 'background-jade-light' },
							{ content: '68%' },
							{ content: '9%', className: 'background-ruby-light' }
						]
					}
				]
			}
		}
	]
};
