import Form from './Form';

const elements = document.querySelectorAll('[data-form]');

if (elements.length) {
	elements.forEach((element) => new Form(element));
}
