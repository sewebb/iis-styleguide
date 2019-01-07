const domainSearchButton = document.querySelector('.js-toggle-domain-search');
const container = domainSearchButton.getAttribute('data-a11y-toggle');


function focusInput() {
	const searchInput = document.getElementById(container).querySelector('.js-search-domain-input');
	searchInput.focus();
}

if (domainSearchButton) {
	domainSearchButton.addEventListener('click', focusInput);
}

// TODO, fix tab logic when tabbing from last and first element in container
// const submit = document.getElementById('o-domain-search-submit');
// const tabKey = 9;
// function checkTabPress(event) {
// 	console.log('keydown');
// 	if (event.key === tabKey) {
// 		console.log('tab!');
// 		if (document.activeElement === submit) {
// 			console.log('submit!');
// 		}
// 	}
// }
//
// if (submit) {
// 	submit.addEventListener('keydown', checkTabPress);
// }
