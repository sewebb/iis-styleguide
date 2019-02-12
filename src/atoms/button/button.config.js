module.exports = {
	status: "wip",
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
				modifiers: ['ruby-light','icon'],
				text: 'Ruby secondary button',
				icon: 'arrow-forwards'
			}
		},
		{
			name: 'Lemon',
			context: {
				modifiers: ['lemon','icon'],
				text: 'Lemon button',
				icon: 'arrow-forwards'
			}
		},
		{
			name: 'Lemon light',
			context: {
				modifiers: ['lemon-light','icon'],
				text: 'Lemon secondary button',
				icon: 'arrow-forwards'
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
				icon: 'arrow-forwards'
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
