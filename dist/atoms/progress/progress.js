"use strict";
const progressbars = document.querySelectorAll('[data-width-progress]');
if (progressbars.length) {
    function progressBarWidths() {
        progressbars.forEach((container)=>{
            const width = container.offsetWidth;
            const value = +container.getAttribute('value') || 0;
            const max = +container.getAttribute('max') || 100;
            const percent = Math.round(value / max * 100 / 2) * 2;
            document.documentElement.style.setProperty('--progressbar-width', width + 'px');
            document.documentElement.style.setProperty('--progressbar-width-percent', percent + '%');
        });
    }
    window.addEventListener('DOMContentLoaded', progressBarWidths);
    window.addEventListener('resize', progressBarWidths);
}
