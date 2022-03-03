import createIcon from './Icon';
import arrow from './tool/arrow';
import camera from './media/camera';
import video from './media/video';
import volume from './media/volume';
import heart from './heart';
import more from './more';
import move from './tool/move';
import rotation from './rotation';
import screen from './tool/screen';
import trending from './trending';
import business from './business/business';
import magnifier from './magnifier';
import circular from './circular';

const Icon = {};
/**
 * 箭头类
 */
// 向上
export const ArrowUp = (props) => createIcon({...props, path: arrow.up});
export const ArrowUpSquare = (props) => createIcon({...props, path: arrow.up_square});
export const ArrowUpCircular = (props) => createIcon({...props, path: arrow.up_circular});

// 向右
export const ArrowRight = (props) => createIcon({...props, path: arrow.right});
export const ArrowRightSquare = (props) => createIcon({...props, path: arrow.right_square});
export const ArrowRightCircular = (props) => createIcon({...props, path: arrow.right_circular});

// 向下
export const ArrowDown = (props) => createIcon({...props, path: arrow.down});
export const ArrowDownSquare = (props) => createIcon({...props, path: arrow.down_square});
export const ArrowDownCircular = (props) => createIcon({...props, path: arrow.down_circular});

// 向左
export const ArrowLeft = (props) => createIcon({...props, path: arrow.left});
export const ArrowLeftSquare = (props) => createIcon({...props, path: arrow.left_square});
export const ArrowLeftCircular = (props) => createIcon({...props, path: arrow.left_circular});

Icon.arrow = arrow;
Icon.ArrowUp = ArrowUp;
Icon.ArrowUpSquare = ArrowUpSquare;
Icon.ArrowUpCircular = ArrowUpCircular;

Icon.ArrowRight = ArrowRight;
Icon.ArrowRightSquare = ArrowRightSquare;
Icon.ArrowRightCircular = ArrowRightCircular;

Icon.ArrowDown = ArrowDown;
Icon.ArrowDownSquare = ArrowDownSquare;
Icon.ArrowDownCircular = ArrowDownCircular;

Icon.ArrowLeft = ArrowLeft;
Icon.ArrowLeftSquare = ArrowLeftSquare;
Icon.ArrowLeftCircular = ArrowLeftCircular;

export const CameraVideo = (props) => createIcon({...props, path: camera.video_camera});

Icon.CameraVideo = CameraVideo;

export const Video = (props) => createIcon({...props, path: video.video});
export const Video2 = (props) => createIcon({...props, path: video.video2});
export const Video3 = (props) => createIcon({...props, path: video.video3});
export const Video3Disabled = (props) => createIcon({...props, path: video.video3_disabled});

export const VideoPlay = (props) => createIcon({...props, path: video.play});
export const VideoPlay2 = (props) => createIcon({...props, path: video.play2});


export const VideoPause = (props) => createIcon({...props, path: video.pause});
export const VideoFastForward = (props) => createIcon({...props, path: video.fast_forward});
export const VideoBackward = (props) => createIcon({...props, path: video.backward});
export const VideoPrev = (props) => createIcon({...props, path: video.prev});
export const VideoNext = (props) => createIcon({...props, path: video.next});
export const Microphone = (props) => createIcon({ ...props, path: video.microphone });
export const Microphone0 = (props) => createIcon({ ...props, path: video.microphone0 });
export const Microphone1 = (props) => createIcon({ ...props, path: video.microphone1 });
export const Microphone2 = (props) => createIcon({ ...props, path: video.microphone2 });
export const Microphone3 = (props) => createIcon({ ...props, path: video.microphone3 });
export const Microphone4 = (props) => createIcon({ ...props, path: video.microphone4 });
export const MicrophoneDisabled = (props) => createIcon({ ...props, path: video.microphone_disabled });
export const MicrophoneDisabled1 = (props) => createIcon({ ...props, path: video.microphone_disabled1 });
export const MicrophoneDisabled2 = (props) => createIcon({ ...props, path: video.microphone_disabled2 });
export const MicrophoneDisabled3 = (props) => createIcon({ ...props, path: video.microphone_disabled3 });
export const MicrophoneDisabled4 = (props) => createIcon({ ...props, path: video.microphone_disabled4 });
export const MicrophoneDisabled5 = (props) => createIcon({ ...props, path: video.microphone_disabled5 });
export const MicrophoneDisabled6 = (props) => createIcon({ ...props, path: video.microphone_disabled6 });
export const MicrophoneDisabled7 = (props) => createIcon({ ...props, path: video.microphone_disabled7 });
export const MicrophoneDisabled8 = (props) => createIcon({ ...props, path: video.microphone_disabled8 });
export const MicrophoneDisabled9 = (props) => createIcon({ ...props, path: video.microphone_disabled9 });

