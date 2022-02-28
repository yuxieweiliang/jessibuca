import webRTCErrorHandle from './webRTCErrorHandle'
import { WebRtcPeerRecvOnly } from './webRTCUtls'
import Video from "../video";
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

function getOldVideoKey () {
    return parseInt('' + Math.random() * Math.pow(10, 6)) + '-' + Date.now()
}

const map = new WeakMap();
async function WebRTCVideo(player) {
    const streamPath = assembleUrl(player._opt.url)
    const timeRefresh = player._opt.timeRefresh
    let $webRTCVideo = player.$container.$videoElement
    let $oldVideo = $webRTCVideo
    map.set($webRTCVideo, new WebRtcPeerRecvOnly())
    let __timer = null
    let __TimerWebRTC = null

    function ontrack (event, __webRTCVideo) {
        clearTimeout(__timer)
        if (event.track.kind === "video") {
            player.$container.appendChild(__webRTCVideo);
            $webRTCVideo.srcObject = event.streams[0];
            $webRTCVideo.play()

            if (!player.playing) {
                player.playing = true;
            }
        }
    }

    function deleteWebRTC() {
        clearTimeout(player.__deleteWebRTCTimer)
        $oldVideo.srcObject = undefined;
        $oldVideo.src = '';
        $oldVideo.load();
        // 把上一个卸载了。
        player.video.destroyVideo($oldVideo)
        if (map.has($oldVideo)) {
            map.get($oldVideo).destroy()
            map.delete($oldVideo)
            $oldVideo = $webRTCVideo
        }
    }

    function resetWebRTC () {
        player.__deleteWebRTCTimer = setTimeout(deleteWebRTC, 1000)
        // 创建新 video
        player.video = new Video(player)
        $webRTCVideo = player.video.$videoElement

        map.set($webRTCVideo, map.get($webRTCVideo))
        map.delete($webRTCVideo)
        // player.video = __newVideo
        map.set($webRTCVideo, new WebRtcPeerRecvOnly())

        clearTimeout(__TimerWebRTC)

        map.get($webRTCVideo).pc.ontrack = function(event) {
            ontrack(event, $webRTCVideo)
        }

        // restartVideo(event.streams[0])
        // $video = null;
        fetchRemoteSDP (map.get($webRTCVideo))

        __TimerWebRTC = setTimeout(resetWebRTC, timeRefresh)
    }

    __TimerWebRTC = setTimeout(resetWebRTC, timeRefresh)

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

    map.get($webRTCVideo).pc.ontrack = function(event) {
        ontrack(event, $webRTCVideo)
    }
    fetchRemoteSDP (map.get($webRTCVideo))
}

export default WebRTCVideo;
