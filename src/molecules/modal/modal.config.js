module.exports = {
	status: 'wip',

	context: {
		title: 'Du har sparat FooCoding Graduation!',
		text: 'En påminnelse kommer skickas till din adress <a href="#" class="u-link">15 minuter</a> innan streamen startar.',
		button_text: 'Stäng',
		aria_controls: '',
	},

	variants: [
		{
		name: 'form',
		context: {
			title: 'Skapa konto',
			button_text: 'Skapa konto',
			is_form: true,
			check_text: 'Prenumerera på våra lokala nyhetsbrev:',
			terms_text: 'Jag godkänner Goto 10:s <a href="#" class="u-link">medlemsvillkor</a> och <a href="#" class="u-link">integritetspolicy</a>.',
			bottom_text: 'Har du redan ett konto? <a href="#" class="u-link">Logga in</a>'
			}
		},
		{
		name: 'hidden',
			context: {
				btn_text: 'Öppna modal',
				is_hidden: true
			}
		}
	]
}
