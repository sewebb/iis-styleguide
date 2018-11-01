function classToggle() {
	var body = document.querySelector('body')
	body.classList.toggle('baseline-grid');
}
document.querySelector('.grid-toggle').addEventListener('click', classToggle);
