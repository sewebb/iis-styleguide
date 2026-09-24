const coloredCellsRowHeaderLabel = 'Internetanvändare 8+ år. Andel användare (varje dag/vecka/senaste 12 mån)';

const coloredCellsRows = [
	[['Youtube'], ['77%'], ['38%', 'background-ruby-light'], ['62%', 'background-ruby-light'], ['73%', 'background-ruby-light'], ['80%'], ['83%', 'background-jade-light'], ['93%', 'background-jade-light'], ['93%', 'background-jade-light'], ['81%']],
	[['Facebook'], ['69%'], ['58%', 'background-ruby-light'], ['70%'], ['77%', 'background-jade-light'], ['82%', 'background-jade-light'], ['83%', 'background-jade-light'], ['85%', 'background-jade-light'], ['68%'], ['9%', 'background-ruby-light']],
	[['Instagram'], ['66%'], ['40%', 'background-ruby-light'], ['50%', 'background-ruby-light'], ['67%'], ['76%', 'background-jade-light'], ['75%', 'background-jade-light'], ['82%', 'background-jade-light'], ['87%', 'background-jade-light'], ['31%', 'background-ruby-light']],
	[['Snapchat'], ['38%'], ['6%', 'background-ruby-light'], ['9%', 'background-ruby-light'], ['20%', 'background-ruby-light'], ['33%', 'background-ruby-light'], ['30%', 'background-ruby-light'], ['58%'], ['89%', 'background-jade-light'], ['47%', 'background-jade-light']],
	[['Linkedin'], ['27%'], ['5%', 'background-ruby-light'], ['13%', 'background-ruby-light'], ['31%', 'background-jade-light'], ['41%', 'background-jade-light'], ['42%', 'background-jade-light'], ['45%', 'background-jade-light'], ['23%', 'background-ruby-light'], ['0%', 'background-ruby-light']],
	[['Tiktok'], ['22%'], ['2%', 'background-ruby-light'], ['5%', 'background-ruby-light'], ['7%', 'background-ruby-light'], ['12%', 'background-ruby-light'], ['10%', 'background-ruby-light'], ['27%'], ['69%', 'background-jade-light'], ['35%', 'background-jade-light']],
	[['Flashback'], ['20%'], ['5%', 'background-ruby-light'], ['15%', 'background-ruby-light'], ['22%'], ['33%', 'background-jade-light'], ['29%', 'background-jade-light'], ['31%', 'background-jade-light'], ['13%', 'background-ruby-light'], ['1%', 'background-ruby-light']],
	[['Pinterest'], ['18%'], ['3%', 'background-ruby-light'], ['13%', 'background-ruby-light'], ['14%'], ['17%'], ['15%'], ['26%', 'background-jade-light'], ['31%', 'background-jade-light'], ['15%']],
	[['Reddit'], ['16%'], ['0%', 'background-ruby-light'], ['1%', 'background-ruby-light'], ['3%', 'background-ruby-light'], ['10%', 'background-ruby-light'], ['22%'], ['36%', 'background-jade-light'], ['37%', 'background-jade-light'], ['4%', 'background-ruby-light']],
	[['X/Twitter'], ['13%'], ['3%', 'background-ruby-light'], ['5%', 'background-ruby-light'], ['11%'], ['11%'], ['16%', 'background-jade-light'], ['23%', 'background-jade-light'], ['25%', 'background-jade-light'], ['2%', 'background-ruby-light']],
	[['Roblox'], ['9%'], ['0%', 'background-ruby-light'], ['0%', 'background-ruby-light'], ['0%', 'background-ruby-light'], ['1%', 'background-ruby-light'], ['1%', 'background-ruby-light'], ['1%', 'background-ruby-light'], ['15%', 'background-jade-light'], ['62%', 'background-jade-light']],
	[['Threads'], ['7%'], ['2%', 'background-ruby-light'], ['6%', 'background-ruby-light'], ['7%', 'background-ruby-light'], ['8%'], ['11%', 'background-jade-light'], ['10%', 'background-jade-light'], ['9%'], ['0%', 'background-ruby-light']],
	[['Twitch'], ['6%'], ['0%', 'background-ruby-light'], ['0%', 'background-ruby-light'], ['0%', 'background-ruby-light'], ['2%', 'background-ruby-light'], ['6%'], ['14%', 'background-jade-light'], ['16%', 'background-jade-light'], ['4%', 'background-ruby-light']],
	[['Bluesky'], ['2%'], ['1%', 'background-ruby-light'], ['1%', 'background-ruby-light'], ['2%'], ['3%'], ['5%', 'background-jade-light'], ['3%'], ['2%'], ['0%', 'background-ruby-light']]
].map((cells) => ({
	cells: cells.map(([content, className], index) => ({
		content,
		...(index === 0 ? { isHeader: true, scope: 'row', dataLabel: coloredCellsRowHeaderLabel } : {}),
		...(className ? { className } : {})
	}))
}));

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
				scrollWrapperClass: 'table-scroll-wrapper--report-upload alignwide',
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
				rows: coloredCellsRows
			}
		}
	]
};
