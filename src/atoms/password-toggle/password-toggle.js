const elements = document.querySelectorAll('.js-toggle-input-type');

if (elements) {
	[].forEach.call(elements, (element) => {
		element.addEventListener('click', () => {
			const input = element.previousElementSibling;
			input.type = (input.type === 'password') ? 'text' : 'password';
		});
	});
}
