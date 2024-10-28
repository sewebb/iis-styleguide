module.exports = {
	status: 'ready',

	context: {
		heading: 'Meningsfull tid i rapporten Svenskarna och internet 2019',
		has_image: true,
		has_radius: false,
		limited_width: false,
		has_buttons: false,
		has_tags: true,
		hero_image: '/assets/images/hero.jpg',
		has_link: true,
		has_pre_heading: false,
		has_text: true,
	},
	variants: [
		{
			name: 'Wrapped',
			context: {
				no_image_class: false,
				has_radius: true,
				limited_width: true,
				has_radius: true,
				has_buttons: false,
				text: 'Nästan alla i Sverige använder internet – men hur meningsfull är tiden vi spenderar där? I rapporten Svenskarna och internet 2019 frågar vi för första gången om meningsfullhet, och det syns stora skillnader mellan olika aktiviteter.',
			}
		},
		{
			name: 'Buttons',
			context: {
				no_image_class: '',
				has_tags: false,
				has_buttons: true,
				limited_width: false,
				hero_image: 'https://www.goto10.se/app/uploads/2024/06/toppbild-goto-10-linkoping-1-.jpg.webp',
			},
		},
		{
			name: 'No image',
			context: {
				no_image_class: 'o-hero--no-image',
				has_radius: false,
				has_image: false,
				has_buttons: false,
				has_tags: true,
				limited_width: false,
				text: 'Nästan alla i Sverige använder internet – men hur meningsfull är tiden vi spenderar där? I rapporten Svenskarna och internet 2019 frågar vi för första gången om meningsfullhet, och det syns stora skillnader mellan olika aktiviteter. Tid på sociala medier tycker bara var fjärde är meningsfull.',
			}
		},
		{
			name: 'Video',
			context: {
				no_image_class: false,
				has_radius: true,
				video_class: 'o-hero--video',
				limited_width: true,
				has_video: true,
				has_image: false,
				has_buttons: false,
			}
		},
		{
			name: 'Pre heading',
			context: {
				has_pre_heading: true,
				pre_heading: 'Publicerad 11 oktober 2022',
				no_image_class: true,
				has_radius: false,
				limited_width: false,
				has_video: false,
				has_image: true,
				has_buttons: true,
			}
		},
		{
			name: 'Event hero',
				context: {
					event_title: 'Creator Circle Meetup',
					organizer: 'Creator Circle',
					city: 'Stockholm',
					time: '24 januari 2020 18:20-21:30',
					event_text: 'Event på Goto 10 i',
					no_image_class: 'o-hero--no-image',
					icon_share: 'share',
					icon_export: 'external-link',
					limited_width: false,
					has_image: false,
					has_video: false,
					is_event: true,
					has_buttons: false,
					background_color: 'background-peacock-light'
				}
		},
		{
			name: 'Event hero with button',
			status: 'ready',
				context: {
					event_title: 'Framtidsoptimism och problemlösning i en uppkopplad värld',
					organizer: 'Heja framtiden',
					city: false,
					time: '22 november 09:00-17:00',
					event_text: 'Digitalt spår på Internetdagarna',
					no_image_class: 'o-hero--no-image',
					geometric_figures: false,
					icon_share: 'share',
					icon_export: 'external-link',
					limited_width: false,
					has_image: false,
					has_video: false,
					is_event: true,
					has_button: true,
					text: 'Köp biljett',
					background_color: 'background-jade-light'
				}
		},
		{
			name: 'Clean',
			context: {
				no_image_class: 'o-hero--clean',
				limited_width: false,
				has_buttons: false,
			}
		},
		{
			name: 'Early breakpoint',
			context: {
				no_image_class: 'o-hero--break-early o-hero--clean',
				limited_width: false,
				has_buttons: false,
			}
		},
		{
			name: 'No breakpoint',
			context: {
				no_image_class: 'o-hero--no-break',
				has_tags: false,
				has_buttons: true,
				limited_width: false,
				heading: 'Välkommen till Goto 10',
				hero_image: 'https://www.goto10.se/app/uploads/2024/06/toppbild-goto-10-linkoping-1-.jpg.webp',
				text: 'Goto 10 är en kostnadsfri mötesplats för kunskapsutbyte och innovation som drivs av Internetstiftelsen. Besök oss i Linköping, Malmö och Stockholm.',
			},
		},
		{
			name: 'Dynamic headline',
			status: 'wip',
			context: {
				has_image: true,
				hero_image: '/assets/images/Reprogramming_ENIAC2.png',
				heading: 'Datadamer - Kvinnorna som digitaliserade världen',
			}
		},
	]
}
