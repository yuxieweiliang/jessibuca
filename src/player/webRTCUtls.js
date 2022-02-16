export function WebRtcPeerRecvOnly(option) {
    this.pc = new RTCPeerConnection(option);
}

WebRtcPeerRecvOnly.prototype.generateOffer = async function generateOffer (option, callback) {
    if (typeof option === 'function') {
        callback = option
        option = undefined
    }
    await  this.pc.setLocalDescription(await  this.pc.createOffer(option));

    if (callback) {
        callback( this.pc.localDescription.sdp)
    }

    return this.pc.localDescription.sdp
}

WebRtcPeerRecvOnly.prototype.processAnswer = async function processAnswer (sdp, callback) {
    if (typeof sdp === 'string') {
        sdp = { sdp }
    }

    if (!sdp.sdp) {
        throw new Error('sdp 不能为空！')
    }

    await this.pc.setRemoteDescription(new RTCSessionDescription(sdp));

    if (callback) {
        callback(true)
    }

    return true
}

export function webRtcRecvOnly(option, callback) {
    const webRtc = new WebRtcPeerRecvOnly(option)

    webRtc.pc.addTransceiver('video',{
        direction: 'recvonly'
    });

    if (callback) {
        callback(webRtc)
    }

    return webRtc
}
