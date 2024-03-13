'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// DUMMY TIMELINE ITEM OPEN/CLOSE
function wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.classList.add('wrapper');
	wrapper.appendChild(el);
}

var timeLineItems = document.querySelectorAll('.js-timeline-item');
var timeLineItemScrollPosition = 0;

[].forEach.call(timeLineItems, function (timeLineItem) {
	var timeLineItemLink = timeLineItem.querySelector('a');
	var timeLineItemClose = timeLineItem.querySelector('.js-timeline-item-close');
	var timeLineItemBottomClose = timeLineItem.querySelector('.js-timeline-item-bottom-close');

	timeLineItemLink.addEventListener('click', function () {
		timeLineItemScrollPosition = window.pageYOffset;
		sessionStorage.setItem('scroll-position', timeLineItemScrollPosition);

		if (!timeLineItem.classList.contains('is-open')) {
			timeLineItem.classList.add('is-open');
			timeLineItem.closest('.row').classList.add('row-has-open-child');

			// Wrap open timeline item
			wrap(timeLineItem.querySelector('.wp-block-iis-timeline-post'), document.createElement('div'));
		}
	});

	timeLineItemClose.addEventListener('click', function () {
		timeLineItem.classList.remove('is-open');
		timeLineItem.closest('.row').classList.remove('row-has-open-child');

		// Destroy generated wrapper
		var wrapper = timeLineItemClose.nextElementSibling;
		wrapper.replaceWith.apply(wrapper, _toConsumableArray(wrapper.childNodes));

		var top = sessionStorage.getItem('scroll-position');
		if (top !== null) {
			window.scrollTo(0, parseInt(top, 10));
		}
		sessionStorage.removeItem('scroll-position');

		// Trigger scroll event to reveal timeline items not yet parallaxed into view
		window.dispatchEvent(new CustomEvent('scroll'));
	});

	timeLineItemBottomClose.addEventListener('click', function () {
		timeLineItemClose.click();
	});
});