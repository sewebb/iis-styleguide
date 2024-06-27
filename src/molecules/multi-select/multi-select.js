import className from '../../assets/js/className';

class MultiSelect {
	constructor(el) {
		this.element = el;
		this.baseClassName = 'm-multi-select';
		this.currentFocus = -1;
		this.input = this.element.querySelector(`.js-${this.baseClassName}__input`);
		this.suggestionsBox = this.element.querySelector(`.js-${this.baseClassName}-suggestions-box`);
		this.selectedItemsList = this.element.querySelector('.js-m-multi-select-selected-items');
		this.selectedItems = [];
		this.data = [];

		this.getData();
		this.attach();
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
		this.suggestionsBox.innerHTML = '';
	}

	filterData(query) {
		return this.data
			.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()))
			.filter((item) => !this.selectedItems.includes(item.name));
	}

	populateSuggestions(suggestions) {
		const cls = className(`${this.baseClassName}__suggestion-btn`);
		this.suggestionsBox.innerHTML = suggestions.map((item) => `<button class='${cls}' tabindex='0'>${item.name}</button>`).join('');
	}

	onInput = () => {
		const { value } = this.input;

		// Clear suggestions if less than 2 characters are typed
		if (value.length < 2) {
			this.clearSuggestions();

			return;
		}

		const suggestions = this.filterData(value);

		this.populateSuggestions(suggestions);
		this.resetFocus();
	}

	removeItem(item, index) {
		const selectedItemsList = this.element.querySelector('.js-m-multi-select-selected-items');
		selectedItemsList.removeChild(item);

		const remainingItems = selectedItemsList.getElementsByTagName('div');

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
			.filter((name) => name !== item.firstChild.textContent.trim());
	}

	addItem(item) {
		const newItem = document.createElement('li');
		newItem.textContent = `${item} `;
		newItem.classList.add(className('a-tag'));
		newItem.classList.add(className(`${this.baseClassName}__tag`));

		const removeBtn = document.createElement('button');
		removeBtn.classList.add(className(`${this.baseClassName}-selected-items__remove-btn`));

		const buttonTextContainer = document.createElement('span');
		buttonTextContainer.classList.add('u-visuallyhidden');
		removeBtn.appendChild(buttonTextContainer);
		buttonTextContainer.textContent = `Ta bort ${item}`; // Accessibility label for screen readers

		// Event listener for removing the selected item
		removeBtn.addEventListener('click', () => {
			this.removeItem(newItem, Array.from(this.selectedItemsList.children).indexOf(newItem));
		});

		newItem.appendChild(removeBtn);

		this.selectedItemsList.appendChild(newItem);
		this.selectedItems.push(item);
	}

	removeHighlight() {
		const items = this.suggestionsBox.getElementsByClassName(`${this.baseClassName}__suggestion-btn`);

		[].forEach.call(items, (item) => {
			item.classList.remove('autocomplete-active');
		});
	}

	highlight(direction) {
		const items = this.suggestionsBox.getElementsByClassName(`${this.baseClassName}__suggestion-btn`);
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
		const items = this.suggestionsBox.getElementsByClassName(`${this.baseClassName}__suggestion-btn`);

		if (this.currentFocus > -1 && items[this.currentFocus]) {
			this.addItem(items[this.currentFocus].textContent);
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
	}

	onClick = (e) => {
		if (e.target.classList.contains(className(`${this.baseClassName}__suggestion-btn`))) {
			this.addItem(e.target.textContent);
			this.clearSuggestions();
			this.input.value = '';
		}
	}
}

const multiSelectElements = document.querySelectorAll('.js-m-multi-select');

if (multiSelectElements) {
	[].forEach.call(multiSelectElements, (el) => new MultiSelect(el));
}
