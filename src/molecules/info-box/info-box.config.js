module.exports = {
	status: 'wip',

	context: {
		text: '<ul><li>Nyttan med öppna licenser</li><li>Att skilja på olika sorters licenser</li><li>Om företagande och öppen källkod</li><li>Hur du använder licenserna i praktiken</li><li>Klargör vilka marknader du riktar dig till och registrera relevanta domäner.</li></ul>'
	},
	variants: [
		{
			name: 'Big',
			context: {
				text: '<p>Sed malesuada quis risus eget malesuada. <strong>Vivamus posuere</strong>, erat sit amet vehicula suscipit, nisi arcu euismod sem, id tempus justo ligula sit amet turpis. <a href="#">Sed faucibus purus</a> sed neque pulvinar, ac faucibus leo tristique.</p>',
				modifiers: ['big']
			}
		}
	]
}
