const fileInputs = document.querySelectorAll('input[data-id=fileInput]');

Array.prototype.forEach.call(fileInputs, (fileInput) => {
	const filePreview = fileInput.previousElementSibling.firstElementChild;
	const label	 = fileInput.nextElementSibling;
	const removebutton = label.nextElementSibling;

	const validImgFormats = [
		'image/jpeg',
		'image/png',
		'image/gif',
	];

	function handleFileUpload(inputEvent) {
		const inputFile = inputEvent.target;
		const reader = new FileReader();

		if (validImgFormats.indexOf(inputFile.files[0].type) === -1) {
			console.warning('Välj en bildfil i något av följande filformat: .png, .jpg, and .gif.');
		}

		reader.readAsDataURL(inputFile.files[0]);
		reader.onload = (readerEvent) => {
			filePreview.src = readerEvent.target.result;
		};

		removebutton.addEventListener('click', () => {
			filePreview.src = '';
		});
	}

	fileInput.addEventListener('change', handleFileUpload, false);
});
