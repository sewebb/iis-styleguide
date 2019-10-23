let namespace = null;

export default function className(classes) {
	if (!namespace) {
		namespace = document.getElementById('site').getAttribute('data-namespace');
	}

	return classes.split(' ').map((cls) => `${namespace}${cls}`).join(' ');
}
