module.exports = {
	status: 'wip',
	default: 'Single item',

	context: {
		provider: 'Gotit AB',
		logo: 'https://skolfederation.se/app/uploads/2017/02/logo_gotit.png',
		description: 'Ett IT-stöd anpassat för alla former av vuxenutbildning. Alvis stödjer vuxenutbildning i egenregi, upphandlad utbildning eller en blandning av dessa.',
		serviceName: 'Alvis',
		heading: 'Filtrera',
		filter: true,
		columns: [
			{
				title: 'Kategori',
				textSearch: false,
				checkboxes: [
					{
						id: 'tjansteleverantor',
						checkboxLabel: 'Tjänsteleverantör',
						value: '0',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'anvandarorganisation',
						checkboxLabel: 'Användarorganisation',
						value: '1',
						is_inline: false,
						is_disabled: false
					}
				]
			},
			/*{
				title: 'Annan kategori',
				textSearch: false,
				checkboxes: [
					{
						id: 'produkttyp 3',
						checkboxLabel: 'Produkttyp 1',
						value: '2',
						is_inline: false,
						is_disabled: false
					}
				]
			}*/
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
						logo: 'https://skolfederation.se/app/uploads/2017/02/logo_gotit.png',
						description: 'Ett IT-stöd anpassat för alla former av vuxenutbildning. Alvis stödjer vuxenutbildning i egenregi, upphandlad utbildning eller en blandning av dessa.',
						serviceName: 'Alvis',
					},
					{
						provider: 'Lexplore Nordic AB',
						logo: 'https://skolfederation.se/app/uploads/2017/06/lexplore_logo-180x55.png',
						description: 'Avtalen ger dig som uppköpare eller rektor möjlighet att hjälpa elever med dyslexi eller andra läs- och skrivsvårigheter med att klara sig i skolan eller på en utbildning.',
						serviceName: 'Det flexibla avtalet',
					},
					{
						provider: 'Natur & kultur',
						logo: 'https://skolfederation.se/app/uploads/2015/04/NoK_Logo_35mm.gif',
						description: 'En digitalbok är den tryckta boken i digitalt format. Läs boken på en pekplatta, datorn eller telefon.',
						serviceName: 'Digitalbok',
					}
				]
			}
		}
	]
};
