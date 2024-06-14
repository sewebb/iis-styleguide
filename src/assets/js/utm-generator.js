// Show/hide target container when Radiobutton is selected
const radioButtons = document.querySelectorAll('[data-toggle="radio"]');

// Hide all target containers on page load
radioButtons.forEach((radio) => {
	const targetId = radio.getAttribute('data-target');
	const targetContainer = document.getElementById(targetId);
	if (targetContainer) {
		targetContainer.setAttribute('aria-hidden', 'true');
	}
});

// Function to toggle visibility
function toggleVisibility(event) {
	// Hide all target containers
	radioButtons.forEach((radio) => {
		const targetId = radio.getAttribute('data-target');
		const targetContainer = document.getElementById(targetId);
		if (targetContainer) {
			targetContainer.setAttribute('aria-hidden', 'true');
		}
	});

	// Show the selected target container
	const selectedTargetId = event.target.getAttribute('data-target');
	const selectedTargetContainer = document.getElementById(selectedTargetId);
	if (selectedTargetContainer) {
		selectedTargetContainer.setAttribute('aria-hidden', 'false');
	}

	// Update aria-expanded for all radio buttons
	radioButtons.forEach((radio) => {
		radio.setAttribute('aria-expanded', radio.checked ? 'true' : 'false');
	});
}

