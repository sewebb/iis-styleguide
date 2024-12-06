module.exports = {
	status: 'ready',

	context: {
		item: [
			{
				text: 'Kunskap',
				url: '#',
				is_current: false,
				icon: false,
				hide_mobile: true
			},
			{
				text: 'Innovation',
				url: '#',
				is_current: false,
				icon: false,
				hide_mobile: true
			},
			{
				text: 'Domäner',
				url: '#',
				is_current: true,
				icon: false,
				hide_mobile: true
			},
			{
				text: 'Ämnen',
				url: false,
				is_current: false,
				icon: 'icon-arrow-down',
				hide_mobile: true,
				has_dropdown: true,
				has_expandable: true,
				controls: 'dropdown'
			},
			{
				text: 'Bli medlem',
				url: '#',
				is_current: false,
				icon: false,
				hide_mobile: false,
				is_button: true
			},
			{
				text: 'Lyssna',
				url: false,
				is_current: false,
				icon: false,
				has_readspeaker: true,
				hide_mobile: false
			},
			{
				text: 'Sök ledig domän',
				url: false,
				is_current: false,
				icon: 'icon-arrow-down',
				extra_class: 'js-toggle-domain-search',
				has_expandable: true,
				controls: 'domain-search',
				hide_mobile: true
			},
			{
				text: 'Meny',
				url: false,
				is_current: false,
				icon: 'icon-hamburger',
				extra_class: 'js-toggle-mega-menu',
				has_expandable: true,
				controls: 'mega-menu',
				hide_mobile: false,
				has_id: true,
				id: 'mega-menu-text',
				toggle_text: true,
				data_toggle_text: 'Meny|Stäng'
			}
		]
	}
};
