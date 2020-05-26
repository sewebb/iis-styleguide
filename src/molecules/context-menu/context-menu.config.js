module.exports = {
	status: 'ready',

	context: {
		name: 'Context menu',
		controls: 'contextMenu',
		focusTrap: true
	},
	variants: [
		{
		name: 'No focus trap',
		context: {
			controls: 'contextMenu2',
			focusTrap: false
			}
		}
	]
}
