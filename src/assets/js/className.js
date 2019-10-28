let namespace = null;

export default function className(classes) {
	if (!namespace) {
		const site = document.getElementById('site');

		if (site && site.hasAttribute('data-namespace')) {
			namespace = site.getAttribute('data-namespace');
		} else {
			namespace = '';
		}
	}

	return classes.split(' ').map((cls) => `${namespace}${cls}`).join(' ');
}
