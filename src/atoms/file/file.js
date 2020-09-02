const inputs = document.querySelectorAll('[type="file"]');

Array.prototype.forEach.call(inputs, (input) => {
	const label	 = input.nextElementSibling;
	const labelText	 = label.firstElementChild;
	const labelVal = labelText.innerHTML;
	const removebutton = label.nextElementSibling;

	function handleFileName(e) {
		let fileName = '';
		if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
		else fileName = e.target.value.split('\\').pop();

		if (fileName) labelText.innerHTML = fileName;
		else labelText.innerHTML = labelVal;

		removebutton.classList.remove('is-hidden');
	}

	input.addEventListener('change', handleFileName);

	removebutton.addEventListener('click', () => {
		const fileName = '';
		if (fileName) labelText.innerHTML = fileName;
		else labelText.innerHTML = labelVal;
		removebutton.classList.add('is-hidden');
		input.value = '';
		input.focus();
	});
});
