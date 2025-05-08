"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const debounce = (func, delay = [])=>{
    let inDebounce;
    return (...args)=>{
        const context = void 0;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(()=>func.apply(context, args), delay);
    };
};
const _default = (func, delay)=>debounce(func, delay);
