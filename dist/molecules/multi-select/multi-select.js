'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _className = require('../../assets/js/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
				_this.addItem(_this.data.find(function (d) {
					return d.value === e.target.value;
				}));
				_this.clearSuggestions();
				_this.input.value = '';
			}
		};

		this.element = el;
		this.baseClassName = 'm-multi-select';
		this.currentFocus = -1;
		this.name = this.element.getAttribute('data-multi-select-name');
		this.input = this.element.querySelector('.js-' + this.baseClassName + '__input');
		this.suggestionsBox = this.element.querySelector('.js-' + this.baseClassName + '-suggestions-box');
		this.selectedItemsList = this.element.querySelector('.js-m-multi-select-selected-items');
		this.selectedItems = [];
		this.data = [];

		this.getData();
		this.attach();
		this.sync();
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
		key: 'addSuggestions',
		value: function addSuggestions(suggestions) {
			var _this2 = this;

			this.data = [].concat(_toConsumableArray(this.data), _toConsumableArray(suggestions.filter(function (s) {
				return !_this2.data.find(function (d) {
					return d.value === s.value;
				});
			})));
		}
	}, {
		key: 'sync',
		value: function sync() {
			var _this3 = this;

			var inputs = this.element.querySelectorAll('input[name="' + this.name + '[]"]');

			this.selectedItems = [];

			inputs.forEach(function (input) {
				var item = _this3.data.find(function (d) {
					return d.value === input.value;
				});

				if (item) {
					_this3.addItem(item, false);
				}
			});
		}
	}, {
		key: 'filterData',
		value: function filterData(query) {
			var _this4 = this;

			return this.data.filter(function (item) {
				return item.name.toLowerCase().startsWith(query.toLowerCase());
			}).filter(function (item) {
				return !_this4.selectedItems.includes(item.name);
			});
		}
	}, {
		key: 'populateSuggestions',
		value: function populateSuggestions(suggestions) {
			var cls = (0, _className2.default)(this.baseClassName + '__suggestion-btn');
			this.suggestionsBox.innerHTML = suggestions.map(function (item) {
				return '<button class=\'' + cls + '\' tabindex=\'0\' value="' + item.value + '">' + item.name + '</button>';
			}).join('');
		}
	}, {
		key: 'removeItem',
		value: function removeItem(item) {
			var node = this.element.querySelector('.js-m-multi-select-selected-items li[data-value="' + item.value + '"]');

			if (!node) {
				return;
			}

			var parent = node.closest('.js-m-multi-select-selected-items');
			var index = Array.prototype.indexOf.call(parent.children, node);

			node.remove();

			var remainingItems = parent.getElementsByTagName('li');

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

			this.selectedItems = this.selectedItems.filter(function (i) {
				return i.value !== item.value;
			});

			var itemInput = this.element.querySelector('input[value="' + item.value + '"]');
			itemInput.remove();
		}
	}, {
		key: 'addItem',
		value: function addItem(item) {
			var _this5 = this;

			var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			if (!item) {
				return;
			}

			var newItem = document.createElement('li');
			newItem.textContent = item.name + ' ';
			newItem.setAttribute('data-value', item.value);
			newItem.classList.add((0, _className2.default)('a-tag'));
			newItem.classList.add((0, _className2.default)(this.baseClassName + '__tag'));

			var removeBtn = document.createElement('button');
			removeBtn.classList.add((0, _className2.default)(this.baseClassName + '-selected-items__remove-btn'));

			var buttonTextContainer = document.createElement('span');
			buttonTextContainer.classList.add('u-visuallyhidden');
			removeBtn.appendChild(buttonTextContainer);
			buttonTextContainer.textContent = 'Ta bort ' + item.name; // Accessibility label for screen readers

			// Event listener for removing the selected item
			removeBtn.addEventListener('click', function () {
				_this5.removeItem(item);
			});

			newItem.appendChild(removeBtn);

			this.selectedItemsList.appendChild(newItem);
			this.selectedItems.push(item);

			if (save) {
				var itemInput = document.createElement('input');

				itemInput.type = 'hidden';
				itemInput.name = this.name + '[]';
				itemInput.value = item.value;

				this.element.appendChild(itemInput);
			}
		}
	}, {
		key: 'removeHighlight',
		value: function removeHighlight() {
			var items = this.suggestionsBox.getElementsByClassName((0, _className2.default)(this.baseClassName + '__suggestion-btn'));

			[].forEach.call(items, function (item) {
				item.classList.remove('autocomplete-active');
			});
		}
	}, {
		key: 'highlight',
		value: function highlight(direction) {
			var items = this.suggestionsBox.getElementsByClassName((0, _className2.default)(this.baseClassName + '__suggestion-btn'));
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
				var item = items[this.currentFocus];

				this.addItem(this.data.find(function (d) {
					return d.value === item.value;
				}));

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
		el.multiSelect = new MultiSelect(el);
	});
}