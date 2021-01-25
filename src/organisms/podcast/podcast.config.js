module.exports = {
	status: 'wip',
	default: 'player',

	context: {
		playlist: false,
		hidden: false,
		src: 'https://traffic.libsyn.com/secure/internetpodden/20201215-svenskarna-och-internet-2020.mp3?dest-id=1534313',
		image: 'https://ssl-static.libsyn.com/p/assets/a/9/6/5/a9653e010511f97e/internetpodden-logo.png',
		title: 'Svenskarna och internet 2020',
		description: 'Årets högtidsstund för alla som älskar internetstatistik är här! Vår rapport Svenskarna och internet har utökats inför ett speciellt år med extra frågor kring Coronapandemin. Jannike Tillå, Måns Jonasson och Jenny Andersson från Internetstiftelsen diskuterar insikterna från årets rapport.',
		duration: '53:04'
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
				duration: false
			}
		},
		{
			name: 'Episodes list',
			context: {
				episodes: [
					{

					},
					{

					},
					{

					}
				]
			}
		}
	]
}
