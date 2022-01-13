<template>
    <div class="root">
        <div class="container-shell">
            <div class="container-shell-title">jessibuca demo player <span class="tag-version" v-if="version">({{
                    version
                }})</span></div>
            <div class="option">
                <span>缓冲(秒):</span>
                <input
                    style="width: 50px"
                    type="number"
                    ref="buffer"
                    value="0.2"
                    @change="changeBuffer"
                />
                <input
                    type="checkbox"
                    v-model="useMSE"
                    ref="vod"
                    @change="restartPlay('mse')"
                /><span>MediaSource</span>
                <input
                    type="checkbox"
                    v-model="useWCS"
                    ref="vod"
                    @change="restartPlay('wcs')"
                /><span>webcodecs</span>

            </div>

            <div class="video-list-container" style="">
                <div
                    v-for="item in videoArray"
                    :key="item.index"
                    :id="'container' + item.index"
                    :ref="'container' + item.index"
                    class="video-list-item"
                ></div>
            </div>

            <div class="input">
                <div>输入URL：</div>
                <input
                    type="input"
                    autocomplete="on"
                    ref="playUrl"
                    value=""
                />
                <button v-if="!playing" @click="play">播放</button>
                <button v-else @click="pause">停止</button>
            </div>
            <div class="input" v-if="loaded" style="line-height: 30px">
                <button @click="destroy">销毁</button>
                <button v-if="quieting" @click="cancelMute">取消静音</button>
                <template v-else>
                    <button @click="mute">静音</button>
                    音量
                    <select v-model="volume" @change="volumeChange">
                        <option value="1">100</option>
                        <option value="0.75">75</option>
                        <option value="0.5">50</option>
                        <option value="0.25">25</option>
                    </select>
                </template>
                <span>旋转</span>
                <select v-model="rotate" @change="rotateChange">
                    <option value="0">0</option>
                    <option value="90">90</option>
                    <option value="270">270</option>
                </select>

                <button @click="fullscreen">全屏</button>
                <button @click="screenShot">截图</button>
                <div style="line-height: 30px">
                    <input
                        type="checkbox"
                        ref="operateBtns"
                        v-model="showOperateBtns"
                        @change="restartPlay"
                    /><span>操作按钮</span>
                    <input
                        type="checkbox"
                        ref="operateBtns"
                        v-model="showBandwidth"
                        @change="restartPlay"
                    /><span>网速</span>
                    <span v-if="performance">性能：{{ performance }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../public/jessibuca.js';
import { VERSION } from "./version";

console.log(jessibuca);

export default {
    name: "DemoPlayer",
    props: {},
    data() {
        const array32 = new Array(64);
        const url = 'ws://8.142.19.151:6010/jessica/1466683953296576512';
        var videoArray = array32.fill(null).map((_, index) => ({
            url,
            index,
            jessibuca: null
        }));

        return {
            jessibuca: null,
            version: '',
            wasm: false,
            vc: "ff",
            playing: false,
            quieting: true,
            loaded: false, // mute
            showOperateBtns: false,
            showBandwidth: false,
            err: "",
            speed: 0,
            performance: "",
            volume: 1,
            rotate: 0,
            useWCS: false,
            useMSE: true,
            useOffscreen: false,
            recording: false,
            recordType: 'webm',
            scale: 0,
            videoArray,
        };
    },
    mounted() {
        this.version = VERSION === '#VERSION#' ? '' : VERSION;
        this.create();
        window.onerror = (msg) => (this.err = msg);
    },
    unmounted() {
        this.jessibuca.destroy();
    },
    methods: {
        create(options) {
            options = options || {};

            this.videoArray.forEach(item => {
                console.log(this.$refs['container' + item.index][0]);
                item.jessibuca = new window.Jessibuca(
                    Object.assign(
                        {
                            container: this.$refs['container' + item.index][0],
                            videoBuffer: Number(this.$refs.buffer.value), // 缓存时长
                            isResize: false,
                            useWCS: this.useWCS,
                            useMSE: this.useMSE,
                            text: "",
                            // background: "bg.jpg",
                            loadingText: "疯狂加载中...",
                            // hasAudio:false,
                            debug: false,
                            supportDblclickFullscreen: true,
                            showBandwidth: this.showBandwidth, // 显示网速
                            operateBtns: {
                                fullscreen: this.showOperateBtns,
                                screenshot: this.showOperateBtns,
                                play: this.showOperateBtns,
                                audio: this.showOperateBtns,
                            },
                            vod: this.vod,
                            forceNoOffscreen: !this.useOffscreen,
                            isNotMute: true,
                            timeout: 10
                        },
                        options
                    )
                );
            }) ;

            // console.log(this.jessibuca);
        },
        play() {
            var timeout = 0;
            this.videoArray.forEach((item, index) => {
                timeout += index * 100;
                setTimeout(() => {
                    item.jessibuca.play(item.url);
                }, timeout);
            });
        },
        mute() {
            this.jessibuca.mute();
        },
        cancelMute() {
            this.jessibuca.cancelMute();
        },

        pause() {
            this.jessibuca.pause();
            this.playing = false;
            this.err = "";
            this.performance = "";
        },
        volumeChange() {
            this.jessibuca.setVolume(this.volume);
        },
        rotateChange() {
            this.jessibuca.setRotate(this.rotate);
        },
        destroy() {
            if (this.jessibuca) {
                this.jessibuca.destroy();
            }
            this.create();
            this.playing = false;
            this.loaded = false;
            this.performance = "";
        },

        fullscreen() {
            this.jessibuca.setFullscreen(true);
        },

        clearView() {
            this.jessibuca.clearView();
        },

        startRecord() {
            const time = new Date().getTime();
            this.jessibuca.startRecord(time, this.recordType);
        },

        stopAndSaveRecord() {
            this.jessibuca.stopRecordAndSave();
        },


        screenShot() {
            this.jessibuca.screenshot();
        },


        restartPlay(type) {

            if (type === 'mse') {
                this.useWCS = false;
                this.useOffscreen = false;
            } else if (type === 'wcs') {
                this.useMSE = false
            } else if (type === 'offscreen') {
                this.useMSE = false
            }

            this.destroy();
            setTimeout(() => {
                this.play();
            }, 100)
        },

        changeBuffer() {
            this.jessibuca.setBufferTime(Number(this.$refs.buffer.value));
        },

        scaleChange() {
            this.jessibuca.setScaleMode(this.scale);
        },
    },
};
</script>
<style>
.root {
    display: flex;
    place-content: center;
    margin-top: 3rem;
}

.container-shell {
    position: relative;
    backdrop-filter: blur(5px);
    background: hsla(0, 0%, 50%, 0.5);
    padding: 30px 4px 10px 4px;
    /* border: 2px solid black; */
    width: auto;
    position: relative;
    border-radius: 5px;
    box-shadow: 0 10px 20px;
}

.container-shell-title {
    position: absolute;
    color: darkgray;
    top: 4px;
    left: 10px;
    text-shadow: 1px 1px black;
}

.tag-version {
}

#container {
    background: rgba(13, 14, 27, 0.7);
    width: 640px;
    height: 398px;
}

.video-list-container {
    display: flex;
    flex-wrap: wrap;
    width: 140vh;
    height: 100vh;
}

.video-list-item {
    background: rgba(13, 14, 27, 0.7);
    width: 20vh;
    height: 10vh;
}

.input {
    display: flex;
    align-items: center;
    margin-top: 10px;
    color: white;
    place-content: stretch;
}

.input2 {
    bottom: 0px;
}

.input input[type='input'] {
    flex: auto;
}

.err {
    position: absolute;
    top: 40px;
    left: 10px;
    color: red;
}

.option {
    position: absolute;
    top: 4px;
    right: 10px;
    display: flex;
    place-content: center;
    font-size: 12px;
}

.option span {
    color: white;
}

.page {
    background: url(/bg.jpg);
    background-repeat: no-repeat;
    background-position: top;
}

@media (max-width: 720px) {
    #container {
        width: 90vw;
        height: 52.7vw;
    }
}
</style>
