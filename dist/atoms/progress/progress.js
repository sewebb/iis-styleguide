"use strict";
const progressbars = document.querySelectorAll('[data-width-progress]');
if (progressbars) {
    function progressBarWidths() {
        progressbars.forEach((container, index)=>{
            const width = container.offsetWidth;
            document.documentElement.style.setProperty(`--progressbar-width`, width + 'px');
        });
    }
    window.addEventListener('DOMContentLoaded', progressBarWidths);
    window.addEventListener('resize', progressBarWidths);
}
