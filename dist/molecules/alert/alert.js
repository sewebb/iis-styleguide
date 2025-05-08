"use strict";
const alerts = document.querySelectorAll('.js-dismiss-alert');
function dismiss(alert) {
    const target = alert.querySelector('[data-a11y-toggle]');
    const id = target.closest('[role]').getAttribute('id');
    const idElement = document.getElementById(id);
    if (sessionStorage.getItem(id) !== 'is-dismissed') {
        window.addEventListener('DOMContentLoaded', ()=>{
            idElement.setAttribute('aria-hidden', 'false');
        });
        target.addEventListener('click', ()=>{
            sessionStorage.setItem(id, 'is-dismissed');
        });
    }
}
if (alerts) {
    [].forEach.call(alerts, dismiss);
}
