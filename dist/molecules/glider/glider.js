"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _gliderjs = /*#__PURE__*/ _interop_require_default(require("glider-js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const gliderWrappers = document.querySelectorAll('.glider-contain');
if (gliderWrappers) {
    [].forEach.call(gliderWrappers, (gliderWrapper)=>{
        const gliderElement = gliderWrapper.querySelector('.js-glider');
        const dots = gliderWrapper.classList.toString();
        gliderElement.glider = new _gliderjs.default(gliderElement, {
            scrollLock: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: `.${dots}+.glider-dots`,
            arrows: {
                prev: gliderWrapper.querySelector('.js-glider-prev'),
                next: gliderWrapper.querySelector('.js-glider-next')
            },
            responsive: [
                {
                    breakpoint: 961,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 469,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });
}
