module.exports = {
	status: 'ready',

	context: {
		heading: 'Meningsfull tid i rapporten Svenskarna och internet 2019',
		has_image: true,
		has_radius: false,
		limited_width: false
	},
	variants: [
		{
			name: 'Wrapped',
			context: {
				no_image_class: 'o-hero--border-radius',
				limited_width: true,
				has_radius: true,
				text: 'Nästan alla i Sverige använder internet – men hur meningsfull är tiden vi spenderar där? I rapporten Svenskarna och internet 2019 frågar vi för första gången om meningsfullhet, och det syns stora skillnader mellan olika aktiviteter. Tid på sociala medier tycker bara var fjärde är meningsfull.',
			}
		},
		{
			name: 'No image',
			context: {
				no_image_class: 'o-hero--no-image',
				has_image: false,
				text: 'Nästan alla i Sverige använder internet – men hur meningsfull är tiden vi spenderar där? I rapporten Svenskarna och internet 2019 frågar vi för första gången om meningsfullhet, och det syns stora skillnader mellan olika aktiviteter. Tid på sociala medier tycker bara var fjärde är meningsfull.',
			}
		},
		{
			name: 'Video',
			context: {
				no_image_class: 'o-hero--border-radius',
				video_class: 'o-hero--video',
				limited_width: true,
				has_video: true,
				has_image: false
			}
		},
		{
			name: 'Event hero',
				context: {
					event_title: 'Creator Circle Meetup',
					organizer: 'Creator Circle',
					city: 'Stockholm',
					time: '24 januari 2020 18:20-21:30',
					no_image_class: 'o-hero--border-radius',
					icon_share: 'share',
					icon_export: 'external-link',
					limited_width: true,
					has_image: false,
					has_video: false,
					is_event: true
				}
		},
		{
			name: 'Clean',
			context: {
				no_image_class: 'o-hero--clean',
			}
		},
		{
			name: 'Early breakpoint',
			context: {
				no_image_class: 'o-hero--break-early o-hero--clean',
			}
		},
	]
}
