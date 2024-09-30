module.exports = {
	status: 'ready',

	context: {
		hidden: 'false',
		id: 'mega-menu',
		modifier:'',
		columns: [
			 {
				headline: 'Domäner',
				list_id: 'domains',
				topics: [
					{
						topic: '',
						items: [
							{
								item: 'Är domänen ledig?'
							},
							{
								item: 'Regler och beskrivning av whois'
							},
							{
								item: 'Registrera en domän'
							},
							{
								item: 'Villkor och regler'
							},
							{
								item: '.se-/.nu-domäner som snart kan bli lediga'
							},
							{
								item: 'Tips innan du registrerar en domän/Inspiration och tips'
							},
							{
								item: 'Återförsäljare'
							},
							{
								item: 'Kontakta din kundtjänst'
							},
							{
								item: 'Så fungerar ett domännamn'
							},
							{
								item: 'Oseriösa metoder'
							},
							{
								item: 'Tvistlösning'
							},
							{
								item: 'Domännamnsbranschen'
							},
							{
								item: 'Tjänster'
							},
							{
								item: 'Domänstatistik'
							},

						]
					}
				],
			 },
			{
				headline: 'Kunskap',
				list_id: 'kunskap',
				topics: [
					{
						topic: 'För skolan',
						items: [
							{
								item: 'Digitala lektioner'
							},
							{
								item: 'Lärarfortbildning'
							},
							{
								item: 'Fördjupning'
							},

						]
					},
					{
						topic: 'För samhället',
						items: [
							{
								item: 'Svenskarna och internet'
							},
							{
								item: 'Projekt internetaccess'
							},
							{
								item: 'Federationers'
							},

						]
					}
				],
			},
			{
				headline: 'Mötesplatser',
				list_id: 'motesplatser',
				topics: [
					{
						topic: '',
						items: [
							{
								item: 'Internetdagarna',
								external: true
							},
							{
								item: 'Goto 10',
								external: true
							},
							{
								item: 'Forskningssamarbeten',
								external: true
							},
							{
								item: 'Internetstiftelsen stöttar'
							},
							{
								item: 'Investeringar',
								external: true
							},

						]
					}
				],
			},
			{
				headline: 'Om oss',
				list_id: 'om-oss',
				topics: [
					{
						topic: 'Presentation',
						items: [
							{
								item: 'Jobba hos oss',
								external: true
							},
							{
								item: 'Press'
							},
							{
								item: 'Pressbilder och fotografier'
							},
							{
								item: 'Kontakt'
							}

						]
					}
				],
			},
			{
				headline: 'English',
				list_id: 'english',
				topics: [
					{
						topic: '',
						items: [
							{
								item: 'Lorem ipsum'
							},
							{
								item: 'Dolor sit amet'
							},
							{
								item: 'Aenean sodales vestibulum'
							}

						]
					}
				],
			}
		]
	},
	variants: [
		{
			name: 'With search',
			context: {
				search: true
			}
		},
		{
			name: 'With domain search',
			context: {
				domain_search: true
			}
		},
		{
			name: 'With both searches',
			context: {
				domain_search: true,
				search: true
			}
		}
	]
}
