import className from '../../assets/js/className';

class MultiSelect {
	constructor(el) {
		this.element = el;
		this.baseClassName = 'm-multi-select';
		this.currentFocus = -1;
		this.name = this.element.getAttribute('data-multi-select-name');
		this.input = this.element.querySelector(`.js-${this.baseClassName}__input`);
		this.suggestionsBox = this.element.querySelector(`.js-${this.baseClassName}-suggestions-box`);
		this.selectedItemsList = this.element.querySelector('.js-m-multi-select-selected-items');
		this.selectedItems = [];
		this.data = [];

		this.getData();
		this.attach();
		this.sync();
	}

	getData() {
		const id = this.input.getAttribute('data-multi-select-suggestions');
		const el = document.getElementById(id);

		if (!el) {
			this.data = [];
			return;
		}

		this.data = JSON.parse(el.textContent);
	}

	attach() {
		this.input.addEventListener('input', this.onInput);
		this.input.addEventListener('keydown', this.onKeyDown);
		this.suggestionsBox.addEventListener('click', this.onClick);
	}

	setFocus(index) {
		this.currentFocus = index;
	}

	resetFocus() {
		this.setFocus(-1);
	}

	clearSuggestions() {
		this.input.setAttribute('aria-expanded', 'false');
		this.suggestionsBox.innerHTML = '';
	}

	addSuggestions(suggestions) {
		this.data = [
			...this.data,
			...suggestions.filter((s) => !this.data.find((d) => d.value === s.value)),
		];
	}

	sync() {
		const inputs = this.element.querySelectorAll(`input[name="${this.name}[]"]`);

		this.selectedItems = [];

		inputs.forEach((input) => {
			const item = this.data.find((d) => d.value === input.value);

			if (item) {
				this.addItem(item, false);
			}
		});
	}

	filterData(query) {
		const selectedValues = this.selectedItems.map((item) => item.value);

		return this.data
			.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()))
			.filter((item) => !selectedValues.includes(item.value));
	}

	populateSuggestions(suggestions) {
		const cls = className(`${this.baseClassName}__suggestion-btn`);
		this.suggestionsBox.innerHTML = suggestions.map((item) => `<button class='${cls}' tabindex='0' value="${item.value}">${item.name}</button>`).join('');

		if (this.suggestionsBox.innerHTML) {
			this.input.setAttribute('aria-expanded', 'true');
		}
	}

	onInput = () => {
		const { value } = this.input;

		// Clear suggestions if less than 2 characters are typed
		if (value.length < 2) {
			this.clearSuggestions();

			return;
		}

		const suggestions = this.filterData(value);

		if (suggestions.length) {
			this.populateSuggestions(suggestions);
		} else {
			this.clearSuggestions();
		}

		this.resetFocus();
	};

	removeItem(item) {
		const node = this.element.querySelector(`.js-m-multi-select-selected-items li[data-value="${item.value}"]`);

		if (!node) {
			return;
		}

		const parent = node.closest('.js-m-multi-select-selected-items');
		const index = Array.prototype.indexOf.call(parent.children, node);

		node.remove();

		const remainingItems = parent.getElementsByTagName('li');

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

		this.selectedItems = this.selectedItems
			.filter((i) => i.value !== item.value);

		const itemInput = this.element.querySelector(`input[value="${item.value}"]`);
		itemInput.remove();
	}

	addItem(item, save = true) {
		if (!item) {
			return;
		}

		const newItem = document.createElement('li');
		newItem.textContent = `${item.name} `;
		newItem.setAttribute('data-value', item.value);
		newItem.classList.add(className('a-tag'));
		newItem.classList.add(className(`${this.baseClassName}__tag`));

		const removeBtn = document.createElement('button');
		removeBtn.classList.add(className(`${this.baseClassName}-selected-items__remove-btn`));

		const buttonTextContainer = document.createElement('span');
		buttonTextContainer.classList.add('u-visuallyhidden');
		removeBtn.appendChild(buttonTextContainer);
		buttonTextContainer.textContent = `Ta bort ${item.name}`; // Accessibility label for screen readers

		// Event listener for removing the selected item
		removeBtn.addEventListener('click', () => {
			this.removeItem(item);
		});

		newItem.appendChild(removeBtn);

		this.selectedItemsList.appendChild(newItem);
		this.selectedItems.push(item);

		if (save) {
			const itemInput = document.createElement('input');

			itemInput.type = 'hidden';
			itemInput.name = `${this.name}[]`;
			itemInput.value = item.value;

			this.element.appendChild(itemInput);
		}
	}

	removeHighlight() {
		const items = this.suggestionsBox.getElementsByClassName(className(`${this.baseClassName}__suggestion-btn`));

		[].forEach.call(items, (item) => {
			item.classList.remove('autocomplete-active');
		});
	}

	highlight(direction) {
		const items = this.suggestionsBox.getElementsByClassName(className(`${this.baseClassName}__suggestion-btn`));
		let focus = this.currentFocus;

		if (direction === 'down') {
			focus = (focus >= items.length - 1) ? 0 : focus + 1;
		} else {
			focus = (focus <= 0) ? items.length - 1 : focus - 1;
		}

		this.setFocus(focus);
		this.removeHighlight();

		items[this.currentFocus].classList.add('autocomplete-active');
		items[this.currentFocus].scrollIntoView({ block: 'nearest' });
	}

	selectHighlighted() {
		const items = this.suggestionsBox.getElementsByClassName(className(`${this.baseClassName}__suggestion-btn`));

		if (this.currentFocus > -1 && items[this.currentFocus]) {
			const item = items[this.currentFocus];

			this.addItem(this.data.find((d) => d.value === item.value));

			this.clearSuggestions();
			this.input.value = '';
			this.resetFocus();
		}
	}

	onKeyDown = (e) => {
		if (e.keyCode === 40) {
			this.highlight('down');
		} else if (e.keyCode === 38) {
			this.highlight('up');
		} else if (e.keyCode === 13) {
			e.preventDefault();

			this.selectHighlighted();
		}
	};

	onClick = (e) => {
		if (e.target.classList.contains(className(`${this.baseClassName}__suggestion-btn`))) {
			this.addItem(this.data.find((d) => d.value === e.target.value));
			this.clearSuggestions();
			this.input.value = '';
		}
	};
}

const multiSelectElements = document.querySelectorAll('.js-m-multi-select');

if (multiSelectElements) {
	[].forEach.call(multiSelectElements, (el) => {
		el.multiSelect = new MultiSelect(el);
	});
}
