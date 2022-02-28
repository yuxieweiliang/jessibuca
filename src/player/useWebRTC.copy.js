import webRTCErrorHandle from './webRTCErrorHandle'
import { WebRtcPeerRecvOnly } from './webRTCUtls'
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
    const streamPath = assembleUrl(player._opt.url)
    let $video = player.$container.$videoElement
    let webRTC = new WebRtcPeerRecvOnly()
    const map = new WeakMap();
    map.set('webRTC', new WebRtcPeerRecvOnly())
    let __timer = null
    let __TimerWebRTC = null

    let isReset = false

    function ontrack (event) {
        clearTimeout(__timer)
        if (event.track.kind === "video") {
            if (isReset) {
                __timer = setTimeout(function() {
                    restartVideo(event.streams[0])
                    if (map.has('webRTC')) {
                        map.get('webRTC').destroy()
                        map.delete('webRTC')
                        map.set('webRTC', map.get('__webRTC'))
                        map.delete('__webRTC')
                    }
                }, 1000)

            } else {
                $video.srcObject = event.streams[0];
                $video.play()
            }

            isReset = true

            if (!player.playing) {
                player.playing = true;
            }
        }
    }

    function resetWebRTC () {
        map.set('__webRTC', new WebRtcPeerRecvOnly())

        clearTimeout(__TimerWebRTC)

        map.get('__webRTC').pc.ontrack = function(event) {
            ontrack(event, __webRTC)
        }

        // restartVideo(event.streams[0])
        // $video = null;
        fetchRemoteSDP (map.get('__webRTC'))

        console.log('restart WebRTC', map.get('__webRTC'))

        __TimerWebRTC = setTimeout(resetWebRTC, 1000 * 20)
    }

    __TimerWebRTC = setTimeout(resetWebRTC, 1000 * 20)

    function fetchRemoteSDP (webRTC) {
        webRTC.generateOffer(async (sdp) => {
            let result = await fetch(streamPath, {
                method: "POST",
                body: JSON.stringify(sdp),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(res => res.json());

            if (result.errmsg) {
                console.error(result.errmsg);
                return;
            }

            await webRTC.pc.setRemoteDescription(new RTCSessionDescription(result));

            result = null
            webRTC = null
        })
    }

    map.get('webRTC').pc.ontrack = function(event) {
        ontrack(event, webRTC)
    }
    fetchRemoteSDP (map.get('webRTC'))

    function restartVideo (streams) {
        $video.srcObject = undefined;
        $video.src = '';
        $video.load();
        if (player.video) {
            player.video.resetVideo()
            player.$container.$videoElement.srcObject = streams
            player.$container.$videoElement.play()
            $video = player.$container.$videoElement
        }

    }
    /*function ontrack (event, webRtc, $video, destroy) {
        clearTimeout(player.timer)
        if (event.track.kind === "video") {
            $video.srcObject = event.streams[0];
            $video.play()
            // webRtc.pc.time.__start = Date.now()
            player.timer = setTimeout(() => {
                // $video = null;
                destroy()
                restartVideo(event.streams[0], $video)
                event = null
                webRtc = null
                $video = null
                // createWebRTC(player, ontrack);
                // console.log('restart WebRTC', $video.buffered)
            }, 1000 * 10 * index)
            if (!player.playing) {
                player.playing = true;
            }
        }
    }



    function restartVideo (streams, $video) {
        $video.srcObject = undefined;
        $video.src = '';
        $video.load();
        if (player.video) {
            player.video.destroy()
            // player.$container.$videoElement.srcObject = streams
            // player.$container.$videoElement.play()
        }

    }*/
    /**
     * WebRTC错误处理 重连
     */
    /*webRTCErrorHandle(webRtc.pc, {
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

    webRtc.pc.ontrack = event => {
        if (event.track.kind === "video") {
            $video.srcObject = event.streams[0];
            $video.play()
            // webRtc.pc.time.__start = Date.now()
            setInterval(() => {
                // restartVideo(event.streams[0])
                // $video = null;
                webRtc.pc.close()
                webRtc = null
                webRtc = webRtcRecvOnly();
                console.log('restart WebRTC', $video.buffered)
            }, 1000 * 10)
            if (!player.playing) {
                player.playing = true;
            }
        }
    };


    async function fetchRemoteDescription () {
        const result = await fetch(streamPath, {
            method: "POST",
            body: JSON.stringify(webRtc.pc.localDescription.toJSON()),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(res => res.json());

        if (result.errmsg) {
            console.error(result.errmsg);
            return;
        }

        await webRtc.pc.setRemoteDescription(new RTCSessionDescription(result));
    }

    webRtc.generateOffer((sdp) => {
        fetchRemoteDescription()
    })*/

}

export default WebRTCVideo;
