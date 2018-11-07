module.exports = {
	status: "wip",
    tags: ['RTR', 'website'],

    context: {
        url: '#',
        text: 'Button'
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
            name: 'With icon',
            context: {
                modifiers: ['icon'],
                text: 'Button with icon',
                icon: 'arrow'
            }
        }
    ]
};
