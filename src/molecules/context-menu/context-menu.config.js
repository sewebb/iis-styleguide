module.exports = {
	status: 'ready',

	context: {
		name: 'Context menu',
		controls: 'contextMenu',
		focusTrap: true,
		outsideClick: false
	},
	variants: [
		{
		name: 'No focus trap',
		context: {
			controls: 'contextMenu2',
			focusTrap: false,
			outsideClick: false
			}
		},
		{
		name: 'Close on outside click',
		context: {
			controls: 'contextMenu3',
			focusTrap: false,
			outsideClick: true
			}
		}
	]
};
