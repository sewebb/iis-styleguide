/* eslint-disable */
const className = 'm-multi-select';
const multiSelectElements = document.querySelectorAll(`.js-${className}`);
let namespace;

if( multiSelectElements ) {
	namespace = getComputedStyle(multiSelectElements[0], ':before').content.replace(/["']/g, '');
}

let currentFocus = -1; // Tracks the currently focused item in the suggestions

// Highlight the active (focused) suggestion
function setActive(items) {
	if (!items.length) return false;
	removeActive(items);
	if (currentFocus >= items.length) currentFocus = 0;
	if (currentFocus < 0) currentFocus = items.length - 1;
	items[currentFocus].classList.add('autocomplete-active');

	return items;
}

// Remove highlighting from all suggestions
function removeActive(items) {
	for (let i = 0; i < items.length; i+=1) {
		items[i].classList.remove('autocomplete-active');
	}
}

// Add a selected item to the list of selected items
function addSelectedItem(item) {
	const selectedItemsList = document.querySelector('.js-m-multi-select-selected-items');
	const newItem = document.createElement('li');
	newItem.textContent = item + ' ';
	newItem.classList.add(`${namespace}a-tag`);
	newItem.classList.add(`${namespace}m-multi-select__tag`);

	const removeBtn = document.createElement('button');
	removeBtn.classList.add(`${namespace}m-multi-select-selected-items__remove-btn`);

	const buttonTextContainer = document.createElement('span');
	buttonTextContainer.classList.add('u-visuallyhidden');
	removeBtn.appendChild(buttonTextContainer);
	buttonTextContainer.textContent ='Ta bort ' + item; // Accessibility label for screen readers

	// Event listener for removing the selected item
	removeBtn.addEventListener('click', function () {
		removeItem(newItem, Array.from(selectedItemsList.children).indexOf(newItem));
	});
	newItem.appendChild(removeBtn);
	selectedItemsList.appendChild(newItem);
}

// Remove an item and manage focus appropriately
function removeItem(item, index) {
	const selectedItemsList = document.querySelector('.js-m-multi-select-selected-items');
	selectedItemsList.removeChild(item);

	let remainingItems = selectedItemsList.getElementsByTagName('div');
	// Focus management: set focus to the next item, or the search input if no items left
	if (remainingItems.length > 0) {
		if (index < remainingItems.length) {
			remainingItems[index].getElementsByTagName('button')[0].focus();
		} else {
			remainingItems[remainingItems.length - 1].getElementsByTagName('button')[0].focus();
		}
	} else {
		multiSelectInput.focus();
	}
}

function setup(multiSelectElement) {
	const multiSelectInput = multiSelectElement.querySelector(`.js-${className}__input`);
	const suggestionsBox = multiSelectElement.querySelector(`.js-${className}-suggestions-box`);
	const suggestionsData = multiSelectInput.getAttribute('data-multi-select-suggestions');

	// Event listener for input changes in the search field
	multiSelectInput.addEventListener('input', function () {
		const value = this.value;
		// Clear suggestions if less than 2 characters are typed
		if (value.length < 2) {
			suggestionsBox.innerHTML = '';
			return;
		}

		// Define JSON
		let suggestions = document.getElementById(suggestionsData).textContent;
		suggestions = JSON.parse(suggestions);

		// Filter suggestions based on the input value
		const filtered = suggestions.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
		// Populate the suggestions box with the filtered results
		suggestionsBox.innerHTML = filtered.map(item => `<button class='${namespace}m-multi-select__suggestion-btn' tabindex='0'>${item.name}</button>`).join('');
		// Reset the current focus
		currentFocus = -1;
	});

	// Event listener for keydown events for navigation and selection in the suggestions box
	multiSelectInput.addEventListener('keydown', function (e) {
		let items = suggestionsBox.getElementsByClassName(`${namespace}m-multi-select__suggestion-btn`);
		// Navigate down in the suggestions list
		if (e.keyCode == 40) {
			currentFocus = (currentFocus + 1) % items.length;
			setActive(items);
			// Navigate up in the suggestions list
		} else if (e.keyCode == 38) {
			currentFocus = (currentFocus - 1 + items.length) % items.length;
			setActive(items);
			// Handle Enter key to select a focused item
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1 && items[currentFocus]) {
				addSelectedItem(items[currentFocus].textContent);
				suggestionsBox.innerHTML = '';
				multiSelectInput.value = '';
				currentFocus = -1;
			}
		}
	});

	// Event listener for the suggestions box
	suggestionsBox.addEventListener('click', function (e) {
		// Add the clicked suggestion to the selected items list
		if (e.target && e.target.classList.contains('suggestion-btn')) {
			addSelectedItem(e.target.textContent);
			suggestionsBox.innerHTML = '';
			multiSelectInput.value = '';
		}
	});
}

if (multiSelectElements) {
	[].forEach.call(multiSelectElements, setup);
}
