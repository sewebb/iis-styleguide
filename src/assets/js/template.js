export default (templateString) => (substitutions) => {
	let html = templateString;

	Object.entries(substitutions).forEach(([key, value]) => {
		html = html.replace(new RegExp(`{${key}}`, 'g'), value);
	});

	return html;
};
