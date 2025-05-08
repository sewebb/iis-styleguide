"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Events;
    }
});
class Events {
    hasListeners(event) {
        return event in this.listeners;
    }
    on(event, cb) {
        if (!(event in this.listeners)) {
            this.listeners[event] = [];
        }
        if (!this.listeners[event].includes(cb)) {
            this.listeners[event].push(cb);
        }
        return {
            unsubscribe: ()=>this.off(event, cb)
        };
    }
    off(event, cb) {
        if (!this.hasListeners(event)) {
            return;
        }
        this.listeners[event] = this.listeners[event].filter((subCb)=>subCb !== cb);
    }
    removeAll(event) {
        this.listeners[event] = [];
    }
    emit(event, ...args) {
        if (!this.hasListeners(event)) {
            return;
        }
        this.listeners[event].forEach((cb)=>{
            cb.call(null, ...args);
        });
    }
    constructor(listeners = {}){
        this.listeners = listeners;
    }
}
