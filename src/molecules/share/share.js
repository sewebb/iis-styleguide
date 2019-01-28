function openPopup(e) {
	e.preventDefault();

	const width = 575;
	const height = 400;
	const left = window.innerWidth / 2 - width / 2;
	const top = window.innerHeight / 2 - height / 2;
	const url = this.href;
	const opts = `${'status=1'
				+ ',width='}${width
	},height=${height
	},top=${top
	},left=${left}`;
	window.open(url, 'socialMedia', opts);

	return false;
}

const popupButtons = Array.prototype.slice.call(
	document.querySelectorAll('.js-share-popup'),
);

if (popupButtons) {
	popupButtons.forEach((popup) => {
		popup.addEventListener('click', openPopup);
	});
}
