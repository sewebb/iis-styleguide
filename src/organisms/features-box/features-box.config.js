module.exports = {
	status: 'ready',
	title: 'Features box',
	context: {
		color: 'snow',
		padding: 'u-p-x-4 u-p-t-3 u-p-b-4',
		height: '',
		heading: false,
		heading_classes: false,
		button: true,
		button_icon: 'plus',
		button_text: 'Skapa event',
		additional_classes: false,
		button_modifiers: 'icon, lemon, icon-left o-features-box__button',
		list_items: [
			{
				li_text: 'Max 40 personer',
				icon: 'capacity'
			},
			{
				li_text: 'Bildskärm med anslutning via HDMI eller Mini Display Port',
				icon: 'display'
			},
			{
				li_text: 'Lång text för att testa radbryt och så. Sunt dolores aliquam non repellat sed nihil doloribus placeat. Autem debitis ut veniam',
				icon: 'headset'
			},
			{
				li_text: '5 headsets och 4 handmikrofoner',
				icon: 'headset'
			},
			{
				li_text: 'Riggat för livesändning',
				icon: 'streaming'
			},
			{
				li_text: 'Rullstolsanpassad lokal med ramp',
				icon: 'accessibility'
			},
		]
	},
	variants: [
		{
			name: "headline",
			context: {
				padding: 'u-p-x-4 u-p-t-2 u-p-b-4',
				heading: 'Vårt utbud i Stockholm',
				heading_classes: 'u-m-b-2',
				modifier: false,
				button_classes: false,
				button_modifiers: 'icon, icon-left, lemon o-features-box__button',
				additional_classes: false,
				list_items: [
					{
						li_text: 'Max 40 personer',
						icon: 'capacity'
					},
					{
						li_text: 'Bildskärm med anslutning via HDMI eller Mini Display Port',
						icon: 'display'
					},
					{
						li_text: 'Lång text för att testa radbryt och så. Sunt dolores aliquam non repellat sed nihil doloribus placeat. Autem debitis ut veniam',
						icon: 'headset'
					},
					{
						li_text: '5 headsets och 4 handmikrofoner',
						icon: 'headset'
					},
					{
						li_text: 'Riggat för livesändning',
						icon: 'streaming'
					},
					{
						li_text: 'Rullstolsanpassad lokal med ramp',
						icon: 'accessibility'
					},
				]
			}
		},
		{
			name: "large-text",
			context: {
				modifier: 'large-text',
				color: 'lemon',
				padding: 'u-p-x-6 u-p-t-4 u-p-b-6',
				heading: 'Vårt utbud i Stockholm',
				heading_classes: 'u-m-b-3 supersize',
				additional_classes: false,
				button: false,
				list_items: [
					{
						li_text: 'Max 40 personer',
						icon: 'capacity'
					},
					{
						li_text: 'Bildskärm med anslutning via HDMI eller Mini Display Port',
						icon: 'wifi'
					},
					{
						li_text: 'Lång text för att testa radbryt och så. Sunt dolores aliquam non repellat sed nihil doloribus placeat. Autem debitis ut veniam',
						icon: 'podcast'
					},
					{
						li_text: '5 headsets och 4 handmikrofoner',
						icon: '3d'
					},
					{
						li_text: 'Riggat för livesändning',
						icon: 'capacity'
					},
					{
						li_text: 'Rullstolsanpassad lokal med ramp',
						icon: 'accessibility'
					},
					{
						li_text: 'kologiskt café med lunchservering',
						icon: 'cafe'
					},
				]
			}
		},
		{
			name: "event-info",
			context: {
				modifier: false,
				button: true,
				button_icon: false,
				button_text: 'Anmäl dig',
				button_classes: false,
				button_modifiers: 'lemon',
				additional_classes: false,
				list_items: [
					{
						li_text: 'Max 40 personer',
						icon: 'capacity'
					},
					{
						li_text: 'Bildskärm med anslutning via HDMI eller Mini Display Port',
						icon: 'display'
					},
					{
						li_text: 'Lång text för att testa radbryt och så. Sunt dolores aliquam non repellat sed nihil doloribus placeat. Autem debitis ut veniam',
						icon: 'headset'
					},
					{
						li_text: '5 headsets och 4 handmikrofoner',
						icon: 'headset'
					},
					{
						li_text: 'Riggat för livesändning',
						icon: 'streaming'
					},
					{
						li_text: 'Rullstolsanpassad lokal med ramp',
						icon: 'accessibility'
					},
				]
			}
		},
		{
			name: "contact-info",
			context: {
				modifier: false,
				button: true,
				button_icon: false,
				button_text: 'Alla kontaktuppgifter',
				button_classes: false,
				button_modifiers: 'lemon',
				additional_classes: false,
				list_items: [
					{
						li_text: '<span>Gradängen, Goto10</span><br /><span class="color-granit">Hammarby Slussväg 4, 118 60 Stockholm</span>',
						icon: 'pin'
					},
					{
						li_text: 'Vardagar: 8:00-17:00<br />Helger: Stängt',
						icon: 'time'
					},
					{
						li_text: '<a href="mailto:info@goto10.se">info@goto10.se</a>',
						icon: 'email'
					},
					{
						li_text: '<a href="tel:08-10 10 10">08–10 10 10</a>',
						icon: 'phone'
					},
					{
						li_text: 'Riggat för livesändning',
						icon: 'streaming'
					},
					{
						li_text: 'Rullstolsanpassad lokal med ramp',
						icon: 'accessibility'
					},
				]
			}
		},
		{
			name: "full-height",
			context: {
				modifier: false,
				height: 'u-height-full',
				additional_classes: false,
				button: false,
				list_items: [
					{
						li_text: '<span>Gradängen, Goto10</span><br /><span class="color-granit">Hammarby Slussväg 4, 118 60 Stockholm</span>',
						icon: 'pin'
					},
					{
						li_text: 'Vardagar: 8:00-17:00<br />Helger: Stängt',
						icon: 'time'
					},
					{
						li_text: 'Riggat för livesändning',
						icon: 'streaming'
					},
					{
						li_text: 'Rullstolsanpassad lokal med ramp',
						icon: 'accessibility'
					},
				]
			}
		},
	],
};
