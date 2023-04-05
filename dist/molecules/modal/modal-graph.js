'use strict';

/**
 * Close overlay on graph modal
 */

var graphModals = document.querySelectorAll('.js-modal-graph');
var graphModalButtons = document.querySelectorAll('.js-modal-graph-button');

var addMultipleListeners = function addMultipleListeners(el, types, listener, options, useCapture) {
	types.forEach(function (type) {
		return el.addEventListener(type, listener, options, useCapture);
	});
};

function closeOverlay(graphModalButton) {
	// Close overlay button on 'click' on itself
	graphModalButton.addEventListener('click', function () {
		graphModalButton.classList.add('is-hidden');
		graphModalButton.blur();
	});

	[].forEach.call(graphModals, function (graphModal) {
		var closeButton = graphModal.querySelector('.js-toggle-modal');

		closeButton.addEventListener('click', function () {
			graphModalButton.classList.remove('is-hidden');
		});

		// Close overlay button on 'wheel', 'scroll', 'touchstart' on modal container
		addMultipleListeners(graphModal, ['wheel', 'scroll', 'touchstart'], function () {
			graphModalButton.classList.add('is-hidden');
			console.log('fire!');
		});
	});
}

if (graphModalButtons && graphModals) {
	[].forEach.call(graphModalButtons, closeOverlay);
}