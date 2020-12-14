module.exports = {
	status: 'ready',

	context: {
		sections: [
			{
				type: false,
				modifier: false,
				heading: 'Section grey',
				heading_class: false,
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum enim ac facilisis vehicula. Ut consequat consequat velit vel tempus. Sed non massa purus. Donec iaculis justo tristique ultrices tempus. Sed erat lectus, malesuada non lectus a, accumsan aliquam libero. Nunc sed dolor turpis. Nunc efficitur malesuada enim non viverra. Vestibulum in mi suscipit, laoreet purus eu, elementum nunc. Aliquam mattis leo sit amet erat posuere fermentum. Nunc mollis tortor quis enim facilisis, nec porttitor metus volutpat. Ut eu augue porttitor, placerat quam in, molestie nunc. Nam lacinia dignissim justo, ac mollis lorem vulputate sit amet. Maecenas feugiat eget erat nec suscipit. Phasellus pretium tellus ut pellentesque fringilla. In sodales maximus lorem eget vulputate. Donec viverra massa vel urna efficitur rutrum.'
			},
			{
				type: 'white',
				modifier: 'rectangle-left',
				heading: 'Section white',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum enim ac facilisis vehicula. Ut consequat consequat velit vel tempus. Sed non massa purus. Donec iaculis justo tristique ultrices tempus. Sed erat lectus, malesuada non lectus a, accumsan aliquam libero. Nunc sed dolor turpis. Nunc efficitur malesuada enim non viverra. Vestibulum in mi suscipit, laoreet purus eu, elementum nunc. Aliquam mattis leo sit amet erat posuere fermentum. Nunc mollis tortor quis enim facilisis, nec porttitor metus volutpat. Ut eu augue porttitor, placerat quam in, molestie nunc. Nam lacinia dignissim justo, ac mollis lorem vulputate sit amet. Maecenas feugiat eget erat nec suscipit. Phasellus pretium tellus ut pellentesque fringilla. In sodales maximus lorem eget vulputate. Donec viverra massa vel urna efficitur rutrum.'
			},
			{
				type: false,
				modifier: false,
				heading: 'Section grey',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum enim ac facilisis vehicula. Ut consequat consequat velit vel tempus. Sed non massa purus. Donec iaculis justo tristique ultrices tempus. Sed erat lectus, malesuada non lectus a, accumsan aliquam libero. Nunc sed dolor turpis. Nunc efficitur malesuada enim non viverra. Vestibulum in mi suscipit, laoreet purus eu, elementum nunc. Aliquam mattis leo sit amet erat posuere fermentum. Nunc mollis tortor quis enim facilisis, nec porttitor metus volutpat. Ut eu augue porttitor, placerat quam in, molestie nunc. Nam lacinia dignissim justo, ac mollis lorem vulputate sit amet. Maecenas feugiat eget erat nec suscipit. Phasellus pretium tellus ut pellentesque fringilla. In sodales maximus lorem eget vulputate. Donec viverra massa vel urna efficitur rutrum.'
			},
			{
				type: 'white',
				modifier: 'rectangle-right',
				heading: 'Section white',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum enim ac facilisis vehicula. Ut consequat consequat velit vel tempus. Sed non massa purus. Donec iaculis justo tristique ultrices tempus. Sed erat lectus, malesuada non lectus a, accumsan aliquam libero. Nunc sed dolor turpis. Nunc efficitur malesuada enim non viverra. Vestibulum in mi suscipit, laoreet purus eu, elementum nunc. Aliquam mattis leo sit amet erat posuere fermentum. Nunc mollis tortor quis enim facilisis, nec porttitor metus volutpat. Ut eu augue porttitor, placerat quam in, molestie nunc. Nam lacinia dignissim justo, ac mollis lorem vulputate sit amet. Maecenas feugiat eget erat nec suscipit. Phasellus pretium tellus ut pellentesque fringilla. In sodales maximus lorem eget vulputate. Donec viverra massa vel urna efficitur rutrum.'
			}
		]
	},
	variants: [
		{
			name: 'Header and assymetric grid',
			context: {
				sections: [
					{
						type: false,
						modifier: false,
						heading: 'With header and assymetric grid',
						heading_class: 'supersize',
						has_header: true,
						text: 'Internetstiftelsens vision är att alla vill, vågar och kan använda internet. Här har vi samlat våra utbildningssatsningar som gör att du enklare kan förstå och använda internets tjänster, och som bidrar till ökad digital kompetens.',
					},
					{
						type: 'white',
						modifier: 'rectangle-left',
						heading: 'Section white',
						has_header: true,
						has_grid: true,
						meta: true,
						text: 'Vi tycker om och tror på internet och brinner för att dela med oss av vår kunskap. Vår vision är att alla i Sverige vill, vågar och kan använda internet. För att det ska bli verklighet krävs kunskap om hur internet och digital teknik fungerar, både vad gäller tekniska aspekter och saker som källkritik och riskmedvetenhet.'
					},
					{
						type: false,
						modifier: 'rectangle-right',
						heading: 'Section grey',
						has_header: true,
						has_grid: true,
						meta: true,
						text: 'Vi verkar för ett internet som bidrar positivt till människan och samhället. Därför är vi intresserade av hur internet i Sverige används och hur vi kan hjälpa medborgarna att använda det bättre och försäkra sig om att de får vad de betalar för.'
					},
				]
			}
		}
	]
}
