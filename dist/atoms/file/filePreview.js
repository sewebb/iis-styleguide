'use strict';

var fileInputs = document.querySelectorAll('input[data-id=fileInput]');

Array.prototype.forEach.call(fileInputs, function (fileInput) {
	var filePreview = fileInput.previousElementSibling.firstElementChild;
	var label = fileInput.nextElementSibling;
	var removebutton = label.nextElementSibling;

	var validImgFormats = ['image/jpeg', 'image/png', 'image/gif'];

	function handleFileUpload(inputEvent) {
		var inputFile = inputEvent.target;
		var reader = new FileReader();

		if (validImgFormats.indexOf(inputFile.files[0].type) === -1) {
			console.warning('Välj en bildfil i något av följande filformat: .png, .jpg, and .gif.');
		}

		reader.readAsDataURL(inputFile.files[0]);
		reader.onload = function (readerEvent) {
			filePreview.src = readerEvent.target.result;
		};

		removebutton.addEventListener('click', function () {
			filePreview.src = null;
		});
	}

	fileInput.addEventListener('change', handleFileUpload, false);
});