const fileInputs = document.querySelectorAll('input[data-id=fileInput]');

Array.prototype.forEach.call(fileInputs, (fileInput) => {
	const fieldGroup = fileInput.closest('.field-group');
	const filePreview = fieldGroup ? fieldGroup.querySelector('[data-id="filePreview"]') : null;
	const filePreviewContainer = filePreview ? filePreview.parentElement : null;
	const label	 = fileInput.nextElementSibling;
	const removebutton = label.nextElementSibling;

	const validImgFormats = [
		'image/jpeg',
		'image/png',
		'image/gif',
	];

	function resetPreview() {
		filePreview.src = '';
		filePreviewContainer.style.removeProperty('aspect-ratio');
	}

	function handleFileUpload(inputEvent) {
		const inputFile = inputEvent.target.files[0];
		const reader = new FileReader();

		if (!filePreview || !filePreviewContainer || !removebutton || !inputFile) {
			resetPreview();
			return;
		}

		if (validImgFormats.indexOf(inputFile.type) === -1) {
			console.warn('Välj en bildfil i något av följande filformat: .png, .jpg, and .gif.');
			resetPreview();
			return;
		}

		reader.onload = (readerEvent) => {
			filePreview.onload = () => {
				if (filePreview.naturalWidth && filePreview.naturalHeight) {
					filePreviewContainer.style.aspectRatio = `${filePreview.naturalWidth} / ${filePreview.naturalHeight}`;
				}

				filePreview.onload = null;
			};

			filePreview.src = readerEvent.target.result;
		};

		reader.readAsDataURL(inputFile);
	}

	if (!filePreview || !filePreviewContainer || !removebutton) {
		return;
	}

	removebutton.addEventListener('click', () => {
		resetPreview();
	});

	fileInput.addEventListener('change', handleFileUpload, false);
});
