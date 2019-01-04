const element = document.querySelector('.js-history');

function goBack(e) {
	e.preventDefault();
	window.history.go(-1);
}

if (element) {
	element.addEventListener('click', goBack);
}
