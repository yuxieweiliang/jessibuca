import webRTCErrorHandle from './webRTCErrorHandle'
import { webRtcRecvOnly } from './webRTCUtls'
import {EVENTS} from "../constant";

function assembleUrl (path) {
    const url = new URL(path)
    if (url.origin && url.origin !== 'null') {
        return `${window.location.origin}/webrtc-api/webrtc/play?streamPath=${url.pathname.substr(1)}`
    } else {
        let pathname = url.pathname
        let streamPath = ''
        let index = 0
        if (url.pathname.startsWith('//')) {
            pathname = url.pathname.substr(2)
        }

        index = pathname.indexOf('/')
        streamPath = pathname.substring(index + 1)

        if (pathname) {
            return `${window.location.origin}/webrtc-api/webrtc/play?streamPath=${streamPath}`
        } else {
            console.log('url is Error for webRTC！')
        }
    }
}

async function WebRTCVideo(player) {
    let webRtc = webRtcRecvOnly();
    const streamPath =  assembleUrl(player._opt.url)
    const $video = player.$container.$videoElement
    const {proxy} = player.events;
    const pcConfig = {
        iceConnectionState: webRtc.pc.iceConnectionState,
        stream: null,
        localSDP: "",
        remoteSDP: "",
        remoteSDPURL: "",
        localSDPURL: "",
        streamPath: ""
    }

    console.log('-----useWebRTC----', webRtc)

    /**
     * WebRTC错误处理 重连
     */
    webRTCErrorHandle(webRtc.pc, {
        iceConnectionStateFailed: () => {
            webRtcPeer.generateOffer((error, offerSdp) => {
                if (error) {
                    return console.error('Error generating the offer');
                }
                offerToReceiveVideo({
                    ...offerMsg,
                    offerSdp,
                })
            });
        },
    })

    proxy($video, 'canplay', () => {
        player.debug.log('Video', 'canplay');
    })

    pcConfig.streamPath = streamPath;

    webRtc.pc.onsignalingstatechange = e => {
        //console.log(e);
    };

    webRtc.pc.oniceconnectionstatechange = function () {
        pcConfig.iceConnectionState = webRtc.pc.iceConnectionState;
    };

    webRtc.pc.onicecandidate = event => {
        // console.log(event)
    };

    webRtc.pc.ontrack = event => {
        if (event.track.kind === "video") {
            pcConfig.stream = event.streams[0];
            $video.srcObject = pcConfig.stream
            $video.play()

            if (!player.playing) {
                player.playing = true;
            }
        }
    };

    async function fetchRemoteDescription () {
        pcConfig.localSDPURL = URL.createObjectURL(
            new Blob([pcConfig.localSDP], { type: "text/plain" })
        );

        console.log(pcConfig.streamPath)
        const result = await fetch(pcConfig.streamPath, {
            method: "POST",
            body: JSON.stringify(webRtc.pc.localDescription.toJSON()),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(res => res.json());

        if (result.errmsg) {
            console.error(result.errmsg);
            return;
        } else {
            pcConfig.remoteSDP = result.sdp;
            pcConfig.remoteSDPURL = URL.createObjectURL(new Blob([pcConfig.remoteSDP], { type: "text/plain" }));
        }

        await webRtc.pc.setRemoteDescription(new RTCSessionDescription(result));
    }

    webRtc.generateOffer((sdp) => {
        fetchRemoteDescription()
        pcConfig.localSDP = webRtc.pc.localDescription.sdp;
    })

}

export default WebRTCVideo;
