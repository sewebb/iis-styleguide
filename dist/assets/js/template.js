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
const _default = (templateString)=>(substitutions)=>{
        let html = templateString;
        Object.entries(substitutions).forEach(([key, value])=>{
            html = html.replace(new RegExp(`{${key}}`, 'g'), value);
        });
        return html;
    };
