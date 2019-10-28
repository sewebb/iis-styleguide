"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Creates a document fragment from a string of html content
 *
 * @param html
 * @returns {DocumentFragment}
 */
exports.default = function (html) {
  return document.createRange().createContextualFragment(html);
};