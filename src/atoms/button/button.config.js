module.exports = {
	status: "ready",
	tags: ['RTR', 'website'],

	context: {
		url: '#',
		text: 'Primary button',
		button_type: false,
		type: false,
		id: false,
		aria_controls: false
	},
	variants: [
		{
			name: 'Ruby light',
			context: {
				modifiers: ['ruby-light'],
				text: 'Ruby secondary button'
			}
		},
		{
			name: 'Ruby dark',
			context: {
				modifiers: ['ruby-dark'],
				text: 'Ruby dark secondary button'
			}
		},
		{
			name: 'Jade light',
			context: {
				modifiers: ['jade-light'],
				text: 'Jade secondary button'
			}
		},
		{
			name: 'Jade dark',
			context: {
				modifiers: ['jade-dark'],
				text: 'Jade dark secondary button'
			}
		},
		{
			name: 'Lemon',
			context: {
				modifiers: ['lemon'],
				text: 'Lemon button'
			}
		},
		{
			name: 'Lemon light',
			context: {
				modifiers: ['lemon-light'],
				text: 'Lemon secondary button'
			}
		},
		{
			name: 'Transparent',
			context: {
				modifiers: ['transparent'],
				text: 'Going home'
			}
		},
		{
			name: 'Dashed',
			context: {
				modifiers: ['dashed'],
				text: 'Dashed hollow button'
			}
		},
		{
			name: 'Small',
			context: {
				modifiers: ['small'],
				text: 'Going home'
			}
		},
		{
			name: 'Large',
			context: {
				modifiers: ['large'],
				text: 'Going home'
			}
		},
		{
			name: 'With icon',
			context: {
				modifiers: ['icon'],
				text: 'Button with icon',
				additional_classes: 'has-loader',
				icon: 'arrow-forwards',
				el: 'button'
			}
		},
		{
			name: 'With left icon',
			context: {
				modifiers: ['icon', 'icon-left'],
				text: 'Button with left icon',
				additional_classes: 'has-loader',
				icon: 'arrow-forwards',
				el: 'button'
			}
		},
		{
			name: 'Transparent with icon',
			context: {
				modifiers: ['transparent'],
				text: 'Going home',
				icon: 'arrow-forwards',
				el: 'button'
			}
		},
		{
			name: 'Loading',
			context: {
				url: false,
				modifiers: ['large'],
				additional_classes: 'has-loader',
				text: 'Click me',
				el: 'button'
			}
		},
		{
			name: 'Standalone icon',
			context: {
				url: false,
				modifiers: ['standalone-icon'],
				text: '',
				icon: 'close',
				el: 'button'
			}
		},
		{
			name: 'Standalone icon white',
			context: {
				url: false,
				modifiers: ['standalone-icon'],
				additional_classes: 'a-button--standalone-icon--white',
				text: '',
				icon: 'close',
				el: 'button'
			}
		},
	]
};
