import Form from './Form';

const elements = document.querySelectorAll('[data-form]');

if (elements.length) {
	elements.forEach((element) => {
		element.form = new Form(element);
	});
}
