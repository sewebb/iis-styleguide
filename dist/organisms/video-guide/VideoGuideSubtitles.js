"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return VideoGuideSubtitles;
    }
});
const _track = /*#__PURE__*/ _interop_require_default(require("../../assets/js/track"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class VideoGuideSubtitles {
    init() {
        this.subtitles = this.video.textTracks.getTrackById('video-subtitles');
    }
    attach() {
        this.subtitlesBtn.addEventListener('click', this.toggleSubtitles);
        this.subtitles.addEventListener('cuechange', this.onCueChange);
    }
    clearSubtitles() {
        this.subtitlesContainer.innerHTML = '';
    }
    constructor(element, video){
        this.onEnded = ()=>{
            this.clearSubtitles();
        };
        this.onCueChange = ()=>{
            const { activeCues } = this.subtitles;
            if (activeCues.length > 0) {
                this.subtitlesContainer.innerHTML = `<span>${activeCues[0].text}</span>`;
            } else {
                this.clearSubtitles();
            }
        };
        this.toggleSubtitles = ()=>{
            this.subtitlesBtn.classList.toggle('is-active');
            this.subtitlesContainer.classList.toggle('is-visible');
            (0, _track.default)({
                event: 'guided_tour',
                eventInfo: {
                    category: 'guided_tour',
                    action: 'player_click',
                    label: 'Subtitles'
                }
            });
        };
        this.element = element;
        this.video = video;
        this.subtitlesBtn = element.querySelector('.js-subtitles-btn');
        this.subtitlesContainer = element.querySelector('.js-subtitles-container');
        this.init();
        this.attach();
    }
}
