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
class Button {
    build() {
        const className = this.button.classList.item(0);
        const html = `
			<svg class="icon ${className}__spinner">
				<use xlink:href="#icon-spinner-white"></use>
			</svg>
		`;
        this.button.appendChild(document.createRange().createContextualFragment(html));
    }
    isLoading() {
        return this.button.classList.contains('is-loading');
    }
    start() {
        if (this.disabled) {
            this.button.setAttribute('disabled', 'disabled');
        }
        this.button.classList.add('is-loading');
    }
    stop() {
        if (this.disabled) {
            this.button.removeAttribute('disabled');
        }
        this.button.classList.remove('is-loading');
    }
    constructor(button, disabled = true){
        this.button = button;
        this.disabled = disabled;
        this.build();
    }
}
const _default = Button;
