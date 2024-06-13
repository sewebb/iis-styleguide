export default function htmlTextLength(html) {
	const div = document.createElement('div');

	div.innerHTML = html;

	return div.textContent.length;
}
