"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cache", {
    enumerable: true,
    get: function() {
        return cache;
    }
});
function isInView(el) {
    const box = el.getBoundingClientRect();
    return box.top < window.innerHeight && box.bottom >= 0;
}
let parallaxes = [];
function cache() {
    parallaxes = document.querySelectorAll('.js-parallax');
}
cache();
window.addEventListener('scroll', ()=>{
    [].forEach.call(parallaxes, (parallax)=>{
        if (parallax.classList.contains('animate')) {
            return;
        }
        const visible = isInView(parallax);
        if (visible) {
            parallax.classList.add('animate');
        }
    });
});
