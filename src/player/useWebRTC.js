
async function WebRTCVideo(player) {
    let pc = new RTCPeerConnection();
    const streamPath = player._opt.url
    const $video = player.$container.$videoElement
    const pcConfig = {
        iceConnectionState: pc && pc.iceConnectionState,
        stream: null,
        localSDP: "",
        remoteSDP: "",
        remoteSDPURL: "",
        localSDPURL: "",
        streamPath: ""
    }

    pc.addTransceiver('video',{
        direction: 'recvonly'
    });

    pcConfig.streamPath = streamPath;

    pc.onsignalingstatechange = e => {
        //console.log(e);
    };

    pc.oniceconnectionstatechange = e => {
        pcConfig.iceConnectionState = pc.iceConnectionState;
    };

    pc.onicecandidate = event => {
        // console.log(event)
    };

    pc.ontrack = event => {
        console.log('event: => ', event);
        if (event.track.kind == "video") {
            pcConfig.stream = event.streams[0];
            $video.srcObject = pcConfig.stream
            $video.play()
        }
    };

    await pc.setLocalDescription(await pc.createOffer());

    pcConfig.localSDP = pc.localDescription.sdp;

    pcConfig.localSDPURL = URL.createObjectURL(
        new Blob([pcConfig.localSDP], { type: "text/plain" })
    );

    const result = await fetch(pcConfig.streamPath, {
        method: "POST",
        body: JSON.stringify(pc.localDescription.toJSON()),
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

    await pc.setRemoteDescription(new RTCSessionDescription(result));

}

export default WebRTCVideo;