Icon.Video = Video;
Icon.Video2 = Video2;
Icon.Video3 = Video3;
Icon.Video3Disabled = Video3Disabled;
Icon.VideoPlay = VideoPlay;
Icon.VideoPlay2 = VideoPlay2;
Icon.VideoPause = VideoPause;
Icon.VideoFastForward = VideoFastForward;
Icon.VideoBackward = VideoBackward;
Icon.VideoPrev = VideoPrev;
Icon.VideoNext = VideoNext;
Icon.Microphone = Microphone;
Icon.Microphone0 = Microphone0;
Icon.Microphone1 = Microphone1;
Icon.Microphone2 = Microphone2;
Icon.Microphone3 = Microphone3;
Icon.Microphone4 = Microphone4;
Icon.MicrophoneDisabled = MicrophoneDisabled;
Icon.MicrophoneDisabled1 = MicrophoneDisabled1;
Icon.MicrophoneDisabled2 = MicrophoneDisabled2;
Icon.MicrophoneDisabled3 = MicrophoneDisabled3;
Icon.MicrophoneDisabled4 = MicrophoneDisabled4;
Icon.MicrophoneDisabled5 = MicrophoneDisabled5;
Icon.MicrophoneDisabled6 = MicrophoneDisabled6;
Icon.MicrophoneDisabled7 = MicrophoneDisabled7;
Icon.MicrophoneDisabled8 = MicrophoneDisabled8;
Icon.MicrophoneDisabled9 = MicrophoneDisabled9;

export const VolumeOff = (props) => createIcon({...props, path: volume.off});
export const VolumeUp = (props) => createIcon({...props, path: volume.up});
export const VolumeDown = (props) => createIcon({...props, path: volume.down});


Icon.VolumeOff = VolumeOff;
Icon.VolumeUp = VolumeUp;
Icon.VolumeDown = VolumeDown;

export const HeartFollow = (props) => createIcon({ ...props, path: heart.follow });
export const HeartUnFollow = (props) => createIcon({ ...props, path: heart.un_follow });

Icon.HeartFollow = HeartFollow;
Icon.HeartUnFollow = HeartUnFollow;

export const TrendingUp = (props) => createIcon({ ...props, path: trending.up });
export const TrendingDown = (props) => createIcon({ ...props, path: trending.down });

Icon.TrendingUp = TrendingUp;
Icon.TrendingDown = TrendingDown;

export const More = (props) => createIcon({ ...props, path: more.__more });
export const MoreHorizontal = (props) => createIcon({ ...props, path: more.more_horizontal });
export const MoreVertical = (props) => createIcon({ ...props, path: more.more_vertical });


Icon.More = More;
Icon.MoreHorizontal = MoreHorizontal;
Icon.MoreVertical = MoreVertical;

export const Move = (props) => createIcon({ ...props, path: move.move });
export const MoveUp = (props) => createIcon({ ...props, path: move.up });
export const MoveDoubleUp = (props) => createIcon({ ...props, path: move.double_up });
export const MoveRight = (props) => createIcon({ ...props, path: move.right });
export const MoveDoubleRight = (props) => createIcon({ ...props, path: move.double_right });
export const MoveDown = (props) => createIcon({ ...props, path: move.down });
export const MoveDoubleDown = (props) => createIcon({ ...props, path: move.double_down });
export const MoveLeft = (props) => createIcon({ ...props, path: move.left });
export const MoveDoubleLeft = (props) => createIcon({ ...props, path: move.double_left });


Icon.Move = Move;
Icon.MoveUp = MoveUp;
Icon.MoveDoubleUp = MoveDoubleUp;
Icon.MoveRight = MoveRight;
Icon.MoveDoubleRight = MoveDoubleRight;
Icon.MoveDown = MoveDown;
Icon.MoveDoubleDown = MoveDoubleDown;
Icon.MoveLeft = MoveLeft;
Icon.MoveDoubleLeft = MoveDoubleLeft;

export const RotationLeft = (props) => createIcon({ ...props, path: rotation.left });
export const RotationRight = (props) => createIcon({ ...props, path: rotation.right });

Icon.RotationLeft = RotationLeft;
Icon.RotationRight = RotationRight;

export const ScreenMaximize = (props) => createIcon({ ...props, path: screen.maximize });
export const ScreenMaximize2 = (props) => createIcon({ ...props, path: screen.maximize2 });
export const ScreenMinimize = (props) => createIcon({ ...props, path: screen.minimize });
export const ScreenMinimize2 = (props) => createIcon({ ...props, path: screen.minimize2 });

Icon.ScreenMaximize = ScreenMaximize;
Icon.ScreenMaximize2 = ScreenMaximize2;
Icon.ScreenMinimize = ScreenMinimize;
Icon.ScreenMinimize2 = ScreenMinimize2;

export const PTZControl = (props) => createIcon({ ...props, path: business.icon_PTZ_control });
export const Screenshot = (props) => createIcon({ ...props, path: business.icon_screenshot });
export const ThreeDimensional = (props) => createIcon({ ...props, path: business.icon_three_dimensional });
export const Information = (props) => createIcon({ ...props, path: business.icon_information });
export const Information2 = (props) => createIcon({ ...props, path: business.icon_information2 });
export const Help = (props) => createIcon({ ...props, path: business.icon_help });
export const Help2 = (props) => createIcon({ ...props, path: business.icon_help2 });
export const Help3 = (props) => createIcon({ ...props, path: business.icon_help3 });
export const Wifi = (props) => createIcon({ ...props, path: business.icon_wifi });
export const WifiGreen = (props) => createIcon({ ...props, path: business.icon_wifi_green });
export const Guarantee = (props) => createIcon({ ...props, path: business.icon_wifi_guarantee });
export const Guarantee2 = (props) => createIcon({ ...props, path: business.icon_wifi_guarantee2 });

Icon.PTZControl = PTZControl;
Icon.Screenshot = Screenshot;
Icon.ThreeDimensional = ThreeDimensional;

Icon.Information = Information;
Icon.Information2 = Information2;

Icon.Help = Help;
Icon.Help2 = Help2;
Icon.Help3 = Help3;

Icon.Wifi = Wifi;
Icon.WifiGreen = WifiGreen;
Icon.Guarantee = Guarantee;
Icon.Guarantee2 = Guarantee2;


export const SearchLine  = (props) => createIcon({ ...props, path: magnifier.search_line });
export const SearchLine2 = (props) => createIcon({ ...props, path: magnifier.search_line2 });
export const SearchFill  = (props) => createIcon({ ...props, path: magnifier.search_fill });
export const SearchFill2 = (props) => createIcon({ ...props, path: magnifier.search_fill2 });
export const ZoomInLine  = (props) => createIcon({ ...props, path: magnifier.zoom_in_line });
export const ZoomInFill  = (props) => createIcon({ ...props, path: magnifier.zoom_in_fill });
export const ZoomOutLine = (props) => createIcon({ ...props, path: magnifier.zoom_out_line });
export const ZoomOutFill = (props) => createIcon({ ...props, path: magnifier.zoom_out_fill });

Icon.SearchLine = SearchLine;
Icon.SearchLine2 = SearchLine2;
Icon.SearchFill = SearchFill;
Icon.SearchFill2 = SearchFill2;
Icon.ZoomInLine = ZoomInLine;
Icon.ZoomInFill = ZoomInFill;
Icon.ZoomOutLine = ZoomOutLine;
Icon.ZoomOutFill = ZoomOutFill;

export const Close = (props) => createIcon({ ...props, path: circular.icon_close });
Icon.Close = Close;

window.__Icons = Icon;
export default Icon
