'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _className = require('../../assets/js/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiSelect = function () {
	function MultiSelect(el) {
		var _this = this;

		_classCallCheck(this, MultiSelect);

		this.onInput = function () {
			var value = _this.input.value;

			// Clear suggestions if less than 2 characters are typed

			if (value.length < 2) {
				_this.clearSuggestions();

				return;
			}

			var suggestions = _this.filterData(value);

			_this.populateSuggestions(suggestions);
			_this.resetFocus();
		};

		this.onKeyDown = function (e) {
			if (e.keyCode === 40) {
				_this.highlight('down');
			} else if (e.keyCode === 38) {
				_this.highlight('up');
			} else if (e.keyCode === 13) {
				e.preventDefault();

				_this.selectHighlighted();
			}
		};

		this.onClick = function (e) {
			if (e.target.classList.contains((0, _className2.default)(_this.baseClassName + '__suggestion-btn'))) {
				_this.addItem(e.target.textContent);
				_this.clearSuggestions();
				_this.input.value = '';
			}
		};

		this.element = el;
		this.baseClassName = 'm-multi-select';
		this.currentFocus = -1;
		this.input = this.element.querySelector('.js-' + this.baseClassName + '__input');
		this.suggestionsBox = this.element.querySelector('.js-' + this.baseClassName + '-suggestions-box');
		this.selectedItemsList = this.element.querySelector('.js-m-multi-select-selected-items');
		this.selectedItems = [];
		this.data = [];

		this.getData();
		this.attach();
	}

	_createClass(MultiSelect, [{
		key: 'getData',
		value: function getData() {
			var id = this.input.getAttribute('data-multi-select-suggestions');
			var el = document.getElementById(id);

			if (!el) {
				this.data = [];
				return;
			}

			this.data = JSON.parse(el.textContent);
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.input.addEventListener('input', this.onInput);
			this.input.addEventListener('keydown', this.onKeyDown);
			this.suggestionsBox.addEventListener('click', this.onClick);
		}
	}, {
		key: 'setFocus',
		value: function setFocus(index) {
			this.currentFocus = index;
		}
	}, {
		key: 'resetFocus',
		value: function resetFocus() {
			this.setFocus(-1);
		}
	}, {
		key: 'clearSuggestions',
		value: function clearSuggestions() {
			this.suggestionsBox.innerHTML = '';
		}
	}, {
		key: 'filterData',
		value: function filterData(query) {
			var _this2 = this;

			return this.data.filter(function (item) {
				return item.name.toLowerCase().startsWith(query.toLowerCase());
			}).filter(function (item) {
				return !_this2.selectedItems.includes(item.name);
			});
		}
	}, {
		key: 'populateSuggestions',
		value: function populateSuggestions(suggestions) {
			var cls = (0, _className2.default)(this.baseClassName + '__suggestion-btn');
			this.suggestionsBox.innerHTML = suggestions.map(function (item) {
				return '<button class=\'' + cls + '\' tabindex=\'0\'>' + item.name + '</button>';
			}).join('');
		}
	}, {
		key: 'removeItem',
		value: function removeItem(item, index) {
			var selectedItemsList = this.element.querySelector('.js-m-multi-select-selected-items');
			selectedItemsList.removeChild(item);

			var remainingItems = selectedItemsList.getElementsByTagName('div');

			// Focus management: set focus to the next item, or the search input if no items left
			if (remainingItems.length > 0) {
				if (index < remainingItems.length) {
					remainingItems[index].getElementsByTagName('button')[0].focus();
				} else {
					remainingItems[remainingItems.length - 1].getElementsByTagName('button')[0].focus();
				}
			} else {
				this.input.focus();
			}

			this.selectedItems = this.selectedItems.filter(function (name) {
				return name !== item.firstChild.textContent.trim();
			});
		}
	}, {
		key: 'addItem',
		value: function addItem(item) {
			var _this3 = this;

			var newItem = document.createElement('li');
			newItem.textContent = item + ' ';
			newItem.classList.add((0, _className2.default)('a-tag'));
			newItem.classList.add((0, _className2.default)(this.baseClassName + '__tag'));

			var removeBtn = document.createElement('button');
			removeBtn.classList.add((0, _className2.default)(this.baseClassName + '-selected-items__remove-btn'));

			var buttonTextContainer = document.createElement('span');
			buttonTextContainer.classList.add('u-visuallyhidden');
			removeBtn.appendChild(buttonTextContainer);
			buttonTextContainer.textContent = 'Ta bort ' + item; // Accessibility label for screen readers

			// Event listener for removing the selected item
			removeBtn.addEventListener('click', function () {
				_this3.removeItem(newItem, Array.from(_this3.selectedItemsList.children).indexOf(newItem));
			});

			newItem.appendChild(removeBtn);

			this.selectedItemsList.appendChild(newItem);
			this.selectedItems.push(item);
		}
	}, {
		key: 'removeHighlight',
		value: function removeHighlight() {
			var items = this.suggestionsBox.getElementsByClassName(this.baseClassName + '__suggestion-btn');

			[].forEach.call(items, function (item) {
				item.classList.remove('autocomplete-active');
			});
		}
	}, {
		key: 'highlight',
		value: function highlight(direction) {
			var items = this.suggestionsBox.getElementsByClassName(this.baseClassName + '__suggestion-btn');
			var focus = this.currentFocus;

			if (direction === 'down') {
				focus = focus >= items.length - 1 ? 0 : focus + 1;
			} else {
				focus = focus <= 0 ? items.length - 1 : focus - 1;
			}

			this.setFocus(focus);
			this.removeHighlight();

			items[this.currentFocus].classList.add('autocomplete-active');
			items[this.currentFocus].scrollIntoView({ block: 'nearest' });
		}
	}, {
		key: 'selectHighlighted',
		value: function selectHighlighted() {
			var items = this.suggestionsBox.getElementsByClassName(this.baseClassName + '__suggestion-btn');

			if (this.currentFocus > -1 && items[this.currentFocus]) {
				this.addItem(items[this.currentFocus].textContent);
				this.clearSuggestions();
				this.input.value = '';
				this.resetFocus();
			}
		}
	}]);

	return MultiSelect;
}();

var multiSelectElements = document.querySelectorAll('.js-m-multi-select');

if (multiSelectElements) {
	[].forEach.call(multiSelectElements, function (el) {
		return new MultiSelect(el);
	});
}