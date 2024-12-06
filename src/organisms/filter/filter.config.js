module.exports = {
	status: 'ready',

	context: {
		heading: 'Filtrera',
		is_expanded: false,
		columns: [
			{
				title: 'Innehållstyp',
				checkboxes: [
					{
						id: 'film',
						checkboxLabel: 'Film',
						value: '0',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'rapport',
						checkboxLabel: 'Rapport',
						value: '1',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'internetguider',
						checkboxLabel: 'Internetguider',
						value: '2',
						is_inline: false,
						is_disabled: false
					}
				]
			},
			{
				title: 'Ämne',
				checkboxes: [
					{
						id: 'barnhack',
						checkboxLabel: 'Barnhack',
						value: '3',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'domämnnamn',
						checkboxLabel: 'Domämnnamn',
						value: '4',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'it-säkerhet',
						checkboxLabel: 'IT-säkerhet',
						value: '5',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'statistik',
						checkboxLabel: 'Statistik',
						value: '6',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'dns',
						checkboxLabel: 'DNS',
						value: '7',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'integritet',
						checkboxLabel: 'Integritet',
						value: '8',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'skola',
						checkboxLabel: 'Skola',
						value: '9',
						is_inline: false,
						is_disabled: false
					}
				]
			},
			{
				title: 'För vem?',
				checkboxes: [
					{
						id: 'barn och unga',
						checkboxLabel: 'Barn coh unga',
						value: '10',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'företagare',
						checkboxLabel: 'Företagare',
						value: '11',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'pedagoger',
						checkboxLabel: 'Pedagoger',
						value: '12',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'föräldrar',
						checkboxLabel: 'Föräldrar',
						value: '13',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'journalister',
						checkboxLabel: 'Journalister',
						value: '14',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'privatpersoner',
						checkboxLabel: 'Privatpersoner',
						value: '15',
						is_inline: false,
						is_disabled: false
					}
				]
			},
			{
				title: 'Avsändare',
				checkboxes: [
					{
						id: 'iis',
						checkboxLabel: 'IIS',
						value: '16',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'pts',
						checkboxLabel: 'PTS',
						value: '17',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'scb',
						checkboxLabel: 'SCB',
						value: '18',
						is_inline: false,
						is_disabled: false
					},
					{
						id: 'statens medieråd',
						checkboxLabel: 'Statens medieråd',
						value: '19',
						is_inline: false,
						is_disabled: false
					}
				]
			},
			{
				title: 'Arkiv',
				checkboxes: [
					{
						id: 'visa arkiverat material',
						checkboxLabel: 'Visa arkiverat material',
						value: '20',
						is_inline: false,
						is_disabled: false
					}
				]
			}
		]	
	}
};
