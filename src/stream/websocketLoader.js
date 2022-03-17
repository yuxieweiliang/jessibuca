import Emitter from "../utils/emitter";
import {EVENTS, EVENTS_ERROR, WEBSOCKET_STATUS} from "../constant";
import {calculationRate, now} from "../utils";

const socketWeakMap = new WeakMap();

export default class WebsocketLoader extends Emitter {
    constructor(player) {
        super();
        this.player = player;
        this.socket = null;
        this.socketStatus = WEBSOCKET_STATUS.notConnect;
        this.wsUrl = null;
        //
        this.streamRate = calculationRate(rate => {
            player.emit(EVENTS.kBps, (rate / 1024).toFixed(2));
        });
    }

    destroy() {
        let socket = socketWeakMap.get(this.player.stream);

        if (socket) {
            socketWeakMap.delete(this.player.stream);
            socket.close();
            socket = null;
        }
        this.socketStatus = WEBSOCKET_STATUS.notConnect;
        this.streamRate = null;
        this.wsUrl = null;
        this.off();
        this.player.debug.log('websocketLoader', 'destroy');
    }

    _createWebSocket() {
        const player = this.player;
        const {
            debug,
            events: {proxy},
            demux,
        } = player;
        const socket = new WebSocket(this.wsUrl);

        socketWeakMap.set(this.player.stream, socket);

        socket.binaryType = 'arraybuffer';
        proxy(socket, 'open', () => {
            this.emit(EVENTS.streamSuccess);
            debug.log('websocketLoader', 'socket open');
            this.socketStatus = WEBSOCKET_STATUS.open;
        });

        proxy(socket, 'message', event => {
            this.streamRate && this.streamRate(event.data.byteLength);
            this._handleMessage(event.data);
        });

        proxy(socket, 'close', () => {
            debug.log('websocketLoader', 'socket close');
            this.emit(EVENTS.streamEnd);
            this.socketStatus = WEBSOCKET_STATUS.close;
            this.destroy()
            player.replay()
        });

        proxy(socket, 'error', error => {
            debug.log('websocketLoader', 'socket error');
            this.emit(EVENTS_ERROR.websocketError, error);
            this.player.emit(EVENTS.error, EVENTS_ERROR.websocketError);
            this.socketStatus = WEBSOCKET_STATUS.error;
            demux.close();
            debug.log('websocketLoader', `socket error:`, error);
        });
    }

    //
    _handleMessage(message) {
        const {demux} = this.player;
        if (!demux) {
            this.player.debug.warn('websocketLoader', 'websocket handle message demux is null');
            return;
        }
        demux.dispatch(message);
    }


    fetchStream(url) {
        this.player._times.streamStart = now();
        this.wsUrl = url;
        this._createWebSocket(url);
    }


}