// Add event listener to radio buttons
radioButtons.forEach((radio) => {
	radio.addEventListener('change', toggleVisibility);
});

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
	// Get references to the search input and suggestions box elements
	const searchInput = document.getElementById('searchInput');
	const suggestionsBox = document.getElementById('suggestionsBox');
	let currentFocus = -1; // Tracks the currently focused item in the suggestions

	// Event listener for input changes in the search field
	searchInput.addEventListener('input', function () {
		const { value } = this;
		// Clear suggestions if less than 2 characters are typed
		if (value.length < 2) {
			suggestionsBox.innerHTML = '';
			return;
		}

		// Define a JSON array of 100 real cities
		const suggestions = [
			{ name: 'New York' }, { name: 'Los Angeles' }, { name: 'Chicago' },
			{ name: 'Houston' }, { name: 'Phoenix' }, { name: 'Philadelphia' },
			{ name: 'San Antonio' }, { name: 'San Diego' }, { name: 'Dallas' },
			{ name: 'San Jose' }, { name: 'Austin' }, { name: 'Jacksonville' },
			{ name: 'Fort Worth' }, { name: 'Columbus' }, { name: 'San Francisco' },
			{ name: 'Tokyo' }, { name: 'Delhi' }, { name: 'Shanghai' },
			{ name: 'Sao Paulo' }, { name: 'Mumbai' }, { name: 'Beijing' },
			{ name: 'Cairo' }, { name: 'Dhaka' }, { name: 'Mexico City' },
			{ name: 'Osaka' }, { name: 'Karachi' }, { name: 'Chongqing' },
			{ name: 'Istanbul' }, { name: 'Buenos Aires' }, { name: 'Kolkata' },
			{ name: 'Kinshasa' }, { name: 'Lagos' }, { name: 'Manila' },
			{ name: 'Tianjin' }, { name: 'Rio de Janeiro' }, { name: 'Guangzhou' },
			{ name: 'Lahore' }, { name: 'Moscow' }, { name: 'Shenzhen' },
			{ name: 'Bangalore' }, { name: 'Paris' }, { name: 'Bogota' },
			{ name: 'Jakarta' }, { name: 'Chennai' }, { name: 'Lima' },
			{ name: 'Bangkok' }, { name: 'Seoul' }, { name: 'Nagoya' },
			{ name: 'Hyderabad' }, { name: 'London' }, { name: 'Tehran' },
			{ name: 'Chengdu' }, { name: 'Nanjing' },
			{ name: 'Wuhan' }, { name: 'Ho Chi Minh City' }, { name: 'Luanda' },
			{ name: 'Ahmedabad' }, { name: 'Kuala Lumpur' }, { name: 'Xi’an' },
			{ name: 'Hong Kong' }, { name: 'Dongguan' }, { name: 'Hangzhou' },
			{ name: 'Foshan' }, { name: 'Shenyang' }, { name: 'Riyadh' },
			{ name: 'Baghdad' }, { name: 'Santiago' }, { name: 'Surat' },
			{ name: 'Madrid' }, { name: 'Suzhou' }, { name: 'Pune' },
			{ name: 'Harbin' }, { name: 'Houston' },
			{ name: 'Toronto' }, { name: 'Dar es Salaam' }, { name: 'Miami' },
			{ name: 'Belo Horizonte' }, { name: 'Singapore' },
			{ name: 'Atlanta' }, { name: 'Fukuoka' }, { name: 'Khartoum' },
			{ name: 'Barcelona' }, { name: 'Johannesburg' }, { name: 'Saint Petersburg' },
			{ name: 'Qingdao' }, { name: 'Dalian' }, { name: 'Washington, D.C.' },
			{ name: 'Yangon' }, { name: 'Alexandria' }, { name: 'Jinan' },
			{ name: 'Guadalajara' }, { name: 'Sydney' }, { name: 'Melbourne' },
			{ name: 'Montreal' }, { name: 'Ankara' }, { name: 'Recife' },
			{ name: 'Durban' }, { name: 'Porto Alegre' },
			{ name: 'Dusseldorf' }, { name: 'Hamburg' }, { name: 'Cape Town' },
		];

		// Filter suggestions based on the input value
		const filtered = suggestions.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
		// Populate the suggestions box with the filtered results
		suggestionsBox.innerHTML = filtered.map((item) => `<button class='suggestion-btn' tabindex='0'>${item.name}</button>`).join('');
		// Reset the current focus
		currentFocus = -1;
	});

	// Event listener for keydown events for navigation and selection in the suggestions box
	searchInput.addEventListener('keydown', (e) => {
		const items = suggestionsBox.getElementsByClassName('suggestion-btn');
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
				searchInput.value = '';
				currentFocus = -1;
			}
		}
	});

	// Click event listener for the suggestions box
	suggestionsBox.addEventListener('click', (e) => {
		// Add the clicked suggestion to the selected items list
		if (e.target && e.target.classList.contains('suggestion-btn')) {
			addSelectedItem(e.target.textContent);
			suggestionsBox.innerHTML = '';
			searchInput.value = '';
		}
	});

	// Function to highlight the active (focused) suggestion
	function setActive(items) {
		if (!items.length) return false;
		removeActive(items);
		if (currentFocus >= items.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = items.length - 1;
		items[currentFocus].classList.add('autocomplete-active');
	}

	// Function to remove highlighting from all suggestions
	function removeActive(items) {
		for (let i = 0; i < items.length; i++) {
			items[i].classList.remove('autocomplete-active');
		}
	}

	// Function to add a selected item to the list of selected items
	function addSelectedItem(item) {
		const container = document.getElementById('selectedItemsContainer');
		const newItem = document.createElement('li');
		newItem.textContent = `${item} `;
		const removeBtn = document.createElement('button');
		const buttonTextContainer = document.createElement('span');
		// removeBtn.textContent = 'x';
		buttonTextContainer.classList.add('visually-hidden');
		removeBtn.appendChild(buttonTextContainer);
		buttonTextContainer.textContent = `Remove ${item}`; // Accessibility label for screen readers
		// Event listener for removing the selected item
		removeBtn.addEventListener('click', () => {
			removeItem(newItem, Array.from(container.children).indexOf(newItem));
		});
		newItem.appendChild(removeBtn);
		container.appendChild(newItem);
	}

	// Function to remove an item and manage focus appropriately
	function removeItem(item, index) {
		const container = document.getElementById('selectedItemsContainer');
		container.removeChild(item);

		const remainingItems = container.getElementsByTagName('div');
		// Focus management: set focus to the next item, or the search input if no items left
		if (remainingItems.length > 0) {
			if (index < remainingItems.length) {
				remainingItems[index].getElementsByTagName('button')[0].focus();
			} else {
				remainingItems[remainingItems.length - 1].getElementsByTagName('button')[0].focus();
			}
		} else {
			document.getElementById('searchInput').focus();
		}
	}
});
