// TODO: Should probably implement a way to localize texts in the styleguide
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    destroyPlayer: function() {
        return destroyPlayer;
    },
    setupPlayers: function() {
        return setupPlayers;
    }
});
const _className = /*#__PURE__*/ _interop_require_default(require("./className"));
const _hasCookieConsent = /*#__PURE__*/ _interop_require_default(require("./hasCookieConsent"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let consent = (0, _hasCookieConsent.default)('C0004');
const missingConsentMessage = 'För att spela Youtubefilmer krävs att "Riktade kakor" tillåts. Tryck för att "Anpassa kakor"';
function loadYoutubeAPI() {
    const id = 'iisYoutubeAPI';
    if (document.getElementById(id)) {
        return;
    }
    const tag = document.createElement('script');
    const firstScript = document.getElementsByTagName('script')[0];
    tag.id = id;
    tag.src = 'https://www.youtube.com/iframe_api';
    firstScript.parentNode.insertBefore(tag, firstScript);
}
function onPlayerStateChange(el, e) {
    /* eslint-disable no-undef */ if (e.data === YT.PlayerState.PLAYING) {
        el.getElementsByTagName('img')[0].style.zIndex = '-1';
        el.getElementsByTagName('button')[0].style.display = 'none';
    } else if (e.data === YT.PlayerState.UNSTARTED) {
        el.getElementsByTagName('img')[0].style.zIndex = null;
        el.getElementsByTagName('button')[0].style.display = null;
    }
}
function createConsentWarning(el) {
    if (el.querySelector('[data-youtube-consent-warning]')) {
        return;
    }
    const div = document.createElement('div');
    const button = document.createElement('button');
    const message = document.createElement('p');
    message.classList.add('color-cyberspace');
    div.setAttribute('data-youtube-consent-warning', true);
    div.className = (0, _className.default)('m-icon-overlay__message');
    button.className = (0, _className.default)('a-button');
    button.setAttribute('data-ot-dynamic-show-settings', 'true');
    button.innerHTML = `<span class="${(0, _className.default)('a-button__text')}">Anpassa kakor</span>`;
    message.innerHTML = missingConsentMessage;
    div.appendChild(message);
    div.appendChild(button);
    el.appendChild(div);
}
function destroyConsentWarning(el) {
    loadYoutubeAPI();
    const div = el.querySelector('[data-youtube-consent-warning]');
    if (div) {
        div.parentNode.removeChild(div);
    }
}
function createCover(el) {
    if (!consent) {
        createConsentWarning(el);
    } else {
        destroyConsentWarning(el);
    }
    if (el.getElementsByTagName('img').length) {
        return;
    }
    const id = el.getAttribute('data-youtube');
    const url = `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
    const img = document.createElement('img');
    el.appendChild(img);
    img.loading = 'lazy';
    img.src = url;
    img.alt = 'tumnagel för video';
    img.width = 480;
    img.height = 270;
}
function setupYoutubePlayer(el) {
    if (el.youtube) {
        return;
    }
    const id = el.getAttribute('data-youtube');
    const playerEl = document.createElement('div');
    playerEl.setAttribute('data-youtube-container', true);
    el.appendChild(playerEl);
    el.youtube = new YT.Player(playerEl, {
        height: '100%',
        width: '100%',
        videoId: id,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters#Parameters
            playsinline: 1,
            autoplay: true,
            rel: 0
        },
        events: {
            onStateChange: (e)=>onPlayerStateChange(el, e)
        }
    });
    el.getElementsByTagName('img')[0].style.zIndex = '-1';
    el.getElementsByTagName('button')[0].style.display = 'none';
}
function delegateClick(e) {
    if (e.target.closest('[data-youtube-consent-warning]')) {
        return;
    }
    const el = e.target.closest('[data-youtube]');
    if (!el) {
        return;
    }
    if (!el.youtube) {
        setupYoutubePlayer(el);
        return;
    }
    el.youtube.playVideo();
}
function destroyPlayer(el) {
    if (el.youtube) {
        const playerEl = el.querySelector('[data-youtube-container]');
        playerEl.parentNode.removeChild(playerEl);
        el.youtube.destroy();
        el.youtube = null;
    }
    el.getElementsByTagName('img')[0].style.zIndex = null;
    el.getElementsByTagName('button')[0].style.display = null;
}
function setupPlayers(container) {
    const players = container.querySelectorAll('[data-youtube]');
    if (!players.length) {
        return;
    }
    [].forEach.call(players, createCover);
}
window.onYouTubeIframeAPIReady = ()=>{
    document.body.addEventListener('click', delegateClick);
};
setupPlayers(document);
window.addEventListener('consent.onetrust', (e)=>{
    consent = e.detail.includes('C0004');
    setupPlayers(document);
});
