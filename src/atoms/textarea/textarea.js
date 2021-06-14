const textareas = document.querySelectorAll('textarea[data-rich-text]');

function initRichText(textarea) {
	// Nothing here yet
	console.log(textarea);
}

if (textareas.length) {
	[].forEach.call(textareas, initRichText);
}
