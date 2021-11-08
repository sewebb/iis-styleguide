import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import className from '../../assets/js/className';

function clearAndCapitalize(str) {
	return str.replace(/-/, '').toUpperCase();
}

function kebabToCamel(str) {
	return str.replace(/-\w/g, clearAndCapitalize);
}

function kebabToPascal(str) {
	return str.replace(/(^\w|-\w)/g, clearAndCapitalize);
}

function createToolbarButton(el, control, editor) {
	const button = document.createElement('button');

	button.setAttribute('data-rich-text-control', control);
	button.value = kebabToCamel(control);
	button.innerHTML = `
		<span class="u-visuallyhidden">${control.replace('-', ' ')}</span>
		<svg class="icon">
			<use xlink:href="#icon-richtext-${control}"></use>
		</svg>
	`;

	el.appendChild(button);

	button.addEventListener('click', (e) => {
		e.preventDefault();

		const method = `toggle${kebabToPascal(control)}`;

		editor.chain().focus()[method]().run();
	});
}

function toogleButtonState(editor, el) {
	[].forEach.call(el.parentNode.querySelectorAll('[data-rich-text-control]'), (control) => {
		if (editor.isActive(control.value)) {
			control.classList.add('is-active');
		} else {
			control.classList.remove('is-active');
		}
	});
}

function createToolbar(el, editor) {
	const toolbar = document.createElement('div');

	toolbar.className = className('a-textarea__toolbar');

	el.parentNode.insertBefore(toolbar, el);

	['bold', 'italic', 'bullet-list'].forEach((control) => {
		createToolbarButton(toolbar, control, editor);
	});
}

function setupTextArea(el) {
	const editorEl = document.createElement('div');
	const editor = new Editor({
		element: editorEl,
		extensions: [
			StarterKit,
		],
		content: el.value,
		onTransaction(props) {
			toogleButtonState(props.editor, editorEl);
		},
	});

	editorEl.className = el.className;
	editorEl.classList.add(className('a-textarea--rich-text'));

	el.style.display = 'none';
	el.editor = editor;

	el.parentNode.insertBefore(editorEl, el);

	createToolbar(editorEl, editor);
}

const els = document.querySelectorAll('textarea[data-rich-text]');

if (els.length) {
	[].forEach.call(els, (el) => setupTextArea(el, Editor, StarterKit));
}
