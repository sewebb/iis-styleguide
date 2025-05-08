// Show/hide target container when Radiobutton is selected
"use strict";
const radioButtons = document.querySelectorAll('[data-toggle="radio"]');
// Hide all target containers on page load
radioButtons.forEach((radio)=>{
    const targetId = radio.getAttribute('data-target');
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
        targetContainer.setAttribute('aria-hidden', 'true');
    }
});
// Function to toggle visibility
function toggleVisibility(event) {
    // Hide all target containers
    radioButtons.forEach((radio)=>{
        const targetId = radio.getAttribute('data-target');
        const targetContainer = document.getElementById(targetId);
        if (targetContainer) {
            targetContainer.setAttribute('aria-hidden', 'true');
        }
        // Update aria-expanded for all radio buttons
        radio.setAttribute('aria-expanded', radio.checked ? 'true' : 'false');
    });
    // Show the selected target container
    const selectedTargetId = event.target.getAttribute('data-target');
    const selectedTargetContainer = document.getElementById(selectedTargetId);
    if (selectedTargetContainer) {
        selectedTargetContainer.setAttribute('aria-hidden', 'false');
    }
}
// Add event listener to radio buttons
radioButtons.forEach((radio)=>{
    radio.addEventListener('change', toggleVisibility);
});
