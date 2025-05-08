// DUMMY TIMELINE ITEM OPEN/CLOSE
"use strict";
function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.classList.add('wrapper');
    wrapper.appendChild(el);
}
const timeLineItems = document.querySelectorAll('.js-timeline-item');
let timeLineItemScrollPosition = 0;
[].forEach.call(timeLineItems, (timeLineItem)=>{
    const timeLineItemLink = timeLineItem.querySelector('a');
    const timeLineItemClose = timeLineItem.querySelector('.js-timeline-item-close');
    const timeLineItemBottomClose = timeLineItem.querySelector('.js-timeline-item-bottom-close');
    timeLineItemLink.addEventListener('click', ()=>{
        timeLineItemScrollPosition = window.pageYOffset;
        sessionStorage.setItem('scroll-position', timeLineItemScrollPosition);
        if (!timeLineItem.classList.contains('is-open')) {
            timeLineItem.classList.add('is-open');
            timeLineItem.closest('.row').classList.add('row-has-open-child');
            // Wrap open timeline item
            wrap(timeLineItem.querySelector('.wp-block-iis-timeline-post'), document.createElement('div'));
        }
    });
    timeLineItemClose.addEventListener('click', ()=>{
        timeLineItem.classList.remove('is-open');
        timeLineItem.closest('.row').classList.remove('row-has-open-child');
        // Destroy generated wrapper
        const wrapper = timeLineItemClose.nextElementSibling;
        wrapper.replaceWith(...wrapper.childNodes);
        const top = sessionStorage.getItem('scroll-position');
        if (top !== null) {
            window.scrollTo(0, parseInt(top, 10));
        }
        sessionStorage.removeItem('scroll-position');
        // Trigger scroll event to reveal timeline items not yet parallaxed into view
        window.dispatchEvent(new CustomEvent('scroll'));
    });
    timeLineItemBottomClose.addEventListener('click', ()=>{
        timeLineItemClose.click();
    });
});
