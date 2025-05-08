"use strict";
const selects = document.querySelectorAll('.js-natural-language-select');
const inputs = document.querySelectorAll('.js-natural-language-input');
function sync(el, option) {
    const { color } = option.dataset;
    el.dataset.color = color;
    el.innerText = option.innerText;
}
function setupSelect(select) {
    const parent = select.parentNode;
    const text = parent.querySelector('label');
    select.addEventListener('change', ()=>{
        sync(text, select.options[select.selectedIndex]);
    });
    // Next tick
    setTimeout(()=>{
        sync(text, select.options[select.selectedIndex]);
    }, 0);
}
if (selects) {
    [].forEach.call(selects, setupSelect);
}
function syncInput(el, input, value) {
    el.innerText = value;
    setTimeout(()=>{
        const selectWidth = el.getBoundingClientRect().width;
        input.style.width = `${selectWidth}px`;
    }, 0);
}
if (inputs) {
    [].forEach.call(inputs, (input)=>{
        const text = input.nextElementSibling;
        syncInput(text, input, input.value);
        input.addEventListener('input', (e)=>{
            syncInput(text, input, e.target.value);
        });
        input.addEventListener('change', (e)=>{
            syncInput(text, input, e.target.value);
        });
    });
}
