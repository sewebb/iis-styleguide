module.exports = {
	status: 'ready',

	context: {
		title: 'Du har sparat FooCoding Graduation!',
		text: 'En påminnelse kommer skickas till din adress <a href="https://internetstiftelsen.se/om-webbplatsen/integritetspolicy-for-besokare-pa-internetstiftelsens-webbplatser/" class="u-link">15 minuter</a> innan streamen startar.',
		button_text: 'Stäng',
		aria_controls: '',
		is_hidden: false,
		button_primary_color: '#e0bff5',
		button_primary_hover_color: '#c27fec',
		button_primary_border_color: '#c27fec',
		button_primary_text_color: '#1f2a36',
		button_secondary_color: '#ff9fb4',
		button_secondary_hover_color: '#ff4069',
		button_secondary_border_color: '#ff4069',
		button_secondary_text_color: '#1f2a36',
	},

	variants: [
		{
			name: 'form',
			context: {
				title: 'Skapa konto',
				button_text: 'Skapa konto',
				is_form: true,
				is_hidden: false,
				check_text: 'Prenumerera på våra lokala nyhetsbrev:',
				terms_text: 'Jag godkänner Goto 10:s <a href="#" class="u-link">medlemsvillkor</a> och <a href="https://internetstiftelsen.se/om-webbplatsen/integritetspolicy-for-besokare-pa-internetstiftelsens-webbplatser/" class="u-link">integritetspolicy</a>.',
				bottom_text: 'Har du redan ett konto? <a href="#" class="u-link">Logga in</a>'
			}
		},
		{
			name: 'hidden',
			context: {
				btn_text: 'Öppna modal',
				is_hidden: true,
				aria_controls: 'modal-container',
				aria_expanded: false,
				data_a11y_toggle: ''
			}
		}
	]
};
