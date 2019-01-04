const element = document.querySelector('.js-history');

function goBack() {
	window.history.go(-1);
}

if (element) {
	element.addEventListener('click', goBack);
}
