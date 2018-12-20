module.exports = {
	status: "wip",
	tags: ['RTR', 'website'],

	context: {
		url: '#',
		text: 'Primary button',
		type: false,
	},
	variants: [
		{
			name: 'Secondary',
			context: {
				modifiers: ['secondary'],
				text: 'Secondary button'
			}
		},
		{
			name: 'Ruby',
			context: {
				modifiers: ['ruby'],
				text: 'Ruby button'
			}
		},
		{
			name: 'Ruby light',
			context: {
				modifiers: ['ruby-light'],
				text: 'Ruby secondary button'
			}
		},
		{
			name: 'Peacock',
			context: {
				modifiers: ['peacock'],
				text: 'Peacock button'
			}
		},
		{
			name: 'Peacock light',
			context: {
				modifiers: ['peacock-light'],
				text: 'Peacock secondary button'
			}
		},
		{
			name: 'Sandstone',
			context: {
				modifiers: ['sandstone'],
				text: 'Sandstone button'
			}
		},
		{
			name: 'Sandstone light',
			context: {
				modifiers: ['sandstone-light'],
				text: 'Sandstone secondary button'
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
			name: 'Jade',
			context: {
				modifiers: ['jade'],
				text: 'Jade button'
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
			name: 'With icon',
			context: {
				modifiers: ['icon'],
				text: 'Button with icon',
				icon: 'arrow-forwards'
			}
		}
	]
};
