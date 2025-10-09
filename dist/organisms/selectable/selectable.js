"use strict";
function toggleItems(selectable, value) {
    const items = selectable.querySelectorAll('[data-selectable-item]');
    items.forEach((item)=>{
        item.setAttribute('aria-hidden', item.id === `${selectable.id}-${value}` || value === null ? 'false' : 'true');
    });
}
function onChange(selectable, value) {
    toggleItems(selectable, value);
}
document.addEventListener('change', (e)=>{
    const container = e.target.closest('[data-selectable]');
    if (container && e.target.matches('[data-selectable-select]')) {
        onChange(container, e.target.value);
    }
});
document.addEventListener('click', (e)=>{
    const button = e.target.closest('[data-selectable-all]');
    if (button) {
        const selectable = button.closest('[data-selectable]');
        if (selectable) {
            const select = selectable.querySelector('[data-selectable-select]');
            if (select) {
                select.value = '';
            }
            toggleItems(selectable, null);
        }
        return;
    }
    const copy = e.target.closest('[data-selectable-copy]');
    if (copy) {
        const selectable = copy.closest('[data-selectable]');
        const select = selectable.querySelector('[data-selectable-select]');
        const value = select.value;
        let id = selectable.id;
        if (value) {
            id = `${id}-${value}`;
        }
        const url = window.location.href.replace(/#.*$/, '') + '#' + id;
        navigator.clipboard.writeText(url).then(()=>{
            const text = copy.querySelector('span');
            text.dataset.original = text.innerText;
            text.innerText = text.dataset.copied;
            setTimeout(()=>{
                text.innerText = text.dataset.original;
            }, 1000);
        });
    }
});
const selectables = document.querySelectorAll('[data-selectable]');
selectables.forEach((selectable)=>{
    const select = selectable.querySelector('[data-selectable-select]');
    toggleItems(selectable, select.value);
});
// Read current hash and select item
const hash = window.location.hash.replace(/^#/, '');
if (hash) {
    const item = document.getElementById(hash);
    if (item) {
        if (item.matches('[data-selectable]')) {
            const select = item.querySelector('[data-selectable-select]');
            if (select) {
                select.value = '';
            }
            toggleItems(item, null);
        } else {
            const selectable = item.closest('[data-selectable]');
            if (selectable) {
                const select = selectable.querySelector('[data-selectable-select]');
                if (select) {
                    select.value = hash.replace(`${selectable.id}-`, '');
                }
                toggleItems(selectable, select.value);
            }
        }
    }
}
