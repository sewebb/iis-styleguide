"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _VideoGuideSubtitles = /*#__PURE__*/ _interop_require_default(require("./VideoGuideSubtitles"));
const _VideoGuideTimeline = /*#__PURE__*/ _interop_require_default(require("./VideoGuideTimeline"));
const _VideoGuidePlayback = /*#__PURE__*/ _interop_require_default(require("./VideoGuidePlayback"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class VideoGuide {
    attach() {
        this.video.addEventListener('loadedmetadata', this.onLoadedMetadata);
        this.video.addEventListener('play', this.onPlay);
        this.video.addEventListener('pause', this.onPause);
        this.video.addEventListener('ended', this.onEnded);
        this.video.addEventListener('timeupdate', this.onTimeUpdate);
        this.abortBtn.addEventListener('click', this.onAbort);
    }
    constructor(element){
        this.onLoadedMetadata = ()=>{
            this.playback = new _VideoGuidePlayback.default(this.element, this.video);
            this.subtitles = new _VideoGuideSubtitles.default(this.element, this.video);
            this.timeline = new _VideoGuideTimeline.default(this.element, this.video);
            this.video.classList.remove('is-loading');
        };
        this.dispatchEvent = (eventName)=>{
            [
                this.playback,
                this.subtitles,
                this.timeline
            ].forEach((instance)=>{
                if (instance && eventName in instance) {
                    instance[eventName]();
                }
            });
        };
        this.onPlay = ()=>this.dispatchEvent('onPlay');
        this.onPause = ()=>this.dispatchEvent('onPause');
        this.onEnded = ()=>this.dispatchEvent('onEnded');
        this.onTimeUpdate = ()=>this.dispatchEvent('onTimeUpdate');
        this.onAbort = ()=>{
            this.dispatchEvent('onAbort');
            window.location.href = this.abortBtn.href;
        };
        this.element = element;
        this.video = element.querySelector('.js-video-guide');
        this.abortBtn = element.querySelector('.js-abort-guide');
        this.playback = null;
        this.subtitles = null;
        this.timeline = null;
        // Set all track elements to hidden mode to allow scripting
        [].forEach.call(this.video.textTracks, (txtTrack)=>{
            txtTrack.mode = 'hidden';
        });
        this.attach();
        // loadedmetadata might not be fired if the video is already loaded
        if (this.video.readyState >= 1) {
            this.onLoadedMetadata();
        }
    }
}
const elements = document.querySelectorAll('[data-video-guide]');
elements.forEach((element)=>new VideoGuide(element));
