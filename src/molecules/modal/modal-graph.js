/**
 * Close overlay on graph modal
 */

const graphModals = document.querySelectorAll('.js-modal-graph');
const graphModalButtons = document.querySelectorAll('.js-modal-graph-button');

const addMultipleListeners = (el, types, listener, options, useCapture) => {
	types.forEach((type) => el.addEventListener(type, listener, options, useCapture));
};

function closeOverlay(graphModalButton) {
	// Close overlay button on 'click' on itself
	graphModalButton.addEventListener('click', () => {
		graphModalButton.classList.add('is-hidden');
		graphModalButton.blur();
	});

	[].forEach.call(graphModals, (graphModal) => {
		const closeButton = graphModal.querySelector('.js-toggle-modal');

		closeButton.addEventListener('click', () => {
			graphModalButton.classList.remove('is-hidden');
		});

		// Close overlay button on 'wheel', 'scroll', 'touchstart' on modal container
		addMultipleListeners(
			graphModal,
			['wheel', 'scroll', 'touchstart'],
			() => {
				graphModalButton.classList.add('is-hidden');
				console.log('fire!');
			},
		);
	});
}

if (graphModalButtons && graphModals) {
	[].forEach.call(graphModalButtons, closeOverlay);
}
