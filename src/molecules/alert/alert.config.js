module.exports = {
	status: 'wip',

	context: {
		name: 'Information',
		type: 'info',
		text: 'Meddelanderuta med vanlig information, t.ex information om öppettider. Dessa meddelanden är fasta dv.s inget dom dyker upp tillfälligt när användaren interagerar med tjänsten.'
	},
	variants: [
		{
			name: 'warning',
			context: {
				name: 'Varning',
				type: 'warning',
				text: 'Meddelanderuta med en varning om att något behöver användarens uppmärksamhet, t.ex. att tjänsten stängs ner för underhåll. Tillfälligt meddelande.'
			}
		},
		{
			name: 'error',
			context: {
				name: 'Fel',
				type: 'error',
				text: 'Meddelanderuta med information om att något är fel, t.ex. att ett formulär inte kunde skickas. Tillfälligt meddelande.'
			}
		},
		{
			name: 'success',
			context: {
				name: 'Succé',
				type: 'success',
				text: 'Meddelanderuta med information att en uppgift genomförts utan fel, t.ex. att formulär som skickats. Tillfälligt meddelande'
			}
		},
		{
			name: 'dismissable',
			context: {
				name: 'Avfärda',
				type: 'success',
				text: 'Meddelanderuta med som användaren kan välja att klicka bort.',
				js_class: 'js-dismiss-alert',
				is_dismissable: true,
			}
		}
	]
}
