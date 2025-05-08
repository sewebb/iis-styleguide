"use strict";
const elements = document.querySelectorAll('[data-close-on-outside-click]');
function closeElement(element) {
    document.addEventListener('mouseup', (e)=>{
        const childElement = element.nextElementSibling;
        /* Close menu on all clicks except the trigger button,
		 the menu and it's child elements and if the menu is actually open. */ if (!element.contains(e.target) && !childElement.contains(e.target) && element.getAttribute('aria-expanded') === 'true') {
            element.click();
        }
    });
}
if (elements) {
    [].forEach.call(elements, closeElement);
}
