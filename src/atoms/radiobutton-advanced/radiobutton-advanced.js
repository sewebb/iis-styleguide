const radiobuttonAdvancedGroups = document.querySelectorAll('.js-radiobutton-advanced');

function setCheckedState(group) {
	const options = group.querySelectorAll('.js-radiobutton-advanced__option');

	options.forEach((option) => {
		const input = option.querySelector('.js-radiobutton-advanced__input');

		if (!input) {
			return;
		}

		option.classList.toggle('is-checked', input.checked);
	});
}

radiobuttonAdvancedGroups.forEach((group) => {
	group.addEventListener('change', () => setCheckedState(group));
	setCheckedState(group);
});
