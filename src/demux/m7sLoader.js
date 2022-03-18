import {FLV_MEDIA_TYPE, MEDIA_TYPE} from "../constant";
import CommonLoader from "./commonLoader";
import {now} from "../utils";

export default class M7sLoader extends CommonLoader {
    constructor(player) {
        super(player);
        player.debug.log('M7sDemux', 'init')
    }

    destroy() {
        super.destroy();
        this.player.debug.log('M7sDemux', 'destroy')
        this.dispatch = null
        this.player = null
    }

    dispatch(data) {
        const player = this.player;
        // const {decoderWorker, webcodecsDecoder, mseDecoder} = player;
        const dv = new DataView(data)
        const type = dv.getUint8(0);
        const ts = dv.getUint32(1, false);

        switch (type) {
            case MEDIA_TYPE.audio: // MEDIA_TYPE.audio === 1
                if (player._opt.hasAudio) {
                    const payload = new Uint8Array(data, 5)
                    player.updateStats({
                        abps: payload.byteLength
                    })
                    if (payload.byteLength > 0) {
                        this._doDecode(payload, type, ts)
                    }
                }
                break;
            case MEDIA_TYPE.video: // MEDIA_TYPE.audio === 2
                if (player._opt.hasVideo) {
                    if (!player._times.demuxStart) {
                        player._times.demuxStart = now();
                    }
                    if (dv.byteLength > 5) {
                        // 8位无符号整型数组
                        const payload = new Uint8Array(data, 5);
                        const isIframe = dv.getUint8(5) >> 4 === 1;
                        player.updateStats({
                            vbps: payload.byteLength
                        })

                        if (payload.byteLength > 0) {
                            /**
                             * payload 当前帧的数据
                             * type video | audio
                             * ts 每次 +30
                             * isIframe true | false
                             */
                            this._doDecode(payload, type, ts, isIframe)
                            if (dv && dv.slice) {
                                dv.slice(dv.byteLength)
                            }
                            if (payload && payload.slice) {
                                payload.slice(payload.byteLength)
                            }
                        }
                    }
                }
                break;
        }
    }
}
