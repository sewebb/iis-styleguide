'use strict';

function openPopup(e) {
	e.preventDefault();

	var width = 500;
	var height = 550;
	var left = window.innerWidth / 2 - width / 2;
	var top = window.innerHeight / 2 - height / 2;
	var url = this.href;
	var opts = '' + ('status=1' + ',width=') + width + ',height=' + height + ',top=' + top + ',left=' + left;
	window.open(url, 'socialMedia', opts);

	return false;
}

var popupButtons = Array.prototype.slice.call(document.querySelectorAll('.js-share-popup'));

if (popupButtons) {
	popupButtons.forEach(function (popup) {
		popup.addEventListener('click', openPopup);
	});
}