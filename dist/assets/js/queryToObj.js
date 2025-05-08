/** Parse query string to object */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return queryToObj;
    }
});
function queryToObj(query) {
    const obj = {};
    const pairs = query.split('&');
    pairs.forEach((pair)=>{
        const [key, value] = pair.split('=');
        obj[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    return obj;
}
