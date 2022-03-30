import Emitter from "../utils/emitter";
import {MEDIA_TYPE} from "../constant";

export default class CommonLoader extends Emitter {
    constructor(player) {
        super();
        this.player = player;

        this.stopId = null;
        this.firstTimestamp = null;
        this.startTimestamp = null;
        this.delay = -1;
        this.bufferList = [];
        this.dropping = false;
        this.initInterval();
    }

    destroy() {
        if (this.player.weak.has(this.player.demux)) {
            clearInterval(this.player.weak.get(this.player.demux));
            this.player.weak.delete(this.player.demux)
            this.initInterval = null;
        }
        this.firstTimestamp = null;
        this.startTimestamp = null;
        this.delay = -1;
        if (Array.isArray(this.bufferList)) {
            this.bufferList.length = 0
            this.bufferList = [];
        } else {
            this.bufferList = [];
        }
        this.dropping = false;
        this.off();
    }

    getDelay(timestamp) {
        if (!timestamp) {
            return -1
        }
        if (!this.firstTimestamp) {
            this.firstTimestamp = timestamp
            this.startTimestamp = Date.now()
            this.delay = -1;
        } else {
            if (timestamp) {
                this.delay = (Date.now() - this.startTimestamp) - (timestamp - this.firstTimestamp)
            }
        }
        return this.delay
    }

    resetDelay() {
        this.firstTimestamp = null;
        this.startTimestamp = null;
        this.delay = -1;
        this.dropping = false;
    }

    //
    initInterval() {
        const videoBuffer = this.player._opt.videoBuffer;
        this.player.debug.log('common dumex', `init Interval`);

        let _loop = () => {
            let data;
            if (this.bufferList.length) {
                // if (this.bufferList.length > 20) {
                //     // console.log(this.bufferList)
                //     this.bufferList.slice(this.bufferList.length - 2)
                //     // console.log(this.bufferList)
                // }

                if (this.dropping) {
                    // this.player.debug.log('common dumex', `is dropping`);
                    data = this.bufferList.shift();
                    if (data.type === MEDIA_TYPE.audio && data.payload[1] === 0) {
                        this._doDecoderDecode(data);
                    }
                    while (!data.isIFrame && this.bufferList.length) {
                        data = this.bufferList.shift();
                        if (data.type === MEDIA_TYPE.audio && data.payload[1] === 0) {
                            this._doDecoderDecode(data);

                            if (data && data.slice) {
                                data.slice(data.byteLength)
                            }
                        }
                    }
                    // i frame
                    if (data.isIFrame) {
                        this.dropping = false;
                        this._doDecoderDecode(data);

                        if (data && data.slice) {
                            data.slice(data.byteLength)
                        }
                    }
                } else {
                    data = this.bufferList[0];
                    if (this.getDelay(data.ts) === -1) {
                        // this.player.debug.log('common dumex', `delay is -1`);
                        this.bufferList.shift()
                        this._doDecoderDecode(data);
                    } else if (this.delay > videoBuffer + 1000) {
                        // this.player.debug.log('common dumex', `delay is ${this.delay}, set dropping is true`);
                        this.resetDelay();
                        this.dropping = true
                    } else {
                        while (this.bufferList.length) {
                            data = this.bufferList[0]

                            if (this.getDelay(data.ts) > videoBuffer) {
                                // drop frame
                                this.bufferList.shift()
                                this._doDecoderDecode(data);
                            } else {
                                // 保证数组不超过 20 位
                                if (this.bufferList.length > 20) {
                                    this.bufferList.shift();
                                    this._doDecoderDecode(data);
                                    // media.decodeVideo(data.payload, data.ts, data.isIFrame);
                                }
                                // this.player.debug.log('common dumex', `delay is ${this.delay}`);
                                break;
                            }
                        }
                    }
                }
            }
        }

        _loop();

        setInterval(_loop, 10);
        // this.player.weak.set(this.player.demux, setInterval(_loop, 10))
    }

    _doDecode(payload, type, ts, isIFrame) {
        const player = this.player;
        let options = {
            ts: ts,
            type: type,
            isIFrame: false
        }

        // use offscreen
        if (player._opt.useMSE) {
            // console.log(payload, options)
            // use mse
            if (type === MEDIA_TYPE.video) {
                options.isIFrame = isIFrame;
            }
            this.pushBuffer(payload, options)
        } else {
            const {decoderWorker} = player;

            if (player._opt.useWCS && !player._opt.useOffscreen) {
                if (type === MEDIA_TYPE.video) {
                    options.isIFrame = isIFrame;
                }
                this.pushBuffer(payload, options)
            } else {
                //
                if (type === MEDIA_TYPE.video) {
                    decoderWorker.decodeVideo(payload, ts, isIFrame);
                } else if (type === MEDIA_TYPE.audio) {
                    decoderWorker.decodeAudio(payload, ts);
                }
            }
        }
    }

    _doDecoderDecode(data) {
        const player = this.player;
        const {decoderWorker, webcodecsDecoder, mseDecoder} = player;

        if (data.type === MEDIA_TYPE.audio) {
            decoderWorker.decodeAudio(data.payload, data.ts)
        } else if (data.type === MEDIA_TYPE.video) {
            if (player._opt.useWCS && !player._opt.useOffscreen) {
                webcodecsDecoder.decodeVideo(data.payload, data.ts, data.isIFrame);
            } else if (player._opt.useMSE) {
                mseDecoder.decodeVideo(data.payload, data.ts, data.isIFrame);
            }
        }
    }

    pushBuffer(payload, options) {
        // 音频
        if (options.type === MEDIA_TYPE.audio) {
            this.bufferList.push({
                ts: options.ts,
                payload: payload,
                type: MEDIA_TYPE.audio,
            })
        } else if (options.type === MEDIA_TYPE.video) {
            this.bufferList.push({
                ts: options.ts,
                payload: payload,
                type: MEDIA_TYPE.video,
                isIFrame: options.isIFrame
            })
        }

        if (!(this.bufferList.length % 100)) {
            console.log(this.bufferList)
        }
    }

    close() {

    }


}
