module.exports = {
	status: "ready",
	tags: ['RTR', 'website'],

	context: {
		url: '#',
		text: 'Primary button',
		button_type: false,
		type: false,
		id: false,
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
	]
};
