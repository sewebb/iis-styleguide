module.exports = {
	status: 'ready',
	default: 'player',

	context: {
		playlist: false,
		hidden: false,
		src: 'https://traffic.libsyn.com/secure/internetpodden/20201215-svenskarna-och-internet-2020.mp3?dest-id=1534313',
		image: true,
		title: 'Svenskarna och internet 2020',
		description: 'Årets högtidsstund för alla som älskar internetstatistik är här! Vår rapport Svenskarna och internet har utökats inför ett speciellt år med extra frågor kring Coronapandemin. Jannike Tillå, Måns Jonasson och Jenny Andersson från Internetstiftelsen diskuterar insikterna från årets rapport.',
		duration: '53:04',
		has_modifier: false,
		is_single_episode: true,
		date: '15 december, 2020',
		episodeImage: 'https://ssl-static.libsyn.com/p/assets/a/9/6/5/a9653e010511f97e/internetpodden-logo.png'
	},

	variants: [
		{
			name: 'with playlist',
			status: 'prototype',
			context: {
				playlist: true,
				hidden: true,
				src: false,
				image: false,
				title: false,
				description: false,
				duration: false,
				is_single_episode: false
			}
		},
		{
			name: 'Episode list',
			context: {
				is_single_episode: false,
				modifiers: ['list'],
				episodes: [
					{
						title: 'Svenskarna och internet 2020',
						src: 'https://traffic.libsyn.com/secure/internetpodden/20201215-svenskarna-och-internet-2020.mp3?dest-id=1534313',
						episodeImage: 'https://ssl-static.libsyn.com/p/assets/a/9/6/5/a9653e010511f97e/internetpodden-logo.png',
						description: 'Årets högtidsstund för alla som älskar internetstatistik är här! Vår rapport Svenskarna och internet har utökats inför ett speciellt år med extra frågor kring Coronapandemin. Jannike Tillå, Måns Jonasson och Jenny Andersson från Internetstiftelsen diskuterar insikterna från årets rapport.',
						duration: '53:04',
						date: '15 december, 2020'
					},
					{
						title: 'David Rowan på Internetdagarna 2019',
						src: 'https://traffic.libsyn.com/secure/internetpodden/Internetpodden_avsnitt5.mp3?dest-id=1534313',
						episodeImage: 'https://ssl-static.libsyn.com/p/assets/3/6/a/2/36a281563e8e08b8/Internetpodden_avsnitt5.jpg',
						description: 'Vi fortsätter våra samtal med huvudtalarna från årets Internetdagarna. I det här avsnittet samtalar Internetstiftelsens Måns Jonasson med David Rowan, tidigare chefredaktör för teknikmagasinet Wired. Rowan höll en hyllad presentation på temat innovationer, och visade upp en del inte fullt så innovativa uppfinningar. Vad är egentligen riktig innovation?',
						duration: '17:12',
						date: '30 december, 2019'
					},
					{
						title: 'Jenny Radcliffe på Internetdagarna 2019',
						src: 'https://traffic.libsyn.com/secure/internetpodden/internetpodden_avsnitt3.mp3?dest-id=1534313',
						episodeImage: 'https://ssl-static.libsyn.com/p/assets/7/4/b/7/74b768ea833215f0/internetpodden_avsnitt3.jpg',
						description: 'Vi fortsätter våra samtal med huvudtalarna från årets Internetdagarna. I det här avsnittet samtalar Internetstiftelsens Isadora Hellegren med Jenny Radcliffe, känd som "The People Hacker". Hon tar sig in i vilken byggnad som helst genom konsten att förhandla och övertala, och utnyttja säkerhetssystemens svagaste länk; människan.',
						duration: '13:46',
						date: '15 december, 2019'
					}
				]
			}
		},
		{
			name: 'Hero',
			context: {
				is_single_episode: true,
				modifiers: ['hero'],
				is_hero: true
			}
		}
	]
}
