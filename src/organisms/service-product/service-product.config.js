module.exports = {
	status: 'wip',
	default: 'Single item',

	context: {
		provider: 'Gotit AB',
		logo: 'https://www.skolfederation.se/wp-content/uploads/2017/02/logo_gotit.png',
		description: 'Ett IT-stöd anpassat för alla former av vuxenutbildning. Alvis stödjer vuxenutbildning i egenregi, upphandlad utbildning eller en blandning av dessa.',
		serviceName: 'Alvis',
		heading: 'Filtrera',
		columns: [
			{
				title: 'Kategori',
				textSearch: false,
				checkboxes: [
					{
						id: 'produkttyp-1',
						checkboxLabel: 'Produkttyp 1',
						value: '0',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'produkttyp-2',
						checkboxLabel: 'Produkttyp 1',
						value: '1',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'produkttyp 3',
						checkboxLabel: 'Produkttyp 1',
						value: '2',
						is_inline: false,
						is_disabled: false
					}
				]
			},
			{
				title: 'Fritextsök',
				textSearch: true,
			}
		]
	},

	variants: [
		{
			name: 'list',
			status: 'wip',
			context: {
				items: [
					{
						provider: 'Gotit AB',
						logo: 'https://www.skolfederation.se/wp-content/uploads/2017/02/logo_gotit.png',
						description: 'Ett IT-stöd anpassat för alla former av vuxenutbildning. Alvis stödjer vuxenutbildning i egenregi, upphandlad utbildning eller en blandning av dessa.',
						serviceName: 'Alvis',
					},
					{
						provider: 'MV Nordic AB',
						logo: 'https://www.skolfederation.se/wp-content/uploads/2016/10/MV-Nordic_logotyp-180x34.png',
						description: 'Avtalen ger dig som uppköpare eller rektor möjlighet att hjälpa elever med dyslexi eller andra läs- och skrivsvårigheter med att klara sig i skolan eller på en utbildning.',
						serviceName: 'Det flexibla avtalet',
					},
					{
						provider: 'Natur & kultur',
						logo: 'https://www.skolfederation.se/wp-content/uploads/2015/04/NoK_Logo_35mm.gif',
						description: 'En digitalbok är den tryckta boken i digitalt format. Läs boken på en pekplatta, datorn eller telefon.',
						serviceName: 'Digitalbok',
					}
				]
			}
		}
	]
}
