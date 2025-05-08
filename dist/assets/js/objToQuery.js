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
const objToQuery = (obj, exclude = [], parent = null)=>{
    const query = [];
    Object.entries(obj).forEach(([key, value])=>{
        if (exclude.indexOf(key) > -1) {
            return;
        }
        const queryKey = parent ? `${parent}[${key}]` : key;
        if (Array.isArray(value)) {
            value.forEach((subValue)=>query.push(`${queryKey}[]=${encodeURIComponent(subValue)}`));
        } else if (typeof value === 'object') {
            query.push(objToQuery(value, exclude, queryKey));
        } else {
            query.push(`${queryKey}=${encodeURIComponent(value)}`);
        }
    });
    return query.join('&');
};
const _default = (obj, exclude)=>objToQuery(obj, exclude);
