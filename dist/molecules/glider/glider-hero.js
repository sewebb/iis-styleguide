"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "initHeroGlider", {
    enumerable: true,
    get: function() {
        return initHeroGlider;
    }
});
const _gliderjs = /*#__PURE__*/ _interop_require_default(require("glider-js"));
const _nodeAdded = /*#__PURE__*/ _interop_require_default(require("../../assets/js/nodeAdded"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function initHeroGlider(node) {
    if (node.hasAttribute('data-glider-initialized')) {
        return;
    }
    const dataLayer = window._mtm || [];
    const gliderLinks = document.querySelectorAll('.glider-slide a');
    const GliderHero = new _gliderjs.default(node, {
        scrollLock: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rewind: true,
        arrows: {
            prev: '.js-glider-prev',
            next: '.js-glider-next'
        }
    });
    node.setAttribute('data-glider-initialized', 'true');
    const autoplayDelay = node.dataset.timeout;
    if (autoplayDelay) {
        let autoplay = setInterval(()=>{
            GliderHero.scrollItem('next');
        }, parseInt(autoplayDelay, 10));
        node.addEventListener('mouseover', ()=>{
            if (autoplay !== null) {
                clearInterval(autoplay);
                autoplay = null;
            }
        }, 0);
        node.addEventListener('mouseout', ()=>{
            if (autoplay === null) {
                autoplay = setInterval(()=>{
                    GliderHero.scrollItem('next');
                }, parseInt(autoplayDelay, 10));
            }
        }, 0);
    }
    document.querySelector('.js-glider-prev').addEventListener('click', ()=>{
        dataLayer.push({
            event: 'carousel',
            eventInfo: {
                category: 'carousel',
                action: 'click',
                label: 'arrow_left'
            }
        });
    });
    document.querySelector('.js-glider-next').addEventListener('click', ()=>{
        dataLayer.push({
            event: 'carousel',
            eventInfo: {
                category: 'carousel',
                action: 'click',
                label: 'arrow_right'
            }
        });
    });
    [].forEach.call(gliderLinks, (gliderLink)=>{
        gliderLink.addEventListener('click', ()=>{
            const linkTarget = gliderLink.href;
            console.log(linkTarget);
            dataLayer.push({
                event: 'carousel',
                eventInfo: {
                    category: 'carousel',
                    action: 'click',
                    label: linkTarget
                }
            });
        });
    });
}
(0, _nodeAdded.default)('.js-glider-hero', initHeroGlider);
const gliderElementHero = document.querySelector('.js-glider-hero');
if (gliderElementHero) {
    initHeroGlider(gliderElementHero);
}
