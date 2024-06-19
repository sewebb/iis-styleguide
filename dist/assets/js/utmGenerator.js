'use strict';

// Show/hide target container when Radiobutton is selected
var radioButtons = document.querySelectorAll('[data-toggle="radio"]');

// Hide all target containers on page load
radioButtons.forEach(function (radio) {
	var targetId = radio.getAttribute('data-target');
	var targetContainer = document.getElementById(targetId);
	if (targetContainer) {
		targetContainer.setAttribute('aria-hidden', 'true');
	}
});

// Function to toggle visibility
function toggleVisibility(event) {
	// Hide all target containers
	radioButtons.forEach(function (radio) {
		var targetId = radio.getAttribute('data-target');
		var targetContainer = document.getElementById(targetId);
		if (targetContainer) {
			targetContainer.setAttribute('aria-hidden', 'true');
		}

		// Update aria-expanded for all radio buttons
		radio.setAttribute('aria-expanded', radio.checked ? 'true' : 'false');
	});

	// Show the selected target container
	var selectedTargetId = event.target.getAttribute('data-target');
	var selectedTargetContainer = document.getElementById(selectedTargetId);
	if (selectedTargetContainer) {
		selectedTargetContainer.setAttribute('aria-hidden', 'false');
	}
}

// Add event listener to radio buttons
radioButtons.forEach(function (radio) {
	radio.addEventListener('change', toggleVisibility);
});