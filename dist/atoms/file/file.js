'use strict';

var inputs = document.querySelectorAll('[type="file"]');

Array.prototype.forEach.call(inputs, function (input) {
	var label = input.nextElementSibling;
	var labelText = label.firstElementChild;
	var labelVal = labelText.innerHTML;
	var removebutton = label.nextElementSibling;

	function handleFileName(e) {
		var fileName = '';
		if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);else fileName = e.target.value.split('\\').pop();

		if (fileName) labelText.innerHTML = fileName;else labelText.innerHTML = labelVal;

		removebutton.classList.remove('is-hidden');
	}

	input.addEventListener('change', handleFileName);

	removebutton.addEventListener('click', function () {
		var fileName = '';
		if (fileName) labelText.innerHTML = fileName;else labelText.innerHTML = labelVal;
		removebutton.classList.add('is-hidden');
		input.value = '';
		input.focus();
	});
});