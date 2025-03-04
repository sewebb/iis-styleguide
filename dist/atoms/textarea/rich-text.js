'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setupTextArea = setupTextArea;
exports.init = init;

var _core = require('@tiptap/core');

var _extensionDocument = require('@tiptap/extension-document');

var _extensionDocument2 = _interopRequireDefault(_extensionDocument);

var _extensionParagraph = require('@tiptap/extension-paragraph');

var _extensionParagraph2 = _interopRequireDefault(_extensionParagraph);

var _extensionText = require('@tiptap/extension-text');

var _extensionText2 = _interopRequireDefault(_extensionText);

var _extensionBulletList = require('@tiptap/extension-bullet-list');

var _extensionBulletList2 = _interopRequireDefault(_extensionBulletList);

var _extensionListItem = require('@tiptap/extension-list-item');

var _extensionListItem2 = _interopRequireDefault(_extensionListItem);

var _extensionBold = require('@tiptap/extension-bold');

var _extensionBold2 = _interopRequireDefault(_extensionBold);

var _extensionItalic = require('@tiptap/extension-italic');

var _extensionItalic2 = _interopRequireDefault(_extensionItalic);

var _extensionLink = require('@tiptap/extension-link');

var _extensionHistory = require('@tiptap/extension-history');

var _extensionHistory2 = _interopRequireDefault(_extensionHistory);

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

function getHTML(editor) {
	var html = editor.getHTML();

	return html.replace(/<li><p>/g, '<li>').replace(/<\/p><\/li>/g, '</li>');
}

function setupTextArea(el) {
	var onChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

	var editorEl = document.createElement('div');
	var editor = new _core.Editor({
		element: editorEl,
		extensions: [_extensionDocument2.default, _extensionParagraph2.default, _extensionText2.default, _extensionListItem2.default, _extensionBulletList2.default, _extensionBold2.default, _extensionItalic2.default, _extensionLink.Link.configure({
			openOnClick: false,
			HTMLAttributes: {
				class: 'u-link'
			}
		}), _extensionHistory2.default.configure({
			depth: 10
		})],
		content: el.value,
		onTransaction: function onTransaction(props) {
			toogleButtonState(props.editor, editorEl);
		},
		onUpdate: function onUpdate(props) {
			var html = getHTML(props.editor);

			el.value = html;
			onChange(html);
		}
	});

	editorEl.className = el.className;
	editorEl.classList.add((0, _className2.default)('a-textarea--rich-text'));

	el.classList.add((0, _className2.default)('a-textarea--hidden'));
	el.editor = editor;

	el.parentNode.insertBefore(editorEl, el);

	createToolbar(editorEl, editor);

	var event = new CustomEvent('editor-ready', {
		detail: {
			editor: editor
		}
	});

	el.dispatchEvent(event);
}

function init() {
	var els = document.querySelectorAll('textarea[data-rich-text]');

	if (els.length) {
		[].forEach.call(els, function (el) {
			return setupTextArea(el);
		});
	}
}

init();