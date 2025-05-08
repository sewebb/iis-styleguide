"use strict";
const ranges = document.querySelectorAll('.js-range-wrapper');
function setValue(range, rangeValue, rangeInput) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number((val - min) * 100 / (max - min));
    rangeValue.innerHTML = val;
    if (rangeInput) {
        rangeInput.value = val;
    }
    // Sorta magic numbers based on size of the native UI thumb
    rangeValue.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
ranges.forEach((wrap)=>{
    const range = wrap.querySelector('.js-range');
    const rangeValue = wrap.querySelector('.js-range-value');
    const rangeInput = wrap.querySelector('.js-range-input');
    range.addEventListener('input', ()=>{
        setValue(range, rangeValue, rangeInput);
        range.focus();
    });
    if (rangeInput) {
        rangeInput.addEventListener('input', ()=>{
            if (rangeInput.value !== '') {
                range.value = rangeInput.value;
                rangeValue.innerHTML = rangeInput.value;
                setValue(range, rangeValue, rangeInput);
            }
            rangeInput.focus();
        });
    }
    setValue(range, rangeValue, rangeInput);
});
