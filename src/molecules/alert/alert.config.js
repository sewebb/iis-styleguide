module.exports = {
	status: 'ready',

	context: {
		name: 'Information',
		type: 'info',
		role: 'alert',
		text: 'Meddelanderuta med vanlig information, t.ex information om öppettider. <a href="https://internetstiftelsen.se">Dessa meddelanden</a> är fasta dv.s inget dom dyker upp tillfälligt när användaren interagerar med tjänsten.',
		additional_classes: false,
	},
	variants: [
		{
			name: 'warning',
			context: {
				name: 'Varning',
				type: 'warning',
				role: 'alert',
				text: 'Meddelanderuta med en varning om att något behöver användarens uppmärksamhet, t.ex. att tjänsten stängs ner för underhåll. Tillfälligt meddelande.'
			}
		},
		{
			name: 'error',
			context: {
				name: 'Fel',
				type: 'error',
				role: 'alert',
				text: 'Meddelanderuta med information om att något är fel, t.ex. att ett formulär inte kunde skickas. Tillfälligt meddelande.'
			}
		},
		{
			name: 'success',
			context: {
				name: 'Succé',
				type: 'success',
				role: 'alert',
				text: 'Meddelanderuta med information att en uppgift genomförts utan fel, t.ex. att formulär som skickats. Tillfälligt meddelande'
			}
		},
		{
			name: 'dismissable',
			context: {
				name: 'Avfärda',
				type: 'warning',
				role: 'alert',
				text: 'Meddelanderuta med som användaren kan välja att klicka bort.',
				js_class: 'js-dismiss-alert',
				is_dismissable: true,
			}
		}
	]
};
