import Emitter from "../utils/emitter";
import {CONTROL_HEIGHT, EVENTS, SCREENSHOT_TYPE, VIDEO_ENC_TYPE} from "../constant";
import {dataURLToFile, downloadImg, now, setStyle} from "../utils";
import { createToggleDisplay } from "../utils/toggleDisplay";
import CommonLoader from "./commonLoader";


export default class VideoLoader extends CommonLoader {
    constructor(player) {
        super();
        this.player = player;
        const $videoElement = document.createElement('video');
        $videoElement.muted = true;
        $videoElement.style.position = "absolute";
        $videoElement.style.top = 0;
        $videoElement.style.left = 0;
        $videoElement.setAttribute('start-time', Date.now());
        if (!player._opt.useWebRTC) {
            player.$container.appendChild($videoElement);
        }
        player.$container.$videoElement = $videoElement;
        this.$videoElement = $videoElement;
        this.videoInfo = {
            width: '',
            height: '',
            encType: '',
        }
        this.resize();

        const {proxy} = this.player.events;

        proxy(this.$videoElement, 'canplay', () => {
            this.player.debug.log('Video', 'canplay');
        })

        proxy(this.$videoElement, 'waiting', () => {
            this.player.emit(EVENTS.videoWaiting);
        })

        proxy(this.$videoElement, 'timeupdate', (event) => {
            // this.player.emit(EVENTS.videoTimeUpdate, event.timeStamp);
        })

        this.player.debug.log('Video', 'init');
    }

    destroy() {
        if (this.$videoElement && this.player.$container.contains(this.$videoElement)) {
            this.player.$container.removeChild(this.$videoElement);
        }
        this.$videoElement = null;
        this.init = false;
        this.off();
        this.player.debug.log('Video', 'destroy');
    }

    play() {
        // this.$videoElement.autoplay = true;
        this.$videoElement.play();
    }

    clearView() {

    }

    screenshot(filename, format, quality, type) {
        filename = filename || now();
        type = type || SCREENSHOT_TYPE.download;
        const formatType = {
            png: 'image/png',
            jpeg: 'image/jpeg',
            webp: 'image/webp'
        };
        let encoderOptions = 0.92;
        if (!formatType[format] && SCREENSHOT_TYPE[format]) {
            type = format;
            format = 'png';
            quality = undefined
        }
        if (typeof quality === "string") {
            type = quality;
            quality = undefined;
        }

        if (typeof quality !== 'undefined') {
            encoderOptions = Number(quality);
        }
        const $video = this.$videoElement;
        let canvas = document.createElement('canvas');
        canvas.width = $video.videoWidth;
        canvas.height = $video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage($video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL(SCREENSHOT_TYPE[format] || SCREENSHOT_TYPE.png, encoderOptions);
        const file = dataURLToFile(dataURL);
        if (type === SCREENSHOT_TYPE.base64) {
            return dataURL;
        } else if (type === SCREENSHOT_TYPE.blob) {
            return file;
        } else if (type === SCREENSHOT_TYPE.download) {
            downloadImg(file, filename);
        }
    }

    initCanvasViewSize() {
        this.resize();
    }

    resize() {
        const control = this.player.control;
        const playerWidth = this.player.width;
        this.$videoElement.width = playerWidth;
        this.$videoElement.height = this.player._opt.hasControl ? this.player.height - CONTROL_HEIGHT : this.player.height;
        const option = this.player._opt;
        let objectFill = 'contain';
        const rotate = option.rotate;
        const toggleDisplay = createToggleDisplay(control, playerWidth);

        // 默认是true
        // 视频画面做等比缩放后,高或宽对齐canvas区域,画面不被拉伸,但有黑边

        // 视频画面完全填充canvas区域,画面会被拉伸
        if (!option.isResize) {
            objectFill = 'fill';
        }

        // 视频画面做等比缩放后,完全填充canvas区域,画面不被拉伸,没有黑边,但画面显示不全
        if (option.isFullResize) {
            objectFill = 'none';
        }
        this.$videoElement.style.objectFit = objectFill;
        const transform = this.$videoElement.style.transform;
        if (transform) {
            this.$videoElement.style.transform = transform;
        } else {
            this.$videoElement.style.transform = 'rotate(' + rotate + 'deg)';
        }

        /*function toggleDisplay(elementName, width, defDisplay = 'block') {
            if (control && control[elementName]) {
                setStyle(
                    control[elementName],
                    'display',
                    (playerWidth < width) ? 'none' : defDisplay
                )
            }
            console.log(elementName, (playerWidth < width) ? 'none' : defDisplay, control && control[elementName])
        }*/

        toggleDisplay('$screenshot', 500)

        if (option.operateBtns.transform) {
            if (control && control.movement) {
                toggleDisplay('$movementActive', 600)
            } else {
                toggleDisplay('$movement', 600)
            }
            toggleDisplay('$movementWrap', 600)
        }

        if (option.operateBtns.transform) {
            if (control && control.transform) {
                toggleDisplay('$transformActive', 500)
            } else {
                toggleDisplay('$transform', 500)
            }
        }

        if (option.operateBtns.zoom) {
            if (control && control.zoom >= 2) {
                toggleDisplay('$zoomEnlarge', 300)
                toggleDisplay('$zoomMinimizeActive', 300)
            } else if (control && control.zoom < 2 && control.zoom > 1) {
                toggleDisplay('$zoomEnlargeActive', 300)
                toggleDisplay('$zoomMinimizeActive', 300)
            } else {
                toggleDisplay('$zoomEnlargeActive', 300)
                toggleDisplay('$zoomMinimize', 300)
            }
        }

        if (option.operateBtns.play) {
            if (this.player.playing) {
                toggleDisplay('$pause', 300, 'flex')
            } else {
                toggleDisplay('$play', 300, 'flex')
            }
        }

        if (option.operateBtns.audio) {
            if (this.player.audio && this.player.audio.volume > 0) {
                toggleDisplay('$volumeOn', 300, 'flex')
            } else {
                toggleDisplay('$volumeOff', 300, 'flex')
            }
        }

        if (this.player.recorder && this.player.recording) {
            toggleDisplay('$recordStop', 300)
        } else {
            toggleDisplay('$record', 300)
        }

        if (this.player && this.player.control) {
            // console.log('resize -------------- resize', this.player)
            this.player.control.emit('resize', this.$videoElement);
        }
        // console.log('resize -------------- resize', this.player)
    }

    getNewVideo (player) {
        return new VideoLoader(player)
    }

    resetVideo (cb) {
        if (this.player.$container && this.player.$container.$videoElement) {
            let $video = this.player.$container.$videoElement

            // console.log($video.seekable)
            if ($video) {
                // $video.seekable.start($video.seekable.length - 10);
                this.destroy()
                this.player.$container.$videoElement = null;
                this.$videoElement = null;
                this.videoInfo = null;
                this.player.video = null;
                this.player.video = new VideoLoader(this.player)
            }
        }
    }

    destroyVideo ($oldVideo) {
        if (this.player.$container && $oldVideo) {
            // console.log($video.seekable)
            // $video.seekable.start($video.seekable.length - 10);
            if (this.player.$container.contains($oldVideo)) {
                this.player.$container.removeChild($oldVideo);
            }

            this.init = false;
            this.off();
            this.player.debug.log('Video', 'destroy');
            $oldVideo = null;
        }
    }

}
