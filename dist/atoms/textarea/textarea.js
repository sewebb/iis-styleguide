'use strict';

var textareas = document.querySelectorAll('textarea[data-rich-text]');

function initRichText(Quill, textarea) {
	var wrapper = document.createElement('div');
	var container = document.createElement('div');

	container.innerHTML = textarea.value;
	wrapper.appendChild(container);

	textarea.parentNode.insertBefore(wrapper, textarea);
	textarea.style.display = 'none';
	textarea.editor = new Quill(container, {
		placeholder: textarea.getAttribute('placeholder'),
		modules: {
			toolbar: '#toolbar'
		}
	});

	textarea.editor.on('text-change', function () {
		textarea.value = textarea.editor.root.innerHTML;
	});
}

if (textareas.length) {
	// eslint-disable-next-line global-require
	var Quill = require('quill');

	[].forEach.call(textareas, initRichText.bind(null, Quill));
}