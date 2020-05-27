const textareas = document.querySelectorAll('textarea[data-rich-text]');

function initRichText(Quill, textarea) {
	const wrapper = document.createElement('div');
	const container = document.createElement('div');

	container.innerHTML = textarea.value;
	wrapper.appendChild(container);

	textarea.parentNode.insertBefore(wrapper, textarea);
	textarea.style.display = 'none';
	textarea.editor = new Quill(container, {
		placeholder: textarea.getAttribute('placeholder'),
		modules: {
			toolbar: ['bold', 'italic', 'underline', 'strike', 'link'],
		},
	});

	textarea.editor.on('text-change', () => {
		textarea.value = textarea.editor.root.innerHTML;
	});
}

if (textareas.length) {
	// eslint-disable-next-line global-require
	const Quill = require('quill');

	[].forEach.call(textareas, initRichText.bind(null, Quill));
}
