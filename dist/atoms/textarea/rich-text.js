'use strict';

var _core = require('@tiptap/core');

var _starterKit = require('@tiptap/starter-kit');

var _starterKit2 = _interopRequireDefault(_starterKit);

var _extensionLink = require('@tiptap/extension-link');

var _className = require('../../assets/js/className');

var _className2 = _interopRequireDefault(_className);

var _modal = require('../../molecules/modal/modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	var addLink = function addLink(e, modal, close) {
		e.preventDefault();

		var value = modal.querySelector('input').value.trim();

		if (!value.length) {
			editor.commands.unsetLink();
		} else {
			var isAbsolute = new RegExp('(?:^[a-z][a-z0-9+.-]*:|//)', 'i');

			if (!isAbsolute.test(value)) {
				value = 'https://' + value;
			}

			editor.commands.toggleLink({ href: value });
		}

		close();
	};

	if (editor.view.state.selection.empty) {
		return;
	}

	var currentValue = editor.getAttributes('link').href ? editor.getAttributes('link').href : '';

	(0, _modal.open)({
		title: 'Lägg till länk',
		content: '\n\t\t\t<p class="u-m-b-0 u-m-t-default"><input type="url" value="' + currentValue + '" class="' + (0, _className2.default)('a-input') + '"></p>\n\t\t',
		actions: [{
			text: 'Avbryt',
			color: 'transparent',
			attrs: {
				'data-modal-close': null
			}
		}, {
			text: 'Spara',
			modifier: 'primary',
			key: 'enter',
			onClick: addLink
		}]
	}, {
		onOpen: function onOpen(id, modal) {
			modal.querySelector('input').focus();
		}
	});
}

function createToolbarButton(el, control, editor) {
	var button = document.createElement('button');
	var iconId = ['link'].includes(control) ? control : 'richtext-' + control;

	button.setAttribute('data-rich-text-control', control);
	button.value = kebabToCamel(control);
	button.innerHTML = '\n\t\t<span class="u-visuallyhidden">' + control.replace('-', ' ') + '</span>\n\t\t<svg class="icon">\n\t\t\t<use xlink:href="#icon-' + iconId + '"></use>\n\t\t</svg>\n\t';

	el.appendChild(button);

	button.addEventListener('click', function (e) {
		e.preventDefault();

		if (control === 'link') {
			insertLink(el, editor);
		} else {
			var method = 'toggle' + kebabToPascal(control);

			editor.chain().focus()[method]().run();
		}
	});
}

function toogleButtonState(editor, el) {
	[].forEach.call(el.parentNode.querySelectorAll('[data-rich-text-control]'), function (control) {
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
	var toolbar = document.createElement('div');

	toolbar.className = (0, _className2.default)('a-textarea__toolbar');

	el.parentNode.insertBefore(toolbar, el);

	['bold', 'italic', 'link', 'bullet-list'].forEach(function (control) {
		createToolbarButton(toolbar, control, editor);
	});
}

function setupTextArea(el) {
	var editorEl = document.createElement('div');
	var editor = new _core.Editor({
		element: editorEl,
		extensions: [_starterKit2.default, _extensionLink.Link.configure({
			openOnClick: false,
			HTMLAttributes: {
				class: 'u-link'
			}
		})],
		content: el.value,
		onTransaction: function onTransaction(props) {
			toogleButtonState(props.editor, editorEl);
		}
	});

	editorEl.className = el.className;
	editorEl.classList.add((0, _className2.default)('a-textarea--rich-text'));

	el.style.display = 'none';
	el.editor = editor;

	el.parentNode.insertBefore(editorEl, el);

	createToolbar(editorEl, editor);
}

var els = document.querySelectorAll('textarea[data-rich-text]');

if (els.length) {
	[].forEach.call(els, function (el) {
		return setupTextArea(el, _core.Editor, _starterKit2.default);
	});
}