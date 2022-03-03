import Icon from '../assets/icons'

export const attrs = {
    color: 'white',
    style: 'width: 1.2rem; height: 1.2rem;',
}
const iconsMap = {
    play: {
        label: '播放',
        icon: Icon.VideoPlay(attrs),
        withTips: true,
    },
    pause: {
        label: '暂停',
        icon: Icon.VideoPause(attrs),
        withTips: true,
    },
    audio: {
        // icon: Icon.VolumeUp(attrs),
        icon: Icon.VolumeUp({...attrs, style: 'width: 19px; height: 19px;'}),
    },
    mute: {
        icon: Icon.VolumeOff({...attrs, style: 'width: 19px; height: 19px;'}),
    },
    screenshot: {
        label: '截图',
        icon: Icon.Screenshot(attrs),
        withTips: true,
    },
    // loading: '加载',
    fullscreen: {
        label: '全屏',
        icon: Icon.ScreenMaximize(attrs),
        withTips: true,
    },
    fullscreenExit: {
        label: '退出全屏',
        icon: Icon.ScreenMinimize(attrs),
        withTips: true,
    },
    record: {
        label: '录制',
        icon: Icon.Video3(attrs),
        withTips: true,
    },
    recordStop: {
        label: '停止录制',
        icon: Icon.Video3Disabled({...attrs, style: 'color: red;' + attrs.style}),
        withTips: true,
    },
    // movement: '云台控制',
    // movementEnable: '云台控制', // 启用
    // transform3D: '3D变换',
    // transform3DEnable: '3D变换', // 启用
    // zoomIn: '放大',
    // zoomOut: '缩小',
};

// console.log(Icon)
export default Object.keys(iconsMap).reduce((icons, key) => {
    icons[key] = `<div class="jessibuca-icon jessibuca-icon-${key}">${ iconsMap[key].icon }</div>`;
    if (iconsMap[key].withTips) {
        icons[key] += `<span class="icon-title-tips"><span class="icon-title">${iconsMap[key].label}</span></span>`;
    }

    return icons;
}, {});
