import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import { Link } from '@tiptap/extension-link';
import History from '@tiptap/extension-history';
import className from '../../assets/js/className';
import { open } from '../../molecules/modal/modal';

function clearAndCapitalize(str) {
	return str.replace(/-/, '').toUpperCase();
}

function kebabToCamel(str) {
	return str.replace(/-\w/g, clearAndCapitalize);
}

function kebabToPascal(str) {
	return str.replace(/(^\w|-\w)/g, clearAndCapitalize);
}

function insertLink(el, editor) {
	const addLink = (e, modal, close) => {
		e.preventDefault();

		let value = modal.querySelector('input').value.trim();

		if (!value.length) {
			editor.commands.unsetLink();
		} else {
			const isAbsolute = new RegExp('(?:^[a-z][a-z0-9+.-]*:|//)', 'i');

			if (!isAbsolute.test(value)) {
				value = `https://${value}`;
			}

			editor.commands.toggleLink({ href: value });
		}

		close();
	};

	if (editor.view.state.selection.empty) {
		return;
	}

	const currentValue = (editor.getAttributes('link').href) ? editor.getAttributes('link').href : '';

	open({
		title: 'Lägg till länk',
		content: `
			<p class="u-m-b-0 u-m-t-default"><input type="url" value="${currentValue}" class="${className('a-input')}"></p>
		`,
		actions: [
			{
				text: 'Avbryt',
				color: 'transparent',
				attrs: {
					'data-modal-close': null,
				},
			},
			{
				text: 'Spara',
				modifier: 'primary',
				key: 'enter',
				onClick: addLink,
			},
		],
	}, {
		onOpen(id, modal) {
			modal.querySelector('input').focus();
		},
	});
}

function createToolbarButton(el, control, editor) {
	const button = document.createElement('button');
	const iconId = (['link'].includes(control)) ? control : `richtext-${control}`;

	button.setAttribute('data-rich-text-control', control);
	button.value = kebabToCamel(control);
	button.innerHTML = `
		<span class="u-visuallyhidden">${control.replace('-', ' ')}</span>
		<svg class="icon">
			<use xlink:href="#icon-${iconId}"></use>
		</svg>
	`;

	el.appendChild(button);

	button.addEventListener('click', (e) => {
		e.preventDefault();

		if (control === 'link') {
			insertLink(el, editor);
		} else {
			const method = `toggle${kebabToPascal(control)}`;

			editor.chain()
				.focus()[method]()
				.run();
		}
	});
}

function toogleButtonState(editor, el) {
	[].forEach.call(el.parentNode.querySelectorAll('[data-rich-text-control]'), (control) => {
		if (editor.isActive(control.value)) {
			control.classList.add('is-active');
		} else {
			control.classList.remove('is-active');
		}

		if (control.value === 'link' && editor.view.state.selection.empty) {
			control.disabled = true;
		} else if (control.value === 'link') {
			control.disabled = false;
		}
	});
}

function createToolbar(el, editor) {
	const toolbar = document.createElement('div');

	toolbar.className = className('a-textarea__toolbar');

	el.parentNode.insertBefore(toolbar, el);

	['bold', 'italic', 'link', 'bullet-list'].forEach((control) => {
		createToolbarButton(toolbar, control, editor);
	});
}

function getHTML(editor) {
	const html = editor.getHTML();

	return html
		.replace(/<li><p>/g, '<li>')
		.replace(/<\/p><\/li>/g, '</li>');
}

export function setupTextArea(el, onChange = () => {}) {
	const editorEl = document.createElement('div');
	const editor = new Editor({
		element: editorEl,
		extensions: [
			Document,
			Paragraph,
			Text,
			ListItem,
			BulletList,
			Bold,
			Italic,
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'u-link',
				},
			}),
			History.configure({
				depth: 10,
			}),
		],
		content: el.value,
		onTransaction(props) {
			toogleButtonState(props.editor, editorEl);
		},
		onUpdate(props) {
			const html = getHTML(props.editor);

			el.value = html;
			onChange(html);
		},
	});

	editorEl.className = el.className;
	editorEl.classList.add(className('a-textarea--rich-text'));

	el.classList.add(className('a-textarea--hidden'));
	el.editor = editor;

	el.parentNode.insertBefore(editorEl, el);

	createToolbar(editorEl, editor);

	const event = new CustomEvent('editor-ready', {
		detail: {
			editor,
		},
	});

	el.dispatchEvent(event);
}

export function init() {
	const els = document.querySelectorAll('textarea[data-rich-text]');

	if (els.length) {
		[].forEach.call(els, (el) => setupTextArea(el));
	}
}

init();
