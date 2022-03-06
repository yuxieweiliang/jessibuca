import template from "./template";
import observer from './observer';
import property from './property';
import events from './events';
import './style.scss'
import Emitter from "../utils/emitter";
import hotkey from "./hotkey";

export default class Control extends Emitter {
    constructor(player) {
        super()
        this.player = player;
        template(player, this);
        observer(player, this);
        property(player, this);
        events(player, this);

        this.movement = false;
        this.transform = false;
        this.zoom = 1;
        if (player._opt.hotKey) {
            hotkey(player, this);
        }
        this.player.debug.log('Control', 'init');
    }

    destroy() {
        if (this.$poster) {
            this.player.$container.removeChild(this.$poster);
        }
        if (this.$loading) {
            this.player.$container.removeChild(this.$loading);
        }
        if (this.$controls) {
            this.player.$container.removeChild(this.$controls);
        }
        this.player.debug.log('control', 'destroy');
    }

    autoSize() {
        const player = this.player;
        player.$container.style.padding = '0 0';
        const playerWidth = player.width;
        const playerHeight = player.height;
        const playerRatio = playerWidth / playerHeight;
        const canvasWidth = player.audio.$videoElement.width;
        const canvasHeight = player.audio.$videoElement.height;
        const canvasRatio = canvasWidth / canvasHeight;
        if (playerRatio > canvasRatio) {
            const padding = (playerWidth - playerHeight * canvasRatio) / 2;
            player.$container.style.padding = `0 ${padding}px`;
        } else {
            const padding = (playerHeight - playerWidth / canvasRatio) / 2;
            player.$container.style.padding = `${padding}px 0`;
        }
    }

}
