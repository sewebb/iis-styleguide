/**
 * Creates a document fragment from a string of html content
 *
 * @param html
 * @returns {DocumentFragment}
 */
export default (html) => document.createRange().createContextualFragment(html);
