(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jessibuca = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var defineProperty = createCommonjsModule(function (module) {
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _defineProperty = unwrapExports(defineProperty);

	// 播放协议
	const PLAYER_PLAY_PROTOCOL = {
	  websocket: 0,
	  fetch: 1
	};
	const DEMUX_TYPE = {
	  flv: 'flv',
	  m7s: 'm7s'
	}; // default player options

	const DEFAULT_PLAYER_OPTIONS = {
	  videoBuffer: 1000,
	  //1000ms == 1 second
	  isResize: true,
	  isFullResize: false,
	  //
	  isFlv: false,
	  debug: false,
	  hotKey: false,
	  // 快捷键
	  loadingTimeout: 10,
	  // loading timeout
	  heartTimeout: 10,
	  // heart timeout
	  timeout: 10,
	  // second
	  timeRefresh: 1000 * 60 * 60,
	  // refresh time
	  supportDblclickFullscreen: false,
	  showBandwidth: false,
	  //
	  keepScreenOn: false,
	  isNotMute: false,
	  hasAudio: true,
	  hasVideo: true,
	  useWebRTC: true,
	  operateBtns: {
	    fullscreen: false,
	    screenshot: false,
	    play: false,
	    audio: false,
	    // 录制屏幕
	    record: false // 云台控制
	    // movement: false,
	    // 变换 3D
	    // transform: false,
	    // 放大缩小
	    // zoom: false,

	  },
	  hasControl: false,
	  loadingText: '',
	  background: '',
	  decoder: 'decoder.js',
	  url: '',
	  //
	  rotate: 0,
	  // text: '',
	  forceNoOffscreen: true,
	  // 默认是不采用
	  hiddenAutoPause: false,
	  protocol: PLAYER_PLAY_PROTOCOL.fetch,
	  demuxType: DEMUX_TYPE.flv,
	  //
	  useWCS: false,
	  //
	  useMSE: false,
	  //
	  useOffscreen: false //

	};
	const WORKER_CMD_TYPE = {
	  init: 'init',
	  initVideo: 'initVideo',
	  render: 'render',
	  playAudio: 'playAudio',
	  print: 'print',
	  printErr: 'printErr',
	  initAudio: 'initAudio',
	  kBps: 'kBps',
	  decode: 'decode',
	  audioCode: 'audioCode',
	  videoCode: 'videoCode'
	};
	const MEDIA_TYPE = {
	  audio: 1,
	  video: 2
	};
	const FLV_MEDIA_TYPE = {
	  audio: 8,
	  video: 9
	};
	const WORKER_SEND_TYPE = {
	  init: 'init',
	  decode: 'decode',
	  audioDecode: 'audioDecode',
	  videoDecode: 'videoDecode',
	  close: 'close'
	}; //

	const EVENTS = {
	  fullscreen: 'fullscreen$2',
	  webFullscreen: 'webFullscreen',
	  decoderWorkerInit: 'decoderWorkerInit',
	  play: 'play',
	  playing: 'playing',
	  pause: 'pause',
	  mute: 'mute',
	  load: 'load',
	  loading: 'loading',
	  videoInfo: 'videoInfo',
	  timeUpdate: 'timeUpdate',
	  audioInfo: "audioInfo",
	  log: 'log',
	  error: "error",
	  kBps: 'kBps',
	  timeout: 'timeout',
	  delayTimeout: 'delayTimeout',
	  loadingTimeout: 'loadingTimeout',
	  stats: 'stats',
	  performance: "performance",
	  record: 'record',
	  recording: 'recording',
	  recordingTimestamp: 'recordingTimestamp',
	  recordStart: 'recordStart',
	  recordEnd: 'recordEnd',
	  recordCreateError: 'recordCreateError',
	  buffer: 'buffer',
	  videoFrame: 'videoFrame',
	  start: 'start',
	  metadata: 'metadata',
	  resize: 'resize',
	  streamEnd: 'streamEnd',
	  streamSuccess: 'streamSuccess',
	  streamMessage: 'streamMessage',
	  streamError: 'streamError',
	  volumechange: 'volumechange',
	  destroy: 'destroy',
	  mseSourceOpen: 'mseSourceOpen',
	  mseSourceClose: 'mseSourceClose',
	  mseSourceBufferError: 'mseSourceBufferError',
	  mseSourceBufferBusy: 'mseSourceBufferBusy',
	  videoWaiting: 'videoWaiting',
	  videoTimeUpdate: 'videoTimeUpdate',
	  videoSyncAudio: 'videoSyncAudio',
	  playToRenderTimes: 'playToRenderTimes'
	};
	const JESSIBUCA_EVENTS = {
	  load: EVENTS.load,
	  timeUpdate: EVENTS.timeUpdate,
	  videoInfo: EVENTS.videoInfo,
	  audioInfo: EVENTS.audioInfo,
	  error: EVENTS.error,
	  kBps: EVENTS.kBps,
	  log: EVENTS.log,
	  start: EVENTS.start,
	  timeout: EVENTS.timeout,
	  loadingTimeout: EVENTS.loadingTimeout,
	  delayTimeout: EVENTS.delayTimeout,
	  fullscreen: 'fullscreen',
	  play: EVENTS.play,
	  pause: EVENTS.pause,
	  mute: EVENTS.mute,
	  stats: EVENTS.stats,
	  performance: EVENTS.performance,
	  recordingTimestamp: EVENTS.recordingTimestamp,
	  recordStart: EVENTS.recordStart,
	  recordEnd: EVENTS.recordEnd,
	  playToRenderTimes: EVENTS.playToRenderTimes
	};
	const EVENTS_ERROR = {
	  playError: 'playIsNotPauseOrUrlIsNull',
	  fetchError: "fetchError",
	  websocketError: 'websocketError',
	  webcodecsH265NotSupport: 'webcodecsH265NotSupport',
	  mediaSourceH265NotSupport: 'mediaSourceH265NotSupport',
	  wasmDecodeError: 'wasmDecodeError'
	};
	const WEBSOCKET_STATUS = {
	  notConnect: 'notConnect',
	  open: 'open',
	  close: 'close',
	  error: 'error'
	};
	const SCREENSHOT_TYPE = {
	  download: 'download',
	  base64: 'base64',
	  blob: 'blob'
	};
	const VIDEO_ENC_TYPE = {
	  7: 'H264(AVC)',
	  //
	  12: 'H265(HEVC)' //

	};
	const VIDEO_ENC_CODE = {
	  h264: 7,
	  h265: 12
	};
	const AUDIO_ENC_TYPE = {
	  10: 'AAC',
	  7: 'ALAW',
	  8: 'MULAW'
	};
	const H265_NAL_TYPE = {
	  vps: 32,
	  sps: 33,
	  pps: 34
	}; // export const CONTROL_HEIGHT = 38

	const CONTROL_HEIGHT = 0;
	const SCALE_MODE_TYPE = {
	  full: 0,
	  //  视频画面完全填充canvas区域,画面会被拉伸
	  auto: 1,
	  // 视频画面做等比缩放后,高或宽对齐canvas区域,画面不被拉伸,但有黑边
	  fullAuto: 2 // 视频画面做等比缩放后,完全填充canvas区域,画面不被拉伸,没有黑边,但画面显示不全

	};
	const FILE_SUFFIX$1 = {
	  mp4: 'mp4',
	  webm: 'webm'
	};
	const CANVAS_RENDER_TYPE = {
	  webcodecs: 'webcodecs',
	  webgl: 'webgl',
	  offscreen: 'offscreen'
	};
	const ENCODED_VIDEO_TYPE = {
	  key: 'key',
	  delta: 'delta'
	};
	const MP4_CODECS = {
	  avc: 'video/mp4; codecs="avc1.64002A"',
	  hev: 'video/mp4; codecs="hev1.1.6.L123.b0"'
	};
	const MEDIA_SOURCE_STATE = {
	  ended: 'ended',
	  open: 'open',
	  closed: 'closed'
	}; // frag duration
	const AUDIO_SYNC_VIDEO_DIFF = 1000;
	const HOT_KEY = {
	  esc: 27,
	  //
	  arrowUp: 38,
	  //
	  arrowDown: 40 //

	};

	class Debug {
	  constructor(master) {
	    this.log = function (name) {
	      if (master._opt.debug) {
	        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        console.log(`Jessibuca: [${name}]`, ...args);
	      }
	    };

	    this.warn = function (name) {
	      if (master._opt.debug) {
	        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	          args[_key2 - 1] = arguments[_key2];
	        }

	        console.warn(`Jessibuca: [${name}]`, ...args);
	      }
	    };

	    this.error = function (name) {
	      if (master._opt.debug) {
	        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	          args[_key3 - 1] = arguments[_key3];
	        }

	        console.error(`Jessibuca: [${name}]`, ...args);
	      }
	    };
	  }

	}

	class Events {
	  constructor(master) {
	    this.destroys = [];
	    this.proxy = this.proxy.bind(this);
	    this.master = master;
	  }

	  proxy(target, name, callback) {
	    let option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    if (!target) {
	      return;
	    }

	    if (Array.isArray(name)) {
	      return name.map(item => this.proxy(target, item, callback, option));
	    }

	    target.addEventListener(name, callback, option);

	    const destroy = () => target.removeEventListener(name, callback, option);

	    this.destroys.push(destroy);
	    return destroy;
	  }

	  destroy() {
	    this.master.debug.log(`Events`, 'destroy');
	    this.destroys.forEach(event => event());
	  }

	}

	var property$1 = (player => {
	  Object.defineProperty(player, 'rect', {
	    get: () => {
	      const clientRect = player.$container.getBoundingClientRect();
	      clientRect.width = Math.max(clientRect.width, player.$container.clientWidth);
	      clientRect.height = Math.max(clientRect.height, player.$container.clientHeight);
	      return clientRect;
	    }
	  });
	  ['bottom', 'height', 'left', 'right', 'top', 'width'].forEach(key => {
	    Object.defineProperty(player, key, {
	      get: () => {
	        return player.rect[key];
	      }
	    });
	  });
	});

	var screenfull = createCommonjsModule(function (module) {
	  /*!
	  * screenfull
	  * v5.1.0 - 2020-12-24
	  * (c) Sindre Sorhus; MIT License
	  */
	  (function () {

	    var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	    var isCommonjs = module.exports;

	    var fn = function () {
	      var val;
	      var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // New WebKit
	      ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Old WebKit
	      ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
	      var i = 0;
	      var l = fnMap.length;
	      var ret = {};

	      for (; i < l; i++) {
	        val = fnMap[i];

	        if (val && val[1] in document) {
	          for (i = 0; i < val.length; i++) {
	            ret[fnMap[0][i]] = val[i];
	          }

	          return ret;
	        }
	      }

	      return false;
	    }();

	    var eventNameMap = {
	      change: fn.fullscreenchange,
	      error: fn.fullscreenerror
	    };
	    var screenfull = {
	      request: function (element, options) {
	        return new Promise(function (resolve, reject) {
	          var onFullScreenEntered = function () {
	            this.off('change', onFullScreenEntered);
	            resolve();
	          }.bind(this);

	          this.on('change', onFullScreenEntered);
	          element = element || document.documentElement;
	          var returnPromise = element[fn.requestFullscreen](options);

	          if (returnPromise instanceof Promise) {
	            returnPromise.then(onFullScreenEntered).catch(reject);
	          }
	        }.bind(this));
	      },
	      exit: function () {
	        return new Promise(function (resolve, reject) {
	          if (!this.isFullscreen) {
	            resolve();
	            return;
	          }

	          var onFullScreenExit = function () {
	            this.off('change', onFullScreenExit);
	            resolve();
	          }.bind(this);

	          this.on('change', onFullScreenExit);
	          var returnPromise = document[fn.exitFullscreen]();

	          if (returnPromise instanceof Promise) {
	            returnPromise.then(onFullScreenExit).catch(reject);
	          }
	        }.bind(this));
	      },
	      toggle: function (element, options) {
	        return this.isFullscreen ? this.exit() : this.request(element, options);
	      },
	      onchange: function (callback) {
	        this.on('change', callback);
	      },
	      onerror: function (callback) {
	        this.on('error', callback);
	      },
	      on: function (event, callback) {
	        var eventName = eventNameMap[event];

	        if (eventName) {
	          document.addEventListener(eventName, callback, false);
	        }
	      },
	      off: function (event, callback) {
	        var eventName = eventNameMap[event];

	        if (eventName) {
	          document.removeEventListener(eventName, callback, false);
	        }
	      },
	      raw: fn
	    };

	    if (!fn) {
	      if (isCommonjs) {
	        module.exports = {
	          isEnabled: false
	        };
	      } else {
	        window.screenfull = {
	          isEnabled: false
	        };
	      }

	      return;
	    }

	    Object.defineProperties(screenfull, {
	      isFullscreen: {
	        get: function () {
	          return Boolean(document[fn.fullscreenElement]);
	        }
	      },
	      element: {
	        enumerable: true,
	        get: function () {
	          return document[fn.fullscreenElement];
	        }
	      },
	      isEnabled: {
	        enumerable: true,
	        get: function () {
	          // Coerce to boolean in case of old WebKit
	          return Boolean(document[fn.fullscreenEnabled]);
	        }
	      }
	    });

	    if (isCommonjs) {
	      module.exports = screenfull;
	    } else {
	      window.screenfull = screenfull;
	    }
	  })();
	});
	screenfull.isEnabled;

	function noop() {}
	function supportOffscreen($canvas) {
	  return typeof $canvas.transferControlToOffscreen === 'function';
	}
	function supportOffscreenV2() {
	  return typeof OffscreenCanvas !== "undefined";
	}
	function createContextGL($canvas) {
	  let gl = null;
	  const validContextNames = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
	  let nameIndex = 0;

	  while (!gl && nameIndex < validContextNames.length) {
	    const contextName = validContextNames[nameIndex];

	    try {
	      let contextOptions = {
	        preserveDrawingBuffer: true
	      };
	      gl = $canvas.getContext(contextName, contextOptions);
	    } catch (e) {
	      gl = null;
	    }

	    if (!gl || typeof gl.getParameter !== "function") {
	      gl = null;
	    }

	    ++nameIndex;
	  }

	  return gl;
	}
	function dataURLToFile() {
	  let dataURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  const arr = dataURL.split(",");
	  const bstr = atob(arr[1]);
	  const type = arr[0].replace("data:", "").replace(";base64", "");
	  let n = bstr.length,
	      u8arr = new Uint8Array(n);

	  while (n--) {
	    u8arr[n] = bstr.charCodeAt(n);
	  }

	  return new File([u8arr], 'file', {
	    type
	  });
	}
	function downloadImg(content, fileName) {
	  const aLink = document.createElement("a");
	  aLink.download = fileName;
	  aLink.href = URL.createObjectURL(content);
	  aLink.click();
	  URL.revokeObjectURL(content);
	}
	function now() {
	  return new Date().getTime();
	}
	(() => {
	  try {
	    if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
	      const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
	      if (module instanceof WebAssembly.Module) return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
	    }
	  } catch (e) {}

	  return false;
	})();
	function clamp(num, a, b) {
	  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
	}
	function setStyle(element, key, value) {
	  if (!element) {
	    return;
	  }

	  if (typeof key === 'object') {
	    Object.keys(key).forEach(item => {
	      setStyle(element, item, key[item]);
	    });
	  }

	  element.style[key] = value;
	  return element;
	}
	function getStyle(element, key) {
	  let numberType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  if (!element) {
	    return 0;
	  }

	  const value = getComputedStyle(element, null).getPropertyValue(key);
	  return numberType ? parseFloat(value) : value;
	}
	function getNowTime() {
	  if (performance && typeof performance.now === 'function') {
	    return performance.now();
	  }

	  return Date.now();
	}
	function calculationRate(callback) {
	  let totalSize = 0;
	  let lastTime = getNowTime();
	  return size => {
	    totalSize += size;
	    const thisTime = getNowTime();
	    const diffTime = thisTime - lastTime;

	    if (diffTime >= 1000) {
	      callback(totalSize / diffTime * 1000);
	      lastTime = thisTime;
	      totalSize = 0;
	    }
	  };
	}
	function downloadRecord(blob, name, suffix) {
	  const url = window.URL.createObjectURL(blob);
	  const a = document.createElement('a');
	  a.href = url;
	  a.download = (name || now()) + '.' + (suffix || FILE_SUFFIX.webm);
	  a.click();
	  window.URL.revokeObjectURL(url);
	}

	function supportWCS() {
	  return "VideoEncoder" in window;
	}
	function formatVideoDecoderConfigure(avcC) {
	  let codecArray = avcC.subarray(1, 4);
	  let codecString = "avc1.";

	  for (let j = 0; j < 3; j++) {
	    let h = codecArray[j].toString(16);

	    if (h.length < 2) {
	      h = "0" + h;
	    }

	    codecString += h;
	  }

	  return {
	    codec: codecString,
	    description: avcC
	  };
	}
	function isFullScreen() {
	  return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
	}
	function bpsSize(value) {
	  if (null == value || value === '') {
	    return "0 KB/S";
	  }

	  let size = parseFloat(value);
	  size = size.toFixed(2);
	  return size + 'KB/S';
	}
	function fpsStatus(fps) {
	  let result = 0;

	  if (fps >= 24) {
	    result = 2;
	  } else if (fps >= 15) {
	    result = 1;
	  }

	  return result;
	}
	function createEmptyImageBitmap(width, height) {
	  const $canvasElement = document.createElement("canvas");
	  $canvasElement.width = width;
	  $canvasElement.height = height;
	  return createImageBitmap($canvasElement, 0, 0, width, height);
	}
	function supportMSE() {
	  return window.MediaSource && window.MediaSource.isTypeSupported(MP4_CODECS.avc);
	}
	function isEmpty(value) {
	  return value === null || value === undefined;
	}
	function isNotEmpty(value) {
	  return !isEmpty(value);
	}
	function initPlayTimes() {
	  return {
	    playInitStart: '',
	    //1
	    playStart: '',
	    // 2
	    streamStart: '',
	    //3
	    streamResponse: '',
	    // 4
	    demuxStart: '',
	    // 5
	    decodeStart: '',
	    // 6
	    videoStart: '',
	    // 7
	    playTimestamp: '',
	    // playStart- playInitStart
	    streamTimestamp: '',
	    // streamStart - playStart
	    streamResponseTimestamp: '',
	    // streamResponse - streamStart
	    demuxTimestamp: '',
	    // demuxStart - streamResponse
	    decodeTimestamp: '',
	    // decodeStart - demuxStart
	    videoTimestamp: '',
	    // videoStart - decodeStart
	    allTimestamp: '' // videoStart - playInitStart

	  };
	}

	var events$1 = (player => {
	  try {
	    const screenfullChange = () => {
	      player.emit(JESSIBUCA_EVENTS.fullscreen, player.fullscreen); // 如果不是fullscreen,则触发下 resize 方法

	      if (!player.fullscreen) {
	        player.resize();
	      } else {
	        if (player._opt.useMSE) {
	          player.resize();
	        }
	      }
	    };

	    screenfull.on('change', screenfullChange);
	    player.events.destroys.push(() => {
	      screenfull.off('change', screenfullChange);
	    });
	  } catch (error) {//
	  } //


	  player.on(EVENTS.decoderWorkerInit, () => {
	    player.debug.log('player', 'has loaded');
	    player._hasLoaded = true;
	  }); //

	  player.on(EVENTS.play, () => {
	    player.loading = false;
	  }); //

	  player.on(EVENTS.fullscreen, value => {
	    if (value) {
	      try {
	        screenfull.request(player.$container).then(() => {}).catch(e => {
	          player.webFullscreen = true;
	        });
	      } catch (e) {
	        player.webFullscreen = true;
	      }
	    } else {
	      try {
	        screenfull.exit().then(() => {}).catch(() => {
	          player.webFullscreen = false;
	        });
	      } catch (e) {
	        player.webFullscreen = false;
	      }
	    }
	  });
	  player.on(EVENTS.webFullscreen, value => {
	    if (value) {
	      player.$container.classList.add('webmediaplayer-fullscreen-web');
	      const {
	        clientHeight: bodyHeight,
	        clientWidth: bodyWidth
	      } = document.body;
	      const {
	        clientHeight: playerHeight,
	        clientWidth: playerWidth
	      } = player.video.$videoElement;
	      const bodyRatio = bodyWidth / bodyHeight;
	      const playerRatio = playerWidth / playerHeight;
	      const needSpin = bodyRatio < playerRatio;

	      if (needSpin) {
	        const scale = Math.min(bodyHeight / playerWidth, bodyWidth / playerHeight);
	        player.video.$videoElement.style.transform = `rotate(90deg) scale(${scale},${scale})`;
	      }
	    } else {
	      player.$container.classList.remove('webmediaplayer-fullscreen-web');
	      player.video.$videoElement.style.transform = null;
	    }
	  }); //

	  player.on(EVENTS.resize, () => {
	    player.video.resize();
	  });

	  if (player._opt.debug) {
	    const ignoreList = [EVENTS.timeUpdate];
	    Object.keys(EVENTS).forEach(key => {
	      player.on(EVENTS[key], value => {
	        if (ignoreList.includes(key)) {
	          return;
	        }

	        player.debug.log('player events', EVENTS[key], value);
	      });
	    });
	    Object.keys(EVENTS_ERROR).forEach(key => {
	      player.on(EVENTS_ERROR[key], value => {
	        player.debug.log('player event error', EVENTS_ERROR[key], value);
	      });
	    });
	  }
	});

	class Emitter {
	  on(name, fn, ctx) {
	    const e = this.e || (this.e = {});
	    (e[name] || (e[name] = [])).push({
	      fn,
	      ctx
	    });
	    return this;
	  }

	  once(name, fn, ctx) {
	    const self = this;

	    function listener() {
	      self.off(name, listener);

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      fn.apply(ctx, args);
	    }

	    listener._ = fn;
	    return this.on(name, listener, ctx);
	  }

	  emit(name) {
	    const evtArr = ((this.e || (this.e = {}))[name] || []).slice();

	    for (var _len2 = arguments.length, data = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      data[_key2 - 1] = arguments[_key2];
	    }

	    for (let i = 0; i < evtArr.length; i += 1) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  }

	  off(name, callback) {
	    const e = this.e || (this.e = {});

	    if (!name) {
	      Object.keys(e).forEach(key => {
	        delete e[key];
	      });
	      delete this.e;
	      return;
	    }

	    const evts = e[name];
	    const liveEvents = [];

	    if (evts && callback) {
	      for (let i = 0, len = evts.length; i < len; i += 1) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
	      }
	    }

	    if (liveEvents.length) {
	      e[name] = liveEvents;
	    } else {
	      delete e[name];
	    }

	    return this;
	  }

	}

	var createWebGL = (gl => {
	  var vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', 'gl_Position = vertexPos;', 'textureCoord = texturePos.xy;', '}'].join('\n');
	  var fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'const mat4 YUV2RGB = mat4', '(', '1.1643828125, 0, 1.59602734375, -.87078515625,', '1.1643828125, -.39176171875, -.81296875, .52959375,', '1.1643828125, 2.017234375, 0, -1.081390625,', '0, 0, 0, 1', ');', 'void main(void) {', 'highp float y = texture2D(ySampler,  textureCoord).r;', 'highp float u = texture2D(uSampler,  textureCoord).r;', 'highp float v = texture2D(vSampler,  textureCoord).r;', 'gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');
	  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	  gl.shaderSource(vertexShader, vertexShaderScript);
	  gl.compileShader(vertexShader);

	  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	    console.log('Vertex shader failed to compile: ' + gl.getShaderInfoLog(vertexShader));
	  }

	  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	  gl.shaderSource(fragmentShader, fragmentShaderScript);
	  gl.compileShader(fragmentShader);

	  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	    console.log('Fragment shader failed to compile: ' + gl.getShaderInfoLog(fragmentShader));
	  }

	  var program = gl.createProgram();
	  gl.attachShader(program, vertexShader);
	  gl.attachShader(program, fragmentShader);
	  gl.linkProgram(program);

	  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	    console.log('Program failed to compile: ' + gl.getProgramInfoLog(program));
	  }

	  gl.useProgram(program); // initBuffers

	  var vertexPosBuffer = gl.createBuffer();
	  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);
	  var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
	  gl.enableVertexAttribArray(vertexPosRef);
	  gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);
	  var texturePosBuffer = gl.createBuffer();
	  gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
	  var texturePosRef = gl.getAttribLocation(program, 'texturePos');
	  gl.enableVertexAttribArray(texturePosRef);
	  gl.vertexAttribPointer(texturePosRef, 2, gl.FLOAT, false, 0, 0);

	  function _initTexture(name, index) {
	    var textureRef = gl.createTexture();
	    gl.bindTexture(gl.TEXTURE_2D, textureRef);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    gl.bindTexture(gl.TEXTURE_2D, null);
	    gl.uniform1i(gl.getUniformLocation(program, name), index);
	    return textureRef;
	  }

	  var yTextureRef = _initTexture('ySampler', 0);

	  var uTextureRef = _initTexture('uSampler', 1);

	  var vTextureRef = _initTexture('vSampler', 2);

	  return {
	    render: function (w, h, y, u, v) {
	      gl.viewport(0, 0, w, h);
	      gl.activeTexture(gl.TEXTURE0);
	      gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, w, h, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, y);
	      gl.activeTexture(gl.TEXTURE1);
	      gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, w / 2, h / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, u);
	      gl.activeTexture(gl.TEXTURE2);
	      gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, w / 2, h / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, v);
	      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	    },
	    destroy: function () {
	      try {
	        gl.deleteProgram(program);
	        gl.deleteBuffer(vertexPosBuffer);
	        gl.deleteBuffer(texturePosBuffer);
	        gl.deleteTexture(yTextureRef);
	        gl.deleteTexture(uTextureRef);
	        gl.deleteBuffer(vTextureRef);
	      } catch (e) {// console.error(e);
	      }
	    }
	  };
	});

	class CommonLoader$1 extends Emitter {
	  constructor() {
	    super();
	    this.init = false;
	  } //


	  updateVideoInfo(data) {
	    if (data.encTypeCode) {
	      this.videoInfo.encType = VIDEO_ENC_TYPE[data.encTypeCode];
	    }

	    if (data.width) {
	      this.videoInfo.width = data.width;
	    }

	    if (data.height) {
	      this.videoInfo.height = data.height;
	    } // video 基本信息


	    if (this.videoInfo.encType && this.videoInfo.height && this.videoInfo.width && !this.init) {
	      this.player.emit(EVENTS.videoInfo, this.videoInfo);
	      this.init = true;
	    }
	  }

	}

	class CanvasVideoLoader extends CommonLoader$1 {
	  constructor(player) {
	    super();
	    this.player = player;
	    const $canvasElement = document.createElement("canvas");
	    $canvasElement.style.position = "absolute";
	    $canvasElement.style.top = 0;
	    $canvasElement.style.left = 0;
	    this.$videoElement = $canvasElement;
	    player.$container.appendChild(this.$videoElement);
	    this.context2D = null;
	    this.contextGl = null;
	    this.contextGlRender = null;
	    this.contextGlDestroy = null;
	    this.bitmaprenderer = null;
	    this.renderType = null;
	    this.videoInfo = {
	      width: '',
	      height: '',
	      encType: ''
	    }; //

	    this._initCanvasRender();

	    this.player.debug.log('CanvasVideo', 'init');
	  }

	  destroy() {
	    if (this.contextGl) {
	      this.contextGl = null;
	    }

	    if (this.context2D) {
	      this.context2D = null;
	    }

	    if (this.contextGlRender) {
	      this.contextGlDestroy && this.contextGlDestroy();
	      this.contextGlDestroy = null;
	      this.contextGlRender = null;
	    }

	    if (this.bitmaprenderer) {
	      this.bitmaprenderer = null;
	    }

	    this.renderType = null;
	    this.videoInfo = {
	      width: '',
	      height: '',
	      encType: '',
	      encTypeCode: ''
	    };
	    this.player.$container.removeChild(this.$videoElement);
	    this.init = false;
	    this.off();
	    this.player.debug.log(`CanvasVideoLoader`, 'destroy');
	  }

	  _initContextGl() {
	    this.contextGl = createContextGL(this.$videoElement);
	    const webgl = createWebGL(this.contextGl);
	    this.contextGlRender = webgl.render;
	    this.contextGlDestroy = webgl.destroy;
	  }

	  _initContext2D() {
	    this.context2D = this.$videoElement.getContext('2d');
	  } // 渲染类型


	  _initCanvasRender() {
	    if (this.player._opt.useWCS && !this._supportOffscreen()) {
	      this.renderType = CANVAS_RENDER_TYPE.webcodecs;

	      this._initContext2D();
	    } else if (this._supportOffscreen()) {
	      this.renderType = CANVAS_RENDER_TYPE.offscreen;

	      this._bindOffscreen();
	    } else {
	      this.renderType = CANVAS_RENDER_TYPE.webgl;

	      this._initContextGl();
	    }
	  }

	  _supportOffscreen() {
	    return supportOffscreen(this.$videoElement) && this.player._opt.useOffscreen;
	  } //


	  _bindOffscreen() {
	    this.bitmaprenderer = this.$videoElement.getContext('bitmaprenderer');
	  }

	  initCanvasViewSize() {
	    this.$videoElement.width = this.videoInfo.width;
	    this.$videoElement.height = this.videoInfo.height;
	    this.resize();
	  } //


	  render(msg) {
	    this.player.videoTimestamp = msg.ts;

	    switch (this.renderType) {
	      case CANVAS_RENDER_TYPE.offscreen:
	        this.bitmaprenderer.transferFromImageBitmap(msg.buffer);
	        break;

	      case CANVAS_RENDER_TYPE.webgl:
	        this.contextGlRender(this.$videoElement.width, this.$videoElement.height, msg.output[0], msg.output[1], msg.output[2]);
	        break;

	      case CANVAS_RENDER_TYPE.webcodecs:
	        this.context2D.drawImage(msg.videoFrame, 0, 0, this.$videoElement.width, this.$videoElement.height);
	        break;
	    }
	  }

	  screenshot(filename, format, quality, type) {
	    filename = filename || now();
	    type = type || SCREENSHOT_TYPE.download;
	    const formatType = {
	      png: 'image/png',
	      jpeg: 'image/jpeg',
	      webp: 'image/webp'
	    };
	    let encoderOptions = 0.92;

	    if (!formatType[format] && SCREENSHOT_TYPE[format]) {
	      type = format;
	      format = 'png';
	      quality = undefined;
	    }

	    if (typeof quality === "string") {
	      type = quality;
	      quality = undefined;
	    }

	    if (typeof quality !== 'undefined') {
	      encoderOptions = Number(quality);
	    }

	    const dataURL = this.$videoElement.toDataURL(formatType[format] || formatType.png, encoderOptions);
	    const file = dataURLToFile(dataURL);

	    if (type === SCREENSHOT_TYPE.base64) {
	      return dataURL;
	    } else if (type === SCREENSHOT_TYPE.blob) {
	      return file;
	    } else if (type === SCREENSHOT_TYPE.download) {
	      downloadImg(file, filename);
	    }
	  } //


	  clearView() {
	    switch (this.renderType) {
	      case CANVAS_RENDER_TYPE.offscreen:
	        createEmptyImageBitmap(this.$videoElement.width, this.$videoElement.height).then(imageBitMap => {
	          this.bitmaprenderer.transferFromImageBitmap(imageBitMap);
	        });
	        break;

	      case CANVAS_RENDER_TYPE.webgl:
	        this.contextGl.clear(this.contextGl.COLOR_BUFFER_BIT);
	        break;

	      case CANVAS_RENDER_TYPE.webcodecs:
	        this.context2D.clearRect(0, 0, this.$videoElement.width, this.$videoElement.height);
	        break;
	    }
	  }

	  resize() {
	    this.player.debug.log('canvasVideo', 'resize');
	    const option = this.player._opt;
	    const width = this.player.width;
	    let height = this.player.height;

	    if (option.hasControl) {
	      height -= CONTROL_HEIGHT;
	    }

	    let resizeWidth = this.$videoElement.width;
	    let resizeHeight = this.$videoElement.height;
	    const rotate = option.rotate;
	    let left = (width - resizeWidth) / 2;
	    let top = (height - resizeHeight) / 2;

	    if (rotate === 270 || rotate === 90) {
	      resizeWidth = this.$videoElement.height;
	      resizeHeight = this.$videoElement.width;
	    }

	    const wScale = width / resizeWidth;
	    const hScale = height / resizeHeight;
	    let scale = wScale > hScale ? hScale : wScale; //

	    if (!option.isResize) {
	      if (wScale !== hScale) {
	        scale = wScale + ',' + hScale;
	      }
	    } //


	    if (option.isFullResize) {
	      scale = wScale > hScale ? wScale : hScale;
	    }

	    let transform = "scale(" + scale + ")";

	    if (rotate) {
	      transform += ' rotate(' + rotate + 'deg)';
	    }

	    this.$videoElement.style.transform = transform;
	    this.$videoElement.style.left = left + "px";
	    this.$videoElement.style.top = top + "px";
	  }

	}

	function createToggleDisplay(control, playerWidth) {
	  return function toggleDisplay(elementName, width) {
	    let defDisplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'block';

	    if (control && control[elementName]) {
	      setStyle(control[elementName], 'display', playerWidth < width ? 'none' : defDisplay);
	    }
	  };
	}

	class VideoLoader extends CommonLoader$1 {
	  constructor(player) {
	    super();
	    this.player = player;
	    const $videoElement = document.createElement('video');
	    $videoElement.muted = true;
	    $videoElement.style.position = "absolute";
	    $videoElement.style.top = 0;
	    $videoElement.style.left = 0;
	    $videoElement.setAttribute('start-time', Date.now());

	    if (!player._opt.useWebRTC) {
	      player.$container.appendChild($videoElement);
	    }

	    player.$container.$videoElement = $videoElement;
	    this.$videoElement = $videoElement;
	    this.videoInfo = {
	      width: '',
	      height: '',
	      encType: ''
	    };
	    this.resize();
	    const {
	      proxy
	    } = this.player.events;
	    proxy(this.$videoElement, 'canplay', () => {
	      this.player.debug.log('Video', 'canplay');
	    });
	    proxy(this.$videoElement, 'waiting', () => {
	      this.player.emit(EVENTS.videoWaiting);
	    });
	    proxy(this.$videoElement, 'timeupdate', event => {// this.player.emit(EVENTS.videoTimeUpdate, event.timeStamp);
	    });
	    this.player.debug.log('Video', 'init');
	  }

	  destroy() {
	    this.player.$container.removeChild(this.$videoElement);
	    this.$videoElement = null;
	    this.init = false;
	    this.off();
	    this.player.debug.log('Video', 'destroy');
	  }

	  play() {
	    // this.$videoElement.autoplay = true;
	    this.$videoElement.play();
	  }

	  clearView() {}

	  screenshot(filename, format, quality, type) {
	    filename = filename || now();
	    type = type || SCREENSHOT_TYPE.download;
	    const formatType = {
	      png: 'image/png',
	      jpeg: 'image/jpeg',
	      webp: 'image/webp'
	    };
	    let encoderOptions = 0.92;

	    if (!formatType[format] && SCREENSHOT_TYPE[format]) {
	      type = format;
	      format = 'png';
	      quality = undefined;
	    }

	    if (typeof quality === "string") {
	      type = quality;
	      quality = undefined;
	    }

	    if (typeof quality !== 'undefined') {
	      encoderOptions = Number(quality);
	    }

	    const $video = this.$videoElement;
	    let canvas = document.createElement('canvas');
	    canvas.width = $video.videoWidth;
	    canvas.height = $video.videoHeight;
	    const context = canvas.getContext('2d');
	    context.drawImage($video, 0, 0, canvas.width, canvas.height);
	    const dataURL = canvas.toDataURL(SCREENSHOT_TYPE[format] || SCREENSHOT_TYPE.png, encoderOptions);
	    const file = dataURLToFile(dataURL);

	    if (type === SCREENSHOT_TYPE.base64) {
	      return dataURL;
	    } else if (type === SCREENSHOT_TYPE.blob) {
	      return file;
	    } else if (type === SCREENSHOT_TYPE.download) {
	      downloadImg(file, filename);
	    }
	  }

	  initCanvasViewSize() {
	    this.resize();
	  }

	  resize() {
	    const control = this.player.control;
	    const playerWidth = this.player.width;
	    this.$videoElement.width = playerWidth;
	    this.$videoElement.height = this.player._opt.hasControl ? this.player.height - CONTROL_HEIGHT : this.player.height;
	    const option = this.player._opt;
	    let objectFill = 'contain';
	    const rotate = option.rotate;
	    const toggleDisplay = createToggleDisplay(control, playerWidth); // 默认是true
	    // 视频画面做等比缩放后,高或宽对齐canvas区域,画面不被拉伸,但有黑边
	    // 视频画面完全填充canvas区域,画面会被拉伸

	    if (!option.isResize) {
	      objectFill = 'fill';
	    } // 视频画面做等比缩放后,完全填充canvas区域,画面不被拉伸,没有黑边,但画面显示不全


	    if (option.isFullResize) {
	      objectFill = 'none';
	    }

	    this.$videoElement.style.objectFit = objectFill;
	    const transform = this.$videoElement.style.transform;

	    if (transform) {
	      this.$videoElement.style.transform = transform;
	    } else {
	      this.$videoElement.style.transform = 'rotate(' + rotate + 'deg)';
	    }
	    /*function toggleDisplay(elementName, width, defDisplay = 'block') {
	        if (control && control[elementName]) {
	            setStyle(
	                control[elementName],
	                'display',
	                (playerWidth < width) ? 'none' : defDisplay
	            )
	        }
	        console.log(elementName, (playerWidth < width) ? 'none' : defDisplay, control && control[elementName])
	    }*/


	    toggleDisplay('$screenshot', 500);

	    if (option.operateBtns.transform) {
	      if (control && control.movement) {
	        toggleDisplay('$movementActive', 600);
	      } else {
	        toggleDisplay('$movement', 600);
	      }

	      toggleDisplay('$movementWrap', 600);
	    }

	    if (option.operateBtns.transform) {
	      if (control && control.transform) {
	        toggleDisplay('$transformActive', 500);
	      } else {
	        toggleDisplay('$transform', 500);
	      }
	    }

	    if (option.operateBtns.zoom) {
	      if (control && control.zoom >= 2) {
	        toggleDisplay('$zoomEnlarge', 300);
	        toggleDisplay('$zoomMinimizeActive', 300);
	      } else if (control && control.zoom < 2 && control.zoom > 1) {
	        toggleDisplay('$zoomEnlargeActive', 300);
	        toggleDisplay('$zoomMinimizeActive', 300);
	      } else {
	        toggleDisplay('$zoomEnlargeActive', 300);
	        toggleDisplay('$zoomMinimize', 300);
	      }
	    }

	    if (option.operateBtns.play) {
	      if (this.player.playing) {
	        toggleDisplay('$pause', 300, 'flex');
	      } else {
	        toggleDisplay('$play', 300, 'flex');
	      }
	    }

	    if (option.operateBtns.audio) {
	      if (this.player.audio && this.player.audio.volume > 0) {
	        toggleDisplay('$volumeOn', 300, 'flex');
	      } else {
	        toggleDisplay('$volumeOff', 300, 'flex');
	      }
	    }

	    if (this.player.recorder && this.player.recording) {
	      toggleDisplay('$recordStop', 300);
	    } else {
	      toggleDisplay('$record', 300);
	    }

	    if (this.player && this.player.control) {
	      // console.log('resize -------------- resize', this.player)
	      this.player.control.emit('resize', this.$videoElement);
	    } // console.log('resize -------------- resize', this.player)

	  }

	  getNewVideo(player) {
	    return new VideoLoader(player);
	  }

	  resetVideo(cb) {
	    if (this.player.$container && this.player.$container.$videoElement) {
	      let $video = this.player.$container.$videoElement; // console.log($video.seekable)

	      if ($video) {
	        // $video.seekable.start($video.seekable.length - 10);
	        this.destroy();
	        this.player.$container.$videoElement = null;
	        this.$videoElement = null;
	        this.videoInfo = null;
	        this.player.video = null;
	        this.player.video = new VideoLoader(this.player);
	      }
	    }
	  }

	  destroyVideo($oldVideo) {
	    if (this.player.$container && $oldVideo) {
	      // console.log($video.seekable)
	      if ($oldVideo) {
	        // $video.seekable.start($video.seekable.length - 10);
	        this.player.$container.removeChild($oldVideo);
	        this.init = false;
	        this.off();
	        this.player.debug.log('Video', 'destroy');
	        $oldVideo = null;
	      }
	    }
	  }

	}

	class Video$1 {
	  constructor(player) {
	    const Loader = Video$1.getLoaderFactory(player._opt);
	    return new Loader(player);
	  }

	  static getLoaderFactory(opt) {
	    if (opt.useMSE) {
	      return VideoLoader;
	    } else {
	      return CanvasVideoLoader;
	    }
	  }

	}

	class AudioContextLoader extends Emitter {
	  constructor(player) {
	    super();
	    this.bufferList = [];
	    this.player = player;
	    this.scriptNode = null;
	    this.hasInitScriptNode = false;
	    this.audioContextChannel = null;
	    this.audioContext = new (window.AudioContext || window.webkitAudioContext)(); //

	    this.gainNode = this.audioContext.createGain(); // Get an AudioBufferSourceNode.
	    // This is the AudioNode to use when we want to play an AudioBuffer

	    const source = this.audioContext.createBufferSource(); // set the buffer in the AudioBufferSourceNode

	    source.buffer = this.audioContext.createBuffer(1, 1, 22050); // connect the AudioBufferSourceNode to the
	    // destination so we can hear the sound

	    source.connect(this.audioContext.destination); // noteOn as start
	    // start the source playing

	    if (source.noteOn) {
	      source.noteOn(0);
	    } else {
	      source.start(0);
	    }

	    this.audioBufferSourceNode = source; //

	    this.mediaStreamAudioDestinationNode = this.audioContext.createMediaStreamDestination(); //

	    this.audioEnabled(true); // default setting 0

	    this.gainNode.gain.value = 0;
	    this.playing = false; //

	    this.audioSyncVideoOption = {
	      diff: null
	    };
	    this.audioInfo = {
	      encType: '',
	      channels: '',
	      sampleRate: ''
	    };
	    this.init = false;
	    this.hasAudio = false; // update

	    this.on(EVENTS.videoSyncAudio, options => {
	      this.player.debug.log('AudioContext', `videoSyncAudio , audioTimestamp: ${options.audioTimestamp},videoTimestamp: ${options.videoTimestamp},diff:${options.diff}`);
	      this.audioSyncVideoOption = options;
	    });
	    this.player.debug.log('AudioContext', 'init');
	  }

	  destroy() {
	    this.closeAudio();
	    this.audioContext.close();
	    this.audioContext = null;
	    this.gainNode = null;
	    this.init = false;
	    this.hasAudio = false;
	    this.playing = false;

	    if (this.scriptNode) {
	      this.scriptNode.onaudioprocess = noop;
	      this.scriptNode = null;
	    }

	    this.audioBufferSourceNode = null;
	    this.mediaStreamAudioDestinationNode = null;
	    this.hasInitScriptNode = false;
	    this.audioSyncVideoOption = {
	      diff: null
	    };
	    this.audioInfo = {
	      encType: '',
	      channels: '',
	      sampleRate: ''
	    };
	    this.off();
	    this.player.debug.log('AudioContext', 'destroy');
	  }

	  updateAudioInfo(data) {
	    if (data.encTypeCode) {
	      this.audioInfo.encType = AUDIO_ENC_TYPE[data.encTypeCode];
	    }

	    if (data.channels) {
	      this.audioInfo.channels = data.channels;
	    }

	    if (data.sampleRate) {
	      this.audioInfo.sampleRate = data.sampleRate;
	    } // audio 基本信息


	    if (this.audioInfo.sampleRate && this.audioInfo.channels && this.audioInfo.encType && !this.init) {
	      this.player.emit(EVENTS.audioInfo, this.audioInfo);
	      this.init = true;
	    }
	  } //


	  get isPlaying() {
	    return this.playing;
	  }

	  get isMute() {
	    return this.gainNode.gain.value === 0 || this.isStateSuspended();
	  }

	  get volume() {
	    return this.gainNode.gain.value;
	  }

	  get bufferSize() {
	    return this.bufferList.length;
	  }

	  initScriptNode() {
	    this.playing = true;

	    if (this.hasInitScriptNode) {
	      return;
	    }

	    const channels = this.audioInfo.channels;
	    const scriptNode = this.audioContext.createScriptProcessor(1024, 0, channels); // tips: if audio isStateSuspended  onaudioprocess method not working

	    scriptNode.onaudioprocess = audioProcessingEvent => {
	      const outputBuffer = audioProcessingEvent.outputBuffer;

	      if (this.bufferList.length && this.playing) {
	        // just for wasm
	        if (!this.player._opt.useWCS && !this.player._opt.useMSE) {
	          // audio > video
	          // wait
	          if (this.audioSyncVideoOption.diff > AUDIO_SYNC_VIDEO_DIFF) {
	            this.player.debug.warn('AudioContext', `audioSyncVideoOption more than diff :${this.audioSyncVideoOption.diff}, waiting`); // wait

	            return;
	          } // audio < video
	          // throw away then chase video
	          else if (this.audioSyncVideoOption.diff < -AUDIO_SYNC_VIDEO_DIFF) {
	            this.player.debug.warn('AudioContext', `audioSyncVideoOption less than diff :${this.audioSyncVideoOption.diff}, dropping`); //

	            let bufferItem = this.bufferList.shift(); //

	            while (bufferItem.ts - this.player.videoTimestamp < -AUDIO_SYNC_VIDEO_DIFF && this.bufferList.length > 0) {
	              // this.player.debug.warn('AudioContext', `audioSyncVideoOption less than inner ts is:${bufferItem.ts}, videoTimestamp is ${this.player.videoTimestamp},diff:${bufferItem.ts - this.player.videoTimestamp}`)
	              bufferItem = this.bufferList.shift();
	            }

	            if (this.bufferList.length === 0) {
	              return;
	            }
	          }
	        }

	        if (this.bufferList.length === 0) {
	          return;
	        }

	        const bufferItem = this.bufferList.shift(); // update audio time stamp

	        if (bufferItem && bufferItem.ts) {
	          this.player.audioTimestamp = bufferItem.ts;
	        }

	        for (let channel = 0; channel < channels; channel++) {
	          const b = bufferItem.buffer[channel];
	          const nowBuffering = outputBuffer.getChannelData(channel);

	          for (let i = 0; i < 1024; i++) {
	            nowBuffering[i] = b[i] || 0;
	          }
	        }
	      }
	    };

	    scriptNode.connect(this.gainNode);
	    this.scriptNode = scriptNode;
	    this.gainNode.connect(this.audioContext.destination);
	    this.gainNode.connect(this.mediaStreamAudioDestinationNode);
	    this.hasInitScriptNode = true;
	  }

	  mute(flag) {
	    if (flag) {
	      if (!this.isMute) {
	        this.player.emit(EVENTS.mute, flag);
	      }

	      this.setVolume(0);
	      this.audioEnabled(false);
	      this.clear();
	    } else {
	      if (this.isMute) {
	        this.player.emit(EVENTS.mute, flag);
	      }

	      this.setVolume(0.5);
	      this.audioEnabled(true);
	    }
	  }

	  setVolume(volume) {
	    volume = parseFloat(volume).toFixed(2);

	    if (isNaN(volume)) {
	      return;
	    }

	    this.audioEnabled(true);
	    volume = clamp(volume, 0, 1);
	    this.gainNode.gain.value = volume;
	    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
	    this.player.emit(EVENTS.volumechange, this.player.volume);
	  }

	  closeAudio() {
	    if (this.hasInitScriptNode) {
	      this.scriptNode && this.scriptNode.disconnect(this.gainNode);
	      this.gainNode && this.gainNode.disconnect(this.audioContext.destination);
	      this.gainNode && this.gainNode.disconnect(this.mediaStreamAudioDestinationNode);
	    }

	    this.clear();
	  } // 是否播放。。。


	  audioEnabled(flag) {
	    if (flag) {
	      if (this.audioContext.state === 'suspended') {
	        // resume
	        this.audioContext.resume();
	      }
	    } else {
	      if (this.audioContext.state === 'running') {
	        // suspend
	        this.audioContext.suspend();
	      }
	    }
	  }

	  isStateRunning() {
	    return this.audioContext.state === 'running';
	  }

	  isStateSuspended() {
	    return this.audioContext.state === 'suspended';
	  }

	  clear() {
	    this.bufferList = [];
	  }

	  play(buffer, ts) {
	    // if is mute
	    if (this.isMute) {
	      return;
	    }

	    this.hasAudio = true;
	    this.bufferList.push({
	      buffer,
	      ts
	    });

	    if (this.bufferList.length > 20) {
	      this.player.debug.warn('AudioContext', `bufferList is large: ${this.bufferList.length}`); // out of memory

	      if (this.bufferList.length > 50) {
	        this.bufferList.shift();
	      }
	    } // this.player.debug.log('AudioContext', `bufferList is ${this.bufferList.length}`)

	  }

	  pause() {
	    this.audioSyncVideoOption = {
	      diff: null
	    };
	    this.playing = false;
	    this.clear();
	  }

	  resume() {
	    this.playing = true;
	  }

	}

	class Audio {
	  constructor(player) {
	    const Loader = Audio.getLoaderFactory();
	    return new Loader(player);
	  }

	  static getLoaderFactory() {
	    return AudioContextLoader;
	  }

	}

	class FetchLoader extends Emitter {
	  constructor(player) {
	    super();
	    this.player = player;
	    this.playing = false;
	    this.abortController = new AbortController(); //

	    this.streamRate = calculationRate(rate => {
	      player.emit(EVENTS.kBps, (rate / 1024).toFixed(2));
	    });
	    player.debug.log('FetchStream', 'init');
	  }

	  destroy() {
	    this.abort();
	    this.off();
	    this.streamRate = null;
	    this.player.debug.log('FetchStream', 'destroy');
	  }

	  fetchStream(url) {
	    const {
	      demux
	    } = this.player;
	    this.player._times.streamStart = now();
	    fetch(url, {
	      signal: this.abortController.signal
	    }).then(res => {
	      const reader = res.body.getReader();
	      this.emit(EVENTS.streamSuccess);

	      const fetchNext = () => {
	        reader.read().then(_ref => {
	          let {
	            done,
	            value
	          } = _ref;

	          if (done) {
	            demux.close();
	          } else {
	            this.streamRate && this.streamRate(value.byteLength);
	            demux.dispatch(value);
	            fetchNext();
	          }
	        }).catch(e => {
	          demux.close(); // 这边会报用户 aborted a request 错误。

	          this.emit(EVENTS_ERROR.fetchError, e);
	          this.player.emit(EVENTS.error, EVENTS_ERROR.fetchError);
	          this.abort();
	        });
	      };

	      fetchNext();
	    }).catch(e => {
	      this.abort();
	      this.emit(EVENTS_ERROR.fetchError, e);
	      this.player.emit(EVENTS.error, EVENTS_ERROR.fetchError);
	    });
	  }

	  abort() {
	    if (this.abortController) {
	      this.abortController.abort();
	      this.abortController = null;
	    }
	  }

	}

	class WebsocketLoader extends Emitter {
	  constructor(player) {
	    super();
	    this.player = player;
	    this.socket = null;
	    this.socketStatus = WEBSOCKET_STATUS.notConnect;
	    this.wsUrl = null; //

	    this.streamRate = calculationRate(rate => {
	      player.emit(EVENTS.kBps, (rate / 1024).toFixed(2));
	    });
	  }

	  destroy() {
	    if (this.socket) {
	      this.socket.close();
	      this.socket = null;
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
	      events: {
	        proxy
	      },
	      demux
	    } = player;
	    this.socket = new WebSocket(this.wsUrl);
	    this.socket.binaryType = 'arraybuffer';
	    proxy(this.socket, 'open', () => {
	      this.emit(EVENTS.streamSuccess);
	      debug.log('websocketLoader', 'socket open');
	      this.socketStatus = WEBSOCKET_STATUS.open;
	    });
	    proxy(this.socket, 'message', event => {
	      this.streamRate && this.streamRate(event.data.byteLength);

	      this._handleMessage(event.data);
	    });
	    proxy(this.socket, 'close', () => {
	      debug.log('websocketLoader', 'socket close');
	      this.emit(EVENTS.streamEnd);
	      this.socketStatus = WEBSOCKET_STATUS.close;
	    });
	    proxy(this.socket, 'error', error => {
	      debug.log('websocketLoader', 'socket error');
	      this.emit(EVENTS_ERROR.websocketError, error);
	      this.player.emit(EVENTS.error, EVENTS_ERROR.websocketError);
	      this.socketStatus = WEBSOCKET_STATUS.error;
	      demux.close();
	      debug.log('websocketLoader', `socket error:`, error);
	    });
	  } //


	  _handleMessage(message) {
	    const {
	      demux
	    } = this.player;

	    if (!demux) {
	      this.player.debug.warn('websocketLoader', 'websocket handle message demux is null');
	      return;
	    }

	    demux.dispatch(message);
	  }

	  fetchStream(url) {
	    this.player._times.streamStart = now();
	    this.wsUrl = url;

	    this._createWebSocket();
	  }

	}

	class Stream {
	  constructor(player) {
	    const Loader = Stream.getLoaderFactory(player._opt.protocol);
	    return new Loader(player);
	  }

	  static getLoaderFactory(protocol) {
	    if (protocol === PLAYER_PLAY_PROTOCOL.fetch) {
	      return FetchLoader;
	    } else if (protocol === PLAYER_PLAY_PROTOCOL.websocket) {
	      return WebsocketLoader;
	    }
	  }

	}

	var RecordRTC_1 = createCommonjsModule(function (module) {
	  // ________________
	  // RecordRTC v5.6.2
	  // Open-Sourced: https://github.com/muaz-khan/RecordRTC
	  // --------------------------------------------------
	  // Muaz Khan     - www.MuazKhan.com
	  // MIT License   - www.WebRTC-Experiment.com/licence
	  // --------------------------------------------------
	  // ____________
	  // RecordRTC.js

	  /**
	   * {@link https://github.com/muaz-khan/RecordRTC|RecordRTC} is a WebRTC JavaScript library for audio/video as well as screen activity recording. It supports Chrome, Firefox, Opera, Android, and Microsoft Edge. Platforms: Linux, Mac and Windows.
	   * @summary Record audio, video or screen inside the browser.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef RecordRTC
	   * @class
	   * @example
	   * var recorder = RecordRTC(mediaStream or [arrayOfMediaStream], {
	   *     type: 'video', // audio or video or gif or canvas
	   *     recorderType: MediaStreamRecorder || CanvasRecorder || StereoAudioRecorder || Etc
	   * });
	   * recorder.startRecording();
	   * @see For further information:
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
	   * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, desiredSampRate: 16000, video: HTMLVideoElement, etc.}
	   */

	  function RecordRTC(mediaStream, config) {
	    if (!mediaStream) {
	      throw 'First parameter is required.';
	    }

	    config = config || {
	      type: 'video'
	    };
	    config = new RecordRTCConfiguration(mediaStream, config); // a reference to user's recordRTC object

	    var self = this;

	    function startRecording(config2) {
	      if (!config.disableLogs) {
	        console.log('RecordRTC version: ', self.version);
	      }

	      if (!!config2) {
	        // allow users to set options using startRecording method
	        // config2 is similar to main "config" object (second parameter over RecordRTC constructor)
	        config = new RecordRTCConfiguration(mediaStream, config2);
	      }

	      if (!config.disableLogs) {
	        console.log('started recording ' + config.type + ' stream.');
	      }

	      if (mediaRecorder) {
	        mediaRecorder.clearRecordedData();
	        mediaRecorder.record();
	        setState('recording');

	        if (self.recordingDuration) {
	          handleRecordingDuration();
	        }

	        return self;
	      }

	      initRecorder(function () {
	        if (self.recordingDuration) {
	          handleRecordingDuration();
	        }
	      });
	      return self;
	    }

	    function initRecorder(initCallback) {
	      if (initCallback) {
	        config.initCallback = function () {
	          initCallback();
	          initCallback = config.initCallback = null; // recorder.initRecorder should be call-backed once.
	        };
	      }

	      var Recorder = new GetRecorderType(mediaStream, config);
	      mediaRecorder = new Recorder(mediaStream, config);
	      mediaRecorder.record();
	      setState('recording');

	      if (!config.disableLogs) {
	        console.log('Initialized recorderType:', mediaRecorder.constructor.name, 'for output-type:', config.type);
	      }
	    }

	    function stopRecording(callback) {
	      callback = callback || function () {};

	      if (!mediaRecorder) {
	        warningLog();
	        return;
	      }

	      if (self.state === 'paused') {
	        self.resumeRecording();
	        setTimeout(function () {
	          stopRecording(callback);
	        }, 1);
	        return;
	      }

	      if (self.state !== 'recording' && !config.disableLogs) {
	        console.warn('Recording state should be: "recording", however current state is: ', self.state);
	      }

	      if (!config.disableLogs) {
	        console.log('Stopped recording ' + config.type + ' stream.');
	      }

	      if (config.type !== 'gif') {
	        mediaRecorder.stop(_callback);
	      } else {
	        mediaRecorder.stop();

	        _callback();
	      }

	      setState('stopped');

	      function _callback(__blob) {
	        if (!mediaRecorder) {
	          if (typeof callback.call === 'function') {
	            callback.call(self, '');
	          } else {
	            callback('');
	          }

	          return;
	        }

	        Object.keys(mediaRecorder).forEach(function (key) {
	          if (typeof mediaRecorder[key] === 'function') {
	            return;
	          }

	          self[key] = mediaRecorder[key];
	        });
	        var blob = mediaRecorder.blob;

	        if (!blob) {
	          if (__blob) {
	            mediaRecorder.blob = blob = __blob;
	          } else {
	            throw 'Recording failed.';
	          }
	        }

	        if (blob && !config.disableLogs) {
	          console.log(blob.type, '->', bytesToSize(blob.size));
	        }

	        if (callback) {
	          var url;

	          try {
	            url = URL.createObjectURL(blob);
	          } catch (e) {}

	          if (typeof callback.call === 'function') {
	            callback.call(self, url);
	          } else {
	            callback(url);
	          }
	        }

	        if (!config.autoWriteToDisk) {
	          return;
	        }

	        getDataURL(function (dataURL) {
	          var parameter = {};
	          parameter[config.type + 'Blob'] = dataURL;
	          DiskStorage.Store(parameter);
	        });
	      }
	    }

	    function pauseRecording() {
	      if (!mediaRecorder) {
	        warningLog();
	        return;
	      }

	      if (self.state !== 'recording') {
	        if (!config.disableLogs) {
	          console.warn('Unable to pause the recording. Recording state: ', self.state);
	        }

	        return;
	      }

	      setState('paused');
	      mediaRecorder.pause();

	      if (!config.disableLogs) {
	        console.log('Paused recording.');
	      }
	    }

	    function resumeRecording() {
	      if (!mediaRecorder) {
	        warningLog();
	        return;
	      }

	      if (self.state !== 'paused') {
	        if (!config.disableLogs) {
	          console.warn('Unable to resume the recording. Recording state: ', self.state);
	        }

	        return;
	      }

	      setState('recording'); // not all libs have this method yet

	      mediaRecorder.resume();

	      if (!config.disableLogs) {
	        console.log('Resumed recording.');
	      }
	    }

	    function readFile(_blob) {
	      postMessage(new FileReaderSync().readAsDataURL(_blob));
	    }

	    function getDataURL(callback, _mediaRecorder) {
	      if (!callback) {
	        throw 'Pass a callback function over getDataURL.';
	      }

	      var blob = _mediaRecorder ? _mediaRecorder.blob : (mediaRecorder || {}).blob;

	      if (!blob) {
	        if (!config.disableLogs) {
	          console.warn('Blob encoder did not finish its job yet.');
	        }

	        setTimeout(function () {
	          getDataURL(callback, _mediaRecorder);
	        }, 1000);
	        return;
	      }

	      if (typeof Worker !== 'undefined' && !navigator.mozGetUserMedia) {
	        var webWorker = processInWebWorker(readFile);

	        webWorker.onmessage = function (event) {
	          callback(event.data);
	        };

	        webWorker.postMessage(blob);
	      } else {
	        var reader = new FileReader();
	        reader.readAsDataURL(blob);

	        reader.onload = function (event) {
	          callback(event.target.result);
	        };
	      }

	      function processInWebWorker(_function) {
	        try {
	          var blob = URL.createObjectURL(new Blob([_function.toString(), 'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'], {
	            type: 'application/javascript'
	          }));
	          var worker = new Worker(blob);
	          URL.revokeObjectURL(blob);
	          return worker;
	        } catch (e) {}
	      }
	    }

	    function handleRecordingDuration(counter) {
	      counter = counter || 0;

	      if (self.state === 'paused') {
	        setTimeout(function () {
	          handleRecordingDuration(counter);
	        }, 1000);
	        return;
	      }

	      if (self.state === 'stopped') {
	        return;
	      }

	      if (counter >= self.recordingDuration) {
	        stopRecording(self.onRecordingStopped);
	        return;
	      }

	      counter += 1000; // 1-second

	      setTimeout(function () {
	        handleRecordingDuration(counter);
	      }, 1000);
	    }

	    function setState(state) {
	      if (!self) {
	        return;
	      }

	      self.state = state;

	      if (typeof self.onStateChanged.call === 'function') {
	        self.onStateChanged.call(self, state);
	      } else {
	        self.onStateChanged(state);
	      }
	    }

	    var WARNING = 'It seems that recorder is destroyed or "startRecording" is not invoked for ' + config.type + ' recorder.';

	    function warningLog() {
	      if (config.disableLogs === true) {
	        return;
	      }

	      console.warn(WARNING);
	    }

	    var mediaRecorder;
	    var returnObject = {
	      /**
	       * This method starts the recording.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * var recorder = RecordRTC(mediaStream, {
	       *     type: 'video'
	       * });
	       * recorder.startRecording();
	       */
	      startRecording: startRecording,

	      /**
	       * This method stops the recording. It is strongly recommended to get "blob" or "URI" inside the callback to make sure all recorders finished their job.
	       * @param {function} callback - Callback to get the recorded blob.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.stopRecording(function() {
	       *     // use either "this" or "recorder" object; both are identical
	       *     video.src = this.toURL();
	       *     var blob = this.getBlob();
	       * });
	       */
	      stopRecording: stopRecording,

	      /**
	       * This method pauses the recording. You can resume recording using "resumeRecording" method.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @todo Firefox is unable to pause the recording. Fix it.
	       * @example
	       * recorder.pauseRecording();  // pause the recording
	       * recorder.resumeRecording(); // resume again
	       */
	      pauseRecording: pauseRecording,

	      /**
	       * This method resumes the recording.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.pauseRecording();  // first of all, pause the recording
	       * recorder.resumeRecording(); // now resume it
	       */
	      resumeRecording: resumeRecording,

	      /**
	       * This method initializes the recording.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @todo This method should be deprecated.
	       * @example
	       * recorder.initRecorder();
	       */
	      initRecorder: initRecorder,

	      /**
	       * Ask RecordRTC to auto-stop the recording after 5 minutes.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * var fiveMinutes = 5 * 1000 * 60;
	       * recorder.setRecordingDuration(fiveMinutes, function() {
	       *    var blob = this.getBlob();
	       *    video.src = this.toURL();
	       * });
	       *
	       * // or otherwise
	       * recorder.setRecordingDuration(fiveMinutes).onRecordingStopped(function() {
	       *    var blob = this.getBlob();
	       *    video.src = this.toURL();
	       * });
	       */
	      setRecordingDuration: function (recordingDuration, callback) {
	        if (typeof recordingDuration === 'undefined') {
	          throw 'recordingDuration is required.';
	        }

	        if (typeof recordingDuration !== 'number') {
	          throw 'recordingDuration must be a number.';
	        }

	        self.recordingDuration = recordingDuration;

	        self.onRecordingStopped = callback || function () {};

	        return {
	          onRecordingStopped: function (callback) {
	            self.onRecordingStopped = callback;
	          }
	        };
	      },

	      /**
	       * This method can be used to clear/reset all the recorded data.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @todo Figure out the difference between "reset" and "clearRecordedData" methods.
	       * @example
	       * recorder.clearRecordedData();
	       */
	      clearRecordedData: function () {
	        if (!mediaRecorder) {
	          warningLog();
	          return;
	        }

	        mediaRecorder.clearRecordedData();

	        if (!config.disableLogs) {
	          console.log('Cleared old recorded data.');
	        }
	      },

	      /**
	       * Get the recorded blob. Use this method inside the "stopRecording" callback.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.stopRecording(function() {
	       *     var blob = this.getBlob();
	       *
	       *     var file = new File([blob], 'filename.webm', {
	       *         type: 'video/webm'
	       *     });
	       *
	       *     var formData = new FormData();
	       *     formData.append('file', file); // upload "File" object rather than a "Blob"
	       *     uploadToServer(formData);
	       * });
	       * @returns {Blob} Returns recorded data as "Blob" object.
	       */
	      getBlob: function () {
	        if (!mediaRecorder) {
	          warningLog();
	          return;
	        }

	        return mediaRecorder.blob;
	      },

	      /**
	       * Get data-URI instead of Blob.
	       * @param {function} callback - Callback to get the Data-URI.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.stopRecording(function() {
	       *     recorder.getDataURL(function(dataURI) {
	       *         video.src = dataURI;
	       *     });
	       * });
	       */
	      getDataURL: getDataURL,

	      /**
	       * Get virtual/temporary URL. Usage of this URL is limited to current tab.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.stopRecording(function() {
	       *     video.src = this.toURL();
	       * });
	       * @returns {String} Returns a virtual/temporary URL for the recorded "Blob".
	       */
	      toURL: function () {
	        if (!mediaRecorder) {
	          warningLog();
	          return;
	        }

	        return URL.createObjectURL(mediaRecorder.blob);
	      },

	      /**
	       * Get internal recording object (i.e. internal module) e.g. MutliStreamRecorder, MediaStreamRecorder, StereoAudioRecorder or WhammyRecorder etc.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * var internalRecorder = recorder.getInternalRecorder();
	       * if(internalRecorder instanceof MultiStreamRecorder) {
	       *     internalRecorder.addStreams([newAudioStream]);
	       *     internalRecorder.resetVideoStreams([screenStream]);
	       * }
	       * @returns {Object} Returns internal recording object.
	       */
	      getInternalRecorder: function () {
	        return mediaRecorder;
	      },

	      /**
	       * Invoke save-as dialog to save the recorded blob into your disk.
	       * @param {string} fileName - Set your own file name.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.stopRecording(function() {
	       *     this.save('file-name');
	       *
	       *     // or manually:
	       *     invokeSaveAsDialog(this.getBlob(), 'filename.webm');
	       * });
	       */
	      save: function (fileName) {
	        if (!mediaRecorder) {
	          warningLog();
	          return;
	        }

	        invokeSaveAsDialog(mediaRecorder.blob, fileName);
	      },

	      /**
	       * This method gets a blob from indexed-DB storage.
	       * @param {function} callback - Callback to get the recorded blob.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.getFromDisk(function(dataURL) {
	       *     video.src = dataURL;
	       * });
	       */
	      getFromDisk: function (callback) {
	        if (!mediaRecorder) {
	          warningLog();
	          return;
	        }

	        RecordRTC.getFromDisk(config.type, callback);
	      },

	      /**
	       * This method appends an array of webp images to the recorded video-blob. It takes an "array" object.
	       * @type {Array.<Array>}
	       * @param {Array} arrayOfWebPImages - Array of webp images.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @todo This method should be deprecated.
	       * @example
	       * var arrayOfWebPImages = [];
	       * arrayOfWebPImages.push({
	       *     duration: index,
	       *     image: 'data:image/webp;base64,...'
	       * });
	       * recorder.setAdvertisementArray(arrayOfWebPImages);
	       */
	      setAdvertisementArray: function (arrayOfWebPImages) {
	        config.advertisement = [];
	        var length = arrayOfWebPImages.length;

	        for (var i = 0; i < length; i++) {
	          config.advertisement.push({
	            duration: i,
	            image: arrayOfWebPImages[i]
	          });
	        }
	      },

	      /**
	       * It is equivalent to <code class="str">"recorder.getBlob()"</code> method. Usage of "getBlob" is recommended, though.
	       * @property {Blob} blob - Recorded Blob can be accessed using this property.
	       * @memberof RecordRTC
	       * @instance
	       * @readonly
	       * @example
	       * recorder.stopRecording(function() {
	       *     var blob = this.blob;
	       *
	       *     // below one is recommended
	       *     var blob = this.getBlob();
	       * });
	       */
	      blob: null,

	      /**
	       * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
	       * @property {number} bufferSize - Buffer-size used to encode the WAV container
	       * @memberof RecordRTC
	       * @instance
	       * @readonly
	       * @example
	       * recorder.stopRecording(function() {
	       *     alert('Recorder used this buffer-size: ' + this.bufferSize);
	       * });
	       */
	      bufferSize: 0,

	      /**
	       * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
	       * @property {number} sampleRate - Sample-rates used to encode the WAV container
	       * @memberof RecordRTC
	       * @instance
	       * @readonly
	       * @example
	       * recorder.stopRecording(function() {
	       *     alert('Recorder used these sample-rates: ' + this.sampleRate);
	       * });
	       */
	      sampleRate: 0,

	      /**
	       * {recorderType:StereoAudioRecorder} returns ArrayBuffer object.
	       * @property {ArrayBuffer} buffer - Audio ArrayBuffer, supported only in Chrome.
	       * @memberof RecordRTC
	       * @instance
	       * @readonly
	       * @example
	       * recorder.stopRecording(function() {
	       *     var arrayBuffer = this.buffer;
	       *     alert(arrayBuffer.byteLength);
	       * });
	       */
	      buffer: null,

	      /**
	       * This method resets the recorder. So that you can reuse single recorder instance many times.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.reset();
	       * recorder.startRecording();
	       */
	      reset: function () {
	        if (self.state === 'recording' && !config.disableLogs) {
	          console.warn('Stop an active recorder.');
	        }

	        if (mediaRecorder && typeof mediaRecorder.clearRecordedData === 'function') {
	          mediaRecorder.clearRecordedData();
	        }

	        mediaRecorder = null;
	        setState('inactive');
	        self.blob = null;
	      },

	      /**
	       * This method is called whenever recorder's state changes. Use this as an "event".
	       * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
	       * @method
	       * @memberof RecordRTC
	       * @instance
	       * @example
	       * recorder.onStateChanged = function(state) {
	       *     console.log('Recorder state: ', state);
	       * };
	       */
	      onStateChanged: function (state) {
	        if (!config.disableLogs) {
	          console.log('Recorder state changed:', state);
	        }
	      },

	      /**
	       * A recorder can have inactive, recording, paused or stopped states.
	       * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
	       * @memberof RecordRTC
	       * @static
	       * @readonly
	       * @example
	       * // this looper function will keep you updated about the recorder's states.
	       * (function looper() {
	       *     document.querySelector('h1').innerHTML = 'Recorder\'s state is: ' + recorder.state;
	       *     if(recorder.state === 'stopped') return; // ignore+stop
	       *     setTimeout(looper, 1000); // update after every 3-seconds
	       * })();
	       * recorder.startRecording();
	       */
	      state: 'inactive',

	      /**
	       * Get recorder's readonly state.
	       * @method
	       * @memberof RecordRTC
	       * @example
	       * var state = recorder.getState();
	       * @returns {String} Returns recording state.
	       */
	      getState: function () {
	        return self.state;
	      },

	      /**
	       * Destroy RecordRTC instance. Clear all recorders and objects.
	       * @method
	       * @memberof RecordRTC
	       * @example
	       * recorder.destroy();
	       */
	      destroy: function () {
	        var disableLogsCache = config.disableLogs;
	        config = {
	          disableLogs: true
	        };
	        self.reset();
	        setState('destroyed');
	        returnObject = self = null;

	        if (Storage.AudioContextConstructor) {
	          Storage.AudioContextConstructor.close();
	          Storage.AudioContextConstructor = null;
	        }

	        config.disableLogs = disableLogsCache;

	        if (!config.disableLogs) {
	          console.log('RecordRTC is destroyed.');
	        }
	      },

	      /**
	       * RecordRTC version number
	       * @property {String} version - Release version number.
	       * @memberof RecordRTC
	       * @static
	       * @readonly
	       * @example
	       * alert(recorder.version);
	       */
	      version: '5.6.2'
	    };

	    if (!this) {
	      self = returnObject;
	      return returnObject;
	    } // if someone wants to use RecordRTC with the "new" keyword.


	    for (var prop in returnObject) {
	      this[prop] = returnObject[prop];
	    }

	    self = this;
	    return returnObject;
	  }

	  RecordRTC.version = '5.6.2';

	  {
	    module.exports = RecordRTC;
	  }

	  RecordRTC.getFromDisk = function (type, callback) {
	    if (!callback) {
	      throw 'callback is mandatory.';
	    }

	    console.log('Getting recorded ' + (type === 'all' ? 'blobs' : type + ' blob ') + ' from disk!');
	    DiskStorage.Fetch(function (dataURL, _type) {
	      if (type !== 'all' && _type === type + 'Blob' && callback) {
	        callback(dataURL);
	      }

	      if (type === 'all' && callback) {
	        callback(dataURL, _type.replace('Blob', ''));
	      }
	    });
	  };
	  /**
	   * This method can be used to store recorded blobs into IndexedDB storage.
	   * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
	   * @method
	   * @memberof RecordRTC
	   * @example
	   * RecordRTC.writeToDisk({
	   *     audio: audioBlob,
	   *     video: videoBlob,
	   *     gif  : gifBlob
	   * });
	   */


	  RecordRTC.writeToDisk = function (options) {
	    console.log('Writing recorded blob(s) to disk!');
	    options = options || {};

	    if (options.audio && options.video && options.gif) {
	      options.audio.getDataURL(function (audioDataURL) {
	        options.video.getDataURL(function (videoDataURL) {
	          options.gif.getDataURL(function (gifDataURL) {
	            DiskStorage.Store({
	              audioBlob: audioDataURL,
	              videoBlob: videoDataURL,
	              gifBlob: gifDataURL
	            });
	          });
	        });
	      });
	    } else if (options.audio && options.video) {
	      options.audio.getDataURL(function (audioDataURL) {
	        options.video.getDataURL(function (videoDataURL) {
	          DiskStorage.Store({
	            audioBlob: audioDataURL,
	            videoBlob: videoDataURL
	          });
	        });
	      });
	    } else if (options.audio && options.gif) {
	      options.audio.getDataURL(function (audioDataURL) {
	        options.gif.getDataURL(function (gifDataURL) {
	          DiskStorage.Store({
	            audioBlob: audioDataURL,
	            gifBlob: gifDataURL
	          });
	        });
	      });
	    } else if (options.video && options.gif) {
	      options.video.getDataURL(function (videoDataURL) {
	        options.gif.getDataURL(function (gifDataURL) {
	          DiskStorage.Store({
	            videoBlob: videoDataURL,
	            gifBlob: gifDataURL
	          });
	        });
	      });
	    } else if (options.audio) {
	      options.audio.getDataURL(function (audioDataURL) {
	        DiskStorage.Store({
	          audioBlob: audioDataURL
	        });
	      });
	    } else if (options.video) {
	      options.video.getDataURL(function (videoDataURL) {
	        DiskStorage.Store({
	          videoBlob: videoDataURL
	        });
	      });
	    } else if (options.gif) {
	      options.gif.getDataURL(function (gifDataURL) {
	        DiskStorage.Store({
	          gifBlob: gifDataURL
	        });
	      });
	    }
	  }; // __________________________
	  // RecordRTC-Configuration.js

	  /**
	   * {@link RecordRTCConfiguration} is an inner/private helper for {@link RecordRTC}.
	   * @summary It configures the 2nd parameter passed over {@link RecordRTC} and returns a valid "config" object.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef RecordRTCConfiguration
	   * @class
	   * @example
	   * var options = RecordRTCConfiguration(mediaStream, options);
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
	   * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, getNativeBlob:true, etc.}
	   */


	  function RecordRTCConfiguration(mediaStream, config) {
	    if (!config.recorderType && !config.type) {
	      if (!!config.audio && !!config.video) {
	        config.type = 'video';
	      } else if (!!config.audio && !config.video) {
	        config.type = 'audio';
	      }
	    }

	    if (config.recorderType && !config.type) {
	      if (config.recorderType === WhammyRecorder || config.recorderType === CanvasRecorder || typeof WebAssemblyRecorder !== 'undefined' && config.recorderType === WebAssemblyRecorder) {
	        config.type = 'video';
	      } else if (config.recorderType === GifRecorder) {
	        config.type = 'gif';
	      } else if (config.recorderType === StereoAudioRecorder) {
	        config.type = 'audio';
	      } else if (config.recorderType === MediaStreamRecorder) {
	        if (getTracks(mediaStream, 'audio').length && getTracks(mediaStream, 'video').length) {
	          config.type = 'video';
	        } else if (!getTracks(mediaStream, 'audio').length && getTracks(mediaStream, 'video').length) {
	          config.type = 'video';
	        } else if (getTracks(mediaStream, 'audio').length && !getTracks(mediaStream, 'video').length) {
	          config.type = 'audio';
	        } else ;
	      }
	    }

	    if (typeof MediaStreamRecorder !== 'undefined' && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
	      if (!config.mimeType) {
	        config.mimeType = 'video/webm';
	      }

	      if (!config.type) {
	        config.type = config.mimeType.split('/')[0];
	      }

	      if (!config.bitsPerSecond) ;
	    } // consider default type=audio


	    if (!config.type) {
	      if (config.mimeType) {
	        config.type = config.mimeType.split('/')[0];
	      }

	      if (!config.type) {
	        config.type = 'audio';
	      }
	    }

	    return config;
	  } // __________________
	  // GetRecorderType.js

	  /**
	   * {@link GetRecorderType} is an inner/private helper for {@link RecordRTC}.
	   * @summary It returns best recorder-type available for your browser.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef GetRecorderType
	   * @class
	   * @example
	   * var RecorderType = GetRecorderType(options);
	   * var recorder = new RecorderType(options);
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
	   * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
	   */


	  function GetRecorderType(mediaStream, config) {
	    var recorder; // StereoAudioRecorder can work with all three: Edge, Firefox and Chrome
	    // todo: detect if it is Edge, then auto use: StereoAudioRecorder

	    if (isChrome || isEdge || isOpera) {
	      // Media Stream Recording API has not been implemented in chrome yet;
	      // That's why using WebAudio API to record stereo audio in WAV format
	      recorder = StereoAudioRecorder;
	    }

	    if (typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype && !isChrome) {
	      recorder = MediaStreamRecorder;
	    } // video recorder (in WebM format)


	    if (config.type === 'video' && (isChrome || isOpera)) {
	      recorder = WhammyRecorder;

	      if (typeof WebAssemblyRecorder !== 'undefined' && typeof ReadableStream !== 'undefined') {
	        recorder = WebAssemblyRecorder;
	      }
	    } // video recorder (in Gif format)


	    if (config.type === 'gif') {
	      recorder = GifRecorder;
	    } // html2canvas recording!


	    if (config.type === 'canvas') {
	      recorder = CanvasRecorder;
	    }

	    if (isMediaRecorderCompatible() && recorder !== CanvasRecorder && recorder !== GifRecorder && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
	      if (getTracks(mediaStream, 'video').length || getTracks(mediaStream, 'audio').length) {
	        // audio-only recording
	        if (config.type === 'audio') {
	          if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('audio/webm')) {
	            recorder = MediaStreamRecorder;
	          } // else recorder = StereoAudioRecorder;

	        } else {
	          // video or screen tracks
	          if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('video/webm')) {
	            recorder = MediaStreamRecorder;
	          }
	        }
	      }
	    }

	    if (mediaStream instanceof Array && mediaStream.length) {
	      recorder = MultiStreamRecorder;
	    }

	    if (config.recorderType) {
	      recorder = config.recorderType;
	    }

	    if (!config.disableLogs && !!recorder && !!recorder.name) {
	      console.log('Using recorderType:', recorder.name || recorder.constructor.name);
	    }

	    if (!recorder && isSafari) {
	      recorder = MediaStreamRecorder;
	    }

	    return recorder;
	  } // _____________
	  // MRecordRTC.js

	  /**
	   * MRecordRTC runs on top of {@link RecordRTC} to bring multiple recordings in a single place, by providing simple API.
	   * @summary MRecordRTC stands for "Multiple-RecordRTC".
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef MRecordRTC
	   * @class
	   * @example
	   * var recorder = new MRecordRTC();
	   * recorder.addStream(MediaStream);
	   * recorder.mediaType = {
	   *     audio: true, // or StereoAudioRecorder or MediaStreamRecorder
	   *     video: true, // or WhammyRecorder or MediaStreamRecorder or WebAssemblyRecorder or CanvasRecorder
	   *     gif: true    // or GifRecorder
	   * };
	   * // mimeType is optional and should be set only in advance cases.
	   * recorder.mimeType = {
	   *     audio: 'audio/wav',
	   *     video: 'video/webm',
	   *     gif:   'image/gif'
	   * };
	   * recorder.startRecording();
	   * @see For further information:
	   * @see {@link https://github.com/muaz-khan/RecordRTC/tree/master/MRecordRTC|MRecordRTC Source Code}
	   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
	   * @requires {@link RecordRTC}
	   */


	  function MRecordRTC(mediaStream) {
	    /**
	     * This method attaches MediaStream object to {@link MRecordRTC}.
	     * @param {MediaStream} mediaStream - A MediaStream object, either fetched using getUserMedia API, or generated using captureStreamUntilEnded or WebAudio API.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.addStream(MediaStream);
	     */
	    this.addStream = function (_mediaStream) {
	      if (_mediaStream) {
	        mediaStream = _mediaStream;
	      }
	    };
	    /**
	     * This property can be used to set the recording type e.g. audio, or video, or gif, or canvas.
	     * @property {object} mediaType - {audio: true, video: true, gif: true}
	     * @memberof MRecordRTC
	     * @example
	     * var recorder = new MRecordRTC();
	     * recorder.mediaType = {
	     *     audio: true, // TRUE or StereoAudioRecorder or MediaStreamRecorder
	     *     video: true, // TRUE or WhammyRecorder or MediaStreamRecorder or WebAssemblyRecorder or CanvasRecorder
	     *     gif  : true  // TRUE or GifRecorder
	     * };
	     */


	    this.mediaType = {
	      audio: true,
	      video: true
	    };
	    /**
	     * This method starts recording.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.startRecording();
	     */

	    this.startRecording = function () {
	      var mediaType = this.mediaType;
	      var recorderType;
	      var mimeType = this.mimeType || {
	        audio: null,
	        video: null,
	        gif: null
	      };

	      if (typeof mediaType.audio !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'audio').length) {
	        mediaType.audio = false;
	      }

	      if (typeof mediaType.video !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'video').length) {
	        mediaType.video = false;
	      }

	      if (typeof mediaType.gif !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'video').length) {
	        mediaType.gif = false;
	      }

	      if (!mediaType.audio && !mediaType.video && !mediaType.gif) {
	        throw 'MediaStream must have either audio or video tracks.';
	      }

	      if (!!mediaType.audio) {
	        recorderType = null;

	        if (typeof mediaType.audio === 'function') {
	          recorderType = mediaType.audio;
	        }

	        this.audioRecorder = new RecordRTC(mediaStream, {
	          type: 'audio',
	          bufferSize: this.bufferSize,
	          sampleRate: this.sampleRate,
	          numberOfAudioChannels: this.numberOfAudioChannels || 2,
	          disableLogs: this.disableLogs,
	          recorderType: recorderType,
	          mimeType: mimeType.audio,
	          timeSlice: this.timeSlice,
	          onTimeStamp: this.onTimeStamp
	        });

	        if (!mediaType.video) {
	          this.audioRecorder.startRecording();
	        }
	      }

	      if (!!mediaType.video) {
	        recorderType = null;

	        if (typeof mediaType.video === 'function') {
	          recorderType = mediaType.video;
	        }

	        var newStream = mediaStream;

	        if (isMediaRecorderCompatible() && !!mediaType.audio && typeof mediaType.audio === 'function') {
	          var videoTrack = getTracks(mediaStream, 'video')[0];

	          if (isFirefox) {
	            newStream = new MediaStream();
	            newStream.addTrack(videoTrack);

	            if (recorderType && recorderType === WhammyRecorder) {
	              // Firefox does NOT supports webp-encoding yet
	              // But Firefox do supports WebAssemblyRecorder
	              recorderType = MediaStreamRecorder;
	            }
	          } else {
	            newStream = new MediaStream();
	            newStream.addTrack(videoTrack);
	          }
	        }

	        this.videoRecorder = new RecordRTC(newStream, {
	          type: 'video',
	          video: this.video,
	          canvas: this.canvas,
	          frameInterval: this.frameInterval || 10,
	          disableLogs: this.disableLogs,
	          recorderType: recorderType,
	          mimeType: mimeType.video,
	          timeSlice: this.timeSlice,
	          onTimeStamp: this.onTimeStamp,
	          workerPath: this.workerPath,
	          webAssemblyPath: this.webAssemblyPath,
	          frameRate: this.frameRate,
	          // used by WebAssemblyRecorder; values: usually 30; accepts any.
	          bitrate: this.bitrate // used by WebAssemblyRecorder; values: 0 to 1000+

	        });

	        if (!mediaType.audio) {
	          this.videoRecorder.startRecording();
	        }
	      }

	      if (!!mediaType.audio && !!mediaType.video) {
	        var self = this;
	        var isSingleRecorder = isMediaRecorderCompatible() === true;

	        if (mediaType.audio instanceof StereoAudioRecorder && !!mediaType.video) {
	          isSingleRecorder = false;
	        } else if (mediaType.audio !== true && mediaType.video !== true && mediaType.audio !== mediaType.video) {
	          isSingleRecorder = false;
	        }

	        if (isSingleRecorder === true) {
	          self.audioRecorder = null;
	          self.videoRecorder.startRecording();
	        } else {
	          self.videoRecorder.initRecorder(function () {
	            self.audioRecorder.initRecorder(function () {
	              // Both recorders are ready to record things accurately
	              self.videoRecorder.startRecording();
	              self.audioRecorder.startRecording();
	            });
	          });
	        }
	      }

	      if (!!mediaType.gif) {
	        recorderType = null;

	        if (typeof mediaType.gif === 'function') {
	          recorderType = mediaType.gif;
	        }

	        this.gifRecorder = new RecordRTC(mediaStream, {
	          type: 'gif',
	          frameRate: this.frameRate || 200,
	          quality: this.quality || 10,
	          disableLogs: this.disableLogs,
	          recorderType: recorderType,
	          mimeType: mimeType.gif
	        });
	        this.gifRecorder.startRecording();
	      }
	    };
	    /**
	     * This method stops recording.
	     * @param {function} callback - Callback function is invoked when all encoders finished their jobs.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.stopRecording(function(recording){
	     *     var audioBlob = recording.audio;
	     *     var videoBlob = recording.video;
	     *     var gifBlob   = recording.gif;
	     * });
	     */


	    this.stopRecording = function (callback) {
	      callback = callback || function () {};

	      if (this.audioRecorder) {
	        this.audioRecorder.stopRecording(function (blobURL) {
	          callback(blobURL, 'audio');
	        });
	      }

	      if (this.videoRecorder) {
	        this.videoRecorder.stopRecording(function (blobURL) {
	          callback(blobURL, 'video');
	        });
	      }

	      if (this.gifRecorder) {
	        this.gifRecorder.stopRecording(function (blobURL) {
	          callback(blobURL, 'gif');
	        });
	      }
	    };
	    /**
	     * This method pauses recording.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.pauseRecording();
	     */


	    this.pauseRecording = function () {
	      if (this.audioRecorder) {
	        this.audioRecorder.pauseRecording();
	      }

	      if (this.videoRecorder) {
	        this.videoRecorder.pauseRecording();
	      }

	      if (this.gifRecorder) {
	        this.gifRecorder.pauseRecording();
	      }
	    };
	    /**
	     * This method resumes recording.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.resumeRecording();
	     */


	    this.resumeRecording = function () {
	      if (this.audioRecorder) {
	        this.audioRecorder.resumeRecording();
	      }

	      if (this.videoRecorder) {
	        this.videoRecorder.resumeRecording();
	      }

	      if (this.gifRecorder) {
	        this.gifRecorder.resumeRecording();
	      }
	    };
	    /**
	     * This method can be used to manually get all recorded blobs.
	     * @param {function} callback - All recorded blobs are passed back to the "callback" function.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.getBlob(function(recording){
	     *     var audioBlob = recording.audio;
	     *     var videoBlob = recording.video;
	     *     var gifBlob   = recording.gif;
	     * });
	     * // or
	     * var audioBlob = recorder.getBlob().audio;
	     * var videoBlob = recorder.getBlob().video;
	     */


	    this.getBlob = function (callback) {
	      var output = {};

	      if (this.audioRecorder) {
	        output.audio = this.audioRecorder.getBlob();
	      }

	      if (this.videoRecorder) {
	        output.video = this.videoRecorder.getBlob();
	      }

	      if (this.gifRecorder) {
	        output.gif = this.gifRecorder.getBlob();
	      }

	      if (callback) {
	        callback(output);
	      }

	      return output;
	    };
	    /**
	     * Destroy all recorder instances.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.destroy();
	     */


	    this.destroy = function () {
	      if (this.audioRecorder) {
	        this.audioRecorder.destroy();
	        this.audioRecorder = null;
	      }

	      if (this.videoRecorder) {
	        this.videoRecorder.destroy();
	        this.videoRecorder = null;
	      }

	      if (this.gifRecorder) {
	        this.gifRecorder.destroy();
	        this.gifRecorder = null;
	      }
	    };
	    /**
	     * This method can be used to manually get all recorded blobs' DataURLs.
	     * @param {function} callback - All recorded blobs' DataURLs are passed back to the "callback" function.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.getDataURL(function(recording){
	     *     var audioDataURL = recording.audio;
	     *     var videoDataURL = recording.video;
	     *     var gifDataURL   = recording.gif;
	     * });
	     */


	    this.getDataURL = function (callback) {
	      this.getBlob(function (blob) {
	        if (blob.audio && blob.video) {
	          getDataURL(blob.audio, function (_audioDataURL) {
	            getDataURL(blob.video, function (_videoDataURL) {
	              callback({
	                audio: _audioDataURL,
	                video: _videoDataURL
	              });
	            });
	          });
	        } else if (blob.audio) {
	          getDataURL(blob.audio, function (_audioDataURL) {
	            callback({
	              audio: _audioDataURL
	            });
	          });
	        } else if (blob.video) {
	          getDataURL(blob.video, function (_videoDataURL) {
	            callback({
	              video: _videoDataURL
	            });
	          });
	        }
	      });

	      function getDataURL(blob, callback00) {
	        if (typeof Worker !== 'undefined') {
	          var webWorker = processInWebWorker(function readFile(_blob) {
	            postMessage(new FileReaderSync().readAsDataURL(_blob));
	          });

	          webWorker.onmessage = function (event) {
	            callback00(event.data);
	          };

	          webWorker.postMessage(blob);
	        } else {
	          var reader = new FileReader();
	          reader.readAsDataURL(blob);

	          reader.onload = function (event) {
	            callback00(event.target.result);
	          };
	        }
	      }

	      function processInWebWorker(_function) {
	        var blob = URL.createObjectURL(new Blob([_function.toString(), 'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'], {
	          type: 'application/javascript'
	        }));
	        var worker = new Worker(blob);
	        var url;

	        if (typeof URL !== 'undefined') {
	          url = URL;
	        } else if (typeof webkitURL !== 'undefined') {
	          url = webkitURL;
	        } else {
	          throw 'Neither URL nor webkitURL detected.';
	        }

	        url.revokeObjectURL(blob);
	        return worker;
	      }
	    };
	    /**
	     * This method can be used to ask {@link MRecordRTC} to write all recorded blobs into IndexedDB storage.
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.writeToDisk();
	     */


	    this.writeToDisk = function () {
	      RecordRTC.writeToDisk({
	        audio: this.audioRecorder,
	        video: this.videoRecorder,
	        gif: this.gifRecorder
	      });
	    };
	    /**
	     * This method can be used to invoke a save-as dialog for all recorded blobs.
	     * @param {object} args - {audio: 'audio-name', video: 'video-name', gif: 'gif-name'}
	     * @method
	     * @memberof MRecordRTC
	     * @example
	     * recorder.save({
	     *     audio: 'audio-file-name',
	     *     video: 'video-file-name',
	     *     gif  : 'gif-file-name'
	     * });
	     */


	    this.save = function (args) {
	      args = args || {
	        audio: true,
	        video: true,
	        gif: true
	      };

	      if (!!args.audio && this.audioRecorder) {
	        this.audioRecorder.save(typeof args.audio === 'string' ? args.audio : '');
	      }

	      if (!!args.video && this.videoRecorder) {
	        this.videoRecorder.save(typeof args.video === 'string' ? args.video : '');
	      }

	      if (!!args.gif && this.gifRecorder) {
	        this.gifRecorder.save(typeof args.gif === 'string' ? args.gif : '');
	      }
	    };
	  }
	  /**
	   * This method can be used to get all recorded blobs from IndexedDB storage.
	   * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
	   * @param {function} callback - Callback function to get all stored blobs.
	   * @method
	   * @memberof MRecordRTC
	   * @example
	   * MRecordRTC.getFromDisk('all', function(dataURL, type){
	   *     if(type === 'audio') { }
	   *     if(type === 'video') { }
	   *     if(type === 'gif')   { }
	   * });
	   */


	  MRecordRTC.getFromDisk = RecordRTC.getFromDisk;
	  /**
	   * This method can be used to store recorded blobs into IndexedDB storage.
	   * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
	   * @method
	   * @memberof MRecordRTC
	   * @example
	   * MRecordRTC.writeToDisk({
	   *     audio: audioBlob,
	   *     video: videoBlob,
	   *     gif  : gifBlob
	   * });
	   */

	  MRecordRTC.writeToDisk = RecordRTC.writeToDisk;

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.MRecordRTC = MRecordRTC;
	  }

	  var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

	  (function (that) {
	    if (!that) {
	      return;
	    }

	    if (typeof window !== 'undefined') {
	      return;
	    }

	    if (typeof commonjsGlobal === 'undefined') {
	      return;
	    }

	    commonjsGlobal.navigator = {
	      userAgent: browserFakeUserAgent,
	      getUserMedia: function () {}
	    };

	    if (!commonjsGlobal.console) {
	      commonjsGlobal.console = {};
	    }

	    if (typeof commonjsGlobal.console.log === 'undefined' || typeof commonjsGlobal.console.error === 'undefined') {
	      commonjsGlobal.console.error = commonjsGlobal.console.log = commonjsGlobal.console.log || function () {
	        console.log(arguments);
	      };
	    }

	    if (typeof document === 'undefined') {
	      /*global document:true */
	      that.document = {
	        documentElement: {
	          appendChild: function () {
	            return '';
	          }
	        }
	      };

	      document.createElement = document.captureStream = document.mozCaptureStream = function () {
	        var obj = {
	          getContext: function () {
	            return obj;
	          },
	          play: function () {},
	          pause: function () {},
	          drawImage: function () {},
	          toDataURL: function () {
	            return '';
	          },
	          style: {}
	        };
	        return obj;
	      };

	      that.HTMLVideoElement = function () {};
	    }

	    if (typeof location === 'undefined') {
	      /*global location:true */
	      that.location = {
	        protocol: 'file:',
	        href: '',
	        hash: ''
	      };
	    }

	    if (typeof screen === 'undefined') {
	      /*global screen:true */
	      that.screen = {
	        width: 0,
	        height: 0
	      };
	    }

	    if (typeof URL === 'undefined') {
	      /*global screen:true */
	      that.URL = {
	        createObjectURL: function () {
	          return '';
	        },
	        revokeObjectURL: function () {
	          return '';
	        }
	      };
	    }
	    /*global window:true */


	    that.window = commonjsGlobal;
	  })(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : null); // _____________________________
	  // Cross-Browser-Declarations.js
	  // animation-frame used in WebM recording

	  /*jshint -W079 */


	  var requestAnimationFrame = window.requestAnimationFrame;

	  if (typeof requestAnimationFrame === 'undefined') {
	    if (typeof webkitRequestAnimationFrame !== 'undefined') {
	      /*global requestAnimationFrame:true */
	      requestAnimationFrame = webkitRequestAnimationFrame;
	    } else if (typeof mozRequestAnimationFrame !== 'undefined') {
	      /*global requestAnimationFrame:true */
	      requestAnimationFrame = mozRequestAnimationFrame;
	    } else if (typeof msRequestAnimationFrame !== 'undefined') {
	      /*global requestAnimationFrame:true */
	      requestAnimationFrame = msRequestAnimationFrame;
	    } else if (typeof requestAnimationFrame === 'undefined') {
	      // via: https://gist.github.com/paulirish/1579671
	      var lastTime = 0;
	      /*global requestAnimationFrame:true */

	      requestAnimationFrame = function (callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = setTimeout(function () {
	          callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	      };
	    }
	  }
	  /*jshint -W079 */


	  var cancelAnimationFrame = window.cancelAnimationFrame;

	  if (typeof cancelAnimationFrame === 'undefined') {
	    if (typeof webkitCancelAnimationFrame !== 'undefined') {
	      /*global cancelAnimationFrame:true */
	      cancelAnimationFrame = webkitCancelAnimationFrame;
	    } else if (typeof mozCancelAnimationFrame !== 'undefined') {
	      /*global cancelAnimationFrame:true */
	      cancelAnimationFrame = mozCancelAnimationFrame;
	    } else if (typeof msCancelAnimationFrame !== 'undefined') {
	      /*global cancelAnimationFrame:true */
	      cancelAnimationFrame = msCancelAnimationFrame;
	    } else if (typeof cancelAnimationFrame === 'undefined') {
	      /*global cancelAnimationFrame:true */
	      cancelAnimationFrame = function (id) {
	        clearTimeout(id);
	      };
	    }
	  } // WebAudio API representer


	  var AudioContext = window.AudioContext;

	  if (typeof AudioContext === 'undefined') {
	    if (typeof webkitAudioContext !== 'undefined') {
	      /*global AudioContext:true */
	      AudioContext = webkitAudioContext;
	    }

	    if (typeof mozAudioContext !== 'undefined') {
	      /*global AudioContext:true */
	      AudioContext = mozAudioContext;
	    }
	  }
	  /*jshint -W079 */


	  var URL = window.URL;

	  if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
	    /*global URL:true */
	    URL = webkitURL;
	  }

	  if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') {
	    // maybe window.navigator?
	    if (typeof navigator.webkitGetUserMedia !== 'undefined') {
	      navigator.getUserMedia = navigator.webkitGetUserMedia;
	    }

	    if (typeof navigator.mozGetUserMedia !== 'undefined') {
	      navigator.getUserMedia = navigator.mozGetUserMedia;
	    }
	  }

	  var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);
	  var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
	  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && 'netscape' in window && / rv:/.test(navigator.userAgent);
	  var isChrome = !isOpera && !isEdge && !!navigator.webkitGetUserMedia || isElectron() || navigator.userAgent.toLowerCase().indexOf('chrome/') !== -1;
	  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	  if (isSafari && !isChrome && navigator.userAgent.indexOf('CriOS') !== -1) {
	    isSafari = false;
	    isChrome = true;
	  }

	  var MediaStream = window.MediaStream;

	  if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
	    MediaStream = webkitMediaStream;
	  }
	  /*global MediaStream:true */


	  if (typeof MediaStream !== 'undefined') {
	    // override "stop" method for all browsers
	    if (typeof MediaStream.prototype.stop === 'undefined') {
	      MediaStream.prototype.stop = function () {
	        this.getTracks().forEach(function (track) {
	          track.stop();
	        });
	      };
	    }
	  } // below function via: http://goo.gl/B3ae8c

	  /**
	   * Return human-readable file size.
	   * @param {number} bytes - Pass bytes and get formatted string.
	   * @returns {string} - formatted string
	   * @example
	   * bytesToSize(1024*1024*5) === '5 GB'
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   */


	  function bytesToSize(bytes) {
	    var k = 1000;
	    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

	    if (bytes === 0) {
	      return '0 Bytes';
	    }

	    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
	    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	  }
	  /**
	   * @param {Blob} file - File or Blob object. This parameter is required.
	   * @param {string} fileName - Optional file name e.g. "Recorded-Video.webm"
	   * @example
	   * invokeSaveAsDialog(blob or file, [optional] fileName);
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   */


	  function invokeSaveAsDialog(file, fileName) {
	    if (!file) {
	      throw 'Blob object is required.';
	    }

	    if (!file.type) {
	      try {
	        file.type = 'video/webm';
	      } catch (e) {}
	    }

	    var fileExtension = (file.type || 'video/webm').split('/')[1];

	    if (fileExtension.indexOf(';') !== -1) {
	      // extended mimetype, e.g. 'video/webm;codecs=vp8,opus'
	      fileExtension = fileExtension.split(';')[0];
	    }

	    if (fileName && fileName.indexOf('.') !== -1) {
	      var splitted = fileName.split('.');
	      fileName = splitted[0];
	      fileExtension = splitted[1];
	    }

	    var fileFullName = (fileName || Math.round(Math.random() * 9999999999) + 888888888) + '.' + fileExtension;

	    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
	      return navigator.msSaveOrOpenBlob(file, fileFullName);
	    } else if (typeof navigator.msSaveBlob !== 'undefined') {
	      return navigator.msSaveBlob(file, fileFullName);
	    }

	    var hyperlink = document.createElement('a');
	    hyperlink.href = URL.createObjectURL(file);
	    hyperlink.download = fileFullName;
	    hyperlink.style = 'display:none;opacity:0;color:transparent;';
	    (document.body || document.documentElement).appendChild(hyperlink);

	    if (typeof hyperlink.click === 'function') {
	      hyperlink.click();
	    } else {
	      hyperlink.target = '_blank';
	      hyperlink.dispatchEvent(new MouseEvent('click', {
	        view: window,
	        bubbles: true,
	        cancelable: true
	      }));
	    }

	    URL.revokeObjectURL(hyperlink.href);
	  }
	  /**
	   * from: https://github.com/cheton/is-electron/blob/master/index.js
	   **/


	  function isElectron() {
	    // Renderer process
	    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
	      return true;
	    } // Main process


	    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
	      return true;
	    } // Detect the user agent when the `nodeIntegration` option is set to true


	    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
	      return true;
	    }

	    return false;
	  }

	  function getTracks(stream, kind) {
	    if (!stream || !stream.getTracks) {
	      return [];
	    }

	    return stream.getTracks().filter(function (t) {
	      return t.kind === (kind || 'audio');
	    });
	  }

	  function setSrcObject(stream, element) {
	    if ('srcObject' in element) {
	      element.srcObject = stream;
	    } else if ('mozSrcObject' in element) {
	      element.mozSrcObject = stream;
	    } else {
	      element.srcObject = stream;
	    }
	  }
	  /**
	   * @param {Blob} file - File or Blob object.
	   * @param {function} callback - Callback function.
	   * @example
	   * getSeekableBlob(blob or file, callback);
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   */


	  function getSeekableBlob(inputBlob, callback) {
	    // EBML.js copyrights goes to: https://github.com/legokichi/ts-ebml
	    if (typeof EBML === 'undefined') {
	      throw new Error('Please link: https://www.webrtc-experiment.com/EBML.js');
	    }

	    var reader = new EBML.Reader();
	    var decoder = new EBML.Decoder();
	    var tools = EBML.tools;
	    var fileReader = new FileReader();

	    fileReader.onload = function (e) {
	      var ebmlElms = decoder.decode(this.result);
	      ebmlElms.forEach(function (element) {
	        reader.read(element);
	      });
	      reader.stop();
	      var refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
	      var body = this.result.slice(reader.metadataSize);
	      var newBlob = new Blob([refinedMetadataBuf, body], {
	        type: 'video/webm'
	      });
	      callback(newBlob);
	    };

	    fileReader.readAsArrayBuffer(inputBlob);
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.invokeSaveAsDialog = invokeSaveAsDialog;
	    RecordRTC.getTracks = getTracks;
	    RecordRTC.getSeekableBlob = getSeekableBlob;
	    RecordRTC.bytesToSize = bytesToSize;
	    RecordRTC.isElectron = isElectron;
	  } // __________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
	  // Storage.js

	  /**
	   * Storage is a standalone object used by {@link RecordRTC} to store reusable objects e.g. "new AudioContext".
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @example
	   * Storage.AudioContext === webkitAudioContext
	   * @property {webkitAudioContext} AudioContext - Keeps a reference to AudioContext object.
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   */


	  var Storage = {};

	  if (typeof AudioContext !== 'undefined') {
	    Storage.AudioContext = AudioContext;
	  } else if (typeof webkitAudioContext !== 'undefined') {
	    Storage.AudioContext = webkitAudioContext;
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.Storage = Storage;
	  }

	  function isMediaRecorderCompatible() {
	    if (isFirefox || isSafari || isEdge) {
	      return true;
	    }
	    var nAgt = navigator.userAgent;
	    var fullVersion = '' + parseFloat(navigator.appVersion);
	    var majorVersion = parseInt(navigator.appVersion, 10);
	    var verOffset, ix;

	    if (isChrome || isOpera) {
	      verOffset = nAgt.indexOf('Chrome');
	      fullVersion = nAgt.substring(verOffset + 7);
	    } // trim the fullVersion string at semicolon/space if present


	    if ((ix = fullVersion.indexOf(';')) !== -1) {
	      fullVersion = fullVersion.substring(0, ix);
	    }

	    if ((ix = fullVersion.indexOf(' ')) !== -1) {
	      fullVersion = fullVersion.substring(0, ix);
	    }

	    majorVersion = parseInt('' + fullVersion, 10);

	    if (isNaN(majorVersion)) {
	      fullVersion = '' + parseFloat(navigator.appVersion);
	      majorVersion = parseInt(navigator.appVersion, 10);
	    }

	    return majorVersion >= 49;
	  } // ______________________
	  // MediaStreamRecorder.js

	  /**
	   * MediaStreamRecorder is an abstraction layer for {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}. It is used by {@link RecordRTC} to record MediaStream(s) in both Chrome and Firefox.
	   * @summary Runs top over {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://github.com/muaz-khan|Muaz Khan}
	   * @typedef MediaStreamRecorder
	   * @class
	   * @example
	   * var config = {
	   *     mimeType: 'video/webm', // vp8, vp9, h264, mkv, opus/vorbis
	   *     audioBitsPerSecond : 256 * 8 * 1024,
	   *     videoBitsPerSecond : 256 * 8 * 1024,
	   *     bitsPerSecond: 256 * 8 * 1024,  // if this is provided, skip above two
	   *     checkForInactiveTracks: true,
	   *     timeSlice: 1000, // concatenate intervals based blobs
	   *     ondataavailable: function() {} // get intervals based blobs
	   * }
	   * var recorder = new MediaStreamRecorder(mediaStream, config);
	   * recorder.record();
	   * recorder.stop(function(blob) {
	   *     video.src = URL.createObjectURL(blob);
	   *
	   *     // or
	   *     var blob = recorder.blob;
	   * });
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
	   * @param {object} config - {disableLogs:true, initCallback: function, mimeType: "video/webm", timeSlice: 1000}
	   * @throws Will throw an error if first argument "MediaStream" is missing. Also throws error if "MediaRecorder API" are not supported by the browser.
	   */


	  function MediaStreamRecorder(mediaStream, config) {
	    var self = this;

	    if (typeof mediaStream === 'undefined') {
	      throw 'First argument "MediaStream" is required.';
	    }

	    if (typeof MediaRecorder === 'undefined') {
	      throw 'Your browser does not support the Media Recorder API. Please try other modules e.g. WhammyRecorder or StereoAudioRecorder.';
	    }

	    config = config || {
	      // bitsPerSecond: 256 * 8 * 1024,
	      mimeType: 'video/webm'
	    };

	    if (config.type === 'audio') {
	      if (getTracks(mediaStream, 'video').length && getTracks(mediaStream, 'audio').length) {
	        var stream;

	        if (!!navigator.mozGetUserMedia) {
	          stream = new MediaStream();
	          stream.addTrack(getTracks(mediaStream, 'audio')[0]);
	        } else {
	          // webkitMediaStream
	          stream = new MediaStream(getTracks(mediaStream, 'audio'));
	        }

	        mediaStream = stream;
	      }

	      if (!config.mimeType || config.mimeType.toString().toLowerCase().indexOf('audio') === -1) {
	        config.mimeType = isChrome ? 'audio/webm' : 'audio/ogg';
	      }

	      if (config.mimeType && config.mimeType.toString().toLowerCase() !== 'audio/ogg' && !!navigator.mozGetUserMedia) {
	        // forcing better codecs on Firefox (via #166)
	        config.mimeType = 'audio/ogg';
	      }
	    }

	    var arrayOfBlobs = [];
	    /**
	     * This method returns array of blobs. Use only with "timeSlice". Its useful to preview recording anytime, without using the "stop" method.
	     * @method
	     * @memberof MediaStreamRecorder
	     * @example
	     * var arrayOfBlobs = recorder.getArrayOfBlobs();
	     * @returns {Array} Returns array of recorded blobs.
	     */

	    this.getArrayOfBlobs = function () {
	      return arrayOfBlobs;
	    };
	    /**
	     * This method records MediaStream.
	     * @method
	     * @memberof MediaStreamRecorder
	     * @example
	     * recorder.record();
	     */


	    this.record = function () {
	      // set defaults
	      self.blob = null;
	      self.clearRecordedData();
	      self.timestamps = [];
	      allStates = [];
	      arrayOfBlobs = [];
	      var recorderHints = config;

	      if (!config.disableLogs) {
	        console.log('Passing following config over MediaRecorder API.', recorderHints);
	      }

	      if (mediaRecorder) {
	        // mandatory to make sure Firefox doesn't fails to record streams 3-4 times without reloading the page.
	        mediaRecorder = null;
	      }

	      if (isChrome && !isMediaRecorderCompatible()) {
	        // to support video-only recording on stable
	        recorderHints = 'video/vp8';
	      }

	      if (typeof MediaRecorder.isTypeSupported === 'function' && recorderHints.mimeType) {
	        if (!MediaRecorder.isTypeSupported(recorderHints.mimeType)) {
	          if (!config.disableLogs) {
	            console.warn('MediaRecorder API seems unable to record mimeType:', recorderHints.mimeType);
	          }

	          recorderHints.mimeType = config.type === 'audio' ? 'audio/webm' : 'video/webm';
	        }
	      } // using MediaRecorder API here


	      try {
	        mediaRecorder = new MediaRecorder(mediaStream, recorderHints); // reset

	        config.mimeType = recorderHints.mimeType;
	      } catch (e) {
	        // chrome-based fallback
	        mediaRecorder = new MediaRecorder(mediaStream);
	      } // old hack?


	      if (recorderHints.mimeType && !MediaRecorder.isTypeSupported && 'canRecordMimeType' in mediaRecorder && mediaRecorder.canRecordMimeType(recorderHints.mimeType) === false) {
	        if (!config.disableLogs) {
	          console.warn('MediaRecorder API seems unable to record mimeType:', recorderHints.mimeType);
	        }
	      } // Dispatching OnDataAvailable Handler


	      mediaRecorder.ondataavailable = function (e) {
	        if (e.data) {
	          allStates.push('ondataavailable: ' + bytesToSize(e.data.size));
	        }

	        if (typeof config.timeSlice === 'number') {
	          if (e.data && e.data.size) {
	            arrayOfBlobs.push(e.data);
	            updateTimeStamp();

	            if (typeof config.ondataavailable === 'function') {
	              // intervals based blobs
	              var blob = config.getNativeBlob ? e.data : new Blob([e.data], {
	                type: getMimeType(recorderHints)
	              });
	              config.ondataavailable(blob);
	            }
	          }

	          return;
	        }

	        if (!e.data || !e.data.size || e.data.size < 100 || self.blob) {
	          // make sure that stopRecording always getting fired
	          // even if there is invalid data
	          if (self.recordingCallback) {
	            self.recordingCallback(new Blob([], {
	              type: getMimeType(recorderHints)
	            }));
	            self.recordingCallback = null;
	          }

	          return;
	        }

	        self.blob = config.getNativeBlob ? e.data : new Blob([e.data], {
	          type: getMimeType(recorderHints)
	        });

	        if (self.recordingCallback) {
	          self.recordingCallback(self.blob);
	          self.recordingCallback = null;
	        }
	      };

	      mediaRecorder.onstart = function () {
	        allStates.push('started');
	      };

	      mediaRecorder.onpause = function () {
	        allStates.push('paused');
	      };

	      mediaRecorder.onresume = function () {
	        allStates.push('resumed');
	      };

	      mediaRecorder.onstop = function () {
	        allStates.push('stopped');
	      };

	      mediaRecorder.onerror = function (error) {
	        if (!error) {
	          return;
	        }

	        if (!error.name) {
	          error.name = 'UnknownError';
	        }

	        allStates.push('error: ' + error);

	        if (!config.disableLogs) {
	          // via: https://w3c.github.io/mediacapture-record/MediaRecorder.html#exception-summary
	          if (error.name.toString().toLowerCase().indexOf('invalidstate') !== -1) {
	            console.error('The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.', error);
	          } else if (error.name.toString().toLowerCase().indexOf('notsupported') !== -1) {
	            console.error('MIME type (', recorderHints.mimeType, ') is not supported.', error);
	          } else if (error.name.toString().toLowerCase().indexOf('security') !== -1) {
	            console.error('MediaRecorder security error', error);
	          } // older code below
	          else if (error.name === 'OutOfMemory') {
	            console.error('The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
	          } else if (error.name === 'IllegalStreamModification') {
	            console.error('A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
	          } else if (error.name === 'OtherRecordingError') {
	            console.error('Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
	          } else if (error.name === 'GenericError') {
	            console.error('The UA cannot provide the codec or recording option that has been requested.', error);
	          } else {
	            console.error('MediaRecorder Error', error);
	          }
	        }

	        (function (looper) {
	          if (!self.manuallyStopped && mediaRecorder && mediaRecorder.state === 'inactive') {
	            delete config.timeslice; // 10 minutes, enough?

	            mediaRecorder.start(10 * 60 * 1000);
	            return;
	          }

	          setTimeout(looper, 1000);
	        })();

	        if (mediaRecorder.state !== 'inactive' && mediaRecorder.state !== 'stopped') {
	          mediaRecorder.stop();
	        }
	      };

	      if (typeof config.timeSlice === 'number') {
	        updateTimeStamp();
	        mediaRecorder.start(config.timeSlice);
	      } else {
	        // default is 60 minutes; enough?
	        // use config => {timeSlice: 1000} otherwise
	        mediaRecorder.start(3.6e+6);
	      }

	      if (config.initCallback) {
	        config.initCallback(); // old code
	      }
	    };
	    /**
	     * @property {Array} timestamps - Array of time stamps
	     * @memberof MediaStreamRecorder
	     * @example
	     * console.log(recorder.timestamps);
	     */


	    this.timestamps = [];

	    function updateTimeStamp() {
	      self.timestamps.push(new Date().getTime());

	      if (typeof config.onTimeStamp === 'function') {
	        config.onTimeStamp(self.timestamps[self.timestamps.length - 1], self.timestamps);
	      }
	    }

	    function getMimeType(secondObject) {
	      if (mediaRecorder && mediaRecorder.mimeType) {
	        return mediaRecorder.mimeType;
	      }

	      return secondObject.mimeType || 'video/webm';
	    }
	    /**
	     * This method stops recording MediaStream.
	     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
	     * @method
	     * @memberof MediaStreamRecorder
	     * @example
	     * recorder.stop(function(blob) {
	     *     video.src = URL.createObjectURL(blob);
	     * });
	     */


	    this.stop = function (callback) {
	      callback = callback || function () {};

	      self.manuallyStopped = true; // used inside the mediaRecorder.onerror

	      if (!mediaRecorder) {
	        return;
	      }

	      this.recordingCallback = callback;

	      if (mediaRecorder.state === 'recording') {
	        mediaRecorder.stop();
	      }

	      if (typeof config.timeSlice === 'number') {
	        setTimeout(function () {
	          self.blob = new Blob(arrayOfBlobs, {
	            type: getMimeType(config)
	          });
	          self.recordingCallback(self.blob);
	        }, 100);
	      }
	    };
	    /**
	     * This method pauses the recording process.
	     * @method
	     * @memberof MediaStreamRecorder
	     * @example
	     * recorder.pause();
	     */


	    this.pause = function () {
	      if (!mediaRecorder) {
	        return;
	      }

	      if (mediaRecorder.state === 'recording') {
	        mediaRecorder.pause();
	      }
	    };
	    /**
	     * This method resumes the recording process.
	     * @method
	     * @memberof MediaStreamRecorder
	     * @example
	     * recorder.resume();
	     */


	    this.resume = function () {
	      if (!mediaRecorder) {
	        return;
	      }

	      if (mediaRecorder.state === 'paused') {
	        mediaRecorder.resume();
	      }
	    };
	    /**
	     * This method resets currently recorded data.
	     * @method
	     * @memberof MediaStreamRecorder
	     * @example
	     * recorder.clearRecordedData();
	     */


	    this.clearRecordedData = function () {
	      if (mediaRecorder && mediaRecorder.state === 'recording') {
	        self.stop(clearRecordedDataCB);
	      }

	      clearRecordedDataCB();
	    };

	    function clearRecordedDataCB() {
	      arrayOfBlobs = [];
	      mediaRecorder = null;
	      self.timestamps = [];
	    } // Reference to "MediaRecorder" object


	    var mediaRecorder;
	    /**
	     * Access to native MediaRecorder API
	     * @method
	     * @memberof MediaStreamRecorder
	     * @instance
	     * @example
	     * var internal = recorder.getInternalRecorder();
	     * internal.ondataavailable = function() {}; // override
	     * internal.stream, internal.onpause, internal.onstop, etc.
	     * @returns {Object} Returns internal recording object.
	     */

	    this.getInternalRecorder = function () {
	      return mediaRecorder;
	    };

	    function isMediaStreamActive() {
	      if ('active' in mediaStream) {
	        if (!mediaStream.active) {
	          return false;
	        }
	      } else if ('ended' in mediaStream) {
	        // old hack
	        if (mediaStream.ended) {
	          return false;
	        }
	      }

	      return true;
	    }
	    /**
	     * @property {Blob} blob - Recorded data as "Blob" object.
	     * @memberof MediaStreamRecorder
	     * @example
	     * recorder.stop(function() {
	     *     var blob = recorder.blob;
	     * });
	     */


	    this.blob = null;
	    /**
	     * Get MediaRecorder readonly state.
	     * @method
	     * @memberof MediaStreamRecorder
	     * @example
	     * var state = recorder.getState();
	     * @returns {String} Returns recording state.
	     */

	    this.getState = function () {
	      if (!mediaRecorder) {
	        return 'inactive';
	      }

	      return mediaRecorder.state || 'inactive';
	    }; // list of all recording states


	    var allStates = [];
	    /**
	     * Get MediaRecorder all recording states.
	     * @method
	     * @memberof MediaStreamRecorder
	     * @example
	     * var state = recorder.getAllStates();
	     * @returns {Array} Returns all recording states
	     */

	    this.getAllStates = function () {
	      return allStates;
	    }; // if any Track within the MediaStream is muted or not enabled at any time,
	    // the browser will only record black frames
	    // or silence since that is the content produced by the Track
	    // so we need to stopRecording as soon as any single track ends.


	    if (typeof config.checkForInactiveTracks === 'undefined') {
	      config.checkForInactiveTracks = false; // disable to minimize CPU usage
	    }

	    var self = this; // this method checks if media stream is stopped
	    // or if any track is ended.

	    (function looper() {
	      if (!mediaRecorder || config.checkForInactiveTracks === false) {
	        return;
	      }

	      if (isMediaStreamActive() === false) {
	        if (!config.disableLogs) {
	          console.log('MediaStream seems stopped.');
	        }

	        self.stop();
	        return;
	      }

	      setTimeout(looper, 1000); // check every second
	    })(); // for debugging


	    this.name = 'MediaStreamRecorder';

	    this.toString = function () {
	      return this.name;
	    };
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.MediaStreamRecorder = MediaStreamRecorder;
	  } // source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js
	  // https://github.com/mattdiamond/Recorderjs#license-mit
	  // ______________________
	  // StereoAudioRecorder.js

	  /**
	   * StereoAudioRecorder is a standalone class used by {@link RecordRTC} to bring "stereo" audio-recording in chrome.
	   * @summary JavaScript standalone object for stereo audio recording.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef StereoAudioRecorder
	   * @class
	   * @example
	   * var recorder = new StereoAudioRecorder(MediaStream, {
	   *     sampleRate: 44100,
	   *     bufferSize: 4096
	   * });
	   * recorder.record();
	   * recorder.stop(function(blob) {
	   *     video.src = URL.createObjectURL(blob);
	   * });
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
	   * @param {object} config - {sampleRate: 44100, bufferSize: 4096, numberOfAudioChannels: 1, etc.}
	   */


	  function StereoAudioRecorder(mediaStream, config) {
	    if (!getTracks(mediaStream, 'audio').length) {
	      throw 'Your stream has no audio tracks.';
	    }

	    config = config || {};
	    var self = this; // variables

	    var leftchannel = [];
	    var rightchannel = [];
	    var recording = false;
	    var recordingLength = 0;
	    var jsAudioNode;
	    var numberOfAudioChannels = 2;
	    /**
	     * Set sample rates such as 8K or 16K. Reference: http://stackoverflow.com/a/28977136/552182
	     * @property {number} desiredSampRate - Desired Bits per sample * 1000
	     * @memberof StereoAudioRecorder
	     * @instance
	     * @example
	     * var recorder = StereoAudioRecorder(mediaStream, {
	     *   desiredSampRate: 16 * 1000 // bits-per-sample * 1000
	     * });
	     */

	    var desiredSampRate = config.desiredSampRate; // backward compatibility

	    if (config.leftChannel === true) {
	      numberOfAudioChannels = 1;
	    }

	    if (config.numberOfAudioChannels === 1) {
	      numberOfAudioChannels = 1;
	    }

	    if (!numberOfAudioChannels || numberOfAudioChannels < 1) {
	      numberOfAudioChannels = 2;
	    }

	    if (!config.disableLogs) {
	      console.log('StereoAudioRecorder is set to record number of channels: ' + numberOfAudioChannels);
	    } // if any Track within the MediaStream is muted or not enabled at any time,
	    // the browser will only record black frames
	    // or silence since that is the content produced by the Track
	    // so we need to stopRecording as soon as any single track ends.


	    if (typeof config.checkForInactiveTracks === 'undefined') {
	      config.checkForInactiveTracks = true;
	    }

	    function isMediaStreamActive() {
	      if (config.checkForInactiveTracks === false) {
	        // always return "true"
	        return true;
	      }

	      if ('active' in mediaStream) {
	        if (!mediaStream.active) {
	          return false;
	        }
	      } else if ('ended' in mediaStream) {
	        // old hack
	        if (mediaStream.ended) {
	          return false;
	        }
	      }

	      return true;
	    }
	    /**
	     * This method records MediaStream.
	     * @method
	     * @memberof StereoAudioRecorder
	     * @example
	     * recorder.record();
	     */


	    this.record = function () {
	      if (isMediaStreamActive() === false) {
	        throw 'Please make sure MediaStream is active.';
	      }

	      resetVariables();
	      isAudioProcessStarted = isPaused = false;
	      recording = true;

	      if (typeof config.timeSlice !== 'undefined') {
	        looper();
	      }
	    };

	    function mergeLeftRightBuffers(config, callback) {
	      function mergeAudioBuffers(config, cb) {
	        var numberOfAudioChannels = config.numberOfAudioChannels; // todo: "slice(0)" --- is it causes loop? Should be removed?

	        var leftBuffers = config.leftBuffers.slice(0);
	        var rightBuffers = config.rightBuffers.slice(0);
	        var sampleRate = config.sampleRate;
	        var internalInterleavedLength = config.internalInterleavedLength;
	        var desiredSampRate = config.desiredSampRate;

	        if (numberOfAudioChannels === 2) {
	          leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
	          rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);

	          if (desiredSampRate) {
	            leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
	            rightBuffers = interpolateArray(rightBuffers, desiredSampRate, sampleRate);
	          }
	        }

	        if (numberOfAudioChannels === 1) {
	          leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);

	          if (desiredSampRate) {
	            leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
	          }
	        } // set sample rate as desired sample rate


	        if (desiredSampRate) {
	          sampleRate = desiredSampRate;
	        } // for changing the sampling rate, reference:
	        // http://stackoverflow.com/a/28977136/552182


	        function interpolateArray(data, newSampleRate, oldSampleRate) {
	          var fitCount = Math.round(data.length * (newSampleRate / oldSampleRate));
	          var newData = [];
	          var springFactor = Number((data.length - 1) / (fitCount - 1));
	          newData[0] = data[0];

	          for (var i = 1; i < fitCount - 1; i++) {
	            var tmp = i * springFactor;
	            var before = Number(Math.floor(tmp)).toFixed();
	            var after = Number(Math.ceil(tmp)).toFixed();
	            var atPoint = tmp - before;
	            newData[i] = linearInterpolate(data[before], data[after], atPoint);
	          }

	          newData[fitCount - 1] = data[data.length - 1];
	          return newData;
	        }

	        function linearInterpolate(before, after, atPoint) {
	          return before + (after - before) * atPoint;
	        }

	        function mergeBuffers(channelBuffer, rLength) {
	          var result = new Float64Array(rLength);
	          var offset = 0;
	          var lng = channelBuffer.length;

	          for (var i = 0; i < lng; i++) {
	            var buffer = channelBuffer[i];
	            result.set(buffer, offset);
	            offset += buffer.length;
	          }

	          return result;
	        }

	        function interleave(leftChannel, rightChannel) {
	          var length = leftChannel.length + rightChannel.length;
	          var result = new Float64Array(length);
	          var inputIndex = 0;

	          for (var index = 0; index < length;) {
	            result[index++] = leftChannel[inputIndex];
	            result[index++] = rightChannel[inputIndex];
	            inputIndex++;
	          }

	          return result;
	        }

	        function writeUTFBytes(view, offset, string) {
	          var lng = string.length;

	          for (var i = 0; i < lng; i++) {
	            view.setUint8(offset + i, string.charCodeAt(i));
	          }
	        } // interleave both channels together


	        var interleaved;

	        if (numberOfAudioChannels === 2) {
	          interleaved = interleave(leftBuffers, rightBuffers);
	        }

	        if (numberOfAudioChannels === 1) {
	          interleaved = leftBuffers;
	        }

	        var interleavedLength = interleaved.length; // create wav file

	        var resultingBufferLength = 44 + interleavedLength * 2;
	        var buffer = new ArrayBuffer(resultingBufferLength);
	        var view = new DataView(buffer); // RIFF chunk descriptor/identifier

	        writeUTFBytes(view, 0, 'RIFF'); // RIFF chunk length
	        // changed "44" to "36" via #401

	        view.setUint32(4, 36 + interleavedLength * 2, true); // RIFF type

	        writeUTFBytes(view, 8, 'WAVE'); // format chunk identifier
	        // FMT sub-chunk

	        writeUTFBytes(view, 12, 'fmt '); // format chunk length

	        view.setUint32(16, 16, true); // sample format (raw)

	        view.setUint16(20, 1, true); // stereo (2 channels)

	        view.setUint16(22, numberOfAudioChannels, true); // sample rate

	        view.setUint32(24, sampleRate, true); // byte rate (sample rate * block align)

	        view.setUint32(28, sampleRate * numberOfAudioChannels * 2, true); // block align (channel count * bytes per sample)

	        view.setUint16(32, numberOfAudioChannels * 2, true); // bits per sample

	        view.setUint16(34, 16, true); // data sub-chunk
	        // data chunk identifier

	        writeUTFBytes(view, 36, 'data'); // data chunk length

	        view.setUint32(40, interleavedLength * 2, true); // write the PCM samples

	        var lng = interleavedLength;
	        var index = 44;
	        var volume = 1;

	        for (var i = 0; i < lng; i++) {
	          view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
	          index += 2;
	        }

	        if (cb) {
	          return cb({
	            buffer: buffer,
	            view: view
	          });
	        }

	        postMessage({
	          buffer: buffer,
	          view: view
	        });
	      }

	      if (config.noWorker) {
	        mergeAudioBuffers(config, function (data) {
	          callback(data.buffer, data.view);
	        });
	        return;
	      }

	      var webWorker = processInWebWorker(mergeAudioBuffers);

	      webWorker.onmessage = function (event) {
	        callback(event.data.buffer, event.data.view); // release memory

	        URL.revokeObjectURL(webWorker.workerURL); // kill webworker (or Chrome will kill your page after ~25 calls)

	        webWorker.terminate();
	      };

	      webWorker.postMessage(config);
	    }

	    function processInWebWorker(_function) {
	      var workerURL = URL.createObjectURL(new Blob([_function.toString(), ';this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'], {
	        type: 'application/javascript'
	      }));
	      var worker = new Worker(workerURL);
	      worker.workerURL = workerURL;
	      return worker;
	    }
	    /**
	     * This method stops recording MediaStream.
	     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
	     * @method
	     * @memberof StereoAudioRecorder
	     * @example
	     * recorder.stop(function(blob) {
	     *     video.src = URL.createObjectURL(blob);
	     * });
	     */


	    this.stop = function (callback) {
	      callback = callback || function () {}; // stop recording


	      recording = false;
	      mergeLeftRightBuffers({
	        desiredSampRate: desiredSampRate,
	        sampleRate: sampleRate,
	        numberOfAudioChannels: numberOfAudioChannels,
	        internalInterleavedLength: recordingLength,
	        leftBuffers: leftchannel,
	        rightBuffers: numberOfAudioChannels === 1 ? [] : rightchannel,
	        noWorker: config.noWorker
	      }, function (buffer, view) {
	        /**
	         * @property {Blob} blob - The recorded blob object.
	         * @memberof StereoAudioRecorder
	         * @example
	         * recorder.stop(function(){
	         *     var blob = recorder.blob;
	         * });
	         */
	        self.blob = new Blob([view], {
	          type: 'audio/wav'
	        });
	        /**
	         * @property {ArrayBuffer} buffer - The recorded buffer object.
	         * @memberof StereoAudioRecorder
	         * @example
	         * recorder.stop(function(){
	         *     var buffer = recorder.buffer;
	         * });
	         */

	        self.buffer = new ArrayBuffer(view.buffer.byteLength);
	        /**
	         * @property {DataView} view - The recorded data-view object.
	         * @memberof StereoAudioRecorder
	         * @example
	         * recorder.stop(function(){
	         *     var view = recorder.view;
	         * });
	         */

	        self.view = view;
	        self.sampleRate = desiredSampRate || sampleRate;
	        self.bufferSize = bufferSize; // recorded audio length

	        self.length = recordingLength;
	        isAudioProcessStarted = false;

	        if (callback) {
	          callback(self.blob);
	        }
	      });
	    };

	    if (typeof RecordRTC.Storage === 'undefined') {
	      RecordRTC.Storage = {
	        AudioContextConstructor: null,
	        AudioContext: window.AudioContext || window.webkitAudioContext
	      };
	    }

	    if (!RecordRTC.Storage.AudioContextConstructor || RecordRTC.Storage.AudioContextConstructor.state === 'closed') {
	      RecordRTC.Storage.AudioContextConstructor = new RecordRTC.Storage.AudioContext();
	    }

	    var context = RecordRTC.Storage.AudioContextConstructor; // creates an audio node from the microphone incoming stream

	    var audioInput = context.createMediaStreamSource(mediaStream);
	    var legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];
	    /**
	     * From the spec: This value controls how frequently the audioprocess event is
	     * dispatched and how many sample-frames need to be processed each call.
	     * Lower values for buffer size will result in a lower (better) latency.
	     * Higher values will be necessary to avoid audio breakup and glitches
	     * The size of the buffer (in sample-frames) which needs to
	     * be processed each time onprocessaudio is called.
	     * Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
	     * @property {number} bufferSize - Buffer-size for how frequently the audioprocess event is dispatched.
	     * @memberof StereoAudioRecorder
	     * @example
	     * recorder = new StereoAudioRecorder(mediaStream, {
	     *     bufferSize: 4096
	     * });
	     */
	    // "0" means, let chrome decide the most accurate buffer-size for current platform.

	    var bufferSize = typeof config.bufferSize === 'undefined' ? 4096 : config.bufferSize;

	    if (legalBufferValues.indexOf(bufferSize) === -1) {
	      if (!config.disableLogs) {
	        console.log('Legal values for buffer-size are ' + JSON.stringify(legalBufferValues, null, '\t'));
	      }
	    }

	    if (context.createJavaScriptNode) {
	      jsAudioNode = context.createJavaScriptNode(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
	    } else if (context.createScriptProcessor) {
	      jsAudioNode = context.createScriptProcessor(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
	    } else {
	      throw 'WebAudio API has no support on this browser.';
	    } // connect the stream to the script processor


	    audioInput.connect(jsAudioNode);

	    if (!config.bufferSize) {
	      bufferSize = jsAudioNode.bufferSize; // device buffer-size
	    }
	    /**
	     * The sample rate (in sample-frames per second) at which the
	     * AudioContext handles audio. It is assumed that all AudioNodes
	     * in the context run at this rate. In making this assumption,
	     * sample-rate converters or "varispeed" processors are not supported
	     * in real-time processing.
	     * The sampleRate parameter describes the sample-rate of the
	     * linear PCM audio data in the buffer in sample-frames per second.
	     * An implementation must support sample-rates in at least
	     * the range 22050 to 96000.
	     * @property {number} sampleRate - Buffer-size for how frequently the audioprocess event is dispatched.
	     * @memberof StereoAudioRecorder
	     * @example
	     * recorder = new StereoAudioRecorder(mediaStream, {
	     *     sampleRate: 44100
	     * });
	     */


	    var sampleRate = typeof config.sampleRate !== 'undefined' ? config.sampleRate : context.sampleRate || 44100;

	    if (sampleRate < 22050 || sampleRate > 96000) {
	      // Ref: http://stackoverflow.com/a/26303918/552182
	      if (!config.disableLogs) {
	        console.log('sample-rate must be under range 22050 and 96000.');
	      }
	    }

	    if (!config.disableLogs) {
	      if (config.desiredSampRate) {
	        console.log('Desired sample-rate: ' + config.desiredSampRate);
	      }
	    }

	    var isPaused = false;
	    /**
	     * This method pauses the recording process.
	     * @method
	     * @memberof StereoAudioRecorder
	     * @example
	     * recorder.pause();
	     */

	    this.pause = function () {
	      isPaused = true;
	    };
	    /**
	     * This method resumes the recording process.
	     * @method
	     * @memberof StereoAudioRecorder
	     * @example
	     * recorder.resume();
	     */


	    this.resume = function () {
	      if (isMediaStreamActive() === false) {
	        throw 'Please make sure MediaStream is active.';
	      }

	      if (!recording) {
	        if (!config.disableLogs) {
	          console.log('Seems recording has been restarted.');
	        }

	        this.record();
	        return;
	      }

	      isPaused = false;
	    };
	    /**
	     * This method resets currently recorded data.
	     * @method
	     * @memberof StereoAudioRecorder
	     * @example
	     * recorder.clearRecordedData();
	     */


	    this.clearRecordedData = function () {
	      config.checkForInactiveTracks = false;

	      if (recording) {
	        this.stop(clearRecordedDataCB);
	      }

	      clearRecordedDataCB();
	    };

	    function resetVariables() {
	      leftchannel = [];
	      rightchannel = [];
	      recordingLength = 0;
	      isAudioProcessStarted = false;
	      recording = false;
	      isPaused = false;
	      context = null;
	      self.leftchannel = leftchannel;
	      self.rightchannel = rightchannel;
	      self.numberOfAudioChannels = numberOfAudioChannels;
	      self.desiredSampRate = desiredSampRate;
	      self.sampleRate = sampleRate;
	      self.recordingLength = recordingLength;
	      intervalsBasedBuffers = {
	        left: [],
	        right: [],
	        recordingLength: 0
	      };
	    }

	    function clearRecordedDataCB() {
	      if (jsAudioNode) {
	        jsAudioNode.onaudioprocess = null;
	        jsAudioNode.disconnect();
	        jsAudioNode = null;
	      }

	      if (audioInput) {
	        audioInput.disconnect();
	        audioInput = null;
	      }

	      resetVariables();
	    } // for debugging


	    this.name = 'StereoAudioRecorder';

	    this.toString = function () {
	      return this.name;
	    };

	    var isAudioProcessStarted = false;

	    function onAudioProcessDataAvailable(e) {
	      if (isPaused) {
	        return;
	      }

	      if (isMediaStreamActive() === false) {
	        if (!config.disableLogs) {
	          console.log('MediaStream seems stopped.');
	        }

	        jsAudioNode.disconnect();
	        recording = false;
	      }

	      if (!recording) {
	        if (audioInput) {
	          audioInput.disconnect();
	          audioInput = null;
	        }

	        return;
	      }
	      /**
	       * This method is called on "onaudioprocess" event's first invocation.
	       * @method {function} onAudioProcessStarted
	       * @memberof StereoAudioRecorder
	       * @example
	       * recorder.onAudioProcessStarted: function() { };
	       */


	      if (!isAudioProcessStarted) {
	        isAudioProcessStarted = true;

	        if (config.onAudioProcessStarted) {
	          config.onAudioProcessStarted();
	        }

	        if (config.initCallback) {
	          config.initCallback();
	        }
	      }

	      var left = e.inputBuffer.getChannelData(0); // we clone the samples

	      var chLeft = new Float32Array(left);
	      leftchannel.push(chLeft);

	      if (numberOfAudioChannels === 2) {
	        var right = e.inputBuffer.getChannelData(1);
	        var chRight = new Float32Array(right);
	        rightchannel.push(chRight);
	      }

	      recordingLength += bufferSize; // export raw PCM

	      self.recordingLength = recordingLength;

	      if (typeof config.timeSlice !== 'undefined') {
	        intervalsBasedBuffers.recordingLength += bufferSize;
	        intervalsBasedBuffers.left.push(chLeft);

	        if (numberOfAudioChannels === 2) {
	          intervalsBasedBuffers.right.push(chRight);
	        }
	      }
	    }

	    jsAudioNode.onaudioprocess = onAudioProcessDataAvailable; // to prevent self audio to be connected with speakers

	    if (context.createMediaStreamDestination) {
	      jsAudioNode.connect(context.createMediaStreamDestination());
	    } else {
	      jsAudioNode.connect(context.destination);
	    } // export raw PCM


	    this.leftchannel = leftchannel;
	    this.rightchannel = rightchannel;
	    this.numberOfAudioChannels = numberOfAudioChannels;
	    this.desiredSampRate = desiredSampRate;
	    this.sampleRate = sampleRate;
	    self.recordingLength = recordingLength; // helper for intervals based blobs

	    var intervalsBasedBuffers = {
	      left: [],
	      right: [],
	      recordingLength: 0
	    }; // this looper is used to support intervals based blobs (via timeSlice+ondataavailable)

	    function looper() {
	      if (!recording || typeof config.ondataavailable !== 'function' || typeof config.timeSlice === 'undefined') {
	        return;
	      }

	      if (intervalsBasedBuffers.left.length) {
	        mergeLeftRightBuffers({
	          desiredSampRate: desiredSampRate,
	          sampleRate: sampleRate,
	          numberOfAudioChannels: numberOfAudioChannels,
	          internalInterleavedLength: intervalsBasedBuffers.recordingLength,
	          leftBuffers: intervalsBasedBuffers.left,
	          rightBuffers: numberOfAudioChannels === 1 ? [] : intervalsBasedBuffers.right
	        }, function (buffer, view) {
	          var blob = new Blob([view], {
	            type: 'audio/wav'
	          });
	          config.ondataavailable(blob);
	          setTimeout(looper, config.timeSlice);
	        });
	        intervalsBasedBuffers = {
	          left: [],
	          right: [],
	          recordingLength: 0
	        };
	      } else {
	        setTimeout(looper, config.timeSlice);
	      }
	    }
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.StereoAudioRecorder = StereoAudioRecorder;
	  } // _________________
	  // CanvasRecorder.js

	  /**
	   * CanvasRecorder is a standalone class used by {@link RecordRTC} to bring HTML5-Canvas recording into video WebM. It uses HTML2Canvas library and runs top over {@link Whammy}.
	   * @summary HTML2Canvas recording into video WebM.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef CanvasRecorder
	   * @class
	   * @example
	   * var recorder = new CanvasRecorder(htmlElement, { disableLogs: true, useWhammyRecorder: true });
	   * recorder.record();
	   * recorder.stop(function(blob) {
	   *     video.src = URL.createObjectURL(blob);
	   * });
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {HTMLElement} htmlElement - querySelector/getElementById/getElementsByTagName[0]/etc.
	   * @param {object} config - {disableLogs:true, initCallback: function}
	   */


	  function CanvasRecorder(htmlElement, config) {
	    if (typeof html2canvas === 'undefined') {
	      throw 'Please link: https://www.webrtc-experiment.com/screenshot.js';
	    }

	    config = config || {};

	    if (!config.frameInterval) {
	      config.frameInterval = 10;
	    } // via DetectRTC.js


	    var isCanvasSupportsStreamCapturing = false;
	    ['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function (item) {
	      if (item in document.createElement('canvas')) {
	        isCanvasSupportsStreamCapturing = true;
	      }
	    });

	    var _isChrome = (!!window.webkitRTCPeerConnection || !!window.webkitGetUserMedia) && !!window.chrome;

	    var chromeVersion = 50;
	    var matchArray = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

	    if (_isChrome && matchArray && matchArray[2]) {
	      chromeVersion = parseInt(matchArray[2], 10);
	    }

	    if (_isChrome && chromeVersion < 52) {
	      isCanvasSupportsStreamCapturing = false;
	    }

	    if (config.useWhammyRecorder) {
	      isCanvasSupportsStreamCapturing = false;
	    }

	    var globalCanvas, mediaStreamRecorder;

	    if (isCanvasSupportsStreamCapturing) {
	      if (!config.disableLogs) {
	        console.log('Your browser supports both MediRecorder API and canvas.captureStream!');
	      }

	      if (htmlElement instanceof HTMLCanvasElement) {
	        globalCanvas = htmlElement;
	      } else if (htmlElement instanceof CanvasRenderingContext2D) {
	        globalCanvas = htmlElement.canvas;
	      } else {
	        throw 'Please pass either HTMLCanvasElement or CanvasRenderingContext2D.';
	      }
	    } else if (!!navigator.mozGetUserMedia) {
	      if (!config.disableLogs) {
	        console.error('Canvas recording is NOT supported in Firefox.');
	      }
	    }

	    var isRecording;
	    /**
	     * This method records Canvas.
	     * @method
	     * @memberof CanvasRecorder
	     * @example
	     * recorder.record();
	     */

	    this.record = function () {
	      isRecording = true;

	      if (isCanvasSupportsStreamCapturing && !config.useWhammyRecorder) {
	        // CanvasCaptureMediaStream
	        var canvasMediaStream;

	        if ('captureStream' in globalCanvas) {
	          canvasMediaStream = globalCanvas.captureStream(25); // 25 FPS
	        } else if ('mozCaptureStream' in globalCanvas) {
	          canvasMediaStream = globalCanvas.mozCaptureStream(25);
	        } else if ('webkitCaptureStream' in globalCanvas) {
	          canvasMediaStream = globalCanvas.webkitCaptureStream(25);
	        }

	        try {
	          var mdStream = new MediaStream();
	          mdStream.addTrack(getTracks(canvasMediaStream, 'video')[0]);
	          canvasMediaStream = mdStream;
	        } catch (e) {}

	        if (!canvasMediaStream) {
	          throw 'captureStream API are NOT available.';
	        } // Note: Jan 18, 2016 status is that,
	        // Firefox MediaRecorder API can't record CanvasCaptureMediaStream object.


	        mediaStreamRecorder = new MediaStreamRecorder(canvasMediaStream, {
	          mimeType: config.mimeType || 'video/webm'
	        });
	        mediaStreamRecorder.record();
	      } else {
	        whammy.frames = [];
	        lastTime = new Date().getTime();
	        drawCanvasFrame();
	      }

	      if (config.initCallback) {
	        config.initCallback();
	      }
	    };

	    this.getWebPImages = function (callback) {
	      if (htmlElement.nodeName.toLowerCase() !== 'canvas') {
	        callback();
	        return;
	      }

	      var framesLength = whammy.frames.length;
	      whammy.frames.forEach(function (frame, idx) {
	        var framesRemaining = framesLength - idx;

	        if (!config.disableLogs) {
	          console.log(framesRemaining + '/' + framesLength + ' frames remaining');
	        }

	        if (config.onEncodingCallback) {
	          config.onEncodingCallback(framesRemaining, framesLength);
	        }

	        var webp = frame.image.toDataURL('image/webp', 1);
	        whammy.frames[idx].image = webp;
	      });

	      if (!config.disableLogs) {
	        console.log('Generating WebM');
	      }

	      callback();
	    };
	    /**
	     * This method stops recording Canvas.
	     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
	     * @method
	     * @memberof CanvasRecorder
	     * @example
	     * recorder.stop(function(blob) {
	     *     video.src = URL.createObjectURL(blob);
	     * });
	     */


	    this.stop = function (callback) {
	      isRecording = false;
	      var that = this;

	      if (isCanvasSupportsStreamCapturing && mediaStreamRecorder) {
	        mediaStreamRecorder.stop(callback);
	        return;
	      }

	      this.getWebPImages(function () {
	        /**
	         * @property {Blob} blob - Recorded frames in video/webm blob.
	         * @memberof CanvasRecorder
	         * @example
	         * recorder.stop(function() {
	         *     var blob = recorder.blob;
	         * });
	         */
	        whammy.compile(function (blob) {
	          if (!config.disableLogs) {
	            console.log('Recording finished!');
	          }

	          that.blob = blob;

	          if (that.blob.forEach) {
	            that.blob = new Blob([], {
	              type: 'video/webm'
	            });
	          }

	          if (callback) {
	            callback(that.blob);
	          }

	          whammy.frames = [];
	        });
	      });
	    };

	    var isPausedRecording = false;
	    /**
	     * This method pauses the recording process.
	     * @method
	     * @memberof CanvasRecorder
	     * @example
	     * recorder.pause();
	     */

	    this.pause = function () {
	      isPausedRecording = true;

	      if (mediaStreamRecorder instanceof MediaStreamRecorder) {
	        mediaStreamRecorder.pause();
	        return;
	      }
	    };
	    /**
	     * This method resumes the recording process.
	     * @method
	     * @memberof CanvasRecorder
	     * @example
	     * recorder.resume();
	     */


	    this.resume = function () {
	      isPausedRecording = false;

	      if (mediaStreamRecorder instanceof MediaStreamRecorder) {
	        mediaStreamRecorder.resume();
	        return;
	      }

	      if (!isRecording) {
	        this.record();
	      }
	    };
	    /**
	     * This method resets currently recorded data.
	     * @method
	     * @memberof CanvasRecorder
	     * @example
	     * recorder.clearRecordedData();
	     */


	    this.clearRecordedData = function () {
	      if (isRecording) {
	        this.stop(clearRecordedDataCB);
	      }

	      clearRecordedDataCB();
	    };

	    function clearRecordedDataCB() {
	      whammy.frames = [];
	      isRecording = false;
	      isPausedRecording = false;
	    } // for debugging


	    this.name = 'CanvasRecorder';

	    this.toString = function () {
	      return this.name;
	    };

	    function cloneCanvas() {
	      //create a new canvas
	      var newCanvas = document.createElement('canvas');
	      var context = newCanvas.getContext('2d'); //set dimensions

	      newCanvas.width = htmlElement.width;
	      newCanvas.height = htmlElement.height; //apply the old canvas to the new one

	      context.drawImage(htmlElement, 0, 0); //return the new canvas

	      return newCanvas;
	    }

	    function drawCanvasFrame() {
	      if (isPausedRecording) {
	        lastTime = new Date().getTime();
	        return setTimeout(drawCanvasFrame, 500);
	      }

	      if (htmlElement.nodeName.toLowerCase() === 'canvas') {
	        var duration = new Date().getTime() - lastTime; // via #206, by Jack i.e. @Seymourr

	        lastTime = new Date().getTime();
	        whammy.frames.push({
	          image: cloneCanvas(),
	          duration: duration
	        });

	        if (isRecording) {
	          setTimeout(drawCanvasFrame, config.frameInterval);
	        }

	        return;
	      }

	      html2canvas(htmlElement, {
	        grabMouse: typeof config.showMousePointer === 'undefined' || config.showMousePointer,
	        onrendered: function (canvas) {
	          var duration = new Date().getTime() - lastTime;

	          if (!duration) {
	            return setTimeout(drawCanvasFrame, config.frameInterval);
	          } // via #206, by Jack i.e. @Seymourr


	          lastTime = new Date().getTime();
	          whammy.frames.push({
	            image: canvas.toDataURL('image/webp', 1),
	            duration: duration
	          });

	          if (isRecording) {
	            setTimeout(drawCanvasFrame, config.frameInterval);
	          }
	        }
	      });
	    }

	    var lastTime = new Date().getTime();
	    var whammy = new Whammy.Video(100);
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.CanvasRecorder = CanvasRecorder;
	  } // _________________
	  // WhammyRecorder.js

	  /**
	   * WhammyRecorder is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It runs top over {@link Whammy}.
	   * @summary Video recording feature in Chrome.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef WhammyRecorder
	   * @class
	   * @example
	   * var recorder = new WhammyRecorder(mediaStream);
	   * recorder.record();
	   * recorder.stop(function(blob) {
	   *     video.src = URL.createObjectURL(blob);
	   * });
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
	   * @param {object} config - {disableLogs: true, initCallback: function, video: HTMLVideoElement, etc.}
	   */


	  function WhammyRecorder(mediaStream, config) {
	    config = config || {};

	    if (!config.frameInterval) {
	      config.frameInterval = 10;
	    }

	    if (!config.disableLogs) {
	      console.log('Using frames-interval:', config.frameInterval);
	    }
	    /**
	     * This method records video.
	     * @method
	     * @memberof WhammyRecorder
	     * @example
	     * recorder.record();
	     */


	    this.record = function () {
	      if (!config.width) {
	        config.width = 320;
	      }

	      if (!config.height) {
	        config.height = 240;
	      }

	      if (!config.video) {
	        config.video = {
	          width: config.width,
	          height: config.height
	        };
	      }

	      if (!config.canvas) {
	        config.canvas = {
	          width: config.width,
	          height: config.height
	        };
	      }

	      canvas.width = config.canvas.width || 320;
	      canvas.height = config.canvas.height || 240;
	      context = canvas.getContext('2d'); // setting defaults

	      if (config.video && config.video instanceof HTMLVideoElement) {
	        video = config.video.cloneNode();

	        if (config.initCallback) {
	          config.initCallback();
	        }
	      } else {
	        video = document.createElement('video');
	        setSrcObject(mediaStream, video);

	        video.onloadedmetadata = function () {
	          // "onloadedmetadata" may NOT work in FF?
	          if (config.initCallback) {
	            config.initCallback();
	          }
	        };

	        video.width = config.video.width;
	        video.height = config.video.height;
	      }

	      video.muted = true;
	      video.play();
	      lastTime = new Date().getTime();
	      whammy = new Whammy.Video();

	      if (!config.disableLogs) {
	        console.log('canvas resolutions', canvas.width, '*', canvas.height);
	        console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);
	      }

	      drawFrames(config.frameInterval);
	    };
	    /**
	     * Draw and push frames to Whammy
	     * @param {integer} frameInterval - set minimum interval (in milliseconds) between each time we push a frame to Whammy
	     */


	    function drawFrames(frameInterval) {
	      frameInterval = typeof frameInterval !== 'undefined' ? frameInterval : 10;
	      var duration = new Date().getTime() - lastTime;

	      if (!duration) {
	        return setTimeout(drawFrames, frameInterval, frameInterval);
	      }

	      if (isPausedRecording) {
	        lastTime = new Date().getTime();
	        return setTimeout(drawFrames, 100);
	      } // via #206, by Jack i.e. @Seymourr


	      lastTime = new Date().getTime();

	      if (video.paused) {
	        // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
	        // Tweak for Android Chrome
	        video.play();
	      }

	      context.drawImage(video, 0, 0, canvas.width, canvas.height);
	      whammy.frames.push({
	        duration: duration,
	        image: canvas.toDataURL('image/webp')
	      });

	      if (!isStopDrawing) {
	        setTimeout(drawFrames, frameInterval, frameInterval);
	      }
	    }

	    function asyncLoop(o) {
	      var i = -1,
	          length = o.length;

	      (function loop() {
	        i++;

	        if (i === length) {
	          o.callback();
	          return;
	        } // "setTimeout" added by Jim McLeod


	        setTimeout(function () {
	          o.functionToLoop(loop, i);
	        }, 1);
	      })();
	    }
	    /**
	     * remove black frames from the beginning to the specified frame
	     * @param {Array} _frames - array of frames to be checked
	     * @param {number} _framesToCheck - number of frame until check will be executed (-1 - will drop all frames until frame not matched will be found)
	     * @param {number} _pixTolerance - 0 - very strict (only black pixel color) ; 1 - all
	     * @param {number} _frameTolerance - 0 - very strict (only black frame color) ; 1 - all
	     * @returns {Array} - array of frames
	     */
	    // pull#293 by @volodalexey


	    function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance, callback) {
	      var localCanvas = document.createElement('canvas');
	      localCanvas.width = canvas.width;
	      localCanvas.height = canvas.height;
	      var context2d = localCanvas.getContext('2d');
	      var resultFrames = [];
	      var checkUntilNotBlack = _framesToCheck === -1;
	      var endCheckFrame = _framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length ? _framesToCheck : _frames.length;
	      var sampleColor = {
	        r: 0,
	        g: 0,
	        b: 0
	      };
	      var maxColorDifference = Math.sqrt(Math.pow(255, 2) + Math.pow(255, 2) + Math.pow(255, 2));
	      var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
	      var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
	      var doNotCheckNext = false;
	      asyncLoop({
	        length: endCheckFrame,
	        functionToLoop: function (loop, f) {
	          var matchPixCount, endPixCheck, maxPixCount;

	          var finishImage = function () {
	            if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) ; else {
	              // console.log('frame is passed : ' + f);
	              if (checkUntilNotBlack) {
	                doNotCheckNext = true;
	              }

	              resultFrames.push(_frames[f]);
	            }

	            loop();
	          };

	          if (!doNotCheckNext) {
	            var image = new Image();

	            image.onload = function () {
	              context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
	              var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
	              matchPixCount = 0;
	              endPixCheck = imageData.data.length;
	              maxPixCount = imageData.data.length / 4;

	              for (var pix = 0; pix < endPixCheck; pix += 4) {
	                var currentColor = {
	                  r: imageData.data[pix],
	                  g: imageData.data[pix + 1],
	                  b: imageData.data[pix + 2]
	                };
	                var colorDifference = Math.sqrt(Math.pow(currentColor.r - sampleColor.r, 2) + Math.pow(currentColor.g - sampleColor.g, 2) + Math.pow(currentColor.b - sampleColor.b, 2)); // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)

	                if (colorDifference <= maxColorDifference * pixTolerance) {
	                  matchPixCount++;
	                }
	              }

	              finishImage();
	            };

	            image.src = _frames[f].image;
	          } else {
	            finishImage();
	          }
	        },
	        callback: function () {
	          resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

	          if (resultFrames.length <= 0) {
	            // at least one last frame should be available for next manipulation
	            // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
	            resultFrames.push(_frames[_frames.length - 1]);
	          }

	          callback(resultFrames);
	        }
	      });
	    }

	    var isStopDrawing = false;
	    /**
	     * This method stops recording video.
	     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
	     * @method
	     * @memberof WhammyRecorder
	     * @example
	     * recorder.stop(function(blob) {
	     *     video.src = URL.createObjectURL(blob);
	     * });
	     */

	    this.stop = function (callback) {
	      callback = callback || function () {};

	      isStopDrawing = true;

	      var _this = this; // analyse of all frames takes some time!


	      setTimeout(function () {
	        // e.g. dropBlackFrames(frames, 10, 1, 1) - will cut all 10 frames
	        // e.g. dropBlackFrames(frames, 10, 0.5, 0.5) - will analyse 10 frames
	        // e.g. dropBlackFrames(frames, 10) === dropBlackFrames(frames, 10, 0, 0) - will analyse 10 frames with strict black color
	        dropBlackFrames(whammy.frames, -1, null, null, function (frames) {
	          whammy.frames = frames; // to display advertisement images!

	          if (config.advertisement && config.advertisement.length) {
	            whammy.frames = config.advertisement.concat(whammy.frames);
	          }
	          /**
	           * @property {Blob} blob - Recorded frames in video/webm blob.
	           * @memberof WhammyRecorder
	           * @example
	           * recorder.stop(function() {
	           *     var blob = recorder.blob;
	           * });
	           */


	          whammy.compile(function (blob) {
	            _this.blob = blob;

	            if (_this.blob.forEach) {
	              _this.blob = new Blob([], {
	                type: 'video/webm'
	              });
	            }

	            if (callback) {
	              callback(_this.blob);
	            }
	          });
	        });
	      }, 10);
	    };

	    var isPausedRecording = false;
	    /**
	     * This method pauses the recording process.
	     * @method
	     * @memberof WhammyRecorder
	     * @example
	     * recorder.pause();
	     */

	    this.pause = function () {
	      isPausedRecording = true;
	    };
	    /**
	     * This method resumes the recording process.
	     * @method
	     * @memberof WhammyRecorder
	     * @example
	     * recorder.resume();
	     */


	    this.resume = function () {
	      isPausedRecording = false;

	      if (isStopDrawing) {
	        this.record();
	      }
	    };
	    /**
	     * This method resets currently recorded data.
	     * @method
	     * @memberof WhammyRecorder
	     * @example
	     * recorder.clearRecordedData();
	     */


	    this.clearRecordedData = function () {
	      if (!isStopDrawing) {
	        this.stop(clearRecordedDataCB);
	      }

	      clearRecordedDataCB();
	    };

	    function clearRecordedDataCB() {
	      whammy.frames = [];
	      isStopDrawing = true;
	      isPausedRecording = false;
	    } // for debugging


	    this.name = 'WhammyRecorder';

	    this.toString = function () {
	      return this.name;
	    };

	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');
	    var video;
	    var lastTime;
	    var whammy;
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.WhammyRecorder = WhammyRecorder;
	  } // https://github.com/antimatter15/whammy/blob/master/LICENSE
	  // _________
	  // Whammy.js
	  // todo: Firefox now supports webp for webm containers!
	  // their MediaRecorder implementation works well!
	  // should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

	  /**
	   * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
	   * @summary A real time javascript webm encoder based on a canvas hack.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef Whammy
	   * @class
	   * @example
	   * var recorder = new Whammy().Video(15);
	   * recorder.add(context || canvas || dataURL);
	   * var output = recorder.compile();
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   */


	  var Whammy = function () {
	    // a more abstract-ish API
	    function WhammyVideo(duration) {
	      this.frames = [];
	      this.duration = duration || 1;
	      this.quality = 0.8;
	    }
	    /**
	     * Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
	     * @method
	     * @memberof Whammy
	     * @example
	     * recorder = new Whammy().Video(0.8, 100);
	     * recorder.add(canvas || context || 'image/webp');
	     * @param {string} frame - Canvas || Context || image/webp
	     * @param {number} duration - Stick a duration (in milliseconds)
	     */


	    WhammyVideo.prototype.add = function (frame, duration) {
	      if ('canvas' in frame) {
	        //CanvasRenderingContext2D
	        frame = frame.canvas;
	      }

	      if ('toDataURL' in frame) {
	        frame = frame.toDataURL('image/webp', this.quality);
	      }

	      if (!/^data:image\/webp;base64,/ig.test(frame)) {
	        throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
	      }

	      this.frames.push({
	        image: frame,
	        duration: duration || this.duration
	      });
	    };

	    function processInWebWorker(_function) {
	      var blob = URL.createObjectURL(new Blob([_function.toString(), 'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'], {
	        type: 'application/javascript'
	      }));
	      var worker = new Worker(blob);
	      URL.revokeObjectURL(blob);
	      return worker;
	    }

	    function whammyInWebWorker(frames) {
	      function ArrayToWebM(frames) {
	        var info = checkFrames(frames);

	        if (!info) {
	          return [];
	        }

	        var clusterMaxDuration = 30000;
	        var EBML = [{
	          'id': 0x1a45dfa3,
	          // EBML
	          'data': [{
	            'data': 1,
	            'id': 0x4286 // EBMLVersion

	          }, {
	            'data': 1,
	            'id': 0x42f7 // EBMLReadVersion

	          }, {
	            'data': 4,
	            'id': 0x42f2 // EBMLMaxIDLength

	          }, {
	            'data': 8,
	            'id': 0x42f3 // EBMLMaxSizeLength

	          }, {
	            'data': 'webm',
	            'id': 0x4282 // DocType

	          }, {
	            'data': 2,
	            'id': 0x4287 // DocTypeVersion

	          }, {
	            'data': 2,
	            'id': 0x4285 // DocTypeReadVersion

	          }]
	        }, {
	          'id': 0x18538067,
	          // Segment
	          'data': [{
	            'id': 0x1549a966,
	            // Info
	            'data': [{
	              'data': 1e6,
	              //do things in millisecs (num of nanosecs for duration scale)
	              'id': 0x2ad7b1 // TimecodeScale

	            }, {
	              'data': 'whammy',
	              'id': 0x4d80 // MuxingApp

	            }, {
	              'data': 'whammy',
	              'id': 0x5741 // WritingApp

	            }, {
	              'data': doubleToString(info.duration),
	              'id': 0x4489 // Duration

	            }]
	          }, {
	            'id': 0x1654ae6b,
	            // Tracks
	            'data': [{
	              'id': 0xae,
	              // TrackEntry
	              'data': [{
	                'data': 1,
	                'id': 0xd7 // TrackNumber

	              }, {
	                'data': 1,
	                'id': 0x73c5 // TrackUID

	              }, {
	                'data': 0,
	                'id': 0x9c // FlagLacing

	              }, {
	                'data': 'und',
	                'id': 0x22b59c // Language

	              }, {
	                'data': 'V_VP8',
	                'id': 0x86 // CodecID

	              }, {
	                'data': 'VP8',
	                'id': 0x258688 // CodecName

	              }, {
	                'data': 1,
	                'id': 0x83 // TrackType

	              }, {
	                'id': 0xe0,
	                // Video
	                'data': [{
	                  'data': info.width,
	                  'id': 0xb0 // PixelWidth

	                }, {
	                  'data': info.height,
	                  'id': 0xba // PixelHeight

	                }]
	              }]
	            }]
	          }]
	        }]; //Generate clusters (max duration)

	        var frameNumber = 0;
	        var clusterTimecode = 0;

	        while (frameNumber < frames.length) {
	          var clusterFrames = [];
	          var clusterDuration = 0;

	          do {
	            clusterFrames.push(frames[frameNumber]);
	            clusterDuration += frames[frameNumber].duration;
	            frameNumber++;
	          } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

	          var clusterCounter = 0;
	          var cluster = {
	            'id': 0x1f43b675,
	            // Cluster
	            'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
	          }; //Add cluster to segment

	          EBML[1].data.push(cluster);
	          clusterTimecode += clusterDuration;
	        }

	        return generateEBML(EBML);
	      }

	      function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
	        return [{
	          'data': clusterTimecode,
	          'id': 0xe7 // Timecode

	        }].concat(clusterFrames.map(function (webp) {
	          var block = makeSimpleBlock({
	            discardable: 0,
	            frame: webp.data.slice(4),
	            invisible: 0,
	            keyframe: 1,
	            lacing: 0,
	            trackNum: 1,
	            timecode: Math.round(clusterCounter)
	          });
	          clusterCounter += webp.duration;
	          return {
	            data: block,
	            id: 0xa3
	          };
	        }));
	      } // sums the lengths of all the frames and gets the duration


	      function checkFrames(frames) {
	        if (!frames[0]) {
	          postMessage({
	            error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
	          });
	          return;
	        }

	        var width = frames[0].width,
	            height = frames[0].height,
	            duration = frames[0].duration;

	        for (var i = 1; i < frames.length; i++) {
	          duration += frames[i].duration;
	        }

	        return {
	          duration: duration,
	          width: width,
	          height: height
	        };
	      }

	      function numToBuffer(num) {
	        var parts = [];

	        while (num > 0) {
	          parts.push(num & 0xff);
	          num = num >> 8;
	        }

	        return new Uint8Array(parts.reverse());
	      }

	      function strToBuffer(str) {
	        return new Uint8Array(str.split('').map(function (e) {
	          return e.charCodeAt(0);
	        }));
	      }

	      function bitsToBuffer(bits) {
	        var data = [];
	        var pad = bits.length % 8 ? new Array(1 + 8 - bits.length % 8).join('0') : '';
	        bits = pad + bits;

	        for (var i = 0; i < bits.length; i += 8) {
	          data.push(parseInt(bits.substr(i, 8), 2));
	        }

	        return new Uint8Array(data);
	      }

	      function generateEBML(json) {
	        var ebml = [];

	        for (var i = 0; i < json.length; i++) {
	          var data = json[i].data;

	          if (typeof data === 'object') {
	            data = generateEBML(data);
	          }

	          if (typeof data === 'number') {
	            data = bitsToBuffer(data.toString(2));
	          }

	          if (typeof data === 'string') {
	            data = strToBuffer(data);
	          }

	          var len = data.size || data.byteLength || data.length;
	          var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
	          var sizeToString = len.toString(2);
	          var padded = new Array(zeroes * 7 + 7 + 1 - sizeToString.length).join('0') + sizeToString;
	          var size = new Array(zeroes).join('0') + '1' + padded;
	          ebml.push(numToBuffer(json[i].id));
	          ebml.push(bitsToBuffer(size));
	          ebml.push(data);
	        }

	        return new Blob(ebml, {
	          type: 'video/webm'
	        });
	      }

	      function makeSimpleBlock(data) {
	        var flags = 0;

	        if (data.keyframe) {
	          flags |= 128;
	        }

	        if (data.invisible) {
	          flags |= 8;
	        }

	        if (data.lacing) {
	          flags |= data.lacing << 1;
	        }

	        if (data.discardable) {
	          flags |= 1;
	        }

	        if (data.trackNum > 127) {
	          throw 'TrackNumber > 127 not supported';
	        }

	        var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function (e) {
	          return String.fromCharCode(e);
	        }).join('') + data.frame;
	        return out;
	      }

	      function parseWebP(riff) {
	        var VP8 = riff.RIFF[0].WEBP[0];
	        var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header

	        for (var i = 0, c = []; i < 4; i++) {
	          c[i] = VP8.charCodeAt(frameStart + 3 + i);
	        }

	        var width, height, tmp; //the code below is literally copied verbatim from the bitstream spec

	        tmp = c[1] << 8 | c[0];
	        width = tmp & 0x3FFF;
	        tmp = c[3] << 8 | c[2];
	        height = tmp & 0x3FFF;
	        return {
	          width: width,
	          height: height,
	          data: VP8,
	          riff: riff
	        };
	      }

	      function getStrLength(string, offset) {
	        return parseInt(string.substr(offset + 4, 4).split('').map(function (i) {
	          var unpadded = i.charCodeAt(0).toString(2);
	          return new Array(8 - unpadded.length + 1).join('0') + unpadded;
	        }).join(''), 2);
	      }

	      function parseRIFF(string) {
	        var offset = 0;
	        var chunks = {};

	        while (offset < string.length) {
	          var id = string.substr(offset, 4);
	          var len = getStrLength(string, offset);
	          var data = string.substr(offset + 4 + 4, len);
	          offset += 4 + 4 + len;
	          chunks[id] = chunks[id] || [];

	          if (id === 'RIFF' || id === 'LIST') {
	            chunks[id].push(parseRIFF(data));
	          } else {
	            chunks[id].push(data);
	          }
	        }

	        return chunks;
	      }

	      function doubleToString(num) {
	        return [].slice.call(new Uint8Array(new Float64Array([num]).buffer), 0).map(function (e) {
	          return String.fromCharCode(e);
	        }).reverse().join('');
	      }

	      var webm = new ArrayToWebM(frames.map(function (frame) {
	        var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
	        webp.duration = frame.duration;
	        return webp;
	      }));
	      postMessage(webm);
	    }
	    /**
	     * Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
	     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
	     * @method
	     * @memberof Whammy
	     * @example
	     * recorder = new Whammy().Video(0.8, 100);
	     * recorder.compile(function(blob) {
	     *    // blob.size - blob.type
	     * });
	     */


	    WhammyVideo.prototype.compile = function (callback) {
	      var webWorker = processInWebWorker(whammyInWebWorker);

	      webWorker.onmessage = function (event) {
	        if (event.data.error) {
	          console.error(event.data.error);
	          return;
	        }

	        callback(event.data);
	      };

	      webWorker.postMessage(this.frames);
	    };

	    return {
	      /**
	       * A more abstract-ish API.
	       * @method
	       * @memberof Whammy
	       * @example
	       * recorder = new Whammy().Video(0.8, 100);
	       * @param {?number} speed - 0.8
	       * @param {?number} quality - 100
	       */
	      Video: WhammyVideo
	    };
	  }();

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.Whammy = Whammy;
	  } // ______________ (indexed-db)
	  // DiskStorage.js

	  /**
	   * DiskStorage is a standalone object used by {@link RecordRTC} to store recorded blobs in IndexedDB storage.
	   * @summary Writing blobs into IndexedDB.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @example
	   * DiskStorage.Store({
	   *     audioBlob: yourAudioBlob,
	   *     videoBlob: yourVideoBlob,
	   *     gifBlob  : yourGifBlob
	   * });
	   * DiskStorage.Fetch(function(dataURL, type) {
	   *     if(type === 'audioBlob') { }
	   *     if(type === 'videoBlob') { }
	   *     if(type === 'gifBlob')   { }
	   * });
	   * // DiskStorage.dataStoreName = 'recordRTC';
	   * // DiskStorage.onError = function(error) { };
	   * @property {function} init - This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
	   * @property {function} Fetch - This method fetches stored blobs from IndexedDB.
	   * @property {function} Store - This method stores blobs in IndexedDB.
	   * @property {function} onError - This function is invoked for any known/unknown error.
	   * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   */


	  var DiskStorage = {
	    /**
	     * This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
	     * @method
	     * @memberof DiskStorage
	     * @internal
	     * @example
	     * DiskStorage.init();
	     */
	    init: function () {
	      var self = this;

	      if (typeof indexedDB === 'undefined' || typeof indexedDB.open === 'undefined') {
	        console.error('IndexedDB API are not available in this browser.');
	        return;
	      }

	      var dbVersion = 1;
	      var dbName = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ''),
	          db;
	      var request = indexedDB.open(dbName, dbVersion);

	      function createObjectStore(dataBase) {
	        dataBase.createObjectStore(self.dataStoreName);
	      }

	      function putInDB() {
	        var transaction = db.transaction([self.dataStoreName], 'readwrite');

	        if (self.videoBlob) {
	          transaction.objectStore(self.dataStoreName).put(self.videoBlob, 'videoBlob');
	        }

	        if (self.gifBlob) {
	          transaction.objectStore(self.dataStoreName).put(self.gifBlob, 'gifBlob');
	        }

	        if (self.audioBlob) {
	          transaction.objectStore(self.dataStoreName).put(self.audioBlob, 'audioBlob');
	        }

	        function getFromStore(portionName) {
	          transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function (event) {
	            if (self.callback) {
	              self.callback(event.target.result, portionName);
	            }
	          };
	        }

	        getFromStore('audioBlob');
	        getFromStore('videoBlob');
	        getFromStore('gifBlob');
	      }

	      request.onerror = self.onError;

	      request.onsuccess = function () {
	        db = request.result;
	        db.onerror = self.onError;

	        if (db.setVersion) {
	          if (db.version !== dbVersion) {
	            var setVersion = db.setVersion(dbVersion);

	            setVersion.onsuccess = function () {
	              createObjectStore(db);
	              putInDB();
	            };
	          } else {
	            putInDB();
	          }
	        } else {
	          putInDB();
	        }
	      };

	      request.onupgradeneeded = function (event) {
	        createObjectStore(event.target.result);
	      };
	    },

	    /**
	     * This method fetches stored blobs from IndexedDB.
	     * @method
	     * @memberof DiskStorage
	     * @internal
	     * @example
	     * DiskStorage.Fetch(function(dataURL, type) {
	     *     if(type === 'audioBlob') { }
	     *     if(type === 'videoBlob') { }
	     *     if(type === 'gifBlob')   { }
	     * });
	     */
	    Fetch: function (callback) {
	      this.callback = callback;
	      this.init();
	      return this;
	    },

	    /**
	     * This method stores blobs in IndexedDB.
	     * @method
	     * @memberof DiskStorage
	     * @internal
	     * @example
	     * DiskStorage.Store({
	     *     audioBlob: yourAudioBlob,
	     *     videoBlob: yourVideoBlob,
	     *     gifBlob  : yourGifBlob
	     * });
	     */
	    Store: function (config) {
	      this.audioBlob = config.audioBlob;
	      this.videoBlob = config.videoBlob;
	      this.gifBlob = config.gifBlob;
	      this.init();
	      return this;
	    },

	    /**
	     * This function is invoked for any known/unknown error.
	     * @method
	     * @memberof DiskStorage
	     * @internal
	     * @example
	     * DiskStorage.onError = function(error){
	     *     alerot( JSON.stringify(error) );
	     * };
	     */
	    onError: function (error) {
	      console.error(JSON.stringify(error, null, '\t'));
	    },

	    /**
	     * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
	     * @memberof DiskStorage
	     * @internal
	     * @example
	     * DiskStorage.dataStoreName = 'recordRTC';
	     */
	    dataStoreName: 'recordRTC',
	    dbName: null
	  };

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.DiskStorage = DiskStorage;
	  } // ______________
	  // GifRecorder.js

	  /**
	   * GifRecorder is standalone calss used by {@link RecordRTC} to record video or canvas into animated gif.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef GifRecorder
	   * @class
	   * @example
	   * var recorder = new GifRecorder(mediaStream || canvas || context, { onGifPreview: function, onGifRecordingStarted: function, width: 1280, height: 720, frameRate: 200, quality: 10 });
	   * recorder.record();
	   * recorder.stop(function(blob) {
	   *     img.src = URL.createObjectURL(blob);
	   * });
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - MediaStream object or HTMLCanvasElement or CanvasRenderingContext2D.
	   * @param {object} config - {disableLogs:true, initCallback: function, width: 320, height: 240, frameRate: 200, quality: 10}
	   */


	  function GifRecorder(mediaStream, config) {
	    if (typeof GIFEncoder === 'undefined') {
	      var script = document.createElement('script');
	      script.src = 'https://www.webrtc-experiment.com/gif-recorder.js';
	      (document.body || document.documentElement).appendChild(script);
	    }

	    config = config || {};
	    var isHTMLObject = mediaStream instanceof CanvasRenderingContext2D || mediaStream instanceof HTMLCanvasElement;
	    /**
	     * This method records MediaStream.
	     * @method
	     * @memberof GifRecorder
	     * @example
	     * recorder.record();
	     */

	    this.record = function () {
	      if (typeof GIFEncoder === 'undefined') {
	        setTimeout(self.record, 1000);
	        return;
	      }

	      if (!isLoadedMetaData) {
	        setTimeout(self.record, 1000);
	        return;
	      }

	      if (!isHTMLObject) {
	        if (!config.width) {
	          config.width = video.offsetWidth || 320;
	        }

	        if (!config.height) {
	          config.height = video.offsetHeight || 240;
	        }

	        if (!config.video) {
	          config.video = {
	            width: config.width,
	            height: config.height
	          };
	        }

	        if (!config.canvas) {
	          config.canvas = {
	            width: config.width,
	            height: config.height
	          };
	        }

	        canvas.width = config.canvas.width || 320;
	        canvas.height = config.canvas.height || 240;
	        video.width = config.video.width || 320;
	        video.height = config.video.height || 240;
	      } // external library to record as GIF images


	      gifEncoder = new GIFEncoder(); // void setRepeat(int iter)
	      // Sets the number of times the set of GIF frames should be played.
	      // Default is 1; 0 means play indefinitely.

	      gifEncoder.setRepeat(0); // void setFrameRate(Number fps)
	      // Sets frame rate in frames per second.
	      // Equivalent to setDelay(1000/fps).
	      // Using "setDelay" instead of "setFrameRate"

	      gifEncoder.setDelay(config.frameRate || 200); // void setQuality(int quality)
	      // Sets quality of color quantization (conversion of images to the
	      // maximum 256 colors allowed by the GIF specification).
	      // Lower values (minimum = 1) produce better colors,
	      // but slow processing significantly. 10 is the default,
	      // and produces good color mapping at reasonable speeds.
	      // Values greater than 20 do not yield significant improvements in speed.

	      gifEncoder.setQuality(config.quality || 10); // Boolean start()
	      // This writes the GIF Header and returns false if it fails.

	      gifEncoder.start();

	      if (typeof config.onGifRecordingStarted === 'function') {
	        config.onGifRecordingStarted();
	      }

	      function drawVideoFrame(time) {
	        if (self.clearedRecordedData === true) {
	          return;
	        }

	        if (isPausedRecording) {
	          return setTimeout(function () {
	            drawVideoFrame(time);
	          }, 100);
	        }

	        lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

	        if (typeof lastFrameTime === undefined) {
	          lastFrameTime = time;
	        } // ~10 fps


	        if (time - lastFrameTime < 90) {
	          return;
	        }

	        if (!isHTMLObject && video.paused) {
	          // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
	          // Tweak for Android Chrome
	          video.play();
	        }

	        if (!isHTMLObject) {
	          context.drawImage(video, 0, 0, canvas.width, canvas.height);
	        }

	        if (config.onGifPreview) {
	          config.onGifPreview(canvas.toDataURL('image/png'));
	        }

	        gifEncoder.addFrame(context);
	        lastFrameTime = time;
	      }

	      lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

	      if (config.initCallback) {
	        config.initCallback();
	      }
	    };
	    /**
	     * This method stops recording MediaStream.
	     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
	     * @method
	     * @memberof GifRecorder
	     * @example
	     * recorder.stop(function(blob) {
	     *     img.src = URL.createObjectURL(blob);
	     * });
	     */


	    this.stop = function (callback) {
	      callback = callback || function () {};

	      if (lastAnimationFrame) {
	        cancelAnimationFrame(lastAnimationFrame);
	      }
	      /**
	       * @property {Blob} blob - The recorded blob object.
	       * @memberof GifRecorder
	       * @example
	       * recorder.stop(function(){
	       *     var blob = recorder.blob;
	       * });
	       */

	      this.blob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
	        type: 'image/gif'
	      });
	      callback(this.blob); // bug: find a way to clear old recorded blobs

	      gifEncoder.stream().bin = [];
	    };

	    var isPausedRecording = false;
	    /**
	     * This method pauses the recording process.
	     * @method
	     * @memberof GifRecorder
	     * @example
	     * recorder.pause();
	     */

	    this.pause = function () {
	      isPausedRecording = true;
	    };
	    /**
	     * This method resumes the recording process.
	     * @method
	     * @memberof GifRecorder
	     * @example
	     * recorder.resume();
	     */


	    this.resume = function () {
	      isPausedRecording = false;
	    };
	    /**
	     * This method resets currently recorded data.
	     * @method
	     * @memberof GifRecorder
	     * @example
	     * recorder.clearRecordedData();
	     */


	    this.clearRecordedData = function () {
	      self.clearedRecordedData = true;
	      clearRecordedDataCB();
	    };

	    function clearRecordedDataCB() {
	      if (gifEncoder) {
	        gifEncoder.stream().bin = [];
	      }
	    } // for debugging


	    this.name = 'GifRecorder';

	    this.toString = function () {
	      return this.name;
	    };

	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');

	    if (isHTMLObject) {
	      if (mediaStream instanceof CanvasRenderingContext2D) {
	        context = mediaStream;
	        canvas = context.canvas;
	      } else if (mediaStream instanceof HTMLCanvasElement) {
	        context = mediaStream.getContext('2d');
	        canvas = mediaStream;
	      }
	    }

	    var isLoadedMetaData = true;

	    if (!isHTMLObject) {
	      var video = document.createElement('video');
	      video.muted = true;
	      video.autoplay = true;
	      video.playsInline = true;
	      isLoadedMetaData = false;

	      video.onloadedmetadata = function () {
	        isLoadedMetaData = true;
	      };

	      setSrcObject(mediaStream, video);
	      video.play();
	    }

	    var lastAnimationFrame = null;
	    var lastFrameTime;
	    var gifEncoder;
	    var self = this;
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.GifRecorder = GifRecorder;
	  } // Last time updated: 2019-06-21 4:09:42 AM UTC
	  // ________________________
	  // MultiStreamsMixer v1.2.2
	  // Open-Sourced: https://github.com/muaz-khan/MultiStreamsMixer
	  // --------------------------------------------------
	  // Muaz Khan     - www.MuazKhan.com
	  // MIT License   - www.WebRTC-Experiment.com/licence
	  // --------------------------------------------------


	  function MultiStreamsMixer(arrayOfMediaStreams, elementClass) {
	    var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

	    (function (that) {
	      if (typeof RecordRTC !== 'undefined') {
	        return;
	      }

	      if (!that) {
	        return;
	      }

	      if (typeof window !== 'undefined') {
	        return;
	      }

	      if (typeof commonjsGlobal === 'undefined') {
	        return;
	      }

	      commonjsGlobal.navigator = {
	        userAgent: browserFakeUserAgent,
	        getUserMedia: function () {}
	      };

	      if (!commonjsGlobal.console) {
	        commonjsGlobal.console = {};
	      }

	      if (typeof commonjsGlobal.console.log === 'undefined' || typeof commonjsGlobal.console.error === 'undefined') {
	        commonjsGlobal.console.error = commonjsGlobal.console.log = commonjsGlobal.console.log || function () {
	          console.log(arguments);
	        };
	      }

	      if (typeof document === 'undefined') {
	        /*global document:true */
	        that.document = {
	          documentElement: {
	            appendChild: function () {
	              return '';
	            }
	          }
	        };

	        document.createElement = document.captureStream = document.mozCaptureStream = function () {
	          var obj = {
	            getContext: function () {
	              return obj;
	            },
	            play: function () {},
	            pause: function () {},
	            drawImage: function () {},
	            toDataURL: function () {
	              return '';
	            },
	            style: {}
	          };
	          return obj;
	        };

	        that.HTMLVideoElement = function () {};
	      }

	      if (typeof location === 'undefined') {
	        /*global location:true */
	        that.location = {
	          protocol: 'file:',
	          href: '',
	          hash: ''
	        };
	      }

	      if (typeof screen === 'undefined') {
	        /*global screen:true */
	        that.screen = {
	          width: 0,
	          height: 0
	        };
	      }

	      if (typeof URL === 'undefined') {
	        /*global screen:true */
	        that.URL = {
	          createObjectURL: function () {
	            return '';
	          },
	          revokeObjectURL: function () {
	            return '';
	          }
	        };
	      }
	      /*global window:true */


	      that.window = commonjsGlobal;
	    })(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : null); // requires: chrome://flags/#enable-experimental-web-platform-features


	    elementClass = elementClass || 'multi-streams-mixer';
	    var videos = [];
	    var isStopDrawingFrames = false;
	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');
	    canvas.style.opacity = 0;
	    canvas.style.position = 'absolute';
	    canvas.style.zIndex = -1;
	    canvas.style.top = '-1000em';
	    canvas.style.left = '-1000em';
	    canvas.className = elementClass;
	    (document.body || document.documentElement).appendChild(canvas);
	    this.disableLogs = false;
	    this.frameInterval = 10;
	    this.width = 360;
	    this.height = 240; // use gain node to prevent echo

	    this.useGainNode = true;
	    var self = this; // _____________________________
	    // Cross-Browser-Declarations.js
	    // WebAudio API representer

	    var AudioContext = window.AudioContext;

	    if (typeof AudioContext === 'undefined') {
	      if (typeof webkitAudioContext !== 'undefined') {
	        /*global AudioContext:true */
	        AudioContext = webkitAudioContext;
	      }

	      if (typeof mozAudioContext !== 'undefined') {
	        /*global AudioContext:true */
	        AudioContext = mozAudioContext;
	      }
	    }
	    /*jshint -W079 */


	    var URL = window.URL;

	    if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
	      /*global URL:true */
	      URL = webkitURL;
	    }

	    if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') {
	      // maybe window.navigator?
	      if (typeof navigator.webkitGetUserMedia !== 'undefined') {
	        navigator.getUserMedia = navigator.webkitGetUserMedia;
	      }

	      if (typeof navigator.mozGetUserMedia !== 'undefined') {
	        navigator.getUserMedia = navigator.mozGetUserMedia;
	      }
	    }

	    var MediaStream = window.MediaStream;

	    if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
	      MediaStream = webkitMediaStream;
	    }
	    /*global MediaStream:true */


	    if (typeof MediaStream !== 'undefined') {
	      // override "stop" method for all browsers
	      if (typeof MediaStream.prototype.stop === 'undefined') {
	        MediaStream.prototype.stop = function () {
	          this.getTracks().forEach(function (track) {
	            track.stop();
	          });
	        };
	      }
	    }

	    var Storage = {};

	    if (typeof AudioContext !== 'undefined') {
	      Storage.AudioContext = AudioContext;
	    } else if (typeof webkitAudioContext !== 'undefined') {
	      Storage.AudioContext = webkitAudioContext;
	    }

	    function setSrcObject(stream, element) {
	      if ('srcObject' in element) {
	        element.srcObject = stream;
	      } else if ('mozSrcObject' in element) {
	        element.mozSrcObject = stream;
	      } else {
	        element.srcObject = stream;
	      }
	    }

	    this.startDrawingFrames = function () {
	      drawVideosToCanvas();
	    };

	    function drawVideosToCanvas() {
	      if (isStopDrawingFrames) {
	        return;
	      }

	      var videosLength = videos.length;
	      var fullcanvas = false;
	      var remaining = [];
	      videos.forEach(function (video) {
	        if (!video.stream) {
	          video.stream = {};
	        }

	        if (video.stream.fullcanvas) {
	          fullcanvas = video;
	        } else {
	          // todo: video.stream.active or video.stream.live to fix blank frames issues?
	          remaining.push(video);
	        }
	      });

	      if (fullcanvas) {
	        canvas.width = fullcanvas.stream.width;
	        canvas.height = fullcanvas.stream.height;
	      } else if (remaining.length) {
	        canvas.width = videosLength > 1 ? remaining[0].width * 2 : remaining[0].width;
	        var height = 1;

	        if (videosLength === 3 || videosLength === 4) {
	          height = 2;
	        }

	        if (videosLength === 5 || videosLength === 6) {
	          height = 3;
	        }

	        if (videosLength === 7 || videosLength === 8) {
	          height = 4;
	        }

	        if (videosLength === 9 || videosLength === 10) {
	          height = 5;
	        }

	        canvas.height = remaining[0].height * height;
	      } else {
	        canvas.width = self.width || 360;
	        canvas.height = self.height || 240;
	      }

	      if (fullcanvas && fullcanvas instanceof HTMLVideoElement) {
	        drawImage(fullcanvas);
	      }

	      remaining.forEach(function (video, idx) {
	        drawImage(video, idx);
	      });
	      setTimeout(drawVideosToCanvas, self.frameInterval);
	    }

	    function drawImage(video, idx) {
	      if (isStopDrawingFrames) {
	        return;
	      }

	      var x = 0;
	      var y = 0;
	      var width = video.width;
	      var height = video.height;

	      if (idx === 1) {
	        x = video.width;
	      }

	      if (idx === 2) {
	        y = video.height;
	      }

	      if (idx === 3) {
	        x = video.width;
	        y = video.height;
	      }

	      if (idx === 4) {
	        y = video.height * 2;
	      }

	      if (idx === 5) {
	        x = video.width;
	        y = video.height * 2;
	      }

	      if (idx === 6) {
	        y = video.height * 3;
	      }

	      if (idx === 7) {
	        x = video.width;
	        y = video.height * 3;
	      }

	      if (typeof video.stream.left !== 'undefined') {
	        x = video.stream.left;
	      }

	      if (typeof video.stream.top !== 'undefined') {
	        y = video.stream.top;
	      }

	      if (typeof video.stream.width !== 'undefined') {
	        width = video.stream.width;
	      }

	      if (typeof video.stream.height !== 'undefined') {
	        height = video.stream.height;
	      }

	      context.drawImage(video, x, y, width, height);

	      if (typeof video.stream.onRender === 'function') {
	        video.stream.onRender(context, x, y, width, height, idx);
	      }
	    }

	    function getMixedStream() {
	      isStopDrawingFrames = false;
	      var mixedVideoStream = getMixedVideoStream();
	      var mixedAudioStream = getMixedAudioStream();

	      if (mixedAudioStream) {
	        mixedAudioStream.getTracks().filter(function (t) {
	          return t.kind === 'audio';
	        }).forEach(function (track) {
	          mixedVideoStream.addTrack(track);
	        });
	      }
	      arrayOfMediaStreams.forEach(function (stream) {
	        if (stream.fullcanvas) ;
	      }); // mixedVideoStream.prototype.appendStreams = appendStreams;
	      // mixedVideoStream.prototype.resetVideoStreams = resetVideoStreams;
	      // mixedVideoStream.prototype.clearRecordedData = clearRecordedData;

	      return mixedVideoStream;
	    }

	    function getMixedVideoStream() {
	      resetVideoStreams();
	      var capturedStream;

	      if ('captureStream' in canvas) {
	        capturedStream = canvas.captureStream();
	      } else if ('mozCaptureStream' in canvas) {
	        capturedStream = canvas.mozCaptureStream();
	      } else if (!self.disableLogs) {
	        console.error('Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features');
	      }

	      var videoStream = new MediaStream();
	      capturedStream.getTracks().filter(function (t) {
	        return t.kind === 'video';
	      }).forEach(function (track) {
	        videoStream.addTrack(track);
	      });
	      canvas.stream = videoStream;
	      return videoStream;
	    }

	    function getMixedAudioStream() {
	      // via: @pehrsons
	      if (!Storage.AudioContextConstructor) {
	        Storage.AudioContextConstructor = new Storage.AudioContext();
	      }

	      self.audioContext = Storage.AudioContextConstructor;
	      self.audioSources = [];

	      if (self.useGainNode === true) {
	        self.gainNode = self.audioContext.createGain();
	        self.gainNode.connect(self.audioContext.destination);
	        self.gainNode.gain.value = 0; // don't hear self
	      }

	      var audioTracksLength = 0;
	      arrayOfMediaStreams.forEach(function (stream) {
	        if (!stream.getTracks().filter(function (t) {
	          return t.kind === 'audio';
	        }).length) {
	          return;
	        }

	        audioTracksLength++;
	        var audioSource = self.audioContext.createMediaStreamSource(stream);

	        if (self.useGainNode === true) {
	          audioSource.connect(self.gainNode);
	        }

	        self.audioSources.push(audioSource);
	      });

	      if (!audioTracksLength) {
	        // because "self.audioContext" is not initialized
	        // that's why we've to ignore rest of the code
	        return;
	      }

	      self.audioDestination = self.audioContext.createMediaStreamDestination();
	      self.audioSources.forEach(function (audioSource) {
	        audioSource.connect(self.audioDestination);
	      });
	      return self.audioDestination.stream;
	    }

	    function getVideo(stream) {
	      var video = document.createElement('video');
	      setSrcObject(stream, video);
	      video.className = elementClass;
	      video.muted = true;
	      video.volume = 0;
	      video.width = stream.width || self.width || 360;
	      video.height = stream.height || self.height || 240;
	      video.play();
	      return video;
	    }

	    this.appendStreams = function (streams) {
	      if (!streams) {
	        throw 'First parameter is required.';
	      }

	      if (!(streams instanceof Array)) {
	        streams = [streams];
	      }

	      streams.forEach(function (stream) {
	        var newStream = new MediaStream();

	        if (stream.getTracks().filter(function (t) {
	          return t.kind === 'video';
	        }).length) {
	          var video = getVideo(stream);
	          video.stream = stream;
	          videos.push(video);
	          newStream.addTrack(stream.getTracks().filter(function (t) {
	            return t.kind === 'video';
	          })[0]);
	        }

	        if (stream.getTracks().filter(function (t) {
	          return t.kind === 'audio';
	        }).length) {
	          var audioSource = self.audioContext.createMediaStreamSource(stream);
	          self.audioDestination = self.audioContext.createMediaStreamDestination();
	          audioSource.connect(self.audioDestination);
	          newStream.addTrack(self.audioDestination.stream.getTracks().filter(function (t) {
	            return t.kind === 'audio';
	          })[0]);
	        }

	        arrayOfMediaStreams.push(newStream);
	      });
	    };

	    this.releaseStreams = function () {
	      videos = [];
	      isStopDrawingFrames = true;

	      if (self.gainNode) {
	        self.gainNode.disconnect();
	        self.gainNode = null;
	      }

	      if (self.audioSources.length) {
	        self.audioSources.forEach(function (source) {
	          source.disconnect();
	        });
	        self.audioSources = [];
	      }

	      if (self.audioDestination) {
	        self.audioDestination.disconnect();
	        self.audioDestination = null;
	      }

	      if (self.audioContext) {
	        self.audioContext.close();
	      }

	      self.audioContext = null;
	      context.clearRect(0, 0, canvas.width, canvas.height);

	      if (canvas.stream) {
	        canvas.stream.stop();
	        canvas.stream = null;
	      }
	    };

	    this.resetVideoStreams = function (streams) {
	      if (streams && !(streams instanceof Array)) {
	        streams = [streams];
	      }

	      resetVideoStreams(streams);
	    };

	    function resetVideoStreams(streams) {
	      videos = [];
	      streams = streams || arrayOfMediaStreams; // via: @adrian-ber

	      streams.forEach(function (stream) {
	        if (!stream.getTracks().filter(function (t) {
	          return t.kind === 'video';
	        }).length) {
	          return;
	        }

	        var video = getVideo(stream);
	        video.stream = stream;
	        videos.push(video);
	      });
	    } // for debugging


	    this.name = 'MultiStreamsMixer';

	    this.toString = function () {
	      return this.name;
	    };

	    this.getMixedStream = getMixedStream;
	  }

	  if (typeof RecordRTC === 'undefined') {
	    {
	      module.exports = MultiStreamsMixer;
	    }
	  } // ______________________
	  // MultiStreamRecorder.js

	  /*
	   * Video conference recording, using captureStream API along with WebAudio and Canvas2D API.
	   */

	  /**
	   * MultiStreamRecorder can record multiple videos in single container.
	   * @summary Multi-videos recorder.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef MultiStreamRecorder
	   * @class
	   * @example
	   * var options = {
	   *     mimeType: 'video/webm'
	   * }
	   * var recorder = new MultiStreamRecorder(ArrayOfMediaStreams, options);
	   * recorder.record();
	   * recorder.stop(function(blob) {
	   *     video.src = URL.createObjectURL(blob);
	   *
	   *     // or
	   *     var blob = recorder.blob;
	   * });
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStreams} mediaStreams - Array of MediaStreams.
	   * @param {object} config - {disableLogs:true, frameInterval: 1, mimeType: "video/webm"}
	   */


	  function MultiStreamRecorder(arrayOfMediaStreams, options) {
	    arrayOfMediaStreams = arrayOfMediaStreams || [];
	    var self = this;
	    var mixer;
	    var mediaRecorder;
	    options = options || {
	      elementClass: 'multi-streams-mixer',
	      mimeType: 'video/webm',
	      video: {
	        width: 360,
	        height: 240
	      }
	    };

	    if (!options.frameInterval) {
	      options.frameInterval = 10;
	    }

	    if (!options.video) {
	      options.video = {};
	    }

	    if (!options.video.width) {
	      options.video.width = 360;
	    }

	    if (!options.video.height) {
	      options.video.height = 240;
	    }
	    /**
	     * This method records all MediaStreams.
	     * @method
	     * @memberof MultiStreamRecorder
	     * @example
	     * recorder.record();
	     */


	    this.record = function () {
	      // github/muaz-khan/MultiStreamsMixer
	      mixer = new MultiStreamsMixer(arrayOfMediaStreams, options.elementClass || 'multi-streams-mixer');

	      if (getAllVideoTracks().length) {
	        mixer.frameInterval = options.frameInterval || 10;
	        mixer.width = options.video.width || 360;
	        mixer.height = options.video.height || 240;
	        mixer.startDrawingFrames();
	      }

	      if (options.previewStream && typeof options.previewStream === 'function') {
	        options.previewStream(mixer.getMixedStream());
	      } // record using MediaRecorder API


	      mediaRecorder = new MediaStreamRecorder(mixer.getMixedStream(), options);
	      mediaRecorder.record();
	    };

	    function getAllVideoTracks() {
	      var tracks = [];
	      arrayOfMediaStreams.forEach(function (stream) {
	        getTracks(stream, 'video').forEach(function (track) {
	          tracks.push(track);
	        });
	      });
	      return tracks;
	    }
	    /**
	     * This method stops recording MediaStream.
	     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
	     * @method
	     * @memberof MultiStreamRecorder
	     * @example
	     * recorder.stop(function(blob) {
	     *     video.src = URL.createObjectURL(blob);
	     * });
	     */


	    this.stop = function (callback) {
	      if (!mediaRecorder) {
	        return;
	      }

	      mediaRecorder.stop(function (blob) {
	        self.blob = blob;
	        callback(blob);
	        self.clearRecordedData();
	      });
	    };
	    /**
	     * This method pauses the recording process.
	     * @method
	     * @memberof MultiStreamRecorder
	     * @example
	     * recorder.pause();
	     */


	    this.pause = function () {
	      if (mediaRecorder) {
	        mediaRecorder.pause();
	      }
	    };
	    /**
	     * This method resumes the recording process.
	     * @method
	     * @memberof MultiStreamRecorder
	     * @example
	     * recorder.resume();
	     */


	    this.resume = function () {
	      if (mediaRecorder) {
	        mediaRecorder.resume();
	      }
	    };
	    /**
	     * This method resets currently recorded data.
	     * @method
	     * @memberof MultiStreamRecorder
	     * @example
	     * recorder.clearRecordedData();
	     */


	    this.clearRecordedData = function () {
	      if (mediaRecorder) {
	        mediaRecorder.clearRecordedData();
	        mediaRecorder = null;
	      }

	      if (mixer) {
	        mixer.releaseStreams();
	        mixer = null;
	      }
	    };
	    /**
	     * Add extra media-streams to existing recordings.
	     * @method
	     * @memberof MultiStreamRecorder
	     * @param {MediaStreams} mediaStreams - Array of MediaStreams
	     * @example
	     * recorder.addStreams([newAudioStream, newVideoStream]);
	     */


	    this.addStreams = function (streams) {
	      if (!streams) {
	        throw 'First parameter is required.';
	      }

	      if (!(streams instanceof Array)) {
	        streams = [streams];
	      }

	      arrayOfMediaStreams.concat(streams);

	      if (!mediaRecorder || !mixer) {
	        return;
	      }

	      mixer.appendStreams(streams);

	      if (options.previewStream && typeof options.previewStream === 'function') {
	        options.previewStream(mixer.getMixedStream());
	      }
	    };
	    /**
	     * Reset videos during live recording. Replace old videos e.g. replace cameras with full-screen.
	     * @method
	     * @memberof MultiStreamRecorder
	     * @param {MediaStreams} mediaStreams - Array of MediaStreams
	     * @example
	     * recorder.resetVideoStreams([newVideo1, newVideo2]);
	     */


	    this.resetVideoStreams = function (streams) {
	      if (!mixer) {
	        return;
	      }

	      if (streams && !(streams instanceof Array)) {
	        streams = [streams];
	      }

	      mixer.resetVideoStreams(streams);
	    };
	    /**
	     * Returns MultiStreamsMixer
	     * @method
	     * @memberof MultiStreamRecorder
	     * @example
	     * let mixer = recorder.getMixer();
	     * mixer.appendStreams([newStream]);
	     */


	    this.getMixer = function () {
	      return mixer;
	    }; // for debugging


	    this.name = 'MultiStreamRecorder';

	    this.toString = function () {
	      return this.name;
	    };
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.MultiStreamRecorder = MultiStreamRecorder;
	  } // _____________________
	  // RecordRTC.promises.js

	  /**
	   * RecordRTCPromisesHandler adds promises support in {@link RecordRTC}. Try a {@link https://github.com/muaz-khan/RecordRTC/blob/master/simple-demos/RecordRTCPromisesHandler.html|demo here}
	   * @summary Promises for {@link RecordRTC}
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef RecordRTCPromisesHandler
	   * @class
	   * @example
	   * var recorder = new RecordRTCPromisesHandler(mediaStream, options);
	   * recorder.startRecording()
	   *         .then(successCB)
	   *         .catch(errorCB);
	   * // Note: You can access all RecordRTC API using "recorder.recordRTC" e.g.
	   * recorder.recordRTC.onStateChanged = function(state) {};
	   * recorder.recordRTC.setRecordingDuration(5000);
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
	   * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
	   * @throws Will throw an error if "new" keyword is not used to initiate "RecordRTCPromisesHandler". Also throws error if first argument "MediaStream" is missing.
	   * @requires {@link RecordRTC}
	   */


	  function RecordRTCPromisesHandler(mediaStream, options) {
	    if (!this) {
	      throw 'Use "new RecordRTCPromisesHandler()"';
	    }

	    if (typeof mediaStream === 'undefined') {
	      throw 'First argument "MediaStream" is required.';
	    }

	    var self = this;
	    /**
	     * @property {Blob} blob - Access/reach the native {@link RecordRTC} object.
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * let internal = recorder.recordRTC.getInternalRecorder();
	     * alert(internal instanceof MediaStreamRecorder);
	     * recorder.recordRTC.onStateChanged = function(state) {};
	     */

	    self.recordRTC = new RecordRTC(mediaStream, options);
	    /**
	     * This method records MediaStream.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * recorder.startRecording()
	     *         .then(successCB)
	     *         .catch(errorCB);
	     */

	    this.startRecording = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          self.recordRTC.startRecording();
	          resolve();
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * This method stops the recording.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * recorder.stopRecording().then(function() {
	     *     var blob = recorder.getBlob();
	     * }).catch(errorCB);
	     */


	    this.stopRecording = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          self.recordRTC.stopRecording(function (url) {
	            self.blob = self.recordRTC.getBlob();

	            if (!self.blob || !self.blob.size) {
	              reject('Empty blob.', self.blob);
	              return;
	            }

	            resolve(url);
	          });
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * This method pauses the recording. You can resume recording using "resumeRecording" method.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * recorder.pauseRecording()
	     *         .then(successCB)
	     *         .catch(errorCB);
	     */


	    this.pauseRecording = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          self.recordRTC.pauseRecording();
	          resolve();
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * This method resumes the recording.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * recorder.resumeRecording()
	     *         .then(successCB)
	     *         .catch(errorCB);
	     */


	    this.resumeRecording = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          self.recordRTC.resumeRecording();
	          resolve();
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * This method returns data-url for the recorded blob.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * recorder.stopRecording().then(function() {
	     *     recorder.getDataURL().then(function(dataURL) {
	     *         window.open(dataURL);
	     *     }).catch(errorCB);;
	     * }).catch(errorCB);
	     */


	    this.getDataURL = function (callback) {
	      return new Promise(function (resolve, reject) {
	        try {
	          self.recordRTC.getDataURL(function (dataURL) {
	            resolve(dataURL);
	          });
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * This method returns the recorded blob.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * recorder.stopRecording().then(function() {
	     *     recorder.getBlob().then(function(blob) {})
	     * }).catch(errorCB);
	     */


	    this.getBlob = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          resolve(self.recordRTC.getBlob());
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * This method returns the internal recording object.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * let internalRecorder = await recorder.getInternalRecorder();
	     * if(internalRecorder instanceof MultiStreamRecorder) {
	     *     internalRecorder.addStreams([newAudioStream]);
	     *     internalRecorder.resetVideoStreams([screenStream]);
	     * }
	     * @returns {Object}
	     */


	    this.getInternalRecorder = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          resolve(self.recordRTC.getInternalRecorder());
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * This method resets the recorder. So that you can reuse single recorder instance many times.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * await recorder.reset();
	     * recorder.startRecording(); // record again
	     */


	    this.reset = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          resolve(self.recordRTC.reset());
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * Destroy RecordRTC instance. Clear all recorders and objects.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * recorder.destroy().then(successCB).catch(errorCB);
	     */


	    this.destroy = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          resolve(self.recordRTC.destroy());
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * Get recorder's readonly state.
	     * @method
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * let state = await recorder.getState();
	     * // or
	     * recorder.getState().then(state => { console.log(state); })
	     * @returns {String} Returns recording state.
	     */


	    this.getState = function () {
	      return new Promise(function (resolve, reject) {
	        try {
	          resolve(self.recordRTC.getState());
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };
	    /**
	     * @property {Blob} blob - Recorded data as "Blob" object.
	     * @memberof RecordRTCPromisesHandler
	     * @example
	     * await recorder.stopRecording();
	     * let blob = recorder.getBlob(); // or "recorder.recordRTC.blob"
	     * invokeSaveAsDialog(blob);
	     */


	    this.blob = null;
	    /**
	     * RecordRTC version number
	     * @property {String} version - Release version number.
	     * @memberof RecordRTCPromisesHandler
	     * @static
	     * @readonly
	     * @example
	     * alert(recorder.version);
	     */

	    this.version = '5.6.2';
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.RecordRTCPromisesHandler = RecordRTCPromisesHandler;
	  } // ______________________
	  // WebAssemblyRecorder.js

	  /**
	   * WebAssemblyRecorder lets you create webm videos in JavaScript via WebAssembly. The library consumes raw RGBA32 buffers (4 bytes per pixel) and turns them into a webm video with the given framerate and quality. This makes it compatible out-of-the-box with ImageData from a CANVAS. With realtime mode you can also use webm-wasm for streaming webm videos.
	   * @summary Video recording feature in Chrome, Firefox and maybe Edge.
	   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
	   * @author {@link https://MuazKhan.com|Muaz Khan}
	   * @typedef WebAssemblyRecorder
	   * @class
	   * @example
	   * var recorder = new WebAssemblyRecorder(mediaStream);
	   * recorder.record();
	   * recorder.stop(function(blob) {
	   *     video.src = URL.createObjectURL(blob);
	   * });
	   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
	   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
	   * @param {object} config - {webAssemblyPath:'webm-wasm.wasm',workerPath: 'webm-worker.js', frameRate: 30, width: 1920, height: 1080, bitrate: 1024, realtime: true}
	   */


	  function WebAssemblyRecorder(stream, config) {
	    // based on: github.com/GoogleChromeLabs/webm-wasm
	    if (typeof ReadableStream === 'undefined' || typeof WritableStream === 'undefined') {
	      // because it fixes readable/writable streams issues
	      console.error('Following polyfill is strongly recommended: https://unpkg.com/@mattiasbuelens/web-streams-polyfill/dist/polyfill.min.js');
	    }

	    config = config || {};
	    config.width = config.width || 640;
	    config.height = config.height || 480;
	    config.frameRate = config.frameRate || 30;
	    config.bitrate = config.bitrate || 1200;
	    config.realtime = config.realtime || true;

	    var finished;

	    function cameraStream() {
	      return new ReadableStream({
	        start: function (controller) {
	          var cvs = document.createElement('canvas');
	          var video = document.createElement('video');
	          var first = true;
	          video.srcObject = stream;
	          video.muted = true;
	          video.height = config.height;
	          video.width = config.width;
	          video.volume = 0;

	          video.onplaying = function () {
	            cvs.width = config.width;
	            cvs.height = config.height;
	            var ctx = cvs.getContext('2d');
	            var frameTimeout = 1000 / config.frameRate;
	            var cameraTimer = setInterval(function f() {
	              if (finished) {
	                clearInterval(cameraTimer);
	                controller.close();
	              }

	              if (first) {
	                first = false;

	                if (config.onVideoProcessStarted) {
	                  config.onVideoProcessStarted();
	                }
	              }

	              ctx.drawImage(video, 0, 0);

	              if (controller._controlledReadableStream.state !== 'closed') {
	                try {
	                  controller.enqueue(ctx.getImageData(0, 0, config.width, config.height));
	                } catch (e) {}
	              }
	            }, frameTimeout);
	          };

	          video.play();
	        }
	      });
	    }

	    var worker;

	    function startRecording(stream, buffer) {
	      if (!config.workerPath && !buffer) {
	        finished = false; // is it safe to use @latest ?

	        fetch('https://unpkg.com/webm-wasm@latest/dist/webm-worker.js').then(function (r) {
	          r.arrayBuffer().then(function (buffer) {
	            startRecording(stream, buffer);
	          });
	        });
	        return;
	      }

	      if (!config.workerPath && buffer instanceof ArrayBuffer) {
	        var blob = new Blob([buffer], {
	          type: 'text/javascript'
	        });
	        config.workerPath = URL.createObjectURL(blob);
	      }

	      if (!config.workerPath) {
	        console.error('workerPath parameter is missing.');
	      }

	      worker = new Worker(config.workerPath);
	      worker.postMessage(config.webAssemblyPath || 'https://unpkg.com/webm-wasm@latest/dist/webm-wasm.wasm');
	      worker.addEventListener('message', function (event) {
	        if (event.data === 'READY') {
	          worker.postMessage({
	            width: config.width,
	            height: config.height,
	            bitrate: config.bitrate || 1200,
	            timebaseDen: config.frameRate || 30,
	            realtime: config.realtime
	          });
	          cameraStream().pipeTo(new WritableStream({
	            write: function (image) {
	              if (finished) {
	                console.error('Got image, but recorder is finished!');
	                return;
	              }

	              worker.postMessage(image.data.buffer, [image.data.buffer]);
	            }
	          }));
	        } else if (!!event.data) {
	          if (!isPaused) {
	            arrayOfBuffers.push(event.data);
	          }
	        }
	      });
	    }
	    /**
	     * This method records video.
	     * @method
	     * @memberof WebAssemblyRecorder
	     * @example
	     * recorder.record();
	     */


	    this.record = function () {
	      arrayOfBuffers = [];
	      isPaused = false;
	      this.blob = null;
	      startRecording(stream);

	      if (typeof config.initCallback === 'function') {
	        config.initCallback();
	      }
	    };

	    var isPaused;
	    /**
	     * This method pauses the recording process.
	     * @method
	     * @memberof WebAssemblyRecorder
	     * @example
	     * recorder.pause();
	     */

	    this.pause = function () {
	      isPaused = true;
	    };
	    /**
	     * This method resumes the recording process.
	     * @method
	     * @memberof WebAssemblyRecorder
	     * @example
	     * recorder.resume();
	     */


	    this.resume = function () {
	      isPaused = false;
	    };

	    function terminate(callback) {
	      if (!worker) {
	        if (callback) {
	          callback();
	        }

	        return;
	      } // Wait for null event data to indicate that the encoding is complete


	      worker.addEventListener('message', function (event) {
	        if (event.data === null) {
	          worker.terminate();
	          worker = null;

	          if (callback) {
	            callback();
	          }
	        }
	      });
	      worker.postMessage(null);
	    }

	    var arrayOfBuffers = [];
	    /**
	     * This method stops recording video.
	     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
	     * @method
	     * @memberof WebAssemblyRecorder
	     * @example
	     * recorder.stop(function(blob) {
	     *     video.src = URL.createObjectURL(blob);
	     * });
	     */

	    this.stop = function (callback) {
	      finished = true;
	      var recorder = this;
	      terminate(function () {
	        recorder.blob = new Blob(arrayOfBuffers, {
	          type: 'video/webm'
	        });
	        callback(recorder.blob);
	      });
	    }; // for debugging


	    this.name = 'WebAssemblyRecorder';

	    this.toString = function () {
	      return this.name;
	    };
	    /**
	     * This method resets currently recorded data.
	     * @method
	     * @memberof WebAssemblyRecorder
	     * @example
	     * recorder.clearRecordedData();
	     */


	    this.clearRecordedData = function () {
	      arrayOfBuffers = [];
	      isPaused = false;
	      this.blob = null; // todo: if recording-ON then STOP it first
	    };
	    /**
	     * @property {Blob} blob - The recorded blob object.
	     * @memberof WebAssemblyRecorder
	     * @example
	     * recorder.stop(function(){
	     *     var blob = recorder.blob;
	     * });
	     */


	    this.blob = null;
	  }

	  if (typeof RecordRTC !== 'undefined') {
	    RecordRTC.WebAssemblyRecorder = WebAssemblyRecorder;
	  }
	});

	class RecordRTCLoader extends Emitter {
	  constructor(player) {
	    super();
	    this.player = player;
	    this.fileName = '';
	    this.fileType = FILE_SUFFIX$1.webm;
	    this.isRecording = false;
	    this.recordingTimestamp = 0;
	    this.recordingInterval = null;
	    player.debug.log('Recorder', 'init');
	  }

	  destroy() {
	    this._reset();

	    this.player.debug.log('Recorder', 'destroy');
	  }

	  setFileName(fileName, fileType) {
	    this.fileName = fileName;

	    if (FILE_SUFFIX$1.mp4 === fileType || FILE_SUFFIX$1.webm === fileType) {
	      this.fileType = fileType;
	    }
	  }

	  get recording() {
	    return this.isRecording;
	  }

	  get recordTime() {
	    return this.recordingTimestamp;
	  }

	  startRecord() {
	    const debug = this.player.debug;
	    const options = {
	      type: 'video',
	      mimeType: 'video/webm;codecs=h264',
	      onTimeStamp: timestamp => {
	        debug.log('Recorder', 'record timestamp :' + timestamp);
	      },
	      disableLogs: !this.player._opt.debug
	    };

	    try {
	      const stream = this.player.video.$videoElement.captureStream(25);

	      if (this.player.audio.mediaStreamAudioDestinationNode && this.player.audio.mediaStreamAudioDestinationNode.stream && !this.player.audio.isStateSuspended() && this.player.audio.hasAudio) {
	        const audioStream = this.player.audio.mediaStreamAudioDestinationNode.stream;

	        if (audioStream.getAudioTracks().length > 0) {
	          const audioTrack = audioStream.getAudioTracks()[0];

	          if (audioTrack && audioTrack.enabled) {
	            stream.addTrack(audioTrack);
	          }
	        }
	      }

	      this.recorder = RecordRTC_1(stream, options);
	    } catch (e) {
	      debug.error('Recorder', e);
	      this.emit(EVENTS.recordCreateError);
	    }

	    if (this.recorder) {
	      this.isRecording = true;
	      this.emit(EVENTS.recording, true);
	      this.recorder.startRecording();
	      debug.log('Recorder', 'start recording');
	      this.player.emit(EVENTS.recordStart);
	      this.recordingInterval = window.setInterval(() => {
	        this.recordingTimestamp += 1;
	        this.player.emit(EVENTS.recordingTimestamp, this.recordingTimestamp);
	      }, 1000);
	    }
	  }

	  stopRecordAndSave() {
	    if (!this.recorder || !this.isRecording) {
	      return;
	    }

	    this.recorder.stopRecording(() => {
	      this.player.debug.log('Recorder', 'stop recording');
	      this.player.emit(EVENTS.recordEnd);
	      downloadRecord(this.recorder.getBlob(), this.fileName, this.fileType);

	      this._reset();

	      this.player.emit(EVENTS.recording, false);
	    });
	  }

	  _reset() {
	    this.isRecording = false;
	    this.recordingTimestamp = 0;

	    if (this.recorder) {
	      this.recorder.destroy();
	      this.recorder = null;
	    }

	    this.fileName = null;

	    if (this.recordingInterval) {
	      clearInterval(this.recordingInterval);
	    }

	    this.recordingInterval = null;
	  }

	}

	class Recorder {
	  constructor(player) {
	    const Loader = Recorder.getLoaderFactory();
	    return new Loader(player);
	  }

	  static getLoaderFactory() {
	    return RecordRTCLoader;
	  }

	}

	class WebcodecsDecoder extends Emitter {
	  constructor(player) {
	    super();
	    this.player = player;
	    this.hasInit = false;
	    this.isInitInfo = false;
	    this.decoder = null;
	    this.initDecoder();
	    player.debug.log('Webcodecs', 'init');
	  }

	  destroy() {
	    if (this.decoder) {
	      this.decoder.close();
	      this.decoder = null;
	    }

	    this.hasInit = false;
	    this.isInitInfo = false;
	    this.off();
	    this.player.debug.log('Webcodecs', 'destroy');
	  }

	  initDecoder() {
	    const _this = this;

	    this.decoder = new VideoDecoder({
	      output(videoFrame) {
	        _this.handleDecode(videoFrame);
	      },

	      error(error) {
	        _this.handleError(error);
	      }

	    });
	  }

	  handleDecode(videoFrame) {
	    if (!this.isInitInfo) {
	      this.player.video.updateVideoInfo({
	        width: videoFrame.codedWidth,
	        height: videoFrame.codedHeight
	      });
	      this.player.video.initCanvasViewSize();
	      this.isInitInfo = true;
	    }

	    if (!this.player._times.videoStart) {
	      this.player._times.videoStart = now();
	      this.player.handlePlayToRenderTimes();
	    }

	    this.player.handleRender();
	    this.player.video.render({
	      videoFrame
	    });
	    this.player.updateStats({
	      fps: true,
	      ts: 0,
	      buf: this.player.demux.delay
	    }); // release resource

	    setTimeout(function () {
	      if (videoFrame.close) {
	        videoFrame.close();
	      } else {
	        videoFrame.destroy();
	      }
	    }, 100);
	  }

	  handleError(error) {
	    this.player.debug.log('Webcodecs', 'VideoDecoder handleError', error);
	  }

	  decodeVideo(payload, ts, isIframe) {
	    // this.player.debug.log('Webcodecs decoder', 'decodeVideo', ts, isIframe);
	    if (!this.hasInit) {
	      if (isIframe && payload[1] === 0) {
	        const videoCodec = payload[0] & 0x0F;
	        this.player.video.updateVideoInfo({
	          encTypeCode: videoCodec
	        }); // 如果解码出来的是

	        if (videoCodec === VIDEO_ENC_CODE.h265) {
	          this.emit(EVENTS_ERROR.webcodecsH265NotSupport);
	          return;
	        }

	        if (!this.player._times.decodeStart) {
	          this.player._times.decodeStart = now();
	        }

	        const config = formatVideoDecoderConfigure(payload.slice(5));
	        this.decoder.configure(config);
	        this.hasInit = true;
	      }
	    } else {
	      const chunk = new EncodedVideoChunk({
	        data: payload.slice(5),
	        timestamp: ts,
	        type: isIframe ? ENCODED_VIDEO_TYPE.key : ENCODED_VIDEO_TYPE.delta
	      });
	      this.decoder.decode(chunk);
	    }
	  }

	}

	class MP4$1 {
	  static init() {
	    MP4$1.types = {
	      avc1: [],
	      avcC: [],
	      hvc1: [],
	      hvcC: [],
	      btrt: [],
	      dinf: [],
	      dref: [],
	      esds: [],
	      ftyp: [],
	      hdlr: [],
	      mdat: [],
	      mdhd: [],
	      mdia: [],
	      mfhd: [],
	      minf: [],
	      moof: [],
	      moov: [],
	      mp4a: [],
	      mvex: [],
	      mvhd: [],
	      sdtp: [],
	      stbl: [],
	      stco: [],
	      stsc: [],
	      stsd: [],
	      stsz: [],
	      stts: [],
	      tfdt: [],
	      tfhd: [],
	      traf: [],
	      trak: [],
	      trun: [],
	      trex: [],
	      tkhd: [],
	      vmhd: [],
	      smhd: []
	    };

	    for (let name in MP4$1.types) {
	      if (MP4$1.types.hasOwnProperty(name)) {
	        MP4$1.types[name] = [name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)];
	      }
	    }

	    let constants = MP4$1.constants = {};
	    constants.FTYP = new Uint8Array([0x69, 0x73, 0x6F, 0x6D, // major_brand: isom
	    0x0, 0x0, 0x0, 0x1, // minor_version: 0x01
	    0x69, 0x73, 0x6F, 0x6D, // isom
	    0x61, 0x76, 0x63, 0x31 // avc1
	    ]);
	    constants.STSD_PREFIX = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x01 // entry_count
	    ]);
	    constants.STTS = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x00 // entry_count
	    ]);
	    constants.STSC = constants.STCO = constants.STTS;
	    constants.STSZ = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x00, // sample_size
	    0x00, 0x00, 0x00, 0x00 // sample_count
	    ]);
	    constants.HDLR_VIDEO = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x00, // pre_defined
	    0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
	    0x00, 0x00, 0x00, 0x00, // reserved: 3 * 4 bytes
	    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x56, 0x69, 0x64, 0x65, 0x6F, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: VideoHandler
	    ]);
	    constants.HDLR_AUDIO = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x00, // pre_defined
	    0x73, 0x6F, 0x75, 0x6E, // handler_type: 'soun'
	    0x00, 0x00, 0x00, 0x00, // reserved: 3 * 4 bytes
	    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x53, 0x6F, 0x75, 0x6E, 0x64, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: SoundHandler
	    ]);
	    constants.DREF = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x01, // entry_count
	    0x00, 0x00, 0x00, 0x0C, // entry_size
	    0x75, 0x72, 0x6C, 0x20, // type 'url '
	    0x00, 0x00, 0x00, 0x01 // version(0) + flags
	    ]); // Sound media header

	    constants.SMHD = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x00 // balance(2) + reserved(2)
	    ]); // video media header

	    constants.VMHD = new Uint8Array([0x00, 0x00, 0x00, 0x01, // version(0) + flags
	    0x00, 0x00, // graphicsmode: 2 bytes
	    0x00, 0x00, 0x00, 0x00, // opcolor: 3 * 2 bytes
	    0x00, 0x00]);
	  } // Generate a box


	  static box(type) {
	    let size = 8;
	    let result = null;
	    let datas = Array.prototype.slice.call(arguments, 1);
	    let arrayCount = datas.length;

	    for (let i = 0; i < arrayCount; i++) {
	      size += datas[i].byteLength;
	    }

	    result = new Uint8Array(size);
	    result[0] = size >>> 24 & 0xFF; // size

	    result[1] = size >>> 16 & 0xFF;
	    result[2] = size >>> 8 & 0xFF;
	    result[3] = size & 0xFF;
	    result.set(type, 4); // type

	    let offset = 8;

	    for (let i = 0; i < arrayCount; i++) {
	      // data body
	      result.set(datas[i], offset);
	      offset += datas[i].byteLength;
	    }

	    return result;
	  } // emit ftyp & moov


	  static generateInitSegment(meta) {
	    let ftyp = MP4$1.box(MP4$1.types.ftyp, MP4$1.constants.FTYP);
	    let moov = MP4$1.moov(meta);
	    let result = new Uint8Array(ftyp.byteLength + moov.byteLength);
	    result.set(ftyp, 0);
	    result.set(moov, ftyp.byteLength);
	    return result;
	  } // Movie metadata box


	  static moov(meta) {
	    let mvhd = MP4$1.mvhd(meta.timescale, meta.duration);
	    let trak = MP4$1.trak(meta);
	    let mvex = MP4$1.mvex(meta);
	    return MP4$1.box(MP4$1.types.moov, mvhd, trak, mvex);
	  } // Movie header box


	  static mvhd(timescale, duration) {
	    return MP4$1.box(MP4$1.types.mvhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x00, // creation_time
	    0x00, 0x00, 0x00, 0x00, // modification_time
	    timescale >>> 24 & 0xFF, // timescale: 4 bytes
	    timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes
	    duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x01, 0x00, 0x00, // Preferred rate: 1.0
	    0x01, 0x00, 0x00, 0x00, // PreferredVolume(1.0, 2bytes) + reserved(2bytes)
	    0x00, 0x00, 0x00, 0x00, // reserved: 4 + 4 bytes
	    0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
	    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
	    0x00, 0x00, 0x00, 0x00, // ----begin pre_defined 6 * 4 bytes----
	    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // ----end pre_defined 6 * 4 bytes----
	    0xFF, 0xFF, 0xFF, 0xFF // next_track_ID
	    ]));
	  } // Track box


	  static trak(meta) {
	    return MP4$1.box(MP4$1.types.trak, MP4$1.tkhd(meta), MP4$1.mdia(meta));
	  } // Track header box


	  static tkhd(meta) {
	    let trackId = meta.id,
	        duration = meta.duration;
	    let width = meta.presentWidth,
	        height = meta.presentHeight;
	    return MP4$1.box(MP4$1.types.tkhd, new Uint8Array([0x00, 0x00, 0x00, 0x07, // version(0) + flags
	    0x00, 0x00, 0x00, 0x00, // creation_time
	    0x00, 0x00, 0x00, 0x00, // modification_time
	    trackId >>> 24 & 0xFF, // track_ID: 4 bytes
	    trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes
	    duration >>> 24 & 0xFF, // duration: 4 bytes
	    duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes
	    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // layer(2bytes) + alternate_group(2bytes)
	    0x00, 0x00, 0x00, 0x00, // volume(2bytes) + reserved(2bytes)
	    0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
	    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
	    width >>> 8 & 0xFF, // width and height
	    width & 0xFF, 0x00, 0x00, height >>> 8 & 0xFF, height & 0xFF, 0x00, 0x00]));
	  }

	  static mdia(meta) {
	    return MP4$1.box(MP4$1.types.mdia, MP4$1.mdhd(meta), MP4$1.hdlr(meta), MP4$1.minf(meta));
	  } // Media header box


	  static mdhd(meta) {
	    let timescale = meta.timescale;
	    let duration = meta.duration;
	    return MP4$1.box(MP4$1.types.mdhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    0x00, 0x00, 0x00, 0x00, // creation_time
	    0x00, 0x00, 0x00, 0x00, // modification_time
	    timescale >>> 24 & 0xFF, // timescale: 4 bytes
	    timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes
	    duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4, // language: und (undetermined)
	    0x00, 0x00 // pre_defined = 0
	    ]));
	  } // Media handler reference box


	  static hdlr(meta) {
	    let data = null;

	    if (meta.type === 'audio') {
	      data = MP4$1.constants.HDLR_AUDIO;
	    } else {
	      data = MP4$1.constants.HDLR_VIDEO;
	    }

	    return MP4$1.box(MP4$1.types.hdlr, data);
	  } // Media infomation box


	  static minf(meta) {
	    let xmhd = null;

	    if (meta.type === 'audio') {
	      xmhd = MP4$1.box(MP4$1.types.smhd, MP4$1.constants.SMHD);
	    } else {
	      xmhd = MP4$1.box(MP4$1.types.vmhd, MP4$1.constants.VMHD);
	    }

	    return MP4$1.box(MP4$1.types.minf, xmhd, MP4$1.dinf(), MP4$1.stbl(meta));
	  } // Data infomation box


	  static dinf() {
	    let result = MP4$1.box(MP4$1.types.dinf, MP4$1.box(MP4$1.types.dref, MP4$1.constants.DREF));
	    return result;
	  } // Sample table box


	  static stbl(meta) {
	    let result = MP4$1.box(MP4$1.types.stbl, // type: stbl
	    MP4$1.stsd(meta), // Sample Description Table
	    MP4$1.box(MP4$1.types.stts, MP4$1.constants.STTS), // Time-To-Sample
	    MP4$1.box(MP4$1.types.stsc, MP4$1.constants.STSC), // Sample-To-Chunk
	    MP4$1.box(MP4$1.types.stsz, MP4$1.constants.STSZ), // Sample size
	    MP4$1.box(MP4$1.types.stco, MP4$1.constants.STCO) // Chunk offset
	    );
	    return result;
	  }

	  static stsdOld(meta) {
	    return meta.type === "audio" ? MP4$1.box(MP4$1.types.stsd, MP4$1.constants.STSD_PREFIX, MP4$1.mp4a(meta)) : meta.videoType === 'avc' ? MP4$1.box(MP4$1.types.stsd, MP4$1.constants.STSD_PREFIX, MP4$1.avc1(meta)) : MP4$1.box(MP4$1.types.stsd, MP4$1.constants.STSD_PREFIX, MP4$1.hvc1(meta));
	  } // Sample description box


	  static stsd(meta) {
	    if (meta.type === 'audio') {
	      // else: aac -> mp4a
	      return MP4$1.box(MP4$1.types.stsd, MP4$1.constants.STSD_PREFIX, MP4$1.mp4a(meta));
	    } else {
	      if (meta.videoType === 'avc') {
	        //
	        return MP4$1.box(MP4$1.types.stsd, MP4$1.constants.STSD_PREFIX, MP4$1.avc1(meta));
	      } else {
	        //
	        return MP4$1.box(MP4$1.types.stsd, MP4$1.constants.STSD_PREFIX, MP4$1.hvc1(meta));
	      }
	    }
	  }

	  static mp4a(meta) {
	    let channelCount = meta.channelCount;
	    let sampleRate = meta.audioSampleRate;
	    let data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // reserved(4)
	    0x00, 0x00, 0x00, 0x01, // reserved(2) + data_reference_index(2)
	    0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes
	    0x00, 0x00, 0x00, 0x00, 0x00, channelCount, // channelCount(2)
	    0x00, 0x10, // sampleSize(2)
	    0x00, 0x00, 0x00, 0x00, // reserved(4)
	    sampleRate >>> 8 & 0xFF, // Audio sample rate
	    sampleRate & 0xFF, 0x00, 0x00]);
	    return MP4$1.box(MP4$1.types.mp4a, data, MP4$1.esds(meta));
	  }

	  static esds(meta) {
	    let config = meta.config || [];
	    let configSize = config.length;
	    let data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version 0 + flags
	    0x03, // descriptor_type
	    0x17 + configSize, // length3
	    0x00, 0x01, // es_id
	    0x00, // stream_priority
	    0x04, // descriptor_type
	    0x0F + configSize, // length
	    0x40, // codec: mpeg4_audio
	    0x15, // stream_type: Audio
	    0x00, 0x00, 0x00, // buffer_size
	    0x00, 0x00, 0x00, 0x00, // maxBitrate
	    0x00, 0x00, 0x00, 0x00, // avgBitrate
	    0x05 // descriptor_type
	    ].concat([configSize]).concat(config).concat([0x06, 0x01, 0x02 // GASpecificConfig
	    ]));
	    return MP4$1.box(MP4$1.types.esds, data);
	  }

	  static avc1(meta) {
	    let avcc = meta.avcc;
	    const width = meta.codecWidth;
	    const height = meta.codecHeight;
	    let data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, width >>> 8 & 255, width & 255, height >>> 8 & 255, height & 255, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
	    return MP4$1.box(MP4$1.types.avc1, data, MP4$1.box(MP4$1.types.avcC, avcc));
	  }

	  static hvc1(meta) {
	    let avcc = meta.avcc;
	    const width = meta.codecWidth;
	    const height = meta.codecHeight;
	    let data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, width >>> 8 & 255, width & 255, height >>> 8 & 255, height & 255, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
	    return MP4$1.box(MP4$1.types.hvc1, data, MP4$1.box(MP4$1.types.hvcC, avcc));
	  } // Movie Extends box


	  static mvex(meta) {
	    return MP4$1.box(MP4$1.types.mvex, MP4$1.trex(meta));
	  } // Track Extends box


	  static trex(meta) {
	    let trackId = meta.id;
	    let data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
	    trackId >>> 24 & 0xFF, // track_ID
	    trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x01, // default_sample_description_index
	    0x00, 0x00, 0x00, 0x00, // default_sample_duration
	    0x00, 0x00, 0x00, 0x00, // default_sample_size
	    0x00, 0x01, 0x00, 0x01 // default_sample_flags
	    ]);
	    return MP4$1.box(MP4$1.types.trex, data);
	  } // Movie fragment box


	  static moof(track, baseMediaDecodeTime) {
	    return MP4$1.box(MP4$1.types.moof, MP4$1.mfhd(track.sequenceNumber), MP4$1.traf(track, baseMediaDecodeTime));
	  }

	  static mfhd(sequenceNumber) {
	    let data = new Uint8Array([0x00, 0x00, 0x00, 0x00, sequenceNumber >>> 24 & 0xFF, // sequence_number: int32
	    sequenceNumber >>> 16 & 0xFF, sequenceNumber >>> 8 & 0xFF, sequenceNumber & 0xFF]);
	    return MP4$1.box(MP4$1.types.mfhd, data);
	  } // Track fragment box


	  static traf(track, baseMediaDecodeTime) {
	    let trackId = track.id; // Track fragment header box

	    let tfhd = MP4$1.box(MP4$1.types.tfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) & flags
	    trackId >>> 24 & 0xFF, // track_ID
	    trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF])); // Track Fragment Decode Time

	    let tfdt = MP4$1.box(MP4$1.types.tfdt, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) & flags
	    baseMediaDecodeTime >>> 24 & 0xFF, // baseMediaDecodeTime: int32
	    baseMediaDecodeTime >>> 16 & 0xFF, baseMediaDecodeTime >>> 8 & 0xFF, baseMediaDecodeTime & 0xFF]));
	    let sdtp = MP4$1.sdtp(track);
	    let trun = MP4$1.trun(track, sdtp.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
	    return MP4$1.box(MP4$1.types.traf, tfhd, tfdt, trun, sdtp);
	  } // Sample Dependency Type box


	  static sdtpOld(A) {
	    let e = new Uint8Array(4 + 1),
	        t = A.flags;
	    return e[4] = t.isLeading << 6 | t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy, MP4$1.box(MP4$1.types.sdtp, e);
	  }

	  static sdtp(track) {
	    let data = new Uint8Array(4 + 1);
	    let flags = track.flags;
	    data[4] = flags.isLeading << 6 | flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
	    return MP4$1.box(MP4$1.types.sdtp, data);
	  }

	  static trun(track, offset) {
	    let dataSize = 12 + 16;
	    let data = new Uint8Array(dataSize);
	    offset += 8 + dataSize;
	    data.set([0x00, 0x00, 0x0F, 0x01, // version(0) & flags
	    0x00, 0x00, 0x00, 0x01, // sample_count
	    offset >>> 24 & 0xFF, // data_offset
	    offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF], 0);
	    let duration = track.duration;
	    let size = track.size;
	    let flags = track.flags;
	    let cts = track.cts;
	    data.set([duration >>> 24 & 0xFF, // sample_duration
	    duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, size >>> 24 & 0xFF, // sample_size
	    size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, flags.isLeading << 2 | flags.dependsOn, // sample_flags
	    flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.isNonSync, 0x00, 0x00, // sample_degradation_priority
	    cts >>> 24 & 0xFF, // sample_composition_time_offset
	    cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF], 12);
	    return MP4$1.box(MP4$1.types.trun, data);
	  }

	  static mdat(data) {
	    return MP4$1.box(MP4$1.types.mdat, data);
	  }

	}

	MP4$1.init();

	/*
	 * Copyright (C) 2016 Bilibili. All Rights Reserved.
	 *
	 * @author zheng qian <xqq@xqq.im>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	// Exponential-Golomb buffer decoder
	class ExpGolomb {
	  constructor(uint8array) {
	    this.TAG = 'ExpGolomb';
	    this._buffer = uint8array;
	    this._buffer_index = 0;
	    this._total_bytes = uint8array.byteLength;
	    this._total_bits = uint8array.byteLength * 8;
	    this._current_word = 0;
	    this._current_word_bits_left = 0;
	  }

	  destroy() {
	    this._buffer = null;
	  }

	  _fillCurrentWord() {
	    let buffer_bytes_left = this._total_bytes - this._buffer_index;

	    let bytes_read = Math.min(4, buffer_bytes_left);
	    let word = new Uint8Array(4);
	    word.set(this._buffer.subarray(this._buffer_index, this._buffer_index + bytes_read));
	    this._current_word = new DataView(word.buffer).getUint32(0, false);
	    this._buffer_index += bytes_read;
	    this._current_word_bits_left = bytes_read * 8;
	  }

	  readBits(bits) {

	    if (bits <= this._current_word_bits_left) {
	      let result = this._current_word >>> 32 - bits;
	      this._current_word <<= bits;
	      this._current_word_bits_left -= bits;
	      return result;
	    }

	    let result = this._current_word_bits_left ? this._current_word : 0;
	    result = result >>> 32 - this._current_word_bits_left;
	    let bits_need_left = bits - this._current_word_bits_left;

	    this._fillCurrentWord();

	    let bits_read_next = Math.min(bits_need_left, this._current_word_bits_left);
	    let result2 = this._current_word >>> 32 - bits_read_next;
	    this._current_word <<= bits_read_next;
	    this._current_word_bits_left -= bits_read_next;
	    result = result << bits_read_next | result2;
	    return result;
	  }

	  readBool() {
	    return this.readBits(1) === 1;
	  }

	  readByte() {
	    return this.readBits(8);
	  }

	  _skipLeadingZero() {
	    let zero_count;

	    for (zero_count = 0; zero_count < this._current_word_bits_left; zero_count++) {
	      if (0 !== (this._current_word & 0x80000000 >>> zero_count)) {
	        this._current_word <<= zero_count;
	        this._current_word_bits_left -= zero_count;
	        return zero_count;
	      }
	    }

	    this._fillCurrentWord();

	    return zero_count + this._skipLeadingZero();
	  }

	  readUEG() {
	    // unsigned exponential golomb
	    let leading_zeros = this._skipLeadingZero();

	    return this.readBits(leading_zeros + 1) - 1;
	  }

	  readSEG() {
	    // signed exponential golomb
	    let value = this.readUEG();

	    if (value & 0x01) {
	      return value + 1 >>> 1;
	    } else {
	      return -1 * (value >>> 1);
	    }
	  }

	}

	/*
	 * Copyright (C) 2016 Bilibili. All Rights Reserved.
	 *
	 * @author zheng qian <xqq@xqq.im>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	class SPSParser$1 {
	  static _ebsp2rbsp(uint8array) {
	    let src = uint8array;
	    let src_length = src.byteLength;
	    let dst = new Uint8Array(src_length);
	    let dst_idx = 0;

	    for (let i = 0; i < src_length; i++) {
	      if (i >= 2) {
	        // Unescape: Skip 0x03 after 00 00
	        if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
	          continue;
	        }
	      }

	      dst[dst_idx] = src[i];
	      dst_idx++;
	    }

	    return new Uint8Array(dst.buffer, 0, dst_idx);
	  } // 解析 SPS
	  // https://zhuanlan.zhihu.com/p/27896239


	  static parseSPS(uint8array) {
	    let rbsp = SPSParser$1._ebsp2rbsp(uint8array);

	    let gb = new ExpGolomb(rbsp);
	    gb.readByte(); // 标识当前H.264码流的profile。
	    // 我们知道，H.264中定义了三种常用的档次profile： 基准档次：baseline profile;主要档次：main profile; 扩展档次：extended profile;

	    let profile_idc = gb.readByte(); // profile_idc

	    gb.readByte(); // constraint_set_flags[5] + reserved_zero[3]
	    // 标识当前码流的Level。编码的Level定义了某种条件下的最大视频分辨率、最大视频帧率等参数，码流所遵从的level由level_idc指定。

	    let level_idc = gb.readByte(); // level_idc
	    // 表示当前的序列参数集的id。通过该id值，图像参数集pps可以引用其代表的sps中的参数。

	    gb.readUEG(); // seq_parameter_set_id

	    let profile_string = SPSParser$1.getProfileString(profile_idc);
	    let level_string = SPSParser$1.getLevelString(level_idc);
	    let chroma_format_idc = 1;
	    let chroma_format = 420;
	    let chroma_format_table = [0, 420, 422, 444];
	    let bit_depth = 8; //

	    if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 || profile_idc === 244 || profile_idc === 44 || profile_idc === 83 || profile_idc === 86 || profile_idc === 118 || profile_idc === 128 || profile_idc === 138 || profile_idc === 144) {
	      //
	      chroma_format_idc = gb.readUEG();

	      if (chroma_format_idc === 3) {
	        gb.readBits(1); // separate_colour_plane_flag
	      }

	      if (chroma_format_idc <= 3) {
	        chroma_format = chroma_format_table[chroma_format_idc];
	      }

	      bit_depth = gb.readUEG() + 8; // bit_depth_luma_minus8

	      gb.readUEG(); // bit_depth_chroma_minus8

	      gb.readBits(1); // qpprime_y_zero_transform_bypass_flag

	      if (gb.readBool()) {
	        // seq_scaling_matrix_present_flag
	        let scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;

	        for (let i = 0; i < scaling_list_count; i++) {
	          if (gb.readBool()) {
	            // seq_scaling_list_present_flag
	            if (i < 6) {
	              SPSParser$1._skipScalingList(gb, 16);
	            } else {
	              SPSParser$1._skipScalingList(gb, 64);
	            }
	          }
	        }
	      }
	    } // 用于计算MaxFrameNum的值。计算公式为MaxFrameNum = 2^(log2_max_frame_num_minus4 +


	    gb.readUEG(); // log2_max_frame_num_minus4
	    // 表示解码picture order count(POC)的方法。POC是另一种计量图像序号的方式，与frame_num有着不同的计算方法。该语法元素的取值为0、1或2。

	    let pic_order_cnt_type = gb.readUEG();

	    if (pic_order_cnt_type === 0) {
	      gb.readUEG(); // log2_max_pic_order_cnt_lsb_minus_4
	    } else if (pic_order_cnt_type === 1) {
	      gb.readBits(1); // delta_pic_order_always_zero_flag

	      gb.readSEG(); // offset_for_non_ref_pic

	      gb.readSEG(); // offset_for_top_to_bottom_field

	      let num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();

	      for (let i = 0; i < num_ref_frames_in_pic_order_cnt_cycle; i++) {
	        gb.readSEG(); // offset_for_ref_frame
	      }
	    } // 用于表示参考帧的最大数目。


	    let ref_frames = gb.readUEG(); // max_num_ref_frames
	    // 标识位，说明frame_num中是否允许不连续的值。

	    gb.readBits(1); // gaps_in_frame_num_value_allowed_flag
	    // 用于计算图像的宽度。单位为宏块个数，因此图像的实际宽度为:

	    let pic_width_in_mbs_minus1 = gb.readUEG(); // 使用PicHeightInMapUnits来度量视频中一帧图像的高度。
	    // PicHeightInMapUnits并非图像明确的以像素或宏块为单位的高度，而需要考虑该宏块是帧编码或场编码。PicHeightInMapUnits的计算方式为：

	    let pic_height_in_map_units_minus1 = gb.readUEG(); // 标识位，说明宏块的编码方式。当该标识位为0时，宏块可能为帧编码或场编码；
	    // 该标识位为1时，所有宏块都采用帧编码。根据该标识位取值不同，PicHeightInMapUnits的含义也不同，
	    // 为0时表示一场数据按宏块计算的高度，为1时表示一帧数据按宏块计算的高度。

	    let frame_mbs_only_flag = gb.readBits(1);

	    if (frame_mbs_only_flag === 0) {
	      // 标识位，说明是否采用了宏块级的帧场自适应编码。当该标识位为0时，不存在帧编码和场编码之间的切换；当标识位为1时，宏块可能在帧编码和场编码模式之间进行选择。
	      gb.readBits(1); // mb_adaptive_frame_field_flag
	    } // 标识位，用于B_Skip、B_Direct模式运动矢量的推导计算。


	    gb.readBits(1); // direct_8x8_inference_flag

	    let frame_crop_left_offset = 0;
	    let frame_crop_right_offset = 0;
	    let frame_crop_top_offset = 0;
	    let frame_crop_bottom_offset = 0;
	    let frame_cropping_flag = gb.readBool();

	    if (frame_cropping_flag) {
	      frame_crop_left_offset = gb.readUEG();
	      frame_crop_right_offset = gb.readUEG();
	      frame_crop_top_offset = gb.readUEG();
	      frame_crop_bottom_offset = gb.readUEG();
	    }

	    let sar_width = 1,
	        sar_height = 1;
	    let fps = 0,
	        fps_fixed = true,
	        fps_num = 0,
	        fps_den = 0; // 标识位，说明SPS中是否存在VUI信息。

	    let vui_parameters_present_flag = gb.readBool();

	    if (vui_parameters_present_flag) {
	      if (gb.readBool()) {
	        // aspect_ratio_info_present_flag
	        let aspect_ratio_idc = gb.readByte();
	        let sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
	        let sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

	        if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
	          sar_width = sar_w_table[aspect_ratio_idc - 1];
	          sar_height = sar_h_table[aspect_ratio_idc - 1];
	        } else if (aspect_ratio_idc === 255) {
	          sar_width = gb.readByte() << 8 | gb.readByte();
	          sar_height = gb.readByte() << 8 | gb.readByte();
	        }
	      }

	      if (gb.readBool()) {
	        // overscan_info_present_flag
	        gb.readBool(); // overscan_appropriate_flag
	      }

	      if (gb.readBool()) {
	        // video_signal_type_present_flag
	        gb.readBits(4); // video_format & video_full_range_flag

	        if (gb.readBool()) {
	          // colour_description_present_flag
	          gb.readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
	        }
	      }

	      if (gb.readBool()) {
	        // chroma_loc_info_present_flag
	        gb.readUEG(); // chroma_sample_loc_type_top_field

	        gb.readUEG(); // chroma_sample_loc_type_bottom_field
	      }

	      if (gb.readBool()) {
	        // timing_info_present_flag
	        let num_units_in_tick = gb.readBits(32);
	        let time_scale = gb.readBits(32);
	        fps_fixed = gb.readBool(); // fixed_frame_rate_flag

	        fps_num = time_scale;
	        fps_den = num_units_in_tick * 2;
	        fps = fps_num / fps_den;
	      }
	    }

	    let sarScale = 1;

	    if (sar_width !== 1 || sar_height !== 1) {
	      sarScale = sar_width / sar_height;
	    }

	    let crop_unit_x = 0,
	        crop_unit_y = 0;

	    if (chroma_format_idc === 0) {
	      crop_unit_x = 1;
	      crop_unit_y = 2 - frame_mbs_only_flag;
	    } else {
	      let sub_wc = chroma_format_idc === 3 ? 1 : 2;
	      let sub_hc = chroma_format_idc === 1 ? 2 : 1;
	      crop_unit_x = sub_wc;
	      crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
	    }

	    let codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
	    let codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);
	    codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
	    codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;
	    let present_width = Math.ceil(codec_width * sarScale);
	    gb.destroy();
	    gb = null; // 解析出来的SPS 内容。

	    return {
	      profile_string: profile_string,
	      // baseline, high, high10, ...
	      level_string: level_string,
	      // 3, 3.1, 4, 4.1, 5, 5.1, ...
	      bit_depth: bit_depth,
	      // 8bit, 10bit, ...
	      ref_frames: ref_frames,
	      chroma_format: chroma_format,
	      // 4:2:0, 4:2:2, ...
	      chroma_format_string: SPSParser$1.getChromaFormatString(chroma_format),
	      frame_rate: {
	        fixed: fps_fixed,
	        fps: fps,
	        fps_den: fps_den,
	        fps_num: fps_num
	      },
	      sar_ratio: {
	        width: sar_width,
	        height: sar_height
	      },
	      codec_size: {
	        width: codec_width,
	        height: codec_height
	      },
	      present_size: {
	        width: present_width,
	        height: codec_height
	      }
	    };
	  }

	  static _skipScalingList(gb, count) {
	    let last_scale = 8,
	        next_scale = 8;
	    let delta_scale = 0;

	    for (let i = 0; i < count; i++) {
	      if (next_scale !== 0) {
	        delta_scale = gb.readSEG();
	        next_scale = (last_scale + delta_scale + 256) % 256;
	      }

	      last_scale = next_scale === 0 ? last_scale : next_scale;
	    }
	  } // profile_idc = 66 → baseline profile;
	  // profile_idc = 77 → main profile;
	  // profile_idc = 88 → extended profile;
	  // 在新版的标准中，还包括了High、High 10、High 4:2:2、High 4:4:4、High 10 Intra、High
	  // 4:2:2 Intra、High 4:4:4 Intra、CAVLC 4:4:4 Intra


	  static getProfileString(profile_idc) {
	    switch (profile_idc) {
	      case 66:
	        return 'Baseline';

	      case 77:
	        return 'Main';

	      case 88:
	        return 'Extended';

	      case 100:
	        return 'High';

	      case 110:
	        return 'High10';

	      case 122:
	        return 'High422';

	      case 244:
	        return 'High444';

	      default:
	        return 'Unknown';
	    }
	  }

	  static getLevelString(level_idc) {
	    return (level_idc / 10).toFixed(1);
	  }

	  static getChromaFormatString(chroma) {
	    switch (chroma) {
	      case 420:
	        return '4:2:0';

	      case 422:
	        return '4:2:2';

	      case 444:
	        return '4:4:4';

	      default:
	        return 'Unknown';
	    }
	  }

	}

	function parseAVCDecoderConfigurationRecord(arrayBuffer) {
	  const meta = {};
	  const v = new DataView(arrayBuffer.buffer);
	  let version = v.getUint8(0); // configurationVersion

	  let avcProfile = v.getUint8(1); // avcProfileIndication

	  v.getUint8(2); // profile_compatibil

	  v.getUint8(3); // AVCLevelIndication

	  if (version !== 1 || avcProfile === 0) {
	    // this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord');
	    return;
	  }

	  const _naluLengthSize = (v.getUint8(4) & 3) + 1; // lengthSizeMinusOne


	  if (_naluLengthSize !== 3 && _naluLengthSize !== 4) {
	    // holy shit!!!
	    // this._onError(DemuxErrors.FORMAT_ERROR, `Flv: Strange NaluLengthSizeMinusOne: ${_naluLengthSize - 1}`);
	    return;
	  }

	  let spsCount = v.getUint8(5) & 31; // numOfSequenceParameterSets

	  if (spsCount === 0) {
	    // this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord: No SPS');
	    return;
	  }

	  let offset = 6;

	  for (let i = 0; i < spsCount; i++) {
	    let len = v.getUint16(offset, false); // sequenceParameterSetLength

	    offset += 2;

	    if (len === 0) {
	      continue;
	    } // Notice: Nalu without startcode header (00 00 00 01)


	    let sps = new Uint8Array(arrayBuffer.buffer, offset, len);
	    offset += len; // flv.js作者选择了自己来解析这个数据结构，也是迫不得已，因为JS环境下没有ffmpeg，解析这个结构主要是为了提取 sps和pps。虽然理论上sps允许有多个，但其实一般就一个。
	    // packetTtype 为 1 表示 NALU，NALU= network abstract layer unit，这是H.264的概念，网络抽象层数据单元，其实简单理解就是一帧视频数据。
	    // pps的信息没什么用，所以作者只实现了sps的分析器，说明作者下了很大功夫去学习264的标准，其中的Golomb解码还是挺复杂的，能解对不容易，我在PC和手机平台都是用ffmpeg去解析的。
	    // SPS里面包括了视频分辨率，帧率，profile level等视频重要信息。

	    let config = SPSParser$1.parseSPS(sps);

	    if (i !== 0) {
	      // ignore other sps's config
	      continue;
	    }

	    meta.codecWidth = config.codec_size.width;
	    meta.codecHeight = config.codec_size.height;
	    meta.presentWidth = config.present_size.width;
	    meta.presentHeight = config.present_size.height;
	    meta.profile = config.profile_string;
	    meta.level = config.level_string;
	    meta.bitDepth = config.bit_depth;
	    meta.chromaFormat = config.chroma_format;
	    meta.sarRatio = config.sar_ratio;
	    meta.frameRate = config.frame_rate;

	    if (config.frame_rate.fixed === false || config.frame_rate.fps_num === 0 || config.frame_rate.fps_den === 0) {
	      meta.frameRate = {};
	    }

	    let fps_den = meta.frameRate.fps_den;
	    let fps_num = meta.frameRate.fps_num;
	    meta.refSampleDuration = meta.timescale * (fps_den / fps_num);
	    let codecArray = sps.subarray(1, 4);
	    let codecString = 'avc1.';

	    for (let j = 0; j < 3; j++) {
	      let h = codecArray[j].toString(16);

	      if (h.length < 2) {
	        h = '0' + h;
	      }

	      codecString += h;
	    } // codec


	    meta.codec = codecString;
	  }

	  let ppsCount = v.getUint8(offset); // numOfPictureParameterSets

	  if (ppsCount === 0) {
	    // this._onError(DemuxErrors.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord: No PPS');
	    return;
	  }

	  offset++;

	  for (let i = 0; i < ppsCount; i++) {
	    let len = v.getUint16(offset, false); // pictureParameterSetLength

	    offset += 2;

	    if (len === 0) {
	      continue;
	    }

	    new Uint8Array(arrayBuffer.buffer, offset, len); // pps is useless for extracting video information

	    offset += len;
	  }

	  meta.videoType = 'avc'; // meta.avcc = arrayBuffer;

	  return meta;
	}

	class SPSParser {
	  static parseSPS(uint8array) {}

	}

	function parseHEVCDecoderConfigurationRecord(arrayBuffer) {
	  const meta = {};
	  meta.videoType = 'hevc';
	  let offset = 28 - 5; //

	  const vpsTag = arrayBuffer[offset];

	  if (vpsTag !== H265_NAL_TYPE.vps) {
	    return meta;
	  }

	  offset += 2;
	  offset += 1;
	  const vpsLength = arrayBuffer[offset + 1] | arrayBuffer[offset] << 8;
	  offset += 2;
	  const vpsData = arrayBuffer.slice(offset, offset + vpsLength);
	  console.log(Uint8Array.from(vpsData));
	  offset += vpsLength;
	  const spsTag = arrayBuffer[offset];

	  if (spsTag !== H265_NAL_TYPE.sps) {
	    return meta;
	  }

	  offset += 2;
	  offset += 1;
	  const spsLength = arrayBuffer[offset + 1] | arrayBuffer[offset] << 8;
	  offset += 2;
	  const spsData = arrayBuffer.slice(offset, offset + spsLength);
	  console.log(Uint8Array.from(spsData));
	  offset += spsLength;
	  const ppsTag = arrayBuffer[offset];

	  if (ppsTag !== H265_NAL_TYPE.pps) {
	    return meta;
	  }

	  offset += 2;
	  offset += 1;
	  const ppsLength = arrayBuffer[offset + 1] | arrayBuffer[offset] << 8;
	  offset += 2;
	  const ppsData = arrayBuffer.slice(offset, offset + ppsLength);
	  console.log(Uint8Array.from(ppsData));
	  let sps = Uint8Array.from(spsData);
	  let config = SPSParser.parseSPS(sps);
	  meta.codecWidth = config.codec_size.width;
	  meta.codecHeight = config.codec_size.height;
	  meta.presentWidth = config.present_size.width;
	  meta.presentHeight = config.present_size.height;
	  meta.profile = config.profile_string;
	  meta.level = config.level_string;
	  meta.bitDepth = config.bit_depth;
	  meta.chromaFormat = config.chroma_format;
	  meta.sarRatio = config.sar_ratio;
	  return meta;
	}

	class MseDecoder extends Emitter {
	  constructor(player) {
	    super();
	    this.player = player;
	    this.isAvc = true;
	    this.mediaSource = new window.MediaSource();
	    this.sourceBuffer = null;
	    this.hasInit = false;
	    this.isInitInfo = false;
	    this.cacheTrack = {};
	    this.timeInit = false;
	    this.sequenceNumber = 0;
	    this.mediaSourceOpen = false;
	    this.bufferList = [];
	    this.dropping = false;
	    this.player.video.$videoElement.src = window.URL.createObjectURL(this.mediaSource);
	    const {
	      debug,
	      events: {
	        proxy
	      }
	    } = player;
	    proxy(this.mediaSource, 'sourceopen', () => {
	      this.mediaSourceOpen = true;
	      this.player.emit(EVENTS.mseSourceOpen);
	    });
	    proxy(this.mediaSource, 'sourceclose', () => {
	      this.player.emit(EVENTS.mseSourceClose);
	    });
	    player.debug.log('MediaSource', 'init');
	  }

	  destroy() {
	    this.stop();
	    this.bufferList = [];
	    this.mediaSource = null;
	    this.mediaSourceOpen = false;
	    this.sourceBuffer = null;
	    this.hasInit = false;
	    this.isInitInfo = false;
	    this.sequenceNumber = 0;
	    this.cacheTrack = null;
	    this.timeInit = false;
	    this.off();
	    this.player.debug.log('MediaSource', 'destroy');
	  }

	  get state() {
	    return this.mediaSource.readyState;
	  }

	  get isStateOpen() {
	    return this.state === MEDIA_SOURCE_STATE.open;
	  }

	  get isStateClosed() {
	    return this.state === MEDIA_SOURCE_STATE.closed;
	  }

	  get isStateEnded() {
	    return this.state === MEDIA_SOURCE_STATE.ended;
	  }

	  get duration() {
	    return this.mediaSource.duration;
	  }

	  set duration(duration) {
	    this.mediaSource.duration = duration;
	  }

	  decodeVideo(payload, ts, isIframe) {
	    const player = this.player;

	    if (!this.hasInit) {
	      if (isIframe && payload[1] === 0) {
	        const videoCodec = payload[0] & 0x0F;
	        player.video.updateVideoInfo({
	          encTypeCode: videoCodec
	        }); // 如果解码出来的是

	        if (videoCodec === VIDEO_ENC_CODE.h265) {
	          this.emit(EVENTS_ERROR.mediaSourceH265NotSupport);
	          return;
	        }

	        if (!player._times.decodeStart) {
	          player._times.decodeStart = now();
	        }

	        this._decodeConfigurationRecord(payload, ts, isIframe, videoCodec);

	        this.hasInit = true;
	      }
	    } else {
	      this._decodeVideo(payload, ts, isIframe);
	    }
	  }

	  _doDecode() {
	    const bufferItem = this.bufferList.shift();

	    if (bufferItem) {
	      this._decodeVideo(bufferItem.payload, bufferItem.ts, bufferItem.isIframe);
	    }
	  }

	  _decodeConfigurationRecord(payload, ts, isIframe, videoCodec) {
	    let data = payload.slice(5);
	    let config = {};

	    if (videoCodec === VIDEO_ENC_CODE.h264) {
	      config = parseAVCDecoderConfigurationRecord(data);
	    } else if (videoCodec === VIDEO_ENC_CODE.h265) {
	      config = parseHEVCDecoderConfigurationRecord(data);
	    }

	    const metaData = {
	      id: 1,
	      // video tag data
	      type: 'video',
	      timescale: 1000,
	      duration: 0,
	      avcc: data,
	      codecWidth: config.codecWidth,
	      codecHeight: config.codecHeight,
	      videoType: config.videoType
	    }; // ftyp

	    const metaBox = MP4$1.generateInitSegment(metaData);
	    this.isAvc = true;

	    if (metaBox.buffer) {
	      this.appendBuffer(metaBox.buffer);
	    }

	    this.sequenceNumber = 0;
	    this.cacheTrack = null;
	    this.timeInit = false;
	  } //


	  _decodeVideo(payload, ts, isIframe) {
	    const player = this.player;
	    let arrayBuffer = payload.slice(5);
	    let bytes = arrayBuffer.byteLength;
	    let cts = 0;
	    let dts = ts;
	    const $video = player.video.$videoElement;

	    if ($video.buffered.length > 1) {
	      this.removeBuffer($video.buffered.start(0), $video.buffered.end(0));
	      this.timeInit = false;
	    }

	    if ($video.drop && dts - this.cacheTrack.dts > 1000) {
	      $video.drop = false;
	      this.cacheTrack = {};
	    } else if (this.cacheTrack && dts > this.cacheTrack.dts) {
	      // 需要额外加8个size
	      let mdatBytes = 8 + this.cacheTrack.size;
	      let mdatbox = new Uint8Array(mdatBytes);
	      mdatbox[0] = mdatBytes >>> 24 & 255;
	      mdatbox[1] = mdatBytes >>> 16 & 255;
	      mdatbox[2] = mdatBytes >>> 8 & 255;
	      mdatbox[3] = mdatBytes & 255;
	      mdatbox.set(MP4$1.types.mdat, 4);
	      mdatbox.set(this.cacheTrack.data, 8);
	      this.cacheTrack.duration = dts - this.cacheTrack.dts; // moof

	      let moofbox = MP4$1.moof(this.cacheTrack, this.cacheTrack.dts);
	      let result = new Uint8Array(moofbox.byteLength + mdatbox.byteLength);
	      result.set(moofbox, 0);
	      result.set(mdatbox, moofbox.byteLength); // appendBuffer

	      if (result.buffer) {
	        this.appendBuffer(result.buffer);
	      }

	      player.handleRender();
	      player.updateStats({
	        fps: true,
	        ts: ts,
	        buf: player.demux.delay
	      });

	      if (!player._times.videoStart) {
	        player._times.videoStart = now();
	        player.handlePlayToRenderTimes();
	      }
	    } else {
	      player.debug.log('MediaSource', 'timeInit set false , cacheTrack = {}');
	      this.timeInit = false;
	      this.cacheTrack = {};
	    }

	    this.cacheTrack.id = 1;
	    this.cacheTrack.sequenceNumber = ++this.sequenceNumber;
	    this.cacheTrack.size = bytes;
	    this.cacheTrack.dts = dts;
	    this.cacheTrack.cts = cts;
	    this.cacheTrack.isKeyframe = isIframe;
	    this.cacheTrack.data = arrayBuffer; //

	    this.cacheTrack.flags = {
	      isLeading: 0,
	      dependsOn: isIframe ? 2 : 1,
	      isDependedOn: isIframe ? 1 : 0,
	      hasRedundancy: 0,
	      isNonSync: isIframe ? 0 : 1
	    }; //

	    if (!this.timeInit && $video.buffered.length === 1) {
	      player.debug.log('MediaSource', 'timeInit set true');
	      this.timeInit = true;
	      $video.currentTime = $video.buffered.end(0);
	    }

	    if (!this.isInitInfo && $video.videoWidth > 0 && $video.videoHeight > 0) {
	      player.debug.log('MediaSource', `updateVideoInfo: ${$video.videoWidth},${$video.videoHeight}`);
	      player.video.updateVideoInfo({
	        width: $video.videoWidth,
	        height: $video.videoHeight
	      });
	      player.video.initCanvasViewSize();
	      this.isInitInfo = true;
	    }
	  }

	  appendBuffer(buffer) {
	    const {
	      debug,
	      events: {
	        proxy
	      }
	    } = this.player;

	    if (buffer === null) {
	      return;
	    }

	    if (this.sourceBuffer === null) {
	      this.sourceBuffer = this.mediaSource.addSourceBuffer(MP4_CODECS.avc);
	      proxy(this.sourceBuffer, 'error', error => {
	        this.player.emit(EVENTS.mseSourceBufferError, error);
	      });
	    }

	    if (this.sourceBuffer.updating === false && this.isStateOpen) {
	      this.sourceBuffer.appendBuffer(buffer);
	      return;
	    }

	    if (this.isStateClosed) {
	      this.player.emit(EVENTS.mseSourceBufferError, 'mediaSource is not attached to video or mediaSource is closed');
	    } else if (this.isStateEnded) {
	      this.player.emit(EVENTS.mseSourceBufferError, 'mediaSource is closed');
	    } else {
	      if (this.sourceBuffer.updating === true) {
	        this.player.emit(EVENTS.mseSourceBufferBusy);
	        this.dropSourceBuffer(true);
	      }
	    }
	  }

	  stop() {
	    if (this.isStateOpen) {
	      if (this.sourceBuffer) {
	        this.sourceBuffer.abort();
	      }
	    }

	    this.endOfStream();
	  }

	  dropSourceBuffer(flag) {
	    const video = this.player.video;
	    const $video = video.$videoElement;
	    this.dropping = flag;

	    if ($video.buffered.length > 0) {
	      if ($video.buffered.end(0) - $video.currentTime > 1) {
	        $video.currentTime = $video.buffered.end(0);
	      }
	    }
	  }

	  removeBuffer(start, end) {
	    if (this.isStateOpen && this.sourceBuffer.updating === false) {
	      try {
	        this.sourceBuffer.remove(start, end);
	      } catch (e) {
	        console.error(e);
	      }
	    }
	  }

	  endOfStream() {
	    if (this.isStateOpen) {
	      this.mediaSource.endOfStream();
	    }
	  }

	}

	class DecoderWorker {
	  constructor(player) {
	    this.player = player;

	    if (player._opt.useWebRTC) {
	      setTimeout(this.__initWebRTCStatus.bind(this), 200);
	    } else {
	      this.decoderWorker = new Worker(player._opt.decoder);

	      this._initDecoderWorker();

	      player.debug.log('decoderWorker', 'init');
	    }
	  }

	  __initWebRTCStatus() {
	    if (!this.player.loaded) {
	      this.player.emit(EVENTS.load);
	    }

	    this.player.emit(EVENTS.decoderWorkerInit);
	  }

	  destroy() {
	    if (this.decoderWorker) {
	      this.decoderWorker.postMessage({
	        cmd: WORKER_SEND_TYPE.close
	      });
	      this.decoderWorker.terminate();
	      this.decoderWorker = null;
	    }

	    this.player.debug.log(`decoderWorker`, 'destroy');
	  }

	  _initDecoderWorker() {
	    const {
	      debug,
	      events: {
	        proxy
	      }
	    } = this.player;

	    this.decoderWorker.onmessage = event => {
	      const msg = event.data;
	      console.log('--------------------------', event);

	      switch (msg.cmd) {
	        case WORKER_CMD_TYPE.init:
	          debug.log(`decoderWorker`, 'onmessage:', WORKER_CMD_TYPE.init);

	          if (!this.player.loaded) {
	            this.player.emit(EVENTS.load);
	          }

	          this.player.emit(EVENTS.decoderWorkerInit);

	          this._initWork();

	          break;

	        case WORKER_CMD_TYPE.videoCode:
	          debug.log(`decoderWorker`, 'onmessage:', WORKER_CMD_TYPE.videoCode, msg.code);

	          if (!this.player._times.decodeStart) {
	            this.player._times.decodeStart = now();
	          }

	          this.player.video.updateVideoInfo({
	            encTypeCode: msg.code
	          });
	          break;

	        case WORKER_CMD_TYPE.audioCode:
	          debug.log(`decoderWorker`, 'onmessage:', WORKER_CMD_TYPE.audioCode, msg.code);
	          this.player.audio.updateAudioInfo({
	            encTypeCode: msg.code
	          });
	          break;

	        case WORKER_CMD_TYPE.initVideo:
	          debug.log(`decoderWorker`, 'onmessage:', WORKER_CMD_TYPE.initVideo, `width:${msg.w},height:${msg.h}`);
	          this.player.video.updateVideoInfo({
	            width: msg.w,
	            height: msg.h
	          });
	          this.player.video.initCanvasViewSize();
	          break;

	        case WORKER_CMD_TYPE.initAudio:
	          debug.log(`decoderWorker`, 'onmessage:', WORKER_CMD_TYPE.initAudio, `channels:${msg.channels},sampleRate:${msg.sampleRate}`);
	          this.player.audio.updateAudioInfo(msg);
	          this.player.audio.initScriptNode(msg);
	          break;

	        case WORKER_CMD_TYPE.render:
	          // debug.log(`decoderWorker`, 'onmessage:', WORKER_CMD_TYPE.render, `msg ts:${msg.ts}`);
	          this.player.handleRender();
	          this.player.video.render(msg);
	          this.player.emit(EVENTS.timeUpdate, msg.ts);
	          this.player.updateStats({
	            fps: true,
	            ts: msg.ts,
	            buf: msg.delay
	          });

	          if (!this.player._times.videoStart) {
	            this.player._times.videoStart = now();
	            this.player.handlePlayToRenderTimes();
	          }

	          break;

	        case WORKER_CMD_TYPE.playAudio:
	          debug.log(`decoderWorker`, 'onmessage:', WORKER_CMD_TYPE.playAudio, `msg ts:${msg.ts}`); // 只有在 playing 的时候。

	          if (this.player.playing) {
	            this.player.audio.play(msg.buffer, msg.ts);
	          }

	          break;

	        default:
	          this.player[msg.cmd] && this.player[msg.cmd](msg);
	      }
	    };
	  }

	  _initWork() {
	    const opt = {
	      debug: this.player._opt.debug,
	      forceNoOffscreen: this.player._opt.forceNoOffscreen,
	      useWCS: this.player._opt.useWCS,
	      videoBuffer: this.player._opt.videoBuffer
	    };
	    this.decoderWorker.postMessage({
	      cmd: WORKER_SEND_TYPE.init,
	      opt: JSON.stringify(opt),
	      sampleRate: this.player.audio.audioContext.sampleRate
	    });
	  }

	  decodeVideo(arrayBuffer, ts, isIFrame) {
	    const options = {
	      type: MEDIA_TYPE.video,
	      ts: Math.max(ts, 0),
	      isIFrame
	    }; // this.player.debug.log('decoderWorker', 'decodeVideo', options);

	    this.decoderWorker.postMessage({
	      cmd: WORKER_SEND_TYPE.decode,
	      buffer: arrayBuffer,
	      options
	    }, [arrayBuffer.buffer]);
	  }

	  decodeAudio(arrayBuffer, ts) {
	    if (this.player._opt.useWCS && !this.player._opt.useOffscreen) {
	      this._decodeAudioNoDelay(arrayBuffer, ts);
	    } else if (this.player._opt.useMSE) {
	      this._decodeAudioNoDelay(arrayBuffer, ts);
	    } else {
	      this._decodeAudio(arrayBuffer, ts);
	    }
	  } //


	  _decodeAudio(arrayBuffer, ts) {
	    const options = {
	      type: MEDIA_TYPE.audio,
	      ts: Math.max(ts, 0)
	    }; // this.player.debug.log('decoderWorker', 'decodeAudio',options);

	    this.decoderWorker.postMessage({
	      cmd: WORKER_SEND_TYPE.decode,
	      buffer: arrayBuffer,
	      options
	    }, [arrayBuffer.buffer]);
	  }

	  _decodeAudioNoDelay(arrayBuffer, ts) {
	    // console.log('_decodeAudioNoDelay', arrayBuffer);
	    this.decoderWorker.postMessage({
	      cmd: WORKER_SEND_TYPE.audioDecode,
	      buffer: arrayBuffer,
	      ts: Math.max(ts, 0)
	    }, [arrayBuffer.buffer]);
	  }

	}

	class CommonLoader extends Emitter {
	  constructor(player) {
	    super();
	    this.player = player;
	    this.stopId = null;
	    this.firstTimestamp = null;
	    this.startTimestamp = null;
	    this.delay = -1;
	    this.bufferList = [];
	    this.dropping = false;
	    this.initInterval();
	  }

	  destroy() {
	    if (this.stopId) {
	      clearInterval(this.stopId);
	      this.stopId = null;
	    }

	    this.firstTimestamp = null;
	    this.startTimestamp = null;
	    this.delay = -1;
	    this.bufferList = [];
	    this.dropping = false;
	    this.off();
	  }

	  getDelay(timestamp) {
	    if (!timestamp) {
	      return -1;
	    }

	    if (!this.firstTimestamp) {
	      this.firstTimestamp = timestamp;
	      this.startTimestamp = Date.now();
	      this.delay = -1;
	    } else {
	      if (timestamp) {
	        this.delay = Date.now() - this.startTimestamp - (timestamp - this.firstTimestamp);
	      }
	    }

	    return this.delay;
	  }

	  resetDelay() {
	    this.firstTimestamp = null;
	    this.startTimestamp = null;
	    this.delay = -1;
	    this.dropping = false;
	  } //


	  initInterval() {
	    const videoBuffer = this.player._opt.videoBuffer;
	    this.player.debug.log('common dumex', `init Interval`);

	    let _loop = () => {
	      let data;

	      if (this.bufferList.length) {
	        if (this.dropping) {
	          // this.player.debug.log('common dumex', `is dropping`);
	          data = this.bufferList.shift();

	          if (data.type === MEDIA_TYPE.audio && data.payload[1] === 0) {
	            this._doDecoderDecode(data);
	          }

	          while (!data.isIFrame && this.bufferList.length) {
	            data = this.bufferList.shift();

	            if (data.type === MEDIA_TYPE.audio && data.payload[1] === 0) {
	              this._doDecoderDecode(data);
	            }
	          } // i frame


	          if (data.isIFrame) {
	            this.dropping = false;

	            this._doDecoderDecode(data);
	          }
	        } else {
	          data = this.bufferList[0];

	          if (this.getDelay(data.ts) === -1) {
	            // this.player.debug.log('common dumex', `delay is -1`);
	            this.bufferList.shift();

	            this._doDecoderDecode(data);
	          } else if (this.delay > videoBuffer + 1000) {
	            // this.player.debug.log('common dumex', `delay is ${this.delay}, set dropping is true`);
	            this.resetDelay();
	            this.dropping = true;
	          } else {
	            while (this.bufferList.length) {
	              data = this.bufferList[0];

	              if (this.getDelay(data.ts) > videoBuffer) {
	                // drop frame
	                this.bufferList.shift();

	                this._doDecoderDecode(data);
	              } else {
	                // this.player.debug.log('common dumex', `delay is ${this.delay}`);
	                break;
	              }
	            }
	          }
	        }
	      }
	    };

	    _loop();

	    this.stopId = setInterval(_loop, 10);
	  }

	  _doDecode(payload, type, ts, isIFrame) {
	    const player = this.player;
	    const {
	      decoderWorker
	    } = player;
	    let options = {
	      ts: ts,
	      type: type,
	      isIFrame: false
	    }; // use offscreen

	    if (player._opt.useWCS && !player._opt.useOffscreen) {
	      if (type === MEDIA_TYPE.video) {
	        options.isIFrame = isIFrame;
	      }

	      this.pushBuffer(payload, options);
	    } else if (player._opt.useMSE) {
	      // use mse
	      if (type === MEDIA_TYPE.video) {
	        options.isIFrame = isIFrame;
	      }

	      this.pushBuffer(payload, options);
	    } else {
	      //
	      if (type === MEDIA_TYPE.video) {
	        decoderWorker.decodeVideo(payload, ts, isIFrame);
	      } else if (type === MEDIA_TYPE.audio) {
	        decoderWorker.decodeAudio(payload, ts);
	      }
	    }
	  }

	  _doDecoderDecode(data) {
	    const player = this.player;
	    const {
	      decoderWorker,
	      webcodecsDecoder,
	      mseDecoder
	    } = player;

	    if (data.type === MEDIA_TYPE.audio) {
	      decoderWorker.decodeAudio(data.payload, data.ts);
	    } else if (data.type === MEDIA_TYPE.video) {
	      if (player._opt.useWCS && !player._opt.useOffscreen) {
	        webcodecsDecoder.decodeVideo(data.payload, data.ts, data.isIFrame);
	      } else if (player._opt.useMSE) {
	        mseDecoder.decodeVideo(data.payload, data.ts, data.isIFrame);
	      }
	    }
	  }

	  pushBuffer(payload, options) {
	    // 音频
	    if (options.type === MEDIA_TYPE.audio) {
	      this.bufferList.push({
	        ts: options.ts,
	        payload: payload,
	        type: MEDIA_TYPE.audio
	      });
	    } else if (options.type === MEDIA_TYPE.video) {
	      this.bufferList.push({
	        ts: options.ts,
	        payload: payload,
	        type: MEDIA_TYPE.video,
	        isIFrame: options.isIFrame
	      });
	    }
	  }

	  close() {}

	}

	class FlvLoader extends CommonLoader {
	  constructor(player) {
	    super(player);
	    this.input = this._inputFlv();
	    this.flvDemux = this.dispatchFlvData(this.input);
	    player.debug.log('FlvDemux', 'init');
	  }

	  destroy() {
	    super.destroy();
	    this.input = null;
	    this.flvDemux = null;
	    this.player.debug.log('FlvDemux', 'destroy');
	  }

	  dispatch(data) {
	    this.flvDemux(data);
	  }

	  *_inputFlv() {
	    yield 9;
	    const tmp = new ArrayBuffer(4);
	    const tmp8 = new Uint8Array(tmp);
	    const tmp32 = new Uint32Array(tmp);
	    const player = this.player;

	    while (true) {
	      tmp8[3] = 0;
	      const t = yield 15;
	      const type = t[4];
	      tmp8[0] = t[7];
	      tmp8[1] = t[6];
	      tmp8[2] = t[5];
	      const length = tmp32[0];
	      tmp8[0] = t[10];
	      tmp8[1] = t[9];
	      tmp8[2] = t[8];
	      let ts = tmp32[0];

	      if (ts === 0xFFFFFF) {
	        tmp8[3] = t[11];
	        ts = tmp32[0];
	      }

	      const payload = yield length;

	      switch (type) {
	        case FLV_MEDIA_TYPE.audio:
	          if (player._opt.hasAudio) {
	            player.updateStats({
	              abps: payload.byteLength
	            });

	            if (payload.byteLength > 0) {
	              this._doDecode(payload, MEDIA_TYPE.audio, ts);
	            }
	          }

	          break;

	        case FLV_MEDIA_TYPE.video:
	          if (!player._times.demuxStart) {
	            player._times.demuxStart = now();
	          }

	          if (player._opt.hasVideo) {
	            player.updateStats({
	              vbps: payload.byteLength
	            });
	            const isIFrame = payload[0] >> 4 === 1;

	            if (payload.byteLength > 0) {
	              this._doDecode(payload, MEDIA_TYPE.video, ts, isIFrame);
	            }
	          }

	          break;
	      }
	    }
	  }

	  dispatchFlvData(input) {
	    let need = input.next();
	    let buffer = null;
	    return value => {
	      let data = new Uint8Array(value);

	      if (buffer) {
	        let combine = new Uint8Array(buffer.length + data.length);
	        combine.set(buffer);
	        combine.set(data, buffer.length);
	        data = combine;
	        buffer = null;
	      }

	      while (data.length >= need.value) {
	        let remain = data.slice(need.value);
	        need = input.next(data.slice(0, need.value));
	        data = remain;
	      }

	      if (data.length > 0) {
	        buffer = data;
	      }
	    };
	  }

	  close() {
	    this.input && this.input.return(null);
	  }

	}

	class M7sLoader extends CommonLoader {
	  constructor(player) {
	    super(player);
	    player.debug.log('M7sDemux', 'init');
	  }

	  destroy() {
	    super.destroy();
	    this.player.debug.log('M7sDemux', 'destroy');
	  }

	  dispatch(data) {
	    const player = this.player;
	    const dv = new DataView(data);
	    const type = dv.getUint8(0);
	    const ts = dv.getUint32(1, false);

	    switch (type) {
	      case MEDIA_TYPE.audio:
	        if (player._opt.hasAudio) {
	          const payload = new Uint8Array(data, 5);
	          player.updateStats({
	            abps: payload.byteLength
	          });

	          if (payload.byteLength > 0) {
	            this._doDecode(payload, type, ts);
	          }
	        }

	        break;

	      case MEDIA_TYPE.video:
	        if (player._opt.hasVideo) {
	          if (!player._times.demuxStart) {
	            player._times.demuxStart = now();
	          }

	          if (dv.byteLength > 5) {
	            const payload = new Uint8Array(data, 5);
	            const isIframe = dv.getUint8(5) >> 4 === 1;
	            player.updateStats({
	              vbps: payload.byteLength
	            });

	            if (payload.byteLength > 0) {
	              this._doDecode(payload, type, ts, isIframe);
	            }
	          }
	        }

	        break;
	    }
	  }

	}

	class Demux {
	  constructor(player) {
	    const Loader = Demux.getLoaderFactory(player._opt.demuxType);
	    return new Loader(player);
	  }

	  static getLoaderFactory(type) {
	    if (type === DEMUX_TYPE.m7s) {
	      return M7sLoader;
	    } else if (type === DEMUX_TYPE.flv) {
	      return FlvLoader;
	    }
	  }

	}

	function createIcon() {
	  let {
	    path,
	    color,
	    className = '',
	    children = '',
	    style = '',
	    ...props
	  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  let attrs = [];

	  if (typeof path === 'string') {
	    path = [path];
	  }

	  if (typeof style === 'string') {
	    if (typeof color === 'string') {
	      style += `;fill: ${color};`;
	    }
	  } else {
	    style.fill = color;

	    if (style.color) {
	      style.fill = style.color;
	      console.warn(`if you will set svg with color: "${style.color}", please use { fill: ${style.color} }`);
	    }

	    style = Object.entries(style).map(_ref => {
	      let [key, value] = _ref;
	      return `${key}: ${value};`;
	    }).join('');
	  }

	  if (style) {
	    attrs.push(`style="${style}"`);
	  }

	  if (props && typeof props === 'object') {
	    Object.entries(props).map(_ref2 => {
	      let [key, value] = _ref2;
	      return attrs.push(`${key}="${value}"`);
	    });
	  }

	  return `<svg
      class="icon ${className}"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      ${attrs.join(' \n')}
    >
      ${path && path.length ? path.map(data => `<path d="${data}"/>`).join('') : ''}${children ? children : ''}
    </svg>`;
	}

	const arrow = {};
	const __up = `
M560.256 314.453333c2.474667 2.389333 13.056 11.52 21.76 19.968 54.741333 49.706667 144.341333 179.370667 171.690667 247.253334 4.394667 10.325333 13.696 36.394667 14.293333 50.304 0 13.354667-3.072 26.026667-9.301333 38.186666a79.957333 79.957333 0 0 1-38.570667 33.92c-11.221333 4.266667-44.8 10.922667-45.397333 10.922667-36.736 6.656-96.426667 10.325333-162.389334 10.325333-62.848 0-120.106667-3.669333-157.397333-9.088-0.597333-0.64-42.325333-7.253333-56.618667-14.549333A76.16 76.16 0 0 1 256 634.368v-2.389333c0.64-18.176 16.853333-56.362667 17.450667-56.362667 27.392-64.213333 112.597333-190.890667 169.216-241.834667 0 0 14.549333-14.336 23.637333-20.565333A76.074667 76.074667 0 0 1 511.701333 298.666667c18.048 0 34.858667 5.461333 48.554667 15.786666z
`;
	const up$3 = `
M512.298667 561.706667l15.104-0.085334c59.904-0.512 113.365333-4.096 147.242666-10.325333 0.64 0 34.218667-6.826667 45.397334-11.136 16.213333-6.826667 29.909333-19.072 38.613333-34.517333a85.333333 85.333333 0 0 0 9.344-38.826667c-0.512-10.624-5.845333-28.16-10.325333-40.704l-4.010667-10.410667c-27.392-68.992-116.906667-200.832-171.690667-251.349333l-3.84-3.712-17.92-16.64A79.189333 79.189333 0 0 0 511.658667 128c-16.170667 0-32.341333 4.949333-45.397334 14.805333-4.224 2.986667-9.642667 7.68-14.250666 11.946667l-16.938667 16.170667C378.709333 226.56 299.605333 347.093333 273.365333 409.557333c-0.554667 0-16.768 38.826667-17.365333 57.301334v2.432c0 28.373333 16.170667 54.869333 42.282667 68.394666 7.168 3.712 21.162667 7.253333 33.450666 9.941334l23.210667 4.864c37.290667 5.546667 94.549333 9.216 157.354667 9.216z m-65.066667 270.165333c0 35.413333 29.013333 64.128 64.768 64.128a64.426667 64.426667 0 0 0 64.768-64.128l-13.994667-157.866667c0-27.733333-22.698667-50.304-50.773333-50.304-28.074667 0-50.816 22.528-50.816 50.346667l-13.952 157.824z
`;
	const up_square = `
M938.666667 337.92v348.586667c0 150.613333-96.896 252.16-241.493334 252.16H327.253333C182.613333 938.666667 85.333333 837.12 85.333333 686.506667V337.92C85.333333 186.88 182.613333 85.333333 327.253333 85.333333h369.92C841.770667 85.333333 938.666667 186.88 938.666667 337.92zM480 415.146667v270.933333c0 17.92 14.506667 32 32 32 17.92 0 32-14.08 32-32V415.146667l105.386667 105.813333c5.973333 5.973333 14.506667 9.386667 22.613333 9.386667 8.064 0 16.213333-3.413333 22.613333-9.386667 12.373333-12.373333 12.373333-32.853333 0-45.226667l-160-160.853333a33.024 33.024 0 0 0-45.226666 0l-160 160.853333c-12.373333 12.373333-12.373333 32.853333 0 45.226667 12.8 12.373333 32.853333 12.373333 45.653333 0l104.96-105.813333z
`;
	const up_circular = `
M512 85.333333c235.52 0 426.666667 191.573333 426.666667 426.666667l-0.170667 11.946667C932.181333 753.92 743.509333 938.666667 512 938.666667 276.906667 938.666667 85.333333 747.52 85.333333 512 85.333333 276.906667 276.906667 85.333333 512 85.333333zM341.333333 596.48c12.8 12.373333 32.853333 12.373333 45.226667-0.426667L512 470.186667l125.44 125.866666c12.373333 12.8 32.853333 12.8 45.226667 0.426667 12.8-12.8 12.8-32.853333 0-45.226667l-148.053334-148.906666a32 32 0 0 0-45.226666 0L341.333333 551.253333c-6.4 5.973333-9.386667 14.08-9.386666 22.186667 0 8.533333 2.986667 16.64 9.386666 23.04z
`;
	const __right = `
M314.453333 463.744c2.389333-2.474667 11.52-13.056 19.968-21.76 49.706667-54.741333 179.370667-144.341333 247.253334-171.690667 10.325333-4.394667 36.394667-13.696 50.304-14.293333 13.354667 0 26.026667 3.072 38.186666 9.301333 15.146667 8.704 27.306667 22.4 33.92 38.570667 4.266667 11.221333 10.922667 44.8 10.922667 45.397333 6.656 36.736 10.325333 96.426667 10.325333 162.389334 0 62.848-3.669333 120.106667-9.088 157.397333-0.64 0.597333-7.253333 42.325333-14.549333 56.618667a76.16 76.16 0 0 1-67.328 42.325333h-2.389333c-18.176-0.64-56.362667-16.853333-56.362667-17.450667-64.213333-27.392-190.890667-112.597333-241.834667-169.216 0 0-14.336-14.549333-20.565333-23.637333A76.074667 76.074667 0 0 1 298.666667 512.298667c0-18.048 5.461333-34.858667 15.786666-48.554667z
`;
	const right$2 = `
M462.293333 512.298667l0.085334 15.104c0.512 59.904 4.096 113.365333 10.325333 147.242666 0 0.64 6.826667 34.218667 11.136 45.397334 6.826667 16.213333 19.072 29.909333 34.517333 38.613333a85.333333 85.333333 0 0 0 38.826667 9.344c10.624-0.512 28.16-5.845333 40.704-10.325333l10.410667-4.010667c68.992-27.392 200.832-116.906667 251.349333-171.690667l3.712-3.84 16.64-17.92c10.453333-13.738667 16-30.506667 16-48.554666 0-16.170667-4.949333-32.341333-14.805333-45.397334-2.986667-4.224-7.68-9.642667-11.946667-14.250666l-16.170667-16.938667c-55.68-56.362667-176.170667-135.466667-238.634666-161.706667 0-0.554667-38.826667-16.768-57.301334-17.365333h-2.432c-28.373333 0-54.869333 16.170667-68.394666 42.282667-3.712 7.168-7.253333 21.162667-9.941334 33.450666l-4.864 23.210667c-5.546667 37.290667-9.216 94.549333-9.216 157.354667z m-270.165333-65.066667C156.714667 447.232 128 476.245333 128 512a64.426667 64.426667 0 0 0 64.128 64.768l157.866667-13.994667c27.733333 0 50.304-22.698667 50.304-50.773333 0-28.074667-22.528-50.816-50.346667-50.816l-157.824-13.952z
`;
	const right_square = `
M337.92 85.333333h348.586667C837.12 85.333333 938.666667 182.229333 938.666667 326.826667v369.92c0 144.64-101.546667 241.92-252.16 241.92H337.92C186.88 938.666667 85.333333 841.386667 85.333333 696.746667V326.826667C85.333333 182.229333 186.88 85.333333 337.92 85.333333z m77.226667 458.666667h270.933333c17.92 0 32-14.506667 32-32 0-17.92-14.08-32-32-32H415.146667l105.813333-105.386667c5.973333-5.973333 9.386667-14.506667 9.386667-22.613333 0-8.064-3.413333-16.213333-9.386667-22.613333a32.170667 32.170667 0 0 0-45.226667 0l-160.853333 160c-11.946667 11.946667-11.946667 33.28 0 45.226666l160.853333 160c12.373333 12.373333 32.853333 12.373333 45.226667 0 12.373333-12.8 12.373333-32.853333 0-45.653333l-105.813333-104.96z
`;
	const right_circular = `
M938.666667 512c0 235.52-191.573333 426.666667-426.666667 426.666667l-11.946667-0.170667C270.08 932.181333 85.333333 743.509333 85.333333 512 85.333333 276.906667 276.48 85.333333 512 85.333333c235.093333 0 426.666667 191.573333 426.666667 426.666667zM427.52 341.333333c-12.373333 12.8-12.373333 32.853333 0.426667 45.226667L553.813333 512l-125.866666 125.44c-12.8 12.373333-12.8 32.853333-0.426667 45.226667 12.8 12.8 32.853333 12.8 45.226667 0l148.906666-148.053334a32 32 0 0 0 0-45.226666L472.746667 341.333333a30.037333 30.037333 0 0 0-22.186667-9.386666c-8.533333 0-16.64 2.986667-23.04 9.386666z
`;
	const __down = `
M463.744 709.546667c-2.474667-2.389333-13.056-11.52-21.76-19.968-54.741333-49.706667-144.341333-179.370667-171.690667-247.253334-4.394667-10.325333-13.696-36.394667-14.293333-50.304 0-13.354667 3.072-26.026667 9.301333-38.186666 8.704-15.146667 22.4-27.306667 38.570667-33.92 11.221333-4.266667 44.8-10.922667 45.397333-10.922667 36.736-6.656 96.426667-10.325333 162.389334-10.325333 62.848 0 120.106667 3.669333 157.397333 9.088 0.597333 0.64 42.325333 7.253333 56.618667 14.549333 26.112 13.354667 42.325333 39.424 42.325333 67.328v2.389333c-0.64 18.176-16.853333 56.362667-17.450667 56.362667-27.392 64.213333-112.597333 190.890667-169.216 241.834667 0 0-14.549333 14.336-23.637333 20.565333a76.074667 76.074667 0 0 1-45.397333 14.549333c-18.048 0-34.858667-5.461333-48.554667-15.786666z
`;
	const down$3 = `
M447.232 192.128l13.994667 157.866667c0 27.733333 22.698667 50.304 50.773333 50.304 28.074667 0 50.816-22.528 50.816-50.346667l13.952-157.824C576.768 156.714667 547.754667 128 512 128a64.426667 64.426667 0 0 0-64.768 64.128z m11.434667 683.136c2.389333 2.176 4.266667 3.84 5.12 4.693333 13.738667 10.496 30.506667 16.042667 48.554666 16.042667 16.170667 0 32.341333-4.949333 45.397334-14.805333 9.045333-6.314667 23.637333-20.906667 23.637333-20.906667 56.618667-51.797333 141.824-180.522667 169.216-245.845333 0.597333 0 16.810667-38.826667 17.408-57.301334v-2.432c0-28.373333-16.170667-54.869333-42.282667-68.394666-10.837333-5.589333-37.290667-10.837333-49.834666-13.354667a73.514667 73.514667 0 0 1-6.826667-1.450667c-37.290667-5.546667-94.549333-9.216-157.354667-9.216-65.962667 0-125.653333 3.669333-162.346666 10.410667-0.64 0-34.218667 6.826667-45.397334 11.136-16.213333 6.826667-29.909333 19.072-38.613333 34.517333a85.333333 85.333333 0 0 0-9.344 38.826667c0.64 14.165333 9.984 40.661333 14.336 51.114667 27.392 68.992 116.906667 200.832 171.690667 251.349333 5.674667 5.632 12.16 11.52 16.64 15.616z
`;
	const down_square = `
M85.333333 686.08V337.493333C85.333333 186.88 182.186667 85.333333 326.826667 85.333333h369.92C841.386667 85.333333 938.666667 186.88 938.666667 337.493333v348.586667c0 151.04-97.28 252.586667-241.92 252.586667H326.826667C182.186667 938.666667 85.333333 837.12 85.333333 686.08z m458.666667-77.226667V337.92c0-17.92-14.506667-32-32-32-17.92 0-32 14.08-32 32v270.933333l-105.386667-105.813333a32.725333 32.725333 0 0 0-22.613333-9.386667c-8.106667 0-16.213333 3.413333-22.613333 9.386667-12.373333 12.373333-12.373333 32.853333 0 45.226667l160 160.853333c11.946667 11.946667 33.28 11.946667 45.226666 0l160-160.853333c12.373333-12.373333 12.373333-32.853333 0-45.226667a32.725333 32.725333 0 0 0-45.653333 0l-104.96 105.813333z
`;
	const down_circular = `
M512 938.666667C276.48 938.666667 85.333333 747.093333 85.333333 512 85.333333 276.48 276.48 85.333333 512 85.333333c235.093333 0 426.666667 191.146667 426.666667 426.666667 0 235.093333-191.573333 426.666667-426.666667 426.666667z m170.666667-511.146667a31.786667 31.786667 0 0 0-45.226667 0.426667L512 553.813333l-125.44-125.866666c-12.373333-12.8-32.853333-12.8-45.226667-0.426667-12.8 12.8-12.8 32.853333 0 45.226667l148.053334 148.906666a32 32 0 0 0 45.226666 0L682.666667 472.746667c6.4-5.973333 9.386667-14.08 9.386666-22.186667 0-8.533333-2.986667-16.64-9.386666-23.04z
`;
	const __left = `
M314.453333 463.744c2.389333-2.474667 11.52-13.056 19.968-21.76 49.706667-54.741333 179.370667-144.341333 247.253334-171.690667 10.325333-4.394667 36.394667-13.696 50.304-14.293333 13.354667 0 26.026667 3.072 38.186666 9.301333 15.146667 8.704 27.306667 22.4 33.92 38.570667 4.266667 11.221333 10.922667 44.8 10.922667 45.397333 6.656 36.736 10.325333 96.426667 10.325333 162.389334 0 62.848-3.669333 120.106667-9.088 157.397333-0.64 0.597333-7.253333 42.325333-14.549333 56.618667a76.16 76.16 0 0 1-67.328 42.325333h-2.389333c-18.176-0.64-56.362667-16.853333-56.362667-17.450667-64.213333-27.392-190.890667-112.597333-241.834667-169.216 0 0-14.336-14.549333-20.565333-23.637333A76.074667 76.074667 0 0 1 298.666667 512.298667c0-18.048 5.461333-34.858667 15.786666-48.554667z
`;
	const left$2 = `
M561.706667 511.701333l-0.085334-15.104c-0.512-59.904-4.096-113.365333-10.325333-147.242666 0-0.64-6.826667-34.218667-11.136-45.397334-6.826667-16.213333-19.072-29.909333-34.517333-38.613333a85.333333 85.333333 0 0 0-38.826667-9.344c-10.624 0.512-28.16 5.845333-40.704 10.325333l-10.410667 4.010667c-68.992 27.392-200.832 116.906667-251.349333 171.690667l-3.712 3.84-16.64 17.92A79.189333 79.189333 0 0 0 128 512.341333c0 16.170667 4.949333 32.341333 14.805333 45.397334 2.986667 4.224 7.68 9.642667 11.946667 14.250666l16.170667 16.938667c55.637333 56.362667 176.170667 135.466667 238.634666 161.706667 0 0.554667 38.826667 16.768 57.301334 17.365333h2.432c28.373333 0 54.869333-16.170667 68.394666-42.282667 3.712-7.168 7.253333-21.162667 9.941334-33.450666l4.864-23.210667c5.546667-37.290667 9.216-94.549333 9.216-157.354667z m270.165333 65.066667c35.413333 0 64.128-29.013333 64.128-64.768a64.426667 64.426667 0 0 0-64.128-64.768l-157.866667 13.994667c-27.733333 0-50.304 22.698667-50.304 50.773333 0 28.074667 22.528 50.816 50.346667 50.816l157.824 13.952z
`;
	const left_square = `
M337.92 85.333333h348.586667C837.12 85.333333 938.666667 182.229333 938.666667 326.826667v369.92c0 144.64-101.546667 241.92-252.16 241.92H337.92C186.88 938.666667 85.333333 841.386667 85.333333 696.746667V326.826667C85.333333 182.229333 186.88 85.333333 337.92 85.333333z m77.226667 458.666667h270.933333c17.92 0 32-14.506667 32-32 0-17.92-14.08-32-32-32H415.146667l105.813333-105.386667c5.973333-5.973333 9.386667-14.506667 9.386667-22.613333 0-8.064-3.413333-16.213333-9.386667-22.613333a32.170667 32.170667 0 0 0-45.226667 0l-160.853333 160c-11.946667 11.946667-11.946667 33.28 0 45.226666l160.853333 160c12.373333 12.373333 32.853333 12.373333 45.226667 0 12.373333-12.8 12.373333-32.853333 0-45.653333l-105.813333-104.96z
`;
	const left_circular = `
M85.333333 512C85.333333 276.48 276.906667 85.333333 512 85.333333l11.946667 0.170667C753.92 91.818667 938.666667 280.490667 938.666667 512c0 235.093333-191.146667 426.666667-426.666667 426.666667-235.093333 0-426.666667-191.573333-426.666667-426.666667z m511.146667 170.666667c12.373333-12.8 12.373333-32.853333-0.426667-45.226667L470.186667 512l125.866666-125.44c12.8-12.373333 12.8-32.853333 0.426667-45.226667-12.8-12.8-32.853333-12.8-45.226667 0l-148.906666 148.053334a32 32 0 0 0 0 45.226666L551.253333 682.666667c5.973333 6.4 14.08 9.386667 22.186667 9.386666 8.533333 0 16.64-2.986667 23.04-9.386666z
`; // 交换

	const swap = `
M321.962667 139.861333c7.082667 5.12 18.517333 16.853333 18.517333 16.853334 44.373333 41.642667 111.274667 145.066667 132.736 197.589333 0.426667 0 13.226667 31.232 13.653333 46.08v1.962667c0 22.784-12.714667 44.074667-33.152 54.954666-8.448 4.48-29.013333 8.661333-38.912 10.666667-3.242667 0.682667-5.376 1.109333-5.504 1.237333-29.269333 4.48-74.154667 7.381333-123.434666 7.381334-51.712 0-98.56-2.901333-127.36-8.405334-0.512 0-26.837333-5.418667-35.626667-8.917333a63.573333 63.573333 0 0 1-30.293333-27.733333 69.418667 69.418667 0 0 1-7.253334-31.146667c0.426667-11.392 7.808-32.682667 11.178667-41.088 21.461333-55.466667 91.733333-161.450667 134.698667-202.069333 4.437333-4.522667 9.514667-9.258667 13.056-12.544 1.877333-1.792 3.328-3.114667 4.010666-3.84 10.709333-8.362667 23.893333-12.842667 38.101334-12.842667 12.629333 0 25.301333 3.968 35.584 11.861333z m455.808 293.717334a40.106667 40.106667 0 0 1-39.850667 40.448 40.106667 40.106667 0 0 1-39.850667-40.448l-11.008-195.413334a51.2 51.2 0 0 1 50.858667-51.498666c28.032 0 50.773333 23.04 50.773333 51.541333l-10.922666 195.370667z m123.306666 131.157333c12.714667 5.461333 23.466667 15.36 30.293334 27.733333 4.906667 9.813333 7.296 20.309333 7.296 31.189334-0.426667 11.349333-7.808 32.682667-11.221334 41.088-21.418667 55.466667-91.733333 161.408-134.613333 202.069333-4.394667 4.394667-9.386667 9.045333-12.928 12.373333l-4.181333 3.925334c-10.794667 8.405333-23.893333 12.885333-38.058667 12.885333a58.026667 58.026667 0 0 1-35.626667-11.946667c-7.082667-5.034667-18.517333-16.768-18.517333-16.768-44.458667-41.557333-111.274667-145.109333-132.736-197.632-0.512 0-13.226667-31.146667-13.653333-45.994666v-1.962667c0-22.826667 12.629333-44.117333 33.152-55.04 8.448-4.394667 28.928-8.576 38.826666-10.666667 3.328-0.64 5.461333-1.066667 5.546667-1.194666 29.312-4.48 74.197333-7.424 123.477333-7.424 51.712 0 98.56 2.986667 127.36 8.405333 0.469333 0 26.837333 5.461333 35.626667 8.96zM286.165333 549.973333a40.106667 40.106667 0 0 0-39.850666 40.448l-11.008 195.413334a51.2 51.2 0 0 0 50.858666 51.498666c28.032 0 50.773333-23.04 50.773334-51.541333l-10.965334-195.370667a40.106667 40.106667 0 0 0-39.808-40.405333z
`;
	arrow.__up = __up;
	arrow.up = up$3;
	arrow.up_square = up_square;
	arrow.up_circular = up_circular;
	arrow.__right = __right;
	arrow.right = right$2;
	arrow.right_square = right_square;
	arrow.right_circular = right_circular;
	arrow.__down = __down;
	arrow.down = down$3;
	arrow.down_square = down_square;
	arrow.down_circular = down_circular;
	arrow.__left = __left;
	arrow.left = left$2;
	arrow.left_square = left_square;
	arrow.left_circular = left_circular;
	arrow.swap = swap;

	const camera = {};
	const video_camera = `
M880.298667 297.984L761.173333 419.84v-72.362667c0-76.117333-61.44-137.557333-137.557333-137.557333H192.853333c-76.117333 0-137.557333 61.44-137.557333 137.557333v374.101334c0 76.117333 61.44 137.557333 137.557333 137.557333h430.421334c76.117333 0 137.557333-61.44 137.557333-137.557333v-64.170667l119.125333 113.664c32.426667 33.109333 88.405333 10.24 88.405334-36.181333V333.824c0.341333-46.08-55.637333-68.949333-88.064-35.84zM358.4 405.845333H186.368c-19.114667 0-34.474667-15.36-34.474667-34.474666s15.36-34.474667 34.474667-34.474667h172.032c19.114667 0 34.474667 15.36 34.474667 34.474667a34.816 34.816 0 0 1-34.474667 34.474666z
`;
	const xxxx = `
M345.344
`;
	camera.video_camera = video_camera;
	camera.xxxx = xxxx;

	const video = {};
	const __video = `
M260.821333 192h247.125334c103.338667 0 175.488 71.210667 175.488 173.226667v293.546666c0 102.016-72.106667 173.226667-175.488 173.226667H260.821333C157.482667 832 85.333333 760.789333 85.333333 658.773333V365.226667C85.333333 263.253333 157.482667 192 260.821333 192z m590.72 101.504c18.730667-9.514667 40.704-8.533333 58.581334 2.730667 17.877333 11.221333 28.544 30.72 28.544 52.053333v327.466667c0 21.333333-10.666667 40.832-28.544 52.053333a59.093333 59.093333 0 0 1-58.624 2.688l-63.189334-31.914667a69.248 69.248 0 0 1-37.888-62.165333V387.541333c0-26.496 14.506667-50.346667 37.888-62.122666l63.232-31.914667z
`;
	const __video2 = `
M763.221333 177.493333H260.778667a136.533333 136.533333 0 0 0-136.533334 136.533334v502.442666a136.533333 136.533333 0 0 0 136.533334 136.533334h502.442666a136.533333 136.533333 0 0 0 136.533334-136.533334V314.026667a136.533333 136.533333 0 0 0-136.533334-136.533334z m-131.072 446.805334l-134.826666 77.824a68.266667 68.266667 0 0 1-102.4-59.050667v-155.648a68.266667 68.266667 0 0 1 102.4-59.050667l134.826666 77.824a68.266667 68.266667 0 0 1 0 118.101334z
`;
	const __video3 = `
M906.9 298.1a95.5 95.5 0 0 0-100 9.1L704 384V320a128.1 128.1 0 0 0-128-128H192A128.1 128.1 0 0 0 64 320v384a128.1 128.1 0 0 0 128 128h384a128.1 128.1 0 0 0 128-128V640l102.4 76.8a95.5 95.5 0 0 0 57.5 19.3 96.7 96.7 0 0 0 43-10A95.5 95.5 0 0 0 960 640V384a95.5 95.5 0 0 0-53.1-85.9z
`;
	const __video3_disabled = `
M64 320v384a128.1 128.1 0 0 0 128 128h384a128.1 128.1 0 0 0 107.3-58.2l-561-561A127.6 127.6 0 0 0 64 320zM906.9 298.1a95.5 95.5 0 0 0-100 9.1L704 384V320a128.1 128.1 0 0 0-128-128H282.6L810 719.1a95.1 95.1 0 0 0 54 16.8 96.7 96.7 0 0 0 43-10A95.5 95.5 0 0 0 960 640V384a95.5 95.5 0 0 0-53.1-85.9zM182.6 137.4a32 32 0 1 0-45.2 45.2l704 704a31.9 31.9 0 0 0 45.2 0 31.9 31.9 0 0 0 0-45.2z
`;
	const play = `
M85.333333 512.256C85.333333 276.736 276.821333 85.333333 512 85.333333s426.666667 191.402667 426.666667 426.922667C938.666667 747.264 747.178667 938.666667 512 938.666667S85.333333 747.264 85.333333 512.256z m583.168 43.178667c4.522667-4.522667 10.282667-11.52 11.52-13.184 6.613333-8.618667 9.898667-19.328 9.898667-29.994667 0-11.989333-3.712-23.125333-10.709333-32.170667a158.805333 158.805333 0 0 1-3.157334-3.413333c-2.730667-2.944-6.698667-7.253333-10.453333-10.965333-33.749333-36.266667-121.898667-95.530667-168.021333-113.621334-6.997333-2.858667-24.704-9.045333-34.176-9.472-9.045333 0-17.706667 2.048-25.941334 6.186667a53.376 53.376 0 0 0-23.04 25.514667c-2.901333 7.381333-7.424 29.610667-7.424 30.037333-4.565333 24.32-6.997333 63.786667-6.997333 107.434667 0 41.642667 2.432 79.445333 6.144 104.149333 0.128 0.085333 0.469333 1.877333 1.024 4.608 1.706667 8.362667 5.12 25.728 8.874667 32.853333 9.045333 17.28 26.752 27.989333 45.696 27.989334h1.664c12.373333-0.426667 38.314667-11.093333 38.314666-11.52 43.648-18.133333 129.706667-74.496 164.309334-111.957334l2.474666-2.474666z
`;
	const play2 = `
M204.672 204.8l0.576-9.024a76.8 76.8 0 0 1 114.624-57.472l2.688 1.6 464.64 309.888a78.08 78.08 0 0 1-1.472 126.72l-462.08 306.816c-12.224 8.448-26.88 13.184-42.176 12.608-42.24-1.536-76.8-34.56-76.8-76.8V204.8z
`; // 暂停

	const pause = `
M255.36 896c-42.432 0-63.36-34.368-63.36-76.8V204.8c0-42.432 20.928-76.8 63.36-76.8s63.36 34.368 63.36 76.8v614.4c0 42.432-20.928 76.8-63.36 76.8zM767.36 896c-42.432 0-63.36-34.368-63.36-76.8V204.8c0-42.432 20.928-76.8 63.36-76.8s63.36 34.368 63.36 76.8v614.4c0 42.432-20.928 76.8-63.36 76.8z
`; // 快进

	const fast_forward = `
M510.08 174.4l8.32 4.544 8.192 5.248 7.936 5.696 332.864 255.168c19.712 17.664 29.184 40 28.608 66.944-0.64 26.944-10.24 47.616-28.8 61.888l-354.688 269.44-7.04 4.224c-24.32 13.44-56.32 18.56-57.472-44.16l0.256-154.24-255.744 194.176-7.04 4.224c-24.32 13.44-56.32 18.56-57.472-44.16l0.832-549.696c0.128-89.088 30.72-94.272 61.248-79.296l8.32 4.544 8.192 5.248 7.936 5.696 234.24 179.584V253.696c0.192-89.088 30.72-94.272 61.312-79.296z
`; // 后退

	const backward = `
M513.92 174.4l-8.32 4.544-8.192 5.248-7.936 5.696-332.864 255.168A83.264 83.264 0 0 0 128 512c0.64 26.944 10.24 47.616 28.8 61.888l354.688 269.44 7.04 4.224c24.32 13.44 56.32 18.56 57.472-44.16l-0.256-154.24 255.744 194.176 7.04 4.224c24.32 13.44 56.32 18.56 57.472-44.16l-0.832-549.696c-0.128-89.088-30.72-94.272-61.248-79.296l-8.32 4.544-8.192 5.248-7.936 5.696-234.24 179.584V253.696c-0.192-89.088-30.72-94.272-61.312-79.296z
`; // 上一个

	const prev = `
M792.128 845.696l-536.32-269.44 0.576 264.768c0 30.336-28.288 54.912-63.232 54.976-35.008 0-63.424-24.448-63.488-54.784l-0.768-328.704L128 512l0.896-0.448-0.704-328.576C128.128 152.64 156.352 128 191.36 128c35.008-0.064 63.424 24.448 63.488 54.72l0.64 264.704 491.968-249.408c54.848-28.864 140.672-63.552 140.928 58.048l1.28 549.632c-1.856 69.12-60.416 55.936-97.536 40z
`; // 下一个

	const next = `
M225.536 845.696l536.32-269.44-0.576 264.768c0 30.336 28.288 54.912 63.232 54.976 35.008 0 63.424-24.448 63.488-54.784l0.768-328.704L889.6 512l-0.896-0.448 0.704-328.576C889.6 152.64 861.248 128 826.24 128c-34.944-0.064-63.36 24.448-63.488 54.72l-0.576 264.704-491.968-249.408C215.36 169.152 129.536 134.4 129.216 256L128 805.696c1.856 69.12 60.352 55.936 97.536 40z
`; // 麦克风

	const microphone = [`
M320 64m192 0l0 0q192 0 192 192l0 256q0 192-192 192l0 0q-192 0-192-192l0-256q0-192 192-192Z
`, `
M800 416a32 32 0 0 0-32 32v64a256 256 0 0 1-512 0v-64a32 32 0 0 0-64 0v64A320 320 0 0 0 480 830v66H320a32 32 0 1 0 0 64h384a32 32 0 0 0 0-64h-160V830a320 320 0 0 0 288-318v-64a32 32 0 0 0-32-32z
`]; // 麦克风

	const microphone0 = `
M511.752 70.5c-86.605 0-156.835 69.734-156.835 155.747l0 273.812c0 86.013 70.23 155.748 156.835 155.748 86.602 0 156.832-69.735 156.832-155.748L668.584 226.247C668.584 140.234 598.354 70.5 511.752 70.5L511.752 70.5 511.752 70.5zM243.854 461.102c-18.051 0-32.649 14.496-32.649 32.451 0 2.269 0.197 4.436 0.689 6.506l-0.689 0c0 151.605 113.922 276.578 261.386 295.713l0 80.687-52.275 0c-21.702 0-39.257 17.458-39.257 38.964 0 21.499 17.555 38.957 39.257 38.957l182.969 0c21.701 0 39.256-17.458 39.256-38.957 0-21.506-17.555-38.964-39.256-38.964L551.01 876.459l0-80.687c143.119-18.543 254.383-137.002 260.691-282.688 0.396-2.072 0.695-4.243 0.695-6.512 0-0.79-0.197-1.479-0.197-2.167 0-1.483 0.197-2.86 0.197-4.345l-0.695 0c-3.058-14.795-16.172-25.94-32.057-25.94-15.782 0-28.999 11.145-32.057 25.94l-0.688 0c0 129.019-105.344 233.572-235.249 233.572-129.903 0-235.249-104.554-235.249-233.572l-0.689 0c0.396-2.07 0.689-4.237 0.689-6.506C276.503 475.598 261.906 461.102 243.854 461.102L243.854 461.102 243.854 461.102zM243.854 461.102
`; // 麦克风

	const microphone1 = `
M495.940744 913.438928 495.940744 736.922702c0-0.203638 0-0.407276 0.01535-0.611937-134.418432-8.278547-240.878093-119.882368-240.878093-256.512165l0-6.288217 0.047072 0c-0.031722-0.548492-0.047072-1.096984-0.047072-1.653663 0-13.305027 10.772344-24.086581 24.085558-24.086581 13.314237 0 24.086581 10.781554 24.086581 24.086581 0 0.556679-0.016373 1.105171-0.047072 1.653663l0.047072 0 0 8.476045c0 115.399263 93.459578 208.78721 208.747301 208.78721 115.304096 0 208.747301-93.476975 208.747301-208.78721l0-8.476045 0.047072 0c-0.030699-0.548492-0.047072-1.096984-0.047072-1.653663 0-13.305027 10.772344-24.086581 24.086581-24.086581 13.313214 0 24.085558 10.781554 24.085558 24.086581 0 0.556679-0.01535 1.105171-0.047072 1.653663l0.047072 0 0 6.288217c0 136.551002-106.427938 248.233618-240.878093 256.512165 0.01535 0.203638 0.01535 0.407276 0.01535 0.611937l0 176.516226 88.23867 0c13.344936 0 24.164353 10.694573 24.164353 24.085558 0 13.305027-10.709923 24.085558-24.164353 24.085558l-208.590735 0c-13.344936 0-24.164353-10.694573-24.164353-24.085558 0-13.305027 10.709923-24.085558 24.164353-24.085558L495.940744 913.438928zM351.423303 223.027539c0-88.716554 71.866794-160.637584 160.575162-160.637584 88.676645 0 160.575162 72.046896 160.575162 160.637584l0 256.794597c0 88.716554-71.866794 160.637584-160.575162 160.637584-88.676645 0-160.575162-72.046896-160.575162-160.637584L351.423303 223.027539z
`; // 麦克风

	const microphone2 = [`
M495.941767 913.437905 495.941767 736.922702c0-0.203638 0-0.407276 0.01535-0.611937-134.418432-8.27957-240.878093-119.882368-240.878093-256.512165l0-6.288217 0.047072 0c-0.031722-0.548492-0.047072-1.096984-0.047072-1.653663 0-13.305027 10.772344-24.086581 24.085558-24.086581 13.314237 0 24.086581 10.781554 24.086581 24.086581 0 0.556679-0.016373 1.105171-0.047072 1.653663l0.047072 0 0 8.476045c0 115.39824 93.459578 208.78721 208.747301 208.78721 115.304096 0 208.747301-93.475951 208.747301-208.78721l0-8.476045 0.047072 0c-0.030699-0.548492-0.047072-1.096984-0.047072-1.653663 0-13.305027 10.772344-24.086581 24.086581-24.086581 13.313214 0 24.085558 10.781554 24.085558 24.086581 0 0.556679-0.01535 1.105171-0.047072 1.653663l0.047072 0 0 6.288217c0 136.552026-106.427938 248.233618-240.878093 256.512165 0.01535 0.203638 0.01535 0.407276 0.01535 0.611937l0 176.515203 88.23867 0c13.344936 0 24.164353 10.694573 24.164353 24.085558 0 13.297864-10.709923 24.085558-24.164353 24.085558l-208.590735 0c-13.344936 0-24.164353-10.69355-24.164353-24.085558 0-13.296841 10.709923-24.085558 24.164353-24.085558L495.941767 913.437905z
`, `
M511.999488 62.389956c-88.708368 0-160.575162 71.92103-160.575162 160.637584l0 256.794597c0 88.590688 71.898517 160.637584 160.575162 160.637584 88.708368 0 160.575162-71.92103 160.575162-160.637584L672.57465 223.027539C672.57465 134.436852 600.676134 62.389956 511.999488 62.389956zM624.402511 479.955166c0 62.035892-50.446949 112.332415-112.403023 112.332415-62.08194 0-112.403023-50.188053-112.403023-112.332415L399.596466 222.89451c0-62.034868 50.446949-112.331391 112.403023-112.331391 62.08194 0 112.403023 50.187029 112.403023 112.331391L624.402511 479.955166z
`]; // 麦克风

	/*export const microphone3 = `
	M512 64c34 0 66.1 13.4 90.3 37.7C626.6 125.9 640 158 640 192v368c0 34-13.4 66.1-37.7 90.3C578.1 674.6 546 688 512 688s-66.1-13.4-90.3-37.7C397.4 626.1 384 594 384 560V192c0-34 13.4-66.1 37.7-90.3C445.9 77.4 478 64 512 64m0-64C406.4 0 320 86.4 320 192v368c0 105.6 86.4 192 192 192s192-86.4 192-192V192C704 86.4 617.6 0 512 0z
	`;*/
	// 麦克风

	const microphone3 = `
M277.585106 1023.445637a40.93757 40.93757 0 0 1-40.639066-41.278716 40.93757 40.93757 0 0 1 40.639066-41.236073L490.503112 940.888205v-107.759623c-166.436806-10.490252-298.503112-143.11092-298.503112-304.856964v-63.197373C192 443.070301 210.166047 426.439413 232.639067 426.439413c22.47302 0 40.596423 17.56904 40.596423 38.634832v63.197373c0 125.54188 107.20526 228.269594 238.589273 228.269594s238.589273-101.832204 238.589273-228.269594v-63.197373c0-21.9613 18.123403-38.634831 40.596423-38.634832 22.47302 0 40.639067 17.56904 40.639066 38.634832v63.197373c0 147.63111-110.019718 270.998182-255.817166 299.355978L575.789715 940.930848h184.986643a40.93757 40.93757 0 0 1 40.639066 41.278716c0.852866 22.85681-18.166047 41.278716-40.639066 41.278716H277.585106zM512.251196 0.006396a170.573207 170.573207 0 0 1 111.98131 40.639067C659.839663 71.09278 682.397969 115.143311 682.397969 164.183108v353.854117c0 49.08244-22.60095 93.132971-58.165463 123.580289A170.573207 170.573207 0 0 1 512.251196 682.299224a173.558238 173.558238 0 0 1-120.680544-48.272218 158.462509 158.462509 0 0 1-50.319096-115.989781V164.268395c0-44.860753 19.104199-86.352686 49.46623-115.989781A177.310848 177.310848 0 0 1 512.251196 0.006396z
`; // 麦克风

	const microphone4 = [`
M519.253333 721.28h-14.506666a195.2 195.2 0 0 1-194.986667-195.2V201.685333A195.2 195.2 0 0 1 504.746667 6.485333h14.506666a195.2 195.2 0 0 1 194.986667 195.2v324.394667a195.2 195.2 0 0 1-194.986667 195.2zM504.746667 74.581333a127.146667 127.146667 0 0 0-126.890667 127.146667v324.352a127.146667 127.146667 0 0 0 126.890667 127.146667h14.506666a127.146667 127.146667 0 0 0 126.890667-127.146667V201.685333A127.146667 127.146667 0 0 0 519.253333 74.581333h-14.506666z
`, `
M512 847.274667a322.56 322.56 0 0 1-322.133333-322.133334 34.048 34.048 0 0 1 68.138666 0 253.994667 253.994667 0 1 0 507.989334 0 34.048 34.048 0 0 1 68.096 0A322.56 322.56 0 0 1 512 847.317333z
`, `
M487.765333 967.68a34.048 34.048 0 0 1-9.813333-24.405333V813.226667a34.048 34.048 0 0 1 68.096 0v130.048a34.048 34.048 0 0 1-58.282667 24.405333z
`, `
M663.637333 1002.538667H360.362667a34.048 34.048 0 0 1 0-68.096h303.274666a34.048 34.048 0 1 1 0 68.096z
`]; // 麦克风 禁用

	const microphone_disabled = [`
M512 704a191.5 191.5 0 0 0 82.8-18.7L320 410.5V512a192 192 0 0 0 192 192zM704 512V256a192 192 0 0 0-382.4-24.9l363.7 363.7a191.5 191.5 0 0 0 18.7-82.8z
`, `
M704 896h-160V830a315.6 315.6 0 0 0 144.5-51l-46.4-46.4A256.1 256.1 0 0 1 256 512v-64a32 32 0 0 0-64 0v64A320 320 0 0 0 480 830v66H320a32 32 0 1 0 0 64h384a32 32 0 0 0 0-64zM832 512v-64a32 32 0 0 0-64 0v64a254.3 254.3 0 0 1-35.4 130l46.4 46.4a317.5 317.5 0 0 0 53-176.4zM886.6 841.4l-704-704a32 32 0 1 0-45.2 45.2l704 704a31.9 31.9 0 0 0 45.2 0 31.9 31.9 0 0 0 0-45.2z
`]; // 麦克风 禁用

	const microphone_disabled0 = `
M665.472 153.6a153.6 153.6 0 0 0-307.2 0v23.808l307.2 307.2zM726.144 798.72L885.376 957.696l72.448-72.192-819.2-819.2L66.176 138.496l292.096 292.352V512A153.6 153.6 0 0 0 578.176 650.496l75.008 74.752A256 256 0 0 1 255.872 512h-102.4a358.4 358.4 0 0 0 307.2 354.304V921.6l-102.4 102.4h307.2l-102.4-102.4v-55.296a355.84 355.84 0 0 0 163.072-67.584zM870.272 512h-102.4a246.272 246.272 0 0 1-8.96 66.048l80.128 79.872a356.096 356.096 0 0 0 31.232-145.92z
`; // 麦克风 禁用

	const microphone_disabled1 = `
M412.032 592l-44.992 46.016a197.376 197.376 0 0 1-35.008-59.008A189.248 189.248 0 0 1 320 512V256c1.344-54.656 20.032-100.032 56-136C412.032 84.032 457.28 65.344 512 64c54.72 1.344 100.032 20.032 136 56 36.032 35.968 54.656 81.28 56 136v44.032l-64 64V256c-0.64-36.032-13.12-66.176-37.504-90.496C578.176 141.184 548.032 128.704 512 128c-35.968 0.64-66.176 13.184-90.496 37.504-24.32 24.32-36.8 54.528-37.504 90.496v256c0.64 30.72 9.984 57.344 28.032 80z m51.968 39.04a126.656 126.656 0 0 0 119.488-12.992A127.68 127.68 0 0 0 640.128 512v-56.96l64-64V512a189.632 189.632 0 0 1-96 166.016 187.776 187.776 0 0 1-95.488 26.048c-33.664 0-65.856-8.32-96.512-25.024l48-48z m-148.992 148.992l46.08-46.08A222.144 222.144 0 0 0 480 768h64c63.36-1.344 116.16-23.168 158.464-65.536 42.368-42.24 64.192-95.104 65.536-158.464V512c0-9.344 2.944-17.024 8.96-23.04a31.168 31.168 0 0 1 23.04-8.96c9.344 0 17.024 3.008 23.04 8.96 5.952 6.016 8.96 13.696 8.96 23.04v32c-2.048 81.344-30.208 149.12-84.48 203.52-54.4 54.272-122.24 82.432-203.52 84.48v64h64c9.344 0 17.024 3.008 23.04 8.96 5.952 6.016 8.96 13.696 8.96 23.04a31.168 31.168 0 0 1-8.96 23.04 31.168 31.168 0 0 1-23.04 8.96h-192a31.168 31.168 0 0 1-23.04-8.96 31.168 31.168 0 0 1-8.96-23.04c0-9.344 3.008-17.024 8.96-23.04a31.168 31.168 0 0 1 23.04-8.96h64v-64c-30.72 0-60.032-4.48-88-13.504a278.4 278.4 0 0 1-76.992-38.464z m-48-42.048A286.272 286.272 0 0 1 192 544V512c0-9.344 3.008-16.96 8.96-22.976a31.168 31.168 0 0 1 23.04-8.96c9.344 0 17.024 2.944 23.04 8.96 5.952 6.016 8.96 13.632 8.96 23.04v32c0 28.608 4.992 55.488 15.04 80.512 9.984 24.96 23.68 47.488 40.96 67.456l-44.992 45.952zM151.04 859.008a32.832 32.832 0 0 1-22.528 8.96 30.272 30.272 0 0 1-22.016-9.472 32 32 0 0 1-9.984-22.016 30.848 30.848 0 0 1 8.512-22.464l704-709.056a32.832 32.832 0 0 1 22.464-8.96c8.32 0 15.68 3.2 22.016 9.536a32.512 32.512 0 0 1 1.536 45.44l-704 708.032z
`; // 麦克风 禁用

	const microphone_disabled2 = [`
M512 952.32a30.72 30.72 0 0 1-30.72-30.72v-117.76a30.72 30.72 0 0 1 61.44 0v117.76a30.72 30.72 0 0 1-30.72 30.72z
`, `
M596.48 967.68h-168.96a30.72 30.72 0 0 1 0-61.44h168.96a30.72 30.72 0 0 1 0 61.44zM931.84 931.84a20.48 20.48 0 0 1-14.4896-5.9904l-839.68-839.68a20.48 20.48 0 0 1 28.9792-28.9792l839.68 839.68A20.48 20.48 0 0 1 931.84 931.84z
`, `
M814.08 532.48a30.72 30.72 0 0 0-61.44 0 239.2576 239.2576 0 0 1-19.5072 94.8736l46.08 46.08A300.288 300.288 0 0 0 814.08 532.48zM512 773.12a240.64 240.64 0 0 1-240.64-240.64 30.72 30.72 0 0 0-61.44 0 302.08 302.08 0 0 0 546.9696 176.5376l-44.1344-44.0832A240.64 240.64 0 0 1 512 773.12zM378.88 245.76a133.12 133.12 0 0 1 266.24 0v293.4272l48.2816 48.2816A187.8016 187.8016 0 0 0 701.44 532.48V245.76a190.0032 190.0032 0 0 0-189.44-189.44 190.1056 190.1056 0 0 0-187.4944 162.4576L378.88 273.1008z
`, `
M512 665.6a133.12 133.12 0 0 1-133.12-133.12V331.0592l-56.32-56.32V532.48a190.0032 190.0032 0 0 0 189.44 189.44 189.7472 189.7472 0 0 0 163.5328-94.208l-41.6768-41.728A133.12 133.12 0 0 1 512 665.6z
`]; // 麦克风 禁用

	const microphone_disabled3 = `
M841.5 510.1v-76.9c0-21.2-16.5-38.5-36.9-38.5-20.3 0-36.8 17.2-36.8 38.5v76.9c0 24.9-3.2 49.6-9.5 73.7l58.3 60.7c16.8-42.7 25.3-88.3 24.9-134.4z m-147.7 0V202.4c0.9-50.7-18.7-99.6-54.2-135.8-33.4-36.5-80.8-57-130.2-56.5-49.5-0.6-96.9 20-130.4 56.5-20.7 21.1-36.1 46.7-45.1 74.8l359.8 375c0.1-2 0.1-4.1 0.1-6.3z m10.4 280.5l-52.8-55c-41.5 29.3-91.2 44.6-141.9 43.9-68.8 1-134.9-27.7-182.7-79.4-49.4-49.7-76.8-118.6-75.8-190.2v-76.7c0.1-21.2-16.3-38.3-36.5-38.5-10 0-19.5 4.1-26.3 11.5-7.1 7.2-11.1 16.9-11 27v76.9c-1.1 85.5 29.3 168.2 85 231 53.8 64 129 104.2 210.2 112.7v79.3H324.8c-20.4 0-36.9 17.2-36.9 38.5 0 21.2 16.5 38.4 36.9 38.4h368.9c20.4 0 36.9-17.2 36.9-38.5S714.1 933 693.7 933H546.2v-79.3c57.5-5.9 112.2-27.8 158-63.1zM324.8 510.2c0.3 106 82.7 191.9 184.4 192.3 31 0.4 61.5-7.6 88.3-23.1L324.8 395.1v115.1zM844.4 838c-7.8 0-15.2-3.2-20.5-8.8L151.4 133.5c-11.4-12-11.5-30.9-0.2-43 10.7-11.4 28.6-12 40-1.4l1.2 1.2L865 786.1c11.4 12 11.5 30.8 0.2 42.9-5.4 5.8-12.9 9-20.8 9z
`; // 麦克风 禁用

	const microphone_disabled4 = `
M272.4 633.3l-51.1 51.1c-4.8-11.7-8.8-23.7-12.2-36.1-0.7-2.7-1.1-5.6-1.1-8.4V496.7c0-17.4 13.7-32.2 31.1-32.7 18.1-0.5 32.9 14 32.9 32v129.8c0 2.5 0.1 5 0.4 7.5z m110.3 68.3l-44.2 44.2C384 789.6 445.7 816 512 816c107.4 0 202.7-69.1 236.7-169.9 2.2-6.5 3.3-13.4 3.3-20.3V496.7c0-17.4 13.7-32.2 31.1-32.7 18.1-0.5 32.9 14 32.9 32v144c0 2.8-0.4 5.6-1.1 8.4-18.5 68.2-58.9 126.1-112.3 166.9-43.5 33.3-95.6 55.2-151.5 62.2-4 0.5-7 3.9-7 7.9V944c0 8.8 7.2 16 16 16h80c35.3 0 64 28.6 64 64H320c0-17.7 7.2-33.7 18.7-45.3S366.3 960 384 960h80c8.8 0 16-7.2 16-16v-58.5c0-4-3-7.4-7-7.9-68.7-8.6-131.5-39.7-179.7-86.6L182.1 902.1c-6.3 6.3-14.4 9.4-22.6 9.4s-16.4-3.1-22.6-9.4c-12.5-12.5-12.5-32.8 0-45.3l115.1-115 46.3-46.3 44.7-44.7 48.3-48.3 441.6-441.6c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L704 380.3V560c0 52.8-21.6 100.8-56.4 135.6S564.8 752 512 752c-49.7 0-95.2-19.1-129.3-50.4zM704 192v9.7L321.5 584.2c-1-7.9-1.5-16-1.5-24.2V192C320 86.4 406.4 0 512 0s192 86.4 192 192z
`; // 麦克风 禁用

	const microphone_disabled5 = `
M512 0C406.4 0 320 86.4 320 192v368c0 8.2 0.5 16.3 1.5 24.2l62.5-62.5V192c0-34 13.4-66.1 37.7-90.4C445.9 77.4 478 64 512 64s66.1 13.4 90.3 37.6C626.6 125.9 640 158 640 192v73.7l64-64V192C704 86.4 617.6 0 512 0zM272.4 633.3l-51.1 51.1c-4.8-11.7-8.8-23.7-12.2-36.1-0.7-2.7-1.1-5.6-1.1-8.4V496.7c0-17.4 13.7-32.2 31.1-32.7 18.1-0.5 32.9 14 32.9 32v129.8c0 2.5 0.1 5 0.4 7.5zM512 752c52.8 0 100.8-21.6 135.6-56.4S704 612.8 704 560V380.3l174.1-174.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L391.3 602.5 343 650.8l-44.7 44.7-46.3 46.3-115.1 115.1c-12.5 12.5-12.5 32.8 0 45.3 6.3 6.3 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L293.3 791c48.2 46.8 111.1 77.9 179.7 86.6 4 0.5 7 3.9 7 7.9V944c0 8.8-7.2 16-16 16h-80c-17.7 0-33.7 7.2-45.3 18.7S320 1006.3 320 1024h384c0-35.4-28.7-64-64-64h-80c-8.8 0-16-7.2-16-16v-58.5c0-4 3-7.4 7-7.9 56-7 108.1-29 151.5-62.2 53.4-40.8 93.8-98.8 112.3-166.9 0.7-2.7 1.1-5.6 1.1-8.4V496c0-18-14.8-32.5-32.9-32-17.4 0.5-31.1 15.2-31.1 32.7v129.2c0 6.9-1.1 13.8-3.3 20.3C714.7 746.9 619.4 816 512 816c-66.3 0-128-26.4-173.5-70.2l44.2-44.2C416.8 732.9 462.3 752 512 752z m128-307.7V560c0 34-13.4 66.1-37.7 90.3C578.1 674.6 546 688 512 688c-31.1 0-60.6-11.2-84-31.7l212-212z
`; // 麦克风 禁用

	const microphone_disabled6 = `
M378.4192 238.592c0-69.8368 56.5248-126.464 126.3616-126.6176h14.4896c69.8368 0.1024 126.3616 56.7808 126.3616 126.6176v266.752c0 4.4032-0.256 8.8064-0.6656 13.1072l55.8592 55.8592c8.1408-21.4528 12.6464-44.6464 12.6464-68.9664V238.592c0-107.264-86.8864-194.304-194.2016-194.4064h-14.4896c-90.5728 0.1024-166.6048 62.1056-188.1088 145.9712L378.4192 251.904v-13.312zM832.768 504.4224c0-18.688-15.1552-33.8432-33.8944-33.8944-18.7392 0-33.9456 15.1552-33.9456 33.8944 0 39.1168-8.9088 76.1856-24.7808 109.2608l50.0224 50.0224c27.0336-46.8992 42.5472-101.2736 42.5984-159.2832zM912.5376 868.7104L155.2896 111.4624a31.0272 31.0272 0 0 0-43.8272 0c-12.0832 12.0832-12.0832 31.6928 0 43.8272l199.1168 199.1168V505.344c0 107.264 86.8864 194.304 194.2016 194.4064h14.4896c38.912-0.0512 75.0592-11.5712 105.4208-31.2832l38.6048 38.6048c-42.1888 31.5392-94.5152 50.3296-151.2448 50.3296-139.7248 0-252.9792-113.2544-252.9792-252.9792 0-18.7392-15.2064-33.8944-33.8944-33.8944-18.7392 0-33.8944 15.2064-33.8944 33.8944 0.256 165.5808 125.7472 301.824 286.8736 318.9248v88.6272H361.0112c-18.688 0-33.8432 15.1552-33.8944 33.8944 0 18.7392 15.1552 33.9456 33.8944 33.9456h302.0288c18.688 0 33.8432-15.1552 33.8944-33.8944 0-18.7392-15.1552-33.9456-33.8944-33.9456h-117.0944v-88.6272c62.2592-6.6048 119.1424-31.0784 165.5808-68.0448l157.2352 157.2352a30.89408 30.89408 0 0 0 21.9136 9.0624c7.936 0 15.872-3.0208 21.9136-9.0624a31.07328 31.07328 0 0 0-0.0512-43.8272z m-393.3184-236.8h-14.4896c-69.8368-0.1024-126.3616-56.7808-126.3616-126.6176V422.1952l196.608 196.608a124.86144 124.86144 0 0 1-55.7568 13.1072z
`; // 麦克风 禁用

	const microphone_disabled7 = `
M841.5 510.1v-76.9c0-21.2-16.5-38.5-36.9-38.5-20.3 0-36.8 17.2-36.8 38.5v76.9c0 24.9-3.2 49.6-9.5 73.7l58.3 60.7c16.8-42.7 25.3-88.3 24.9-134.4z m-147.7 0V202.4c0.9-50.7-18.7-99.6-54.2-135.8-33.4-36.5-80.8-57-130.2-56.5-49.5-0.6-96.9 20-130.4 56.5-20.7 21.1-36.1 46.7-45.1 74.8l359.8 375c0.1-2 0.1-4.1 0.1-6.3z m10.4 280.5l-52.8-55c-41.5 29.3-91.2 44.6-141.9 43.9-68.8 1-134.9-27.7-182.7-79.4-49.4-49.7-76.8-118.6-75.8-190.2v-76.7c0.1-21.2-16.3-38.3-36.5-38.5-10 0-19.5 4.1-26.3 11.5-7.1 7.2-11.1 16.9-11 27v76.9c-1.1 85.5 29.3 168.2 85 231 53.8 64 129 104.2 210.2 112.7v79.3H324.8c-20.4 0-36.9 17.2-36.9 38.5 0 21.2 16.5 38.4 36.9 38.4h368.9c20.4 0 36.9-17.2 36.9-38.5S714.1 933 693.7 933H546.2v-79.3c57.5-5.9 112.2-27.8 158-63.1zM324.8 510.2c0.3 106 82.7 191.9 184.4 192.3 31 0.4 61.5-7.6 88.3-23.1L324.8 395.1v115.1zM844.4 838c-7.8 0-15.2-3.2-20.5-8.8L151.4 133.5c-11.4-12-11.5-30.9-0.2-43 10.7-11.4 28.6-12 40-1.4l1.2 1.2L865 786.1c11.4 12 11.5 30.8 0.2 42.9-5.4 5.8-12.9 9-20.8 9z
`; // 麦克风 禁用

	const microphone_disabled8 = `
M983.000554 937.607235L87.075587 29.523287a31.99732 31.99732 0 1 0-45.436194 44.796249L320.016079 356.5359V512.042876a191.983921 191.983921 0 0 0 191.983921 191.983922 191.983921 191.983921 0 0 0 113.270514-37.756838l44.796248 45.436195A255.978562 255.978562 0 0 1 256.021438 512.042876V448.048236a31.99732 31.99732 0 0 0-63.99464 0v63.99464a319.973202 319.973202 0 0 0 291.81556 319.973203H480.00268v127.989281H320.016079a31.99732 31.99732 0 0 0 0 63.99464h383.967842a31.99732 31.99732 0 0 0 0-63.99464H543.99732v-127.989281a319.973202 319.973202 0 0 0 172.785529-71.673998l222.061403 225.261135a31.99732 31.99732 0 0 0 45.436195-44.796249zM512 640.032157a127.989281 127.989281 0 0 1-127.989281-127.989281V421.810433l195.8236 198.383386A127.989281 127.989281 0 0 1 512 640.032157zM352.653345 157.512568a31.99732 31.99732 0 0 0 42.236463-16.638606A127.989281 127.989281 0 0 1 639.989281 192.069674v255.978562a31.99732 31.99732 0 0 0 63.99464 0V192.069674a191.983921 191.983921 0 0 0-367.969182-76.793568 31.99732 31.99732 0 0 0 16.638606 42.236462zM790.376686 593.956016h5.759518a31.99732 31.99732 0 0 0 31.357373-26.877749A331.492238 331.492238 0 0 0 831.973202 512.042876V448.048236a31.99732 31.99732 0 0 0-63.99464 0v63.99464a262.378026 262.378026 0 0 1-3.839679 44.796249 31.99732 31.99732 0 0 0 26.237803 37.116891z
`; // 麦克风 禁用

	const microphone_disabled9 = [`
M220.754773 485.12a35.328 35.328 0 0 1 35.157334 30.592l0.341333 4.693333v8.832c0 136.106667 111.488 246.869333 248.490667 246.869334a248.746667 248.746667 0 0 0 215.893333-125.013334l51.498667 51.456a320.341333 320.341333 0 0 1-221.653334 140.8l-10.368 1.322667v107.946667h177.408a35.328 35.328 0 0 1 4.693334 70.272l-4.693334 0.298666H291.880107a35.370667 35.370667 0 0 1-25.045334-60.288 35.328 35.328 0 0 1 20.394667-9.984l4.693333-0.298666H469.202773v-107.946667c-155.989333-17.237333-278.528-146.517333-283.776-304.853333l-0.170666-10.581334v-8.874666a35.328 35.328 0 0 1 35.456-35.285334z m97.536-236.373333l353.493334 353.536a186.624 186.624 0 0 1-167.125334 103.381333c-99.797333 0-181.418667-78.336-186.154666-176.256l-0.213334-8.96V248.746667z m470.314667 236.373333a35.328 35.328 0 0 1 35.157333 30.592l0.298667 4.693333v8.832a313.770667 313.770667 0 0 1-30.208 134.698667l-54.272-54.272c7.765333-22.4 12.373333-46.208 13.354667-70.997333l0.170666-9.429334v-8.874666a35.328 35.328 0 0 1 35.498667-35.285334zM504.616107 0.085333c99.797333 0 181.418667 78.250667 186.154666 176.256l0.213334 8.96v335.104c0 12.629333-1.28 24.96-3.712 36.864L318.290773 188.416v-3.072C318.290773 83.157333 401.874773 0.128 504.616107 0.128z
`, `
M142.364101 188.327773m30.16989-30.169889l0 0q30.169889-30.169889 60.339778 0l603.397787 603.397787q30.169889 30.169889 0 60.339778l0 0q-30.169889 30.169889-60.339779 0l-603.397786-603.397786q-30.169889-30.169889 0-60.339779Z
`];
	video.video = __video;
	video.video2 = __video2;
	video.video3 = __video3;
	video.video3 = __video3;
	video.video3_disabled = __video3_disabled;
	video.play = play;
	video.play2 = play2;
	video.pause = pause;
	video.fast_forward = fast_forward;
	video.backward = backward;
	video.prev = prev;
	video.next = next;
	video.microphone = microphone;
	video.microphone0 = microphone0;
	video.microphone1 = microphone1;
	video.microphone2 = microphone2;
	video.microphone3 = microphone3;
	video.microphone4 = microphone4;
	video.microphone_disabled = microphone_disabled;
	video.microphone_disabled0 = microphone_disabled0;
	video.microphone_disabled1 = microphone_disabled1;
	video.microphone_disabled2 = microphone_disabled2;
	video.microphone_disabled3 = microphone_disabled3;
	video.microphone_disabled4 = microphone_disabled4;
	video.microphone_disabled5 = microphone_disabled5;
	video.microphone_disabled6 = microphone_disabled6;
	video.microphone_disabled7 = microphone_disabled7;
	video.microphone_disabled8 = microphone_disabled8;
	video.microphone_disabled9 = microphone_disabled9;

	const volume = {};
	const off = `
M871.253333 139.52a39.509333 39.509333 0 1 1 55.850667 55.936L195.370667 927.146667a40.405333 40.405333 0 0 1-27.904 11.562666 41.088 41.088 0 0 1-27.776-11.434666 39.68 39.68 0 0 1-0.170667-56.021334l120.618667-120.618666h-1.237334c-60.117333 0-103.893333-42.453333-112-108.373334-9.088-65.92-7.253333-178.858667 0-238.933333 8.533333-62.293333 54.613333-105.173333 112-105.173333h78.08l149.077334-121.941334c18.133333-15.36 50.176-29.866667 75.008-30.250666 45.141333 0 86.698667 31.573333 101.589333 82.176 5.888 21.248 8.192 42.410667 9.984 62.805333l3.584 28.842667c0.597333 4.437333 1.109333 8.704 1.578667 13.226666L871.253333 139.52z m-236.373333 446.336c6.144-5.973333 19.754667-10.24 25.898667-8.661333 16.597333 4.224 19.84 27.989333 19.584 46.72-0.768 54.272-2.56 92.032-5.461334 115.370666l-2.048 19.242667v0.341333c-1.962667 19.370667-3.968 39.381333-9.685333 60.757334-15.061333 50.517333-55.381333 83.285333-101.248 83.285333l-4.522667-0.042667c-25.344 0-52.778667-15.189333-68.394666-28.416l-55.466667-42.922666c-21.12-15.701333-14.890667-40.704-3.072-55.210667 8.874667-10.794667 115.072-108.288 170.88-159.488 18.901333-17.365333 32-29.44 33.578667-30.976z
`;
	const up$2 = `
M569.898667 275.2c-2.133333-20.736-4.394667-42.24-9.898667-63.744C545.066667 160.085333 503.509333 128 459.008 128c-24.832-0.085333-56.234667 15.189333-74.069333 30.72l-147.626667 123.605333h-77.226667c-56.874667 0-102.570667 43.818667-111.232 107.093334-7.338667 60.757333-9.130667 175.36 0 242.218666 7.936 66.858667 51.626667 110.037333 111.232 110.037334h77.226667l150.485333 125.44c15.445333 13.44 42.666667 28.842667 67.754667 28.842666l4.48 0.042667c45.354667 0 85.333333-33.28 100.266667-84.48 5.674667-21.717333 7.68-42.026667 9.557333-61.653333l0.042667-0.341334 2.005333-19.584c7.68-63.445333 7.68-372.864 0-435.84l-2.005333-18.858666z m172.8 1.92a38.698667 38.698667 0 0 0-54.570667-10.112 40.832 40.832 0 0 0-9.728 55.808c34.218667 50.432 53.034667 117.589333 53.034667 189.184 0 71.552-18.816 138.752-53.034667 189.184a40.789333 40.789333 0 0 0 9.813333 55.808 38.613333 38.613333 0 0 0 54.485334-10.112c43.178667-63.658667 67.029333-147.072 67.029333-234.88s-23.850667-171.221333-67.029333-234.88zM823.04 137.386667a38.613333 38.613333 0 0 1 54.485333 10.069333C944.469333 246.058667 981.333333 375.552 981.333333 512c0 136.533333-36.864 265.984-103.808 364.544a38.485333 38.485333 0 0 1-54.442666 10.069333 40.832 40.832 0 0 1-9.813334-55.808c57.856-85.290667 89.770667-198.528 89.770667-318.805333 0-120.234667-31.914667-233.472-89.813333-318.762667a40.874667 40.874667 0 0 1 9.813333-55.808z
`;
	const down$2 = `
M645.973333 211.456c5.504 21.504 7.722667 43.008 9.898667 63.786667l2.005333 18.858666c7.68 62.976 7.68 372.394667 0 435.84l-2.005333 19.584-0.042667 0.341334c-1.92 19.626667-3.925333 39.936-9.557333 61.610666-15.018667 51.285333-55.04 84.522667-100.437333 84.522667l-4.48-0.042667c-25.088 0-52.352-15.36-67.84-28.8l-150.613334-125.482666H245.546667c-59.733333 0-103.424-43.178667-111.36-110.037334-9.130667-66.816-7.338667-181.461333 0-242.218666 8.661333-63.274667 54.442667-107.093333 111.36-107.093334h77.354666l147.797334-123.648c17.792-15.488 49.237333-30.762667 74.112-30.677333 44.586667 0 86.144 32.085333 101.12 83.456z m128.341334 55.552a38.826667 38.826667 0 0 1 54.528 10.112C872.106667 340.821333 896 424.234667 896 512s-23.893333 171.178667-67.157333 234.88a39.04 39.04 0 0 1-32.170667 17.237333 38.485333 38.485333 0 0 1-22.357333-7.125333 40.746667 40.746667 0 0 1-9.813334-55.808c34.261333-50.474667 53.12-117.674667 53.12-189.184 0-71.552-18.858667-138.666667-53.12-189.184a40.746667 40.746667 0 0 1 9.813334-55.808z
`;
	volume.off = off;
	volume.up = up$2;
	volume.down = down$2;

	const heart = {}; // 实心

	const follow = `
M582.136486 958.756758c-36.425039 0-70.509513-16.091383-93.91516-44.105017L109.708121 529.994554a42.569021 42.569021 0 0 1-2.047994-2.194279C34.371194 441.345665 16.963244 333.533401 59.824835 232.303976 106.050989 123.321431 212.912398 44.912512 325.698361 37.305676a311.660824 311.660824 0 0 1 256.511268 106.422553A311.733966 311.733966 0 0 1 838.501468 37.305676c114.029388 7.533693 222.35365 88.722032 263.386676 197.412008 38.765604 102.47285 12.287965 210.211971-72.411222 295.496298l-352.98642 383.92576c-23.405647 28.379347-57.709549 44.617015-94.354016 44.617016
`; // 空心

	const un_follow = `
M167.919429 474.844998l378.732633 384.876614a41.179311 41.179311 0 0 1 2.633135 2.998849 43.37359 43.37359 0 0 0 67.437522-1.974852l354.741843-385.900611c63.707247-64.07296 83.016906-138.971032 55.442127-211.821109C996.625633 182.859546 916.973289 122.882575 833.151814 117.323733a233.032477 233.032477 0 0 0-191.926308 80.603199l-28.306205 33.938188a40.082171 40.082171 0 0 1-61.58611 0l-28.379347-34.011331a231.277053 231.277053 0 0 0-191.926309-80.530056c-81.992909 5.485699-163.181248 65.608955-197.338865 146.285297-17.919949 42.422736-37.229608 125.95164 34.230759 211.235968m414.206817 483.91176c-36.425039 0-70.509513-16.091383-93.91516-44.105017L109.697881 529.994554a42.569021 42.569021 0 0 1-2.047994-2.194279C34.360954 441.345665 16.953004 333.533401 59.814595 232.303976 106.040749 123.321431 212.902158 44.912512 325.688121 37.305676a311.660824 311.660824 0 0 1 256.511268 106.422553A311.733966 311.733966 0 0 1 838.491228 37.305676c114.029388 7.533693 222.35365 88.722032 263.386676 197.412008 38.765604 102.47285 12.287965 210.211971-72.411222 295.496298l-352.98642 383.92576c-23.405647 28.379347-57.709549 44.617015-94.354016 44.617016
`;
	heart.follow = follow;
	heart.un_follow = un_follow;

	const more = {}; // 更多

	const __more = `
M746.662 512c0 51.836 42.045 93.866 93.866 93.866 51.852 0 93.866-42.03 93.866-93.866 0-51.837-42.014-93.866-93.866-93.866-51.821 0.001-93.866 42.03-93.866 93.866zM89.604 512c0 51.836 42.044 93.866 93.865 93.866 51.822 0 93.866-42.03 93.866-93.866 0-51.837-42.044-93.866-93.866-93.866-51.82 0.001-93.865 42.03-93.865 93.866zM418.133 512c0 51.836 42.014 93.866 93.866 93.866 51.822 0 93.865-42.03 93.865-93.866 0-51.837-42.043-93.866-93.865-93.866-51.852 0.001-93.866 42.03-93.866 93.866z
`; // 更多 horizontal

	const more_horizontal = `
M192 448a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m320 0a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m320 0a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z
`; // 更多

	const more_vertical = `
M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z
`;
	more.__more = __more;
	more.more_horizontal = more_horizontal;
	more.more_vertical = more_vertical;

	const move = {}; // 放大

	const __move = `
M484.906667 58.197333a38.4 38.4 0 0 1 54.314666 0l128 128a38.4 38.4 0 0 1-54.314666 54.272l-62.421334-62.421333V473.6h295.552l-62.464-62.464a38.4 38.4 0 1 1 54.314667-54.272l128 128a38.4 38.4 0 0 1 0 54.272l-128 128a38.4 38.4 0 1 1-54.314667-54.272L846.08 550.4h-295.552v295.552l62.421333-62.421333a38.4 38.4 0 1 1 54.314667 54.272l-128 128a38.4 38.4 0 0 1-54.314667 0l-128-128a38.4 38.4 0 1 1 54.314667-54.272l62.464 62.421333V550.4H178.090667l62.464 62.464a38.4 38.4 0 0 1-54.314667 54.272l-128-128a38.4 38.4 0 0 1 0-54.272l128-128a38.4 38.4 0 0 1 54.314667 54.272L178.090667 473.6h295.594666V178.048L411.221333 240.469333a38.4 38.4 0 0 1-54.314666-54.272l128-128z
`; // 缩小

	const up$1 = `
M484.906667 356.864a38.4 38.4 0 0 1 54.314666 0l256 256a38.4 38.4 0 0 1-54.314666 54.272l-228.821334-228.821333-228.864 228.821333a38.4 38.4 0 1 1-54.314666-54.272l256-256z
`; // 缩小

	const double_up = `
M484.906667 228.864a38.4 38.4 0 0 1 54.314666 0l213.333334 213.333333a38.4 38.4 0 0 1-54.314667 54.272l-186.154667-186.154666-186.197333 186.154666a38.4 38.4 0 1 1-54.314667-54.272l213.333334-213.333333z m-213.333334 512l213.333334-213.333333a38.4 38.4 0 0 1 54.314666 0l213.333334 213.333333a38.4 38.4 0 0 1-54.314667 54.272l-186.154667-186.154667-186.197333 186.154667a38.4 38.4 0 1 1-54.314667-54.272z
`; // 放大

	const right$1 = `
M356.906667 228.864a38.4 38.4 0 0 1 54.314666 0l256 256a38.4 38.4 0 0 1 0 54.272l-256 256a38.4 38.4 0 1 1-54.314666-54.272L585.813333 512 356.906667 283.136a38.4 38.4 0 0 1 0-54.272z
`; // 放大

	const double_right = `
M228.906667 271.530667a38.4 38.4 0 0 1 54.314666 0l213.333334 213.333333a38.4 38.4 0 0 1 0 54.272l-213.333334 213.333333a38.4 38.4 0 1 1-54.314666-54.272L415.146667 512 228.906667 325.802667a38.4 38.4 0 0 1 0-54.272z m298.666666 0a38.4 38.4 0 0 1 54.314667 0l213.333333 213.333333a38.4 38.4 0 0 1 0 54.272l-213.333333 213.333333a38.4 38.4 0 1 1-54.314667-54.272L713.813333 512l-186.197333-186.197333a38.4 38.4 0 0 1 0-54.272z
`; // 缩小

	const down$1 = `
M228.906667 356.864a38.4 38.4 0 0 1 54.314666 0l228.864 228.821333 228.821334-228.821333a38.4 38.4 0 0 1 54.314666 54.272l-256 256a38.4 38.4 0 0 1-54.314666 0l-256-256a38.4 38.4 0 0 1 0-54.272z
`; // 缩小

	const double_down = `
M271.573333 228.864a38.4 38.4 0 0 1 54.314667 0l186.197333 186.154667 186.154667-186.154667a38.4 38.4 0 0 1 54.314667 54.272l-213.333334 213.333333a38.4 38.4 0 0 1-54.314666 0l-213.333334-213.333333a38.4 38.4 0 0 1 0-54.272z m0 298.666667a38.4 38.4 0 0 1 54.314667 0l186.197333 186.154666 186.154667-186.154666a38.4 38.4 0 1 1 54.314667 54.272l-213.333334 213.333333a38.4 38.4 0 0 1-54.314666 0l-213.333334-213.333333a38.4 38.4 0 0 1 0-54.272z
`; // 缩小

	const left$1 = `
M667.221333 228.864a38.4 38.4 0 0 1 0 54.272L438.357333 512l228.864 228.864a38.4 38.4 0 0 1-54.314666 54.272l-256-256a38.4 38.4 0 0 1 0-54.272l256-256a38.4 38.4 0 0 1 54.314666 0z
`; // 缩小

	const double_left = `
M496.554667 271.530667a38.4 38.4 0 0 1 0 54.272L310.357333 512l186.197334 186.197333a38.4 38.4 0 0 1-54.314667 54.272l-213.333333-213.333333a38.4 38.4 0 0 1 0-54.272l213.333333-213.333333a38.4 38.4 0 0 1 54.314667 0z m298.666666 0a38.4 38.4 0 0 1 0 54.272L609.024 512l186.197333 186.197333a38.4 38.4 0 0 1-54.314666 54.272l-213.333334-213.333333a38.4 38.4 0 0 1 0-54.272l213.333334-213.333333a38.4 38.4 0 0 1 54.314666 0z
`; // 放大2

	const sort = `
M484.906667 143.530667a38.4 38.4 0 0 1 54.314666 0l213.333334 213.333333a38.4 38.4 0 0 1-54.314667 54.272l-186.154667-186.154667-186.197333 186.154667a38.4 38.4 0 0 1-54.314667-54.272l213.333334-213.333333z m-213.333334 469.333333a38.4 38.4 0 0 1 54.314667 0l186.197333 186.154667 186.154667-186.154667a38.4 38.4 0 1 1 54.314667 54.272l-213.333334 213.333333a38.4 38.4 0 0 1-54.314666 0l-213.333334-213.333333a38.4 38.4 0 0 1 0-54.272z
`;
	move.move = __move;
	move.right = right$1;
	move.double_right = double_right;
	move.left = left$1;
	move.double_left = double_left;
	move.up = up$1;
	move.double_up = double_up;
	move.down = down$1;
	move.double_down = double_down;
	move.sort = sort;

	const rotation = {};
	const left = [`
M42.752 132.266667a38.4 38.4 0 0 1 38.4 38.4v217.6h217.6a38.4 38.4 0 0 1 0 76.8h-256a38.4 38.4 0 0 1-38.4-38.4V170.666667a38.4 38.4 0 0 1 38.4-38.4z
`, `
M453.12 94.122667a422.4 422.4 0 1 1-339.498667 558.634666 38.4 38.4 0 0 1 72.405334-25.514666 345.6 345.6 0 1 0 80.981333-358.613334l-197.973333 186.026667A38.4 38.4 0 0 1 16.426667 398.677333l197.546666-185.6a422.4 422.4 0 0 1 239.189334-118.954666z
`];
	const right = `
M345.344 209.450667a345.6 345.6 0 0 1 411.904 58.88l0.256 0.256L884.608 388.266667h-159.189333a38.4 38.4 0 1 0 0 76.8h256a38.229333 38.229333 0 0 0 23.722666-8.234667 38.314667 38.314667 0 0 0 14.677334-30.165333V170.666667a38.4 38.4 0 0 0-76.8 0v167.082666l-132.437334-124.672A422.4 422.4 0 1 0 910.506667 652.8a38.4 38.4 0 1 0-72.405334-25.6A345.6 345.6 0 1 1 345.344 209.493333z
`;
	rotation.left = left;
	rotation.right = right;

	const screen$1 = {}; // 放大

	const maximize = `
M640.085333 166.4a38.4 38.4 0 1 1 0-76.8h256a38.4 38.4 0 0 1 38.4 38.4v256a38.4 38.4 0 0 1-76.8 0V220.714667l-233.130666 233.088a38.4 38.4 0 1 1-54.314667-54.272L803.413333 166.4h-163.285333z m-186.197333 403.797333a38.4 38.4 0 0 1 0 54.272L220.757333 857.6h163.328a38.4 38.4 0 1 1 0 76.8h-256a38.4 38.4 0 0 1-38.4-38.4v-256a38.4 38.4 0 1 1 76.8 0v163.285333l233.088-233.088a38.4 38.4 0 0 1 54.314667 0z
`; // 缩小

	const minimize = `
M865.834667 97.834667a42.666667 42.666667 0 1 1 60.330666 60.330666L700.330667 384H853.333333a42.666667 42.666667 0 1 1 0 85.333333h-256a42.666667 42.666667 0 0 1-42.666666-42.666666V170.666667a42.666667 42.666667 0 1 1 85.333333 0v153.002666l225.834667-225.834666zM128 597.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h256a42.666667 42.666667 0 0 1 42.666666 42.666666v256a42.666667 42.666667 0 1 1-85.333333 0v-153.002666l-225.834667 225.834666a42.666667 42.666667 0 0 1-60.330666-60.330666L323.669333 640H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667z
`; // 放大2

	const maximize2 = `
M125.909333 125.866667A123.733333 123.733333 0 0 1 213.333333 89.6h128a38.4 38.4 0 1 1 0 76.8h-128a46.933333 46.933333 0 0 0-46.933333 46.933333v128a38.4 38.4 0 0 1-76.8 0V213.333333a123.733333 123.733333 0 0 1 36.266667-87.466666z m518.4 2.133333a38.4 38.4 0 0 1 38.4-38.4h128a123.733333 123.733333 0 0 1 123.733334 123.733333v128a38.4 38.4 0 0 1-76.8 0V213.333333a46.933333 46.933333 0 0 0-46.933334-46.933333h-128a38.4 38.4 0 0 1-38.4-38.4z m-516.266666 516.266667a38.4 38.4 0 0 1 38.4 38.4v128a46.933333 46.933333 0 0 0 46.933333 46.933333h128a38.4 38.4 0 1 1 0 76.8h-128a123.733333 123.733333 0 0 1-123.733333-123.733333v-128a38.4 38.4 0 0 1 38.4-38.4z m768 0a38.4 38.4 0 0 1 38.4 38.4v128a123.733333 123.733333 0 0 1-123.733334 123.733333h-128a38.4 38.4 0 1 1 0-76.8h128a46.933333 46.933333 0 0 0 46.933334-46.933333v-128a38.4 38.4 0 0 1 38.4-38.4z
`; // 缩小2

	const minimize2 = `
M341.418667 89.6a38.4 38.4 0 0 1 38.4 38.4v128a123.733333 123.733333 0 0 1-123.733334 123.733333h-128a38.4 38.4 0 0 1 0-76.8h128a46.933333 46.933333 0 0 0 46.933334-46.933333V128a38.4 38.4 0 0 1 38.4-38.4z m341.333333 0a38.4 38.4 0 0 1 38.4 38.4v128a46.933333 46.933333 0 0 0 46.933333 46.933333h128a38.4 38.4 0 0 1 0 76.8h-128a123.733333 123.733333 0 0 1-123.733333-123.733333V128a38.4 38.4 0 0 1 38.4-38.4zM89.685333 682.666667a38.4 38.4 0 0 1 38.4-38.4h128a123.733333 123.733333 0 0 1 123.733334 123.733333v128a38.4 38.4 0 1 1-76.8 0v-128a46.933333 46.933333 0 0 0-46.933334-46.933333h-128a38.4 38.4 0 0 1-38.4-38.4z m678.4 38.4a46.933333 46.933333 0 0 0-46.933333 46.933333v128a38.4 38.4 0 0 1-76.8 0v-128a123.733333 123.733333 0 0 1 123.733333-123.733333h128a38.4 38.4 0 0 1 0 76.8h-128z
`;
	screen$1.maximize = maximize;
	screen$1.minimize = minimize;
	screen$1.maximize2 = maximize2;
	screen$1.minimize2 = minimize2;

	const trending = {};
	const up = [`
M1008.554667 228.864a38.4 38.4 0 0 1 0 54.272l-405.333334 405.333333a38.4 38.4 0 0 1-54.314666 0l-186.154667-186.154666-292.864 292.821333a38.4 38.4 0 1 1-54.314667-54.272l320-320a38.4 38.4 0 0 1 54.314667 0l186.197333 186.154667 378.154667-378.154667a38.4 38.4 0 0 1 54.314667 0z
`, `
M687.018667 256a38.4 38.4 0 0 1 38.4-38.4h256a38.4 38.4 0 0 1 38.4 38.4v256a38.4 38.4 0 0 1-76.8 0V294.4h-217.6a38.4 38.4 0 0 1-38.4-38.4z
`];
	const down = [`
M15.573333 228.864a38.4 38.4 0 0 1 54.314667 0l292.864 292.821333 186.154667-186.154666a38.4 38.4 0 0 1 54.314666 0l405.333334 405.333333a38.4 38.4 0 0 1-54.314667 54.272l-378.154667-378.154667-186.197333 186.154667a38.4 38.4 0 0 1-54.314667 0l-320-320a38.4 38.4 0 0 1 0-54.272z
`, `
M981.418667 473.6a38.4 38.4 0 0 1 38.4 38.4v256a38.4 38.4 0 0 1-38.4 38.4h-256a38.4 38.4 0 1 1 0-76.8h217.6V512a38.4 38.4 0 0 1 38.4-38.4z
`];
	trending.up = up;
	trending.down = down;

	const business = {}; // 云台控制

	const icon_PTZ_control = [`
M586.0864 463.744l68.49536 20.0192-112.85504 386.20672-68.5056-20.0192z
`, `
M541.83936 887.92064c-1.68448 0-3.37408-0.23552-5.02272-0.72192l-68.49536-20.0192a17.95072 17.95072 0 0 1-12.1856-22.25152l112.58368-386.27328a17.93024 17.93024 0 0 1 22.2208-12.20096l68.50048 20.01408a17.94048 17.94048 0 0 1 12.18048 22.25664l-112.58368 386.27328a17.93536 17.93536 0 0 1-17.19808 12.92288z m-46.27456-50.16064l34.08896 9.9584 102.53824-351.81568-34.09408-9.96352-102.53312 351.8208z
`,
	/*  `
	M868.74624 338.02752c-30.8992 106.01472-141.7728 166.87104-247.64928 135.936S454.44608 332.00128 485.34528 225.98656s141.7728-166.87104 247.64928-135.936 166.65088 141.96224 135.75168 247.97696z
	`,*/
`
M676.95104 499.93728c-20.13696 0-40.58624-2.82112-60.87168-8.75008-115.19488-33.664-181.5552-154.89024-147.93728-270.22848 16.2816-55.87456 53.3248-102.05184 104.29952-130.03264 50.95936-27.97568 109.76256-34.4064 165.57056-18.0992 115.18976 33.664 181.5552 154.88512 147.93728 270.22848-27.6992 95.03232-114.76992 156.88192-208.9984 156.88192z m-0.16384-400.03072c-30.13632 0-59.96032 7.58272-87.12192 22.49216-42.5728 23.3728-73.51808 61.94176-87.1168 108.61056-28.0832 96.34816 27.35104 197.60128 123.5712 225.72544 96.24576 28.12928 197.34016-27.39712 225.42336-123.73504 28.07808-96.34816-27.35616-197.60128-123.57632-225.72032a182.31296 182.31296 0 0 0-51.17952-7.3728z m191.95904 238.12096h0.0512-0.0512zM942.08 960H81.92c-9.89696 0-17.92-8.0384-17.92-17.9456a17.93536 17.93536 0 0 1 17.92-17.9456h860.16c9.89696 0 17.92 8.0384 17.92 17.9456a17.94048 17.94048 0 0 1-17.92 17.9456z
`	, `
M698.93632 816.4864h-373.9136c-69.25312 0-125.3888 56.1408-125.3888 125.3888v0.1792h624.69632v-0.1792c0-69.248-56.1408-125.3888-125.39392-125.3888z
`, `
M824.33024 960H199.63392c-9.89696 0-17.92-8.0384-17.92-17.9456 0-80.47104 63.93344-143.5136 145.55136-143.5136h368.85504c81.94048 0 146.13504 63.03744 146.13504 143.5136a17.9456 17.9456 0 0 1-17.92512 17.9456z m-605.32224-35.8912h585.93792c-8.51456-51.51744-53.26336-89.6768-108.83072-89.6768H327.26528c-55.27552 0-99.78368 38.15936-108.25728 89.6768z
`]; // 3D控制

	const icon_three_dimensional = [`
M828.32 811.25333333H184.16c-40.32 0-72.96-32.64-72.96-72.96V273.65333333c0-40.32 32.64-72.96 72.96-72.96H828.8c40.32 0 72.96 32.64 72.96 72.96v464.64c-0.48 40.32-33.12 72.96-73.44 72.96zM184.16 248.69333333c-13.92 0-24.96 11.04-24.96 24.96v464.64c0 13.92 11.04 24.96 24.96 24.96H828.8c13.92 0 24.96-11.04 24.96-24.96V273.65333333c0-13.92-11.04-24.96-24.96-24.96H184.16z
`, `
M261.44 557.33333333l46.08-10.56c3.36 31.68 20.16 47.52 49.92 48.48 36.96 0.96 54.72-15.84 54.24-49.92-2.88-26.88-20.64-40.8-54.24-41.76h-33.6v-39.36h23.04c34.08 0 52.32-14.4 54.24-43.2-0.96-23.52-14.4-35.52-40.32-36.48-25.92 1.92-41.76 16.8-47.04 44.64L266.72 418.13333333c12.48-48.48 43.2-73.44 91.68-74.4 57.6 0.96 87.36 26.88 89.28 78.24 0 26.88-14.88 46.56-44.64 58.08 36 14.4 54.24 36.96 55.2 67.68-3.84 53.76-36.48 82.56-98.4 84.96-55.68-0.48-88.8-25.92-98.4-75.36zM604.16 627.41333333H502.88V348.05333333h104.16c90.72 0.96 136.8 47.52 137.76 140.64 2.4 95.04-44.16 141.6-140.64 138.72z m1.44-237.6h-56.64v199.68h55.2c62.88 0.96 94.08-32.64 93.12-99.84-0.96-65.76-31.68-98.88-91.68-99.84z
`]; // 截图

	const icon_screenshot = `
M437.76 430.08L170.496 79.36C156.672 61.44 159.232 35.84 176.64 20.48c16.896-14.848 42.496-12.8 56.832 4.096L512 344.576l278.528-320c14.848-16.896 39.936-18.432 56.832-4.096 17.408 14.848 19.968 40.448 6.144 58.88L586.24 430.08l165.888 190.976c92.672-33.792 196.096 4.096 245.248 89.6 49.152 85.504 29.184 194.048-47.104 256.512-76.288 62.464-186.368 61.44-260.608-3.072-74.752-64.512-92.16-173.056-40.96-257.536-1.536-1.536-3.072-3.584-4.096-5.12L512 527.872 437.76 430.08zM383.488 492.544l77.824 101.888L379.904 701.44c-1.536 1.536-2.56 3.584-4.096 5.12 50.688 84.48 33.792 193.024-40.96 257.536-74.752 64.512-184.832 65.536-260.608 3.072-76.288-62.464-95.744-171.008-47.104-256.512 49.152-85.504 152.576-123.392 245.248-89.6l111.104-128.512zM215.04 931.84c44.032-3.584 82.432-30.72 100.352-70.656 17.92-39.936 13.312-86.528-12.8-122.368-26.112-35.328-69.12-53.76-112.64-48.64-65.536 8.192-112.64 67.584-105.472 133.12 6.656 66.048 64.512 114.176 130.56 108.544z m593.92 0c43.52 5.632 86.528-13.312 112.64-48.64 26.112-35.328 30.72-81.92 12.8-121.856-17.92-39.936-56.32-67.072-100.352-70.656-66.048-5.632-124.416 42.496-131.072 108.032-6.656 65.536 40.448 124.928 105.984 133.12z m0 0
`; // 信息

	const icon_information = `
M512 1024C228.693 1024 0 795.307 0 512S228.693 0 512 0s512 228.693 512 512-228.693 512-512 512z m61.44-723.627c0-34.133-27.307-61.44-61.44-61.44s-61.44 27.307-61.44 61.44v269.654c0 34.133 27.307 61.44 61.44 61.44s61.44-27.307 61.44-61.44V300.373zM512 692.907c-34.133 0-61.44 27.306-61.44 61.44s27.307 61.44 61.44 61.44 61.44-27.307 61.44-61.44-27.307-61.44-61.44-61.44z
`; // 信息2

	const icon_information2 = `
M566.912 224.128a67.392 67.392 0 0 0-53.376 21.632 49.92 49.92 0 0 0-21.632 47.04 64 64 0 0 0 21.632 48.256 99.648 99.648 0 0 0 53.376 21.632 67.392 67.392 0 0 0 53.376-21.632 50.816 50.816 0 0 0 21.632-48.256 59.968 59.968 0 0 0-21.632-47.04 65.728 65.728 0 0 0-53.376-21.632z m21.632 518.4c-16.512 0-26.688 0-32-5.056a42.432 42.432 0 0 1-10.176-26.688 60.032 60.032 0 0 1 5.056-26.688 253.888 253.888 0 0 1 5.056-26.688l32-105.472a69.632 69.632 0 0 0 5.056-32v-27.008a65.024 65.024 0 0 0-26.688-53.376 87.872 87.872 0 0 0-68.608-21.632 242.56 242.56 0 0 0-53.376 10.176 218.176 218.176 0 0 0-58.432 21.632l-10.176 32c5.056 0 10.176-5.056 21.632-5.056s16.512-5.056 26.688-5.056a178.112 178.112 0 0 1 32 5.056 42.432 42.432 0 0 1 10.176 26.688 60.032 60.032 0 0 1-5.056 26.688 253.888 253.888 0 0 1-5.056 26.688l-32 105.472a69.632 69.632 0 0 0-5.056 32v26.688a72.704 72.704 0 0 0 26.688 53.376 87.872 87.872 0 0 0 68.608 21.632 173.248 173.248 0 0 0 53.376-5.056 521.408 521.408 0 0 0 58.432-21.632l10.176-32c-5.056 0-10.176 5.056-21.632 5.056z
`; // 帮助

	const icon_help = [`
M978.432 850.432c0 70.656-57.344 128-128 128H173.568c-70.656 0-128-57.344-128-128V173.568c0-70.656 57.344-128 128-128h677.376c70.656 0 128 57.344 128 128v676.864zM872.448 10.24H151.552C73.728 10.24 10.24 73.728 10.24 151.552v720.896C10.24 950.272 73.728 1013.76 151.552 1013.76h720.896c77.824 0 141.312-63.488 141.312-141.312V151.552C1013.76 73.728 950.272 10.24 872.448 10.24z
`, `
M850.432 79.872H173.568c-51.2 0-93.184 41.984-93.184 93.184v677.376c0 51.2 41.984 93.184 93.184 93.184h677.376c51.2 0 93.184-41.984 93.184-93.184V173.568c0-51.712-41.984-93.696-93.696-93.696zM504.32 826.368c-37.376 0-68.096-29.696-68.096-66.048 0-36.352 30.208-66.048 68.096-66.048s68.096 29.696 68.096 66.048c0 36.352-30.72 66.048-68.096 66.048z m195.584-412.672c-9.216 16.896-20.48 31.744-33.28 44.032-12.8 12.288-35.84 33.28-69.12 62.464-9.216 8.192-16.384 15.36-22.016 22.016-5.632 6.144-9.728 11.776-12.288 17.408-2.56 5.12-4.608 10.24-6.144 15.36-1.536 5.12-3.584 14.336-6.656 27.648-5.12 27.648-21.504 41.472-48.64 41.472-13.824 0-26.112-4.608-35.328-13.824-9.728-9.216-14.336-22.528-14.336-40.448 0-22.528 3.584-41.984 10.752-58.368 7.168-16.384 16.384-30.72 28.16-43.008 11.776-12.288 27.136-27.136 47.104-44.032 17.408-14.848 29.696-26.112 37.376-33.792s14.336-15.872 19.456-25.6c5.12-9.216 7.68-19.456 7.68-30.208 0-21.504-8.192-39.424-24.064-54.272-16.384-14.848-36.864-22.016-62.464-22.016-29.696 0-51.712 7.168-66.048 22.016-14.336 14.848-26.112 36.864-35.84 65.536-9.216 30.208-26.624 45.056-52.224 45.056-15.36 0-28.16-5.12-38.4-15.872-11.264-10.24-16.384-21.504-16.384-33.792 0-25.6 8.192-51.2 24.576-77.312 16.384-26.112 40.448-47.616 72.704-64.512 31.744-16.896 68.608-25.6 111.104-25.6 39.424 0 74.24 7.168 103.936 21.504 30.208 14.336 53.248 33.792 69.632 58.368 16.384 24.576 24.576 51.2 24.576 79.872 0 22.528-4.608 42.496-13.824 59.904z
`]; // 帮助

	const icon_help2 = `
M506.163573 81.905428C259.515057 85.213777 62.256414 287.808962 65.561693 534.460548c3.310396 246.496044 205.903533 443.814038 452.557166 440.504666 246.524696-3.304256 443.842691-205.903533 440.504666-452.551026C955.375551 275.888468 752.747621 78.601172 506.163573 81.905428L506.163573 81.905428 506.163573 81.905428zM512.3249 847.413166l-2.40477 0c-36.709063-1.099031-62.622246-28.570709-61.593823-65.297169 1.026376-36.043914 27.552519-62.291718 63.08785-62.291718l2.171456 0.058328c37.735439 1.134847 63.385633 28.337395 62.267159 66.101487C574.825372 822.119083 548.683992 847.413166 512.3249 847.413166L512.3249 847.413166 512.3249 847.413166zM675.538145 514.910283c-9.714246 13.525038-30.92636 30.356378-57.719586 50.910507l-29.515221 20.10285c-16.188704 12.424984-25.942859 24.076348-29.582759 35.538401-2.960425 9.126868-4.303003 11.458983-4.565992 29.841655l-0.067538 4.725628L441.501878 656.029324l0.326435-9.416464c1.382487-38.648229 2.365884-61.308321 18.583241-80.109526 25.480324-29.457916 81.69258-65.159022 84.058464-66.647933 8.045233-6.01704 14.806217-12.782118 19.897166-20.034289 11.81714-16.051581 17.005302-28.740578 17.005302-41.10314 0-17.253966-5.188162-33.208333-15.428388-47.387263-9.885138-13.726629-28.634154-20.652366-55.754838-20.652366-26.891464 0-45.275159 8.449439-56.308447 25.699312-11.394515 17.769712-17.074887 36.348859-17.074887 55.413054l0 4.761444L320.706721 456.552154l0.194428-4.983501c2.987031-70.108754 28.372188-120.572076 75.452459-150.023852 29.519314-18.805298 66.290799-28.288277 109.171422-28.288277 56.148811 0 103.657848 13.46364 140.955312 39.97034 37.823444 26.867928 57.000202 67.163679 57.000202 119.695103 0 29.4221-9.388834 57.032948-27.943422 82.08553L675.537122 514.910283 675.538145 514.910283zM675.538145 514.910283
`; // 帮助

	const icon_help3 = `
M150.308607 0h721.486305A150.308607 150.308607 0 0 1 1022.103519 150.321084v721.473828A150.308607 150.308607 0 0 1 871.794912 1022.103519H150.308607A150.308607 150.308607 0 0 1 0 871.794912V150.321084A150.308607 150.308607 0 0 1 150.308607 0zM517.789258 308.876889c8.658934 1.122916 17.467589 1.684375 25.951847 3.493517 38.41622 8.097475 54.710985 57.593138 29.345551 87.712253-15.396432 18.278585-34.236475 32.439809-53.201287 46.451311-48.659713 36.008188-73.887903 83.994151-73.613413 144.731455a46.538649 46.538649 0 0 0 5.389999 21.123307c8.983332 16.656594 24.08032 23.593723 42.708257 25.178282 33.338142 2.807291 59.614387-25.602495 57.393508-52.402768a85.890633 85.890633 0 0 1 3.393703-29.944439c5.414953-18.952335 19.052149-32.439809 34.086753-44.242909 20.586802-16.057705 42.421289-30.618189 62.384248-47.412028 20.661663-17.317867 34.510966-39.651428 39.302076-66.726192s2.345648-53.737791-5.502291-79.851837c-15.982844-53.276148-52.402768-85.404035-105.279657-99.577737-29.944439-8.010137-60.500244-8.384443-91.081002-4.890925-47.748903 5.46486-89.833317 23.481431-124.581343 57.231309-14.435715 14.073886-25.914417 30.293791-31.354323 50.044644-3.743055 13.724535-3.992592 27.636222 4.653865 39.925919 14.822497 20.998538 46.339019 26.949995 69.321376 13.974071 10.967151-6.238425 17.791988-16.132567 25.328005-25.565065 10.181109-12.776294 21.497612-24.142704 37.03129-30.518374s31.678721-7.72317 48.247977-8.733794z m41.423141 442.279364v-8.895994c0-22.720343-11.017058-38.678234-31.104786-48.185593-18.191247-8.733795-37.30578-8.297105-55.946194-1.921435-17.0309 5.814212-30.368652 17.018423-35.01004 34.935179-2.49537 9.619651-1.971342 20.112682-2.121064 30.21893-0.336875 22.208792 11.391364 37.156058 30.268837 46.912954 14.735159 7.635832 30.742957 8.733795 46.85057 6.126134 17.891802-2.957013 31.865874-12.239789 41.11122-28.122819 5.876596-10.093771 6.126133-21.210644 5.93898-31.104787z m0 0
`; // wifi 0

	const icon_wifi = [`
M0 566.62016m56.89344 0l56.87296 0q56.89344 0 56.89344 56.89344l0 113.7664q0 56.89344-56.89344 56.89344l-56.87296 0q-56.89344 0-56.89344-56.89344l0-113.7664q0-56.89344 56.89344-56.89344Z
`, `
M284.44672 452.83328m56.89344 0l56.87296 0q56.89344 0 56.89344 56.89344l0 227.55328q0 56.89344-56.89344 56.89344l-56.87296 0q-56.89344 0-56.89344-56.89344l0-227.55328q0-56.89344 56.89344-56.89344Z
`, `
M568.89344 339.06688m56.89344 0l56.87296 0q56.89344 0 56.89344 56.89344l0 341.31968q0 56.89344-56.89344 56.89344l-56.87296 0q-56.89344 0-56.89344-56.89344l0-341.31968q0-56.89344 56.89344-56.89344Z
`, `
M853.34016 225.28m56.89344 0l56.87296 0q56.89344 0 56.89344 56.89344l0 455.10656q0 56.89344-56.89344 56.89344l-56.87296 0q-56.89344 0-56.89344-56.89344l0-455.10656q0-56.89344 56.89344-56.89344Z
`]; // wifi none

	const icon_wifi_green = [`M112.88 689.631h155.428v244.244h-155.428v-244.244z`, `M334.921 556.409h155.428v377.467h-155.428v-377.467z`, `M579.164 400.98h133.223v532.895h-133.223v-532.895z`, `M801.202 245.553h155.428v688.323h-155.428v-688.323z`, `M1023.242 90.125h155.427v843.75h-155.428v-843.75z`]; // wifi guarantee

	const icon_wifi_guarantee = `
M511.168026 0.031999l-431.154526 135.323771 2.23993 510.768038 1.183963 10.047686c3.263898 15.231524 23.551264 95.197025 101.564826 170.938658 61.854067 60.254117 202.489672 133.43583 270.135558 168.538733l7.551764 3.935877 45.662573 24.383238 34.366926-17.567451c36.510859-17.631449 222.489047-109.11659 294.550795-179.226399 79.517515-77.373582 98.684916-156.699103 102.428799-178.394425l2.591919-513.391957-431.154526-135.387769zM726.745289 538.959158l-161.690947 0 0 161.690947-107.772632 0 0-161.690947-161.690947 0 0-107.772632 161.690947 0 0-161.690947 107.772632 0 0 161.690947 161.690947 0 0 107.772632z
`; // wifi guarantee2

	const icon_wifi_guarantee2 = `
M931.908267 215.466667c-127.266133-51.968-239.598933-114.688-332.612267-185.856a143.616 143.616 0 0 0-174.574933 0c-93.013333 71.150933-205.346133 133.888-332.629334 185.856a34.133333 34.133333 0 0 0-21.384533 31.5392v280.439466c0 242.722133 376.644267 496.520533 441.2928 496.520534 64.648533 0 441.2928-253.815467 441.2928-496.520534V247.005867a34.133333 34.133333 0 0 0-21.384533-31.5392zM651.6224 497.9712L496.810667 714.7008c-9.642667 13.5168-30.958933 6.690133-30.958934-9.915733v-134.724267a17.066667 17.066667 0 0 0-17.066666-17.066667h-62.532267a17.066667 17.066667 0 0 1-13.892267-26.9824l154.811734-216.7296c9.642667-13.5168 30.958933-6.690133 30.958933 9.915734v134.7072a17.066667 17.066667 0 0 0 17.066667 17.066666h62.549333c13.8752 0.017067 21.947733 15.701333 13.8752 26.999467z
`;
	business.icon_PTZ_control = icon_PTZ_control;
	business.icon_three_dimensional = icon_three_dimensional;
	business.icon_screenshot = icon_screenshot;
	business.icon_information = icon_information;
	business.icon_information2 = icon_information2;
	business.icon_help = icon_help;
	business.icon_help2 = icon_help2;
	business.icon_help3 = icon_help3;
	business.icon_wifi = icon_wifi;
	business.icon_wifi_green = icon_wifi_green;
	business.icon_wifi_guarantee = icon_wifi_guarantee;
	business.icon_wifi_guarantee2 = icon_wifi_guarantee2;

	const magnifier = {}; // 搜索 - 线条

	const search_line = `
M469.333333 85.333333c211.968 0 384 172.032 384 384s-172.032 384-384 384-384-172.032-384-384 172.032-384 384-384z m0 682.666667c164.992 0 298.666667-133.674667 298.666667-298.666667 0-165.034667-133.674667-298.666667-298.666667-298.666666-165.034667 0-298.666667 133.632-298.666666 298.666666 0 164.992 133.632 298.666667 298.666666 298.666667z m362.026667 3.029333l120.704 120.661334-60.373333 60.373333-120.661334-120.704 60.330667-60.330667z
`; // 搜索 - 线条

	const search_line2 = `
M769.322667 708.992l182.741333 182.698667-60.373333 60.373333-182.698667-182.741333A382.293333 382.293333 0 0 1 469.333333 853.333333c-211.968 0-384-172.032-384-384s172.032-384 384-384 384 172.032 384 384a382.293333 382.293333 0 0 1-84.010666 239.658667z m-85.589334-31.658667A297.685333 297.685333 0 0 0 768 469.333333c0-165.034667-133.674667-298.666667-298.666667-298.666666-165.034667 0-298.666667 133.632-298.666666 298.666666 0 164.992 133.632 298.666667 298.666666 298.666667a297.685333 297.685333 0 0 0 208-84.266667l6.4-6.4z
`; // 搜索 - 实心

	const search_fill = `
M469.333333 85.333333c211.968 0 384 172.032 384 384s-172.032 384-384 384-384-172.032-384-384 172.032-384 384-384z m362.026667 685.696l120.704 120.661334-60.373333 60.373333-120.661334-120.704 60.330667-60.330667z
`; // 搜索 - 实心

	const search_fill2 = `
M769.322667 708.992l182.741333 182.698667-60.373333 60.373333-182.698667-182.741333A382.293333 382.293333 0 0 1 469.333333 853.333333c-211.968 0-384-172.032-384-384s172.032-384 384-384 384 172.032 384 384a382.293333 382.293333 0 0 1-84.010666 239.658667z
`; // 放大 - 线条

	const zoom_in_line = `
M769.322667 708.992l182.741333 182.698667-60.373333 60.373333-182.698667-182.741333A382.293333 382.293333 0 0 1 469.333333 853.333333c-211.968 0-384-172.032-384-384s172.032-384 384-384 384 172.032 384 384a382.293333 382.293333 0 0 1-84.010666 239.658667z m-85.589334-31.658667A297.685333 297.685333 0 0 0 768 469.333333c0-165.034667-133.674667-298.666667-298.666667-298.666666-165.034667 0-298.666667 133.632-298.666666 298.666666 0 164.992 133.632 298.666667 298.666666 298.666667a297.685333 297.685333 0 0 0 208-84.266667l6.4-6.4zM426.666667 426.666667V298.666667h85.333333v128h128v85.333333h-128v128h-85.333333v-128H298.666667v-85.333333h128z
`; // 放大 - 实心

	const zoom_in_fill = `
M769.322667 708.992l182.741333 182.698667-60.373333 60.373333-182.698667-182.741333A382.293333 382.293333 0 0 1 469.333333 853.333333c-211.968 0-384-172.032-384-384s172.032-384 384-384 384 172.032 384 384a382.293333 382.293333 0 0 1-84.010666 239.658667zM426.666667 426.666667H298.666667v85.333333h128v128h85.333333v-128h128v-85.333333h-128V298.666667h-85.333333v128z
`; // 缩小 - 线条

	const zoom_out_line = `
M769.322667 708.992l182.741333 182.698667-60.373333 60.373333-182.698667-182.741333A382.293333 382.293333 0 0 1 469.333333 853.333333c-211.968 0-384-172.032-384-384s172.032-384 384-384 384 172.032 384 384a382.293333 382.293333 0 0 1-84.010666 239.658667z m-85.589334-31.658667A297.685333 297.685333 0 0 0 768 469.333333c0-165.034667-133.674667-298.666667-298.666667-298.666666-165.034667 0-298.666667 133.632-298.666666 298.666666 0 164.992 133.632 298.666667 298.666666 298.666667a297.685333 297.685333 0 0 0 208-84.266667l6.4-6.4zM298.666667 426.666667h341.333333v85.333333H298.666667v-85.333333z
`; // 缩小 - 实心

	const zoom_out_fill = `
M769.322667 708.992l182.741333 182.698667-60.373333 60.373333-182.698667-182.741333A382.293333 382.293333 0 0 1 469.333333 853.333333c-211.968 0-384-172.032-384-384s172.032-384 384-384 384 172.032 384 384a382.293333 382.293333 0 0 1-84.010666 239.658667zM298.666667 426.666667v85.333333h341.333333v-85.333333H298.666667z
`;
	magnifier.search_line = search_line;
	magnifier.search_line2 = search_line2;
	magnifier.search_fill = search_fill;
	magnifier.search_fill2 = search_fill2;
	magnifier.zoom_in_line = zoom_in_line;
	magnifier.zoom_in_fill = zoom_in_fill;
	magnifier.zoom_out_line = zoom_out_line;
	magnifier.zoom_out_fill = zoom_out_fill;

	// 实心
	const icon_close = `
M512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333zM350.72 350.72a32 32 0 0 1 45.226667 0l126.72 126.72 126.72-126.72a32 32 0 1 1 45.226666 45.226667l-126.72 126.72 126.72 126.72a32 32 0 1 1-45.226666 45.226666l-126.72-126.72-126.72 126.72a32 32 0 0 1-45.226667-45.226666l126.72-126.72-126.72-126.72a32 32 0 0 1 0-45.226667z
`;
	var circular = {
	  icon_close
	};

	const Icon = {};
	/**
	 * 箭头类
	 */
	// 向上

	const ArrowUp = props => createIcon({ ...props,
	  path: arrow.up
	});
	const ArrowUpSquare = props => createIcon({ ...props,
	  path: arrow.up_square
	});
	const ArrowUpCircular = props => createIcon({ ...props,
	  path: arrow.up_circular
	}); // 向右

	const ArrowRight = props => createIcon({ ...props,
	  path: arrow.right
	});
	const ArrowRightSquare = props => createIcon({ ...props,
	  path: arrow.right_square
	});
	const ArrowRightCircular = props => createIcon({ ...props,
	  path: arrow.right_circular
	}); // 向下

	const ArrowDown = props => createIcon({ ...props,
	  path: arrow.down
	});
	const ArrowDownSquare = props => createIcon({ ...props,
	  path: arrow.down_square
	});
	const ArrowDownCircular = props => createIcon({ ...props,
	  path: arrow.down_circular
	}); // 向左

	const ArrowLeft = props => createIcon({ ...props,
	  path: arrow.left
	});
	const ArrowLeftSquare = props => createIcon({ ...props,
	  path: arrow.left_square
	});
	const ArrowLeftCircular = props => createIcon({ ...props,
	  path: arrow.left_circular
	});
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
	const CameraVideo = props => createIcon({ ...props,
	  path: camera.video_camera
	});
	Icon.CameraVideo = CameraVideo;
	const Video = props => createIcon({ ...props,
	  path: video.video
	});
	const Video2 = props => createIcon({ ...props,
	  path: video.video2
	});
	const Video3 = props => createIcon({ ...props,
	  path: video.video3
	});
	const Video3Disabled = props => createIcon({ ...props,
	  path: video.video3_disabled
	});
	const VideoPlay = props => createIcon({ ...props,
	  path: video.play
	});
	const VideoPlay2 = props => createIcon({ ...props,
	  path: video.play2
	});
	const VideoPause = props => createIcon({ ...props,
	  path: video.pause
	});
	const VideoFastForward = props => createIcon({ ...props,
	  path: video.fast_forward
	});
	const VideoBackward = props => createIcon({ ...props,
	  path: video.backward
	});
	const VideoPrev = props => createIcon({ ...props,
	  path: video.prev
	});
	const VideoNext = props => createIcon({ ...props,
	  path: video.next
	});
	const Microphone = props => createIcon({ ...props,
	  path: video.microphone
	});
	const Microphone0 = props => createIcon({ ...props,
	  path: video.microphone0
	});
	const Microphone1 = props => createIcon({ ...props,
	  path: video.microphone1
	});
	const Microphone2 = props => createIcon({ ...props,
	  path: video.microphone2
	});
	const Microphone3 = props => createIcon({ ...props,
	  path: video.microphone3
	});
	const Microphone4 = props => createIcon({ ...props,
	  path: video.microphone4
	});
	const MicrophoneDisabled = props => createIcon({ ...props,
	  path: video.microphone_disabled
	});
	const MicrophoneDisabled1 = props => createIcon({ ...props,
	  path: video.microphone_disabled1
	});
	const MicrophoneDisabled2 = props => createIcon({ ...props,
	  path: video.microphone_disabled2
	});
	const MicrophoneDisabled3 = props => createIcon({ ...props,
	  path: video.microphone_disabled3
	});
	const MicrophoneDisabled4 = props => createIcon({ ...props,
	  path: video.microphone_disabled4
	});
	const MicrophoneDisabled5 = props => createIcon({ ...props,
	  path: video.microphone_disabled5
	});
	const MicrophoneDisabled6 = props => createIcon({ ...props,
	  path: video.microphone_disabled6
	});
	const MicrophoneDisabled7 = props => createIcon({ ...props,
	  path: video.microphone_disabled7
	});
	const MicrophoneDisabled8 = props => createIcon({ ...props,
	  path: video.microphone_disabled8
	});
	const MicrophoneDisabled9 = props => createIcon({ ...props,
	  path: video.microphone_disabled9
	});
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
	const VolumeOff = props => createIcon({ ...props,
	  path: volume.off
	});
	const VolumeUp = props => createIcon({ ...props,
	  path: volume.up
	});
	const VolumeDown = props => createIcon({ ...props,
	  path: volume.down
	});
	Icon.VolumeOff = VolumeOff;
	Icon.VolumeUp = VolumeUp;
	Icon.VolumeDown = VolumeDown;
	const HeartFollow = props => createIcon({ ...props,
	  path: heart.follow
	});
	const HeartUnFollow = props => createIcon({ ...props,
	  path: heart.un_follow
	});
	Icon.HeartFollow = HeartFollow;
	Icon.HeartUnFollow = HeartUnFollow;
	const TrendingUp = props => createIcon({ ...props,
	  path: trending.up
	});
	const TrendingDown = props => createIcon({ ...props,
	  path: trending.down
	});
	Icon.TrendingUp = TrendingUp;
	Icon.TrendingDown = TrendingDown;
	const More = props => createIcon({ ...props,
	  path: more.__more
	});
	const MoreHorizontal = props => createIcon({ ...props,
	  path: more.more_horizontal
	});
	const MoreVertical = props => createIcon({ ...props,
	  path: more.more_vertical
	});
	Icon.More = More;
	Icon.MoreHorizontal = MoreHorizontal;
	Icon.MoreVertical = MoreVertical;
	const Move = props => createIcon({ ...props,
	  path: move.move
	});
	const MoveUp = props => createIcon({ ...props,
	  path: move.up
	});
	const MoveDoubleUp = props => createIcon({ ...props,
	  path: move.double_up
	});
	const MoveRight = props => createIcon({ ...props,
	  path: move.right
	});
	const MoveDoubleRight = props => createIcon({ ...props,
	  path: move.double_right
	});
	const MoveDown = props => createIcon({ ...props,
	  path: move.down
	});
	const MoveDoubleDown = props => createIcon({ ...props,
	  path: move.double_down
	});
	const MoveLeft = props => createIcon({ ...props,
	  path: move.left
	});
	const MoveDoubleLeft = props => createIcon({ ...props,
	  path: move.double_left
	});
	Icon.Move = Move;
	Icon.MoveUp = MoveUp;
	Icon.MoveDoubleUp = MoveDoubleUp;
	Icon.MoveRight = MoveRight;
	Icon.MoveDoubleRight = MoveDoubleRight;
	Icon.MoveDown = MoveDown;
	Icon.MoveDoubleDown = MoveDoubleDown;
	Icon.MoveLeft = MoveLeft;
	Icon.MoveDoubleLeft = MoveDoubleLeft;
	const RotationLeft = props => createIcon({ ...props,
	  path: rotation.left
	});
	const RotationRight = props => createIcon({ ...props,
	  path: rotation.right
	});
	Icon.RotationLeft = RotationLeft;
	Icon.RotationRight = RotationRight;
	const ScreenMaximize = props => createIcon({ ...props,
	  path: screen$1.maximize
	});
	const ScreenMaximize2 = props => createIcon({ ...props,
	  path: screen$1.maximize2
	});
	const ScreenMinimize = props => createIcon({ ...props,
	  path: screen$1.minimize
	});
	const ScreenMinimize2 = props => createIcon({ ...props,
	  path: screen$1.minimize2
	});
	Icon.ScreenMaximize = ScreenMaximize;
	Icon.ScreenMaximize2 = ScreenMaximize2;
	Icon.ScreenMinimize = ScreenMinimize;
	Icon.ScreenMinimize2 = ScreenMinimize2;
	const PTZControl = props => createIcon({ ...props,
	  path: business.icon_PTZ_control
	});
	const Screenshot = props => createIcon({ ...props,
	  path: business.icon_screenshot
	});
	const ThreeDimensional = props => createIcon({ ...props,
	  path: business.icon_three_dimensional
	});
	const Information = props => createIcon({ ...props,
	  path: business.icon_information
	});
	const Information2 = props => createIcon({ ...props,
	  path: business.icon_information2
	});
	const Help = props => createIcon({ ...props,
	  path: business.icon_help
	});
	const Help2 = props => createIcon({ ...props,
	  path: business.icon_help2
	});
	const Help3 = props => createIcon({ ...props,
	  path: business.icon_help3
	});
	const Wifi = props => createIcon({ ...props,
	  path: business.icon_wifi
	});
	const WifiGreen = props => createIcon({ ...props,
	  path: business.icon_wifi_green
	});
	const Guarantee = props => createIcon({ ...props,
	  path: business.icon_wifi_guarantee
	});
	const Guarantee2 = props => createIcon({ ...props,
	  path: business.icon_wifi_guarantee2
	});
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
	const SearchLine = props => createIcon({ ...props,
	  path: magnifier.search_line
	});
	const SearchLine2 = props => createIcon({ ...props,
	  path: magnifier.search_line2
	});
	const SearchFill = props => createIcon({ ...props,
	  path: magnifier.search_fill
	});
	const SearchFill2 = props => createIcon({ ...props,
	  path: magnifier.search_fill2
	});
	const ZoomInLine = props => createIcon({ ...props,
	  path: magnifier.zoom_in_line
	});
	const ZoomInFill = props => createIcon({ ...props,
	  path: magnifier.zoom_in_fill
	});
	const ZoomOutLine = props => createIcon({ ...props,
	  path: magnifier.zoom_out_line
	});
	const ZoomOutFill = props => createIcon({ ...props,
	  path: magnifier.zoom_out_fill
	});
	Icon.SearchLine = SearchLine;
	Icon.SearchLine2 = SearchLine2;
	Icon.SearchFill = SearchFill;
	Icon.SearchFill2 = SearchFill2;
	Icon.ZoomInLine = ZoomInLine;
	Icon.ZoomInFill = ZoomInFill;
	Icon.ZoomOutLine = ZoomOutLine;
	Icon.ZoomOutFill = ZoomOutFill;
	const Close = props => createIcon({ ...props,
	  path: circular.icon_close
	});
	Icon.Close = Close;
	window.__Icons = Icon;

	const attrs = {
	  color: 'white',
	  style: 'width: 1.2rem; height: 1.2rem;'
	};
	const iconsMap = {
	  play: {
	    label: '播放',
	    icon: Icon.VideoPlay(attrs),
	    withTips: true
	  },
	  pause: {
	    label: '暂停',
	    icon: Icon.VideoPause(attrs),
	    withTips: true
	  },
	  audio: {
	    // icon: Icon.VolumeUp(attrs),
	    icon: Icon.VolumeUp({ ...attrs,
	      style: 'width: 19px; height: 19px;'
	    })
	  },
	  mute: {
	    icon: Icon.VolumeOff({ ...attrs,
	      style: 'width: 19px; height: 19px;'
	    })
	  },
	  screenshot: {
	    label: '截图',
	    icon: Icon.Screenshot(attrs),
	    withTips: true
	  },
	  // loading: '加载',
	  fullscreen: {
	    label: '全屏',
	    icon: Icon.ScreenMaximize(attrs),
	    withTips: true
	  },
	  fullscreenExit: {
	    label: '退出全屏',
	    icon: Icon.ScreenMinimize(attrs),
	    withTips: true
	  },
	  record: {
	    label: '录制',
	    icon: Icon.Video3(attrs),
	    withTips: true
	  },
	  recordStop: {
	    label: '停止录制',
	    icon: Icon.Video3Disabled({ ...attrs,
	      style: 'color: red;' + attrs.style
	    }),
	    withTips: true
	  } // movement: '云台控制',
	  // movementEnable: '云台控制', // 启用
	  // transform3D: '3D变换',
	  // transform3DEnable: '3D变换', // 启用
	  // zoomIn: '放大',
	  // zoomOut: '缩小',

	}; // console.log(Icon)

	var icons = Object.keys(iconsMap).reduce((icons, key) => {
	  icons[key] = `<div class="jessibuca-icon jessibuca-icon-${key}">${iconsMap[key].icon}</div>`;

	  if (iconsMap[key].withTips) {
	    icons[key] += `<span class="icon-title-tips"><span class="icon-title">${iconsMap[key].label}</span></span>`;
	  }

	  return icons;
	}, {});

	var template = ((player, control) => {
	  player.$container.classList.add('jessibuca-controls-show');
	  const options = player._opt;
	  const operateBtns = options.operateBtns;
	  const moreIconAttr = { ...attrs,
	    width: '1.5rem',
	    height: '1.5rem',
	    style: 'transform: rotate(-90deg);' + attrs.style
	  };
	  player.$container.insertAdjacentHTML('beforeend', `
            ${options.background ? `<div class="jessibuca-poster" style="background-image: url(${options.background})"></div>` : ''}
            <div class="jessibuca-loading">
                ${icons.loading}
                ${options.loadingText ? `<div class="jessibuca-loading-text">${options.loadingText}</div>` : ''}
            </div>
            ${options.hasControl && operateBtns.play ? `<div class="jessibuca-play-big"></div>` : ''}
            ${options.hasControl ? `
                <div class="jessibuca-controls">
                    <div class="jessibuca-controls-bottom">
                        <div class="jessibuca-controls-left">
                            ${options.showBandwidth ? `<div class="jessibuca-controls-item jessibuca-speed"></div>` : ''}
                        </div>
                        <div class="jessibuca-controls-right <!--jessibuca-controls-popover-->">
                             ${operateBtns.audio ? `
                                 <div class="jessibuca-controls-item jessibuca-volume">
                                     ${icons.audio}
                                     ${icons.mute}
                                     <div class="jessibuca-volume-panel-wrap">
                                          <div class="jessibuca-volume-panel">
                                                 <div class="jessibuca-volume-panel-handle"></div>
                                          </div>
                                          <div class="jessibuca-volume-panel-text"></div>
                                     </div>
                                 </div>
                             ` : ''}
                             ${operateBtns.play ? `<div class="jessibuca-controls-item jessibuca-play">${icons.play}</div><div class="jessibuca-controls-item jessibuca-pause">${icons.pause}</div>` : ''}
                             ${operateBtns.screenshot ? `<div class="jessibuca-controls-item jessibuca-screenshot">${icons.screenshot}</div>` : ''}
                             ${operateBtns.record ? ` <div class="jessibuca-controls-item jessibuca-record">${icons.record}</div><div class="jessibuca-controls-item jessibuca-record-stop">${icons.recordStop}</div>` : ''}
                             ${operateBtns.fullscreen ? `<div class="jessibuca-controls-item jessibuca-fullscreen">${icons.fullscreen}</div><div class="jessibuca-controls-item jessibuca-fullscreen-exit">${icons.fullscreenExit}</div>` : ''}
                        </div>
                        <!--<div  class="jessibuca-controls-minimize">
                          ${Icon.More(moreIconAttr)}
                        </div>-->
                    </div>
                </div>
            ` : ''}

        `);
	  Object.defineProperty(control, '$poster', {
	    value: player.$container.querySelector('.jessibuca-poster')
	  });
	  Object.defineProperty(control, '$loading', {
	    value: player.$container.querySelector('.jessibuca-loading')
	  });
	  Object.defineProperty(control, '$play', {
	    value: player.$container.querySelector('.jessibuca-play')
	  });
	  Object.defineProperty(control, '$playBig', {
	    value: player.$container.querySelector('.jessibuca-play-big')
	  });
	  Object.defineProperty(control, '$pause', {
	    value: player.$container.querySelector('.jessibuca-pause')
	  });
	  Object.defineProperty(control, '$controls', {
	    value: player.$container.querySelector('.jessibuca-controls')
	  });
	  Object.defineProperty(control, '$fullscreen', {
	    value: player.$container.querySelector('.jessibuca-fullscreen')
	  });
	  /*Object.defineProperty(control, '$fullscreen', {
	      value: player.$container.querySelector('.jessibuca-fullscreen'),
	  });*/

	  Object.defineProperty(control, '$volume', {
	    value: player.$container.querySelector('.jessibuca-volume')
	  });
	  Object.defineProperty(control, '$volumePanelWrap', {
	    value: player.$container.querySelector('.jessibuca-volume-panel-wrap')
	  });
	  Object.defineProperty(control, '$volumePanelText', {
	    value: player.$container.querySelector('.jessibuca-volume-panel-text')
	  });
	  Object.defineProperty(control, '$volumePanel', {
	    value: player.$container.querySelector('.jessibuca-volume-panel')
	  });
	  Object.defineProperty(control, '$volumeHandle', {
	    value: player.$container.querySelector('.jessibuca-volume-panel-handle')
	  });
	  Object.defineProperty(control, '$volumeOn', {
	    value: player.$container.querySelector('.jessibuca-icon-audio')
	  });
	  Object.defineProperty(control, '$volumeOff', {
	    value: player.$container.querySelector('.jessibuca-icon-mute')
	  });
	  /*Object.defineProperty(control, '$fullscreen', {
	      value: player.$container.querySelector('.jessibuca-fullscreen'),
	  });*/

	  Object.defineProperty(control, '$fullscreenExit', {
	    value: player.$container.querySelector('.jessibuca-fullscreen-exit')
	  });
	  Object.defineProperty(control, '$record', {
	    value: player.$container.querySelector('.jessibuca-record')
	  });
	  Object.defineProperty(control, '$recordStop', {
	    value: player.$container.querySelector('.jessibuca-record-stop')
	  });
	  Object.defineProperty(control, '$screenshot', {
	    value: player.$container.querySelector('.jessibuca-screenshot')
	  });
	  Object.defineProperty(control, '$speed', {
	    value: player.$container.querySelector('.jessibuca-speed')
	  });
	});

	var observer$1 = ((player, control) => {
	  const {
	    events: {
	      proxy
	    }
	  } = player;
	  const object = document.createElement('object');
	  object.setAttribute('aria-hidden', 'true');
	  object.setAttribute('tabindex', -1);
	  object.type = 'text/html';
	  object.data = 'about:blank';
	  setStyle(object, {
	    display: 'block',
	    position: 'absolute',
	    top: '0',
	    left: '0',
	    height: '100%',
	    width: '100%',
	    overflow: 'hidden',
	    pointerEvents: 'none',
	    zIndex: '-1'
	  });
	  let playerWidth = player.width;
	  let playerHeight = player.height;
	  proxy(object, 'load', () => {
	    proxy(object.contentDocument.defaultView, 'resize', () => {
	      if (player.width !== playerWidth || player.height !== playerHeight) {
	        playerWidth = player.width;
	        playerHeight = player.height;
	        player.emit(EVENTS.resize);
	      }
	    });
	  });
	  player.$container.appendChild(object);
	  player.on(EVENTS.destroy, () => {
	    player.$container.removeChild(object);
	  });

	  function setVolumeHandle(percentage) {
	    if (percentage === 0) {
	      setStyle(control.$volumeOn, 'display', 'none');
	      setStyle(control.$volumeOff, 'display', 'flex');
	      setStyle(control.$volumeHandle, 'top', `${48}px`);
	    } else {
	      if (control.$volumeHandle && control.$volumePanel) {
	        const panelHeight = getStyle(control.$volumePanel, 'height') || 60;
	        const handleHeight = getStyle(control.$volumeHandle, 'height');
	        const top = panelHeight - (panelHeight - handleHeight) * percentage - handleHeight;
	        setStyle(control.$volumeHandle, 'top', `${top}px`);
	        setStyle(control.$volumeOn, 'display', 'flex');
	        setStyle(control.$volumeOff, 'display', 'none');
	      }
	    }

	    control.$volumePanelText && (control.$volumePanelText.innerHTML = parseInt(percentage * 100));
	  }

	  player.on(EVENTS.volumechange, () => {
	    setVolumeHandle(player.volume);
	  });
	  player.on(EVENTS.loading, flag => {
	    setStyle(control.$loading, 'display', flag ? 'flex' : 'none');
	    setStyle(control.$poster, 'display', 'none');

	    if (flag) {
	      setStyle(control.$playBig, 'display', 'none');
	    }
	  });

	  try {
	    const screenfullChange = () => {
	      setStyle(control.$fullscreenExit, 'display', player.fullscreen ? 'flex' : 'none');
	      setStyle(control.$fullscreen, 'display', player.fullscreen ? 'none' : 'flex'); // control.autoSize();
	    };

	    screenfull.on('change', screenfullChange);
	    player.events.destroys.push(() => {
	      screenfull.off('change', screenfullChange);
	    });
	  } catch (error) {//
	  }

	  player.on(EVENTS.recording, () => {
	    setStyle(control.$record, 'display', player.recording ? 'none' : 'flex');
	    setStyle(control.$recordStop, 'display', player.recording ? 'flex' : 'none');
	  }); //

	  player.on(EVENTS.recordingTimestamp, timestamp => {// console.log(timestamp);
	  });
	  player.on(EVENTS.playing, flag => {
	    const playerWidth = player.width;
	    const toggleDisplay = createToggleDisplay(control, playerWidth);

	    if (flag) {
	      toggleDisplay('$screenshot', 500, 'flex');
	      toggleDisplay('$record', 300, 'flex');
	    } else {
	      setStyle(control.$screenshot, 'display', 'none');
	      setStyle(control.$record, 'display', 'none');
	    }

	    setStyle(control.$play, 'display', flag ? 'none' : 'flex');
	    setStyle(control.$playBig, 'display', flag ? 'none' : 'block');
	    setStyle(control.$pause, 'display', flag ? 'flex' : 'none');
	    setStyle(control.$fullscreen, 'display', flag ? 'flex' : 'none'); // 不在播放

	    if (!flag) {
	      control.$speed && (control.$speed.innerHTML = bpsSize(''));
	    }
	  });
	  player.on(EVENTS.kBps, rate => {
	    const bps = bpsSize(rate);
	    control.$speed && (control.$speed.innerHTML = bps);
	  }); //// movement

	  control.on('movement', () => {
	    console.log('control: movement');
	  });
	});

	var property = ((player, control) => {
	  Object.defineProperty(control, 'controlsRect', {
	    get: () => {
	      return control.$controls.getBoundingClientRect();
	    }
	  });
	});

	var events = ((player, control) => {
	  const {
	    events: {
	      proxy
	    },
	    debug
	  } = player;

	  function volumeChangeFromEvent(event) {
	    const {
	      bottom: panelBottom,
	      height: panelHeight
	    } = control.$volumePanel.getBoundingClientRect();
	    const {
	      height: handleHeight
	    } = control.$volumeHandle.getBoundingClientRect();
	    const percentage = clamp(panelBottom - event.y - handleHeight / 2, 0, panelHeight - handleHeight / 2) / (panelHeight - handleHeight);
	    return percentage;
	  } //


	  proxy(window, ['click', 'contextmenu'], event => {
	    if (event.composedPath().indexOf(player.$container) > -1) {
	      control.isFocus = true;
	    } else {
	      control.isFocus = false;
	    }
	  }); //

	  proxy(window, 'orientationchange', () => {
	    setTimeout(() => {
	      player.resize();
	    }, 300);
	  });
	  proxy(control.$controls, 'click', e => {
	    e.stopPropagation();
	  });
	  proxy(control.$pause, 'click', e => {
	    player.pause();
	  }); // 监听 play 方法

	  proxy(control.$play, 'click', e => {
	    player.play();
	  }); // 监听 play 方法

	  proxy(control.$playBig, 'click', e => {
	    player.play();
	  });
	  proxy(control.$volume, 'mouseover', () => {
	    control.$volumePanelWrap.classList.add('jessibuca-volume-panel-wrap-show');
	  });
	  proxy(control.$volume, 'mouseout', () => {
	    control.$volumePanelWrap.classList.remove('jessibuca-volume-panel-wrap-show');
	  });
	  proxy(control.$volumeOn, 'click', e => {
	    e.stopPropagation();
	    setStyle(control.$volumeOn, 'display', 'none');
	    setStyle(control.$volumeOff, 'display', 'block');
	    player.lastVolume = player.volume;
	    player.volume = 0;
	  });
	  proxy(control.$volumeOff, 'click', e => {
	    e.stopPropagation();
	    setStyle(control.$volumeOn, 'display', 'block');
	    setStyle(control.$volumeOff, 'display', 'none');
	    player.volume = player.lastVolume || 0.5;
	  });
	  proxy(control.$screenshot, 'click', e => {
	    e.stopPropagation();
	    player.video.screenshot();
	  });
	  proxy(control.$volumePanel, 'click', event => {
	    event.stopPropagation();
	    player.volume = volumeChangeFromEvent(event);
	  });
	  proxy(control.$volumeHandle, 'mousedown', () => {
	    control.isVolumeDroging = true;
	  });
	  proxy(control.$volumeHandle, 'mousemove', event => {
	    if (control.isVolumeDroging) {
	      player.volume = volumeChangeFromEvent(event);
	    }
	  });
	  proxy(document, 'mouseup', () => {
	    if (control.isVolumeDroging) {
	      control.isVolumeDroging = false;
	    }
	  });
	  proxy(control.$record, 'click', e => {
	    e.stopPropagation();
	    player.recording = true;
	  });
	  proxy(control.$recordStop, 'click', e => {
	    e.stopPropagation();
	    player.recording = false;
	  });
	  proxy(control.$fullscreen, 'click', e => {
	    e.stopPropagation();
	    player.fullscreen = true;
	  });
	  proxy(control.$fullscreenExit, 'click', e => {
	    e.stopPropagation();
	    player.fullscreen = false;
	  });
	});

	function styleInject(css, ref) {
	  if (ref === void 0) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') {
	    return;
	  }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z$1 = "@keyframes rotation{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}.jessibuca-container .jessibuca-icon{cursor:pointer;width:16px;height:16px}.jessibuca-container .jessibuca-poster{position:absolute;z-index:10;left:0;top:0;right:0;bottom:0;height:100%;width:100%;background-position:50%;background-repeat:no-repeat;background-size:contain;pointer-events:none}.jessibuca-container .jessibuca-play-big{position:absolute;display:none;height:100%;width:100%;background:rgba(0,0,0,.4);background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACgklEQVRoQ+3ZPYsTQRjA8eeZZCFlWttAwCIkZOaZJt8hlvkeHrlccuAFT6wEG0FQOeQQLCIWih6chQgKgkkKIyqKCVYip54IWmiQkTmyYhFvd3Zn3yDb7szu/7cv7GaDkPEFM94PK0DSZ9DzDAyHw7uI2HRDlVJX5/N5r9FoHCYdr/fvCRiNRmpJ6AEidoUQ15NG+AH8BgD2n9AHANAmohdJQfwAfgGA4xF4bjabnW21Whob62ILoKNfAsAGEd2PU2ATcNSNiDf0/cE5/xAHxDpgEf0NADaJ6HLUiKgAbvcjpdSGlPJZVJCoAUfdSqkLxWLxTLlc/mkbEgtgET1TSnWklLdtIuIEuN23crlcp16vv7cBSQKgu38AwBYRXQyLSArg3hsjRDxNRE+CQhIF/BN9qVAobFYqle+mkLQAdLd+8K0T0U0TRJoAbvc9fVkJId75gaQRoLv1C2STiPTb7rFLWgE6+g0RncwyYEJEtawCvjDGmpzzp5kD6NfxfD7frtVqB17xen2a7oG3ALBm+oMoFQBEPD+dTvtBfpImDXjIGFvjnD/3c7ksG5MU4HDxWeZa0HB3XhKAXcdxOn5vUi9gnIDXSqm2lHLPK8pkfVyAbSLqm4T5HRs1YB8RO0KIid8g03FRAT4rpbpSyh3TINPxUQB2GGM9zvkn05gg420CJovLZT9ISNA5tgB9ItoOGhFmnh/AcZ/X9xhj65zzV2Eiwsz1A1j2B8dHAOgS0W6YnduY6wkYj8d3lFKn/j66Ea84jtOrVqtfbQSE3YYnYDAY5Eql0hYAnNDv6kKIx2F3anO+J8DmzqLY1goQxVE12ebqDJgcrSjGrs5AFEfVZJt/AF0m+jHzUTtnAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-position:50%;cursor:pointer;background-size:48px 48px}.jessibuca-container .jessibuca-play-big:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACEElEQVRoQ+2ZXStEQRjH/3/yIXwDdz7J+i7kvdisXCk3SiFJW27kglBcSFFKbqwQSa4krykuKB09Naf2Yndn5jgzc06d53Znd36/mWfeniVyHsw5PwqB0DOonYEoijYBlOpAFwCMkHwLDS/9mwhEDUCfAAyTXA4tYSLwC6CtCegegH6S56FETAR+AHRoACcBTJAUWa+RloBAXwAYIrnt0yBNgZi7qtbHgw8RFwLC/QFglOScawlXAjH3gUqrE1cirgVi7mkAYyS/0xbxJSDcdwAGSa6nKeFTIOZeUyL3aYiEEBDuLwDjJGf+KxFKIOY+BdBL8iipSGiBmHtWbbuftiJZERBuOfgGSK7aSGRJIObeUml1ayKSRQHhlgtkiaTcdltGVgUE+ppkV54FaiS78yrwqlLoOI8Cch2XV548W7WRpTVwA6DP9kGUFYEpAOUkT9LQAvtq1M+0udKkQSgBqSlJWWYxKXj8vRACK+o6bbRIdYI+Ba7U7rKjg7L53JdAhWTZBsy0rWuBXZUuNVMg23auBF7UIl2yBbJt70JAoKV6/WwLk6R9mgKSJlJ1kLTxFmkJyCla8UZd15GJQKvyumyJ8gy8DAEvfZoINPqD41EtUjmUgoaJwAaAnjrKebVI34OSq85NBNqlCAWgE0CV5GEWwI3vQlmCbcSinYFCwPEIFDPgeIC1P1/MgHaIHDf4Aydx2TF7wnKeAAAAAElFTkSuQmCC\")}.jessibuca-container .jessibuca-loading{display:none;flex-direction:column;justify-content:center;align-items:center;position:absolute;z-index:20;left:0;top:0;right:0;bottom:0;width:100%;height:100%;pointer-events:none}.jessibuca-container .jessibuca-loading-text{line-height:20px;font-size:13px;color:#fff;margin-top:10px}.jessibuca-container .jessibuca-controls{display:flex;flex-direction:column;justify-content:flex-end;position:absolute;z-index:40;left:0;right:0;bottom:0;height:38px;padding-left:13px;padding-right:13px;font-size:14px;color:#fff;opacity:0;visibility:hidden;transition:all .2s ease-in-out;-webkit-user-select:none;user-select:none}.jessibuca-container .jessibuca-controls .jessibuca-controls-item{position:relative;display:flex;justify-content:center;padding:0 8px}.jessibuca-container .jessibuca-controls .jessibuca-controls-item:hover .icon-title-tips{visibility:visible;opacity:1}.jessibuca-container .jessibuca-controls .jessibuca-fullscreen,.jessibuca-container .jessibuca-controls .jessibuca-fullscreen-exit,.jessibuca-container .jessibuca-controls .jessibuca-icon-audio,.jessibuca-container .jessibuca-controls .jessibuca-microphone-close,.jessibuca-container .jessibuca-controls .jessibuca-pause,.jessibuca-container .jessibuca-controls .jessibuca-play,.jessibuca-container .jessibuca-controls .jessibuca-record,.jessibuca-container .jessibuca-controls .jessibuca-record-stop,.jessibuca-container .jessibuca-controls .jessibuca-screenshot{display:none}.jessibuca-container .jessibuca-controls .jessibuca-icon-audio,.jessibuca-container .jessibuca-controls .jessibuca-icon-mute{z-index:1}.jessibuca-container .jessibuca-controls .jessibuca-controls-bottom{position:relative;display:flex;justify-content:space-between;height:100%}.jessibuca-container .jessibuca-controls .jessibuca-controls-bottom .jessibuca-controls-left,.jessibuca-container .jessibuca-controls .jessibuca-controls-bottom .jessibuca-controls-right{display:flex;align-items:center}.jessibuca-container .jessibuca-controls .jessibuca-controls-bottom .jessibuca-controls-right.jessibuca-controls-popover{position:absolute;right:0;background:rgba(0,0,0,.6);bottom:100%;display:flex;flex-direction:column;width:2rem}.jessibuca-container .jessibuca-controls .jessibuca-controls-bottom .jessibuca-controls-right.jessibuca-controls-popover .jessibuca-controls-item{padding-top:.4rem;padding-bottom:.4rem}.jessibuca-container.jessibuca-controls-show:hover .jessibuca-controls{opacity:1;background-color:rgba(22,22,22,.8);visibility:visible}.jessibuca-container.jessibuca-hide-cursor *{cursor:none!important}.jessibuca-container.jessibuca-fullscreen-web{position:fixed;z-index:9999;left:0;top:0;right:0;bottom:0;width:100%!important;height:100%!important;background:#000}.jessibuca-container .jessibuca-icon-loading{width:50px;height:50px;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAHHklEQVRoQ91bfYwdVRX/nTvbPuuqlEQM0q4IRYMSP0KkaNTEEAokNUEDFr9iEIOiuCC2++4dl+Tti9nOmbfWFgryESPhH7V+IIpG8SN+Fr8qqKgQEKoUkQREwXTLs8495mze1tf35s2bfTu7ndf758y55/x+c879OvcMYYnbxMTEy4IgOImIxkRkrYisNsasUrPe+wNE9C8ielRE9iVJsndmZubBpYRES6E8DMNXeu83ENHrAJwO4OUARvrY+i+ABwDcLSJ7jDF3RlF0f9H4CiNcrVZPCIJgk4hcCOCNBQH9EYBveO93NRqNx4rQuWjCExMT64IguEJE3kdEq4sA1alDRDTsb02SZOfMzMxDi7ExMGFr7THGGCciVwKYG5PL0HTMb69UKtNTU1Ozg9gbiLC1diMRXQ/gxEGMFtDnQRHZHMfxHQvVtWDCzrkdANSredvfRWQ3Ee0F8DCAJwDs994nQRCM6qxNROu892uI6A0ATs2rWER2xHF8VV55lctN2Dl3LICvA3hzDgMPENFXROT2SqVyb71efzZHnzkRnRNGRkY2isj5AM7K0e/HAN7OzP/MIZuP8OTk5FiSJDpjnpylVER+YIzZEUXRN/MY7ydTrVbXE9FlRPT+LFkiesh7f1Ycx4/009nXw9balxDRLwC8OEPZ/SLi4jjWCCi8WWtfA2CKiN6WofzxIAhePz09/dfMj5P1slqtPj8IgntEZF0vORH51Ozs7NU7d+5sFs60Q2EYhpeKyDUZq8LDInJ6HMdP98KS6WHn3E8BvKlHZx2X72Xmry410Xb91trTiOjLAF7Rw+5uZu6FufcYds7pl7wiTSkRPSUi5zHzr5eT7LytWq32gmaz+a0MZ1zDzB9LxZ72sFqtbjDGfLcHmWeI6IwoinTfe8RarVYzzWbzJxnb2A3M/P1OgF0hPT4+XhkdHd0H4LgUNv8xxpy5devW3x4xpm2Gt2zZMjoyMnJ363DSCemJ/fv3j3XOLV2EnXMNXQ57hPIFURTdVgay8xhaq4geKVem4Jph5mr788MIV6vVtcYY9W5XI6Iboij6SJnIzmNxzl0E4Itp2IIgWDs9Pf23+XeHEQ7D8EYR+VBKx8eYeU0ZybaR1s3OxhSMNzLzh7sIb968+YUrVqxQ7z6na6ATlS6UOzG2Qlv366bj3bMHDx4c27Zt25P6/JCHnXO6Cf90yhe6l5lfXWbvto3nm4no0hSHXRVFkR56/k/YWvsbItJ0zGFNRC6K4/hLQ0JYt8FdW0si2hNF0RmHCLcSbWnr6pPM/CIAMgyEFaNz7tsAzuvEmyTJKZotmQtpa+04EV2bQuo6Zh4fFrItwu8C8PmUSP1oHMfXzxEOw3CXiGzqFPLen9NoNL43TIQ19UREmmRY0YF7FzO/k5xzLwWgYdCZaZj13h/faDT+PUyEW15OO/T8MQiCjUr4HAC6Ee/MG/+MmfNkN0r3Pay124jo4x3ADuiBRwl/EMBNKTF/SxzHl5SOTQ5AzrnLANyQsjxdooRrmk1I0TPFzPUc+ksnYq09l4i+k8aJrLXbiajr7EhEV0ZRlDZzl45gJyDNhRljfpkCdLt6WF2vIdDZPsDMnys9uxSA1tpXEdHvU1599qgknHHqu/moDOlWNkTTyu2rTGKMOfeonLQ0lFunv08AOBPAXu/9jkajsafnsgTgVma+eBjHcBbmrI3HXcxc1D1vab5b1tbyQKVSOb5erz9TGrQFAMk8POhWLI7jOwuwUxoV/Y6Hn2Hmy0uDtgAgc4RbZQt/Ttl7PrVy5crj6vW6L8BWKVS057TuAqAX0p3t3cz8hVKgLQDEIcLW2suJ6LoUnX9i5tMKsFUKFYcIZ6VpAWxiZr2xG/p2WCI+4yDxeKVSWXM0jOXDCE9OTq5JkuTRNDcS0U1RFKWdqobK612XaWEYflJEru7BYuhDu4tw66ShxSFpd0laD7meme8ZKre2gU0teXDOnQ2gV3q2FBfig37wnjUevVI/auhIlzwMSnYOe1bnPkUtWrXznuUualkM2b6EtWzJGKMlBaf0MrScZUuLJduXsAq07l1/DuCEDIP3iUi4VIVpRRCd19G3Ek8FtfTQe//DrAI1lSu69LBIogsirMK1Wm11s9n8GoC35AByH4DbvPe3r1q16g8LKS7NoXtRIrk83G4ha/bugURL93cD+Mt8+TAR6YT3j0ql8rtBC70HZb1gwmooDMO3eu+vJaKTBjXc6rfPe39ho9H41SL15O4+EOFWiGv5n2sViz83t8VuwWW9pRyY8Dxu59zJIqJVAhcP+JPHI8y8bL8SLJrwPHH9jYeI3kFEF+Ssmp/rqjN7HMe6lV2WVhjhdrRhGJ7a+lFrPYDXAtB667Q/X5723p+tNwLLwrbf1rIIEBryxpgTkyQZA6DlFccS0fMA6G84d6RVvBZht5eO/wEB1Kvsoc6vtAAAAABJRU5ErkJggg==\") no-repeat 50%;background-size:100% 100%;animation:rotation 1s linear infinite}.jessibuca-container .jessibuca-icon-audio,.jessibuca-container .jessibuca-icon-audio:hover,.jessibuca-container .jessibuca-icon-fullscreen,.jessibuca-container .jessibuca-icon-fullscreen:hover,.jessibuca-container .jessibuca-icon-fullscreenExit,.jessibuca-container .jessibuca-icon-fullscreenExit:hover,.jessibuca-container .jessibuca-icon-mute,.jessibuca-container .jessibuca-icon-mute:hover,.jessibuca-container .jessibuca-icon-pause,.jessibuca-container .jessibuca-icon-pause:hover,.jessibuca-container .jessibuca-icon-play,.jessibuca-container .jessibuca-icon-play:hover,.jessibuca-container .jessibuca-icon-record,.jessibuca-container .jessibuca-icon-record:hover,.jessibuca-container .jessibuca-icon-recordStop,.jessibuca-container .jessibuca-icon-recordStop:hover,.jessibuca-container .jessibuca-icon-screenshot,.jessibuca-container .jessibuca-icon-screenshot:hover{background-size:100% 100%}.jessibuca-container .jessibuca-controls-minimize{display:flex;justify-content:center;align-items:center;width:2rem;height:100%}.jessibuca-container .jessibuca-icon-text{font-size:14px;width:30px}.jessibuca-container .jessibuca-speed{font-size:14px;color:#fff}.jessibuca-container .jessibuca-quality-menu-list{position:absolute;left:50%;bottom:100%;visibility:hidden;opacity:0;transform:translateX(-50%);transition:visibility .3s,opacity .3s;background-color:rgba(0,0,0,.5);border-radius:4px}.jessibuca-container .jessibuca-quality-menu-list.jessibuca-quality-menu-shown{visibility:visible;opacity:1}.jessibuca-container .icon-title-tips{pointer-events:none;position:absolute;left:50%;bottom:100%;visibility:hidden;opacity:0;transform:translateX(-50%);transition:visibility .3s ease 0s,opacity .3s ease 0s;background-color:rgba(0,0,0,.5);border-radius:4px}.jessibuca-container .icon-title{display:inline-block;padding:5px 10px;font-size:12px;white-space:nowrap;color:#fff}.jessibuca-container .jessibuca-quality-menu{padding:8px 0}.jessibuca-container .jessibuca-quality-menu-item{display:block;height:25px;margin:0;padding:0 10px;cursor:pointer;font-size:14px;text-align:center;width:50px;color:hsla(0,0%,100%,.5);transition:color .3s,background-color .3s}.jessibuca-container .jessibuca-quality-menu-item:hover{background-color:hsla(0,0%,100%,.2)}.jessibuca-container .jessibuca-quality-menu-item:focus{outline:none}.jessibuca-container .jessibuca-quality-menu-item.jessibuca-quality-menu-item-active{color:#2298fc}.jessibuca-container .jessibuca-volume-panel-wrap{position:absolute;left:50%;bottom:100%;visibility:hidden;opacity:0;transform:translateX(-50%) translateY(22%);transition:visibility .3s,opacity .3s;background-color:rgba(0,0,0,.5);border-radius:4px;height:120px;width:50px;overflow:hidden}.jessibuca-container .jessibuca-volume-panel-wrap.jessibuca-volume-panel-wrap-show{visibility:visible;opacity:1}.jessibuca-container .jessibuca-volume-panel{cursor:pointer;position:absolute;top:21px;height:60px;width:50px;overflow:hidden}.jessibuca-container .jessibuca-volume-panel-text{position:absolute;left:0;top:0;width:50px;height:20px;line-height:20px;text-align:center;color:#fff;font-size:12px}.jessibuca-container .jessibuca-volume-panel-handle{position:absolute;top:48px;left:50%;width:12px;height:12px;border-radius:12px;margin-left:-6px;background:#fff}.jessibuca-container .jessibuca-volume-panel-handle:before{bottom:-54px;background:#fff}.jessibuca-container .jessibuca-volume-panel-handle:after{bottom:6px;background:hsla(0,0%,100%,.2)}.jessibuca-container .jessibuca-volume-panel-handle:after,.jessibuca-container .jessibuca-volume-panel-handle:before{content:\"\";position:absolute;display:block;left:50%;width:3px;margin-left:-1px;height:60px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQ0UsR0FDRSw4QkFDRixDQUNBLEdBQ0UsK0JBQ0YsQ0FDRixDQUNBLHFDQUNFLGNBQWUsQ0FDZixVQUFXLENBQ1gsV0FDRixDQUNBLHVDQUNFLGlCQUFrQixDQUNsQixVQUFXLENBQ1gsTUFBTyxDQUNQLEtBQU0sQ0FDTixPQUFRLENBQ1IsUUFBUyxDQUNULFdBQVksQ0FDWixVQUFXLENBQ1gsdUJBQWtDLENBQ2xDLDJCQUE0QixDQUM1Qix1QkFBd0IsQ0FDeEIsbUJBQ0YsQ0FDQSx5Q0FDRSxpQkFBa0IsQ0FDbEIsWUFBYSxDQUNiLFdBQVksQ0FDWixVQUFXLENBQ1gseUJBQThCLENBQzlCLGs5QkFBMkMsQ0FDM0MsMkJBQTRCLENBQzVCLHVCQUEyQixDQUMzQixjQUFlLENBQ2YseUJBQ0YsQ0FDQSwrQ0FDRSwwekJBQ0YsQ0FDQSx3Q0FDRSxZQUFhLENBQ2IscUJBQXNCLENBQ3RCLHNCQUF1QixDQUN2QixrQkFBbUIsQ0FDbkIsaUJBQWtCLENBQ2xCLFVBQVcsQ0FDWCxNQUFPLENBQ1AsS0FBTSxDQUNOLE9BQVEsQ0FDUixRQUFTLENBQ1QsVUFBVyxDQUNYLFdBQVksQ0FDWixtQkFDRixDQUNBLDZDQUNFLGdCQUFpQixDQUNqQixjQUFlLENBQ2YsVUFBVyxDQUNYLGVBQ0YsQ0FDQSx5Q0FDRSxZQUFhLENBQ2IscUJBQXNCLENBQ3RCLHdCQUF5QixDQUN6QixpQkFBa0IsQ0FDbEIsVUFBVyxDQUNYLE1BQU8sQ0FDUCxPQUFRLENBQ1IsUUFBUyxDQUNULFdBQVksQ0FDWixpQkFBa0IsQ0FDbEIsa0JBQW1CLENBQ25CLGNBQWUsQ0FDZixVQUFXLENBQ1gsU0FBVSxDQUNWLGlCQUFrQixDQUNsQiw4QkFBZ0MsQ0FDaEMsd0JBQWlCLENBQWpCLGdCQUNGLENBQ0Esa0VBQ0UsaUJBQWtCLENBQ2xCLFlBQWEsQ0FDYixzQkFBdUIsQ0FDdkIsYUFDRixDQUNBLHlGQUNFLGtCQUFtQixDQUNuQixTQUNGLENBeUJBLG9qQkFDRSxZQUNGLENBQ0EsNkhBQ0UsU0FDRixDQUNBLG9FQUNFLGlCQUFrQixDQUNsQixZQUFhLENBQ2IsNkJBQThCLENBQzlCLFdBQ0YsQ0FLQSwyTEFIRSxZQUFhLENBQ2Isa0JBS0YsQ0FDQSx5SEFDRSxpQkFBa0IsQ0FDbEIsT0FBUSxDQUNSLHlCQUE4QixDQUM5QixXQUFZLENBQ1osWUFBYSxDQUNiLHFCQUFzQixDQUN0QixVQUNGLENBQ0Esa0pBQ0UsaUJBQW1CLENBQ25CLG9CQUNGLENBQ0EsdUVBQ0UsU0FBVSxDQUNWLGtDQUF1QyxDQUN2QyxrQkFDRixDQUNBLDZDQUNFLHFCQUNGLENBQ0EsOENBQ0UsY0FBZSxDQUNmLFlBQWEsQ0FDYixNQUFPLENBQ1AsS0FBTSxDQUNOLE9BQVEsQ0FDUixRQUFTLENBQ1Qsb0JBQXNCLENBQ3RCLHFCQUF1QixDQUN2QixlQUNGLENBQ0EsNkNBQ0UsVUFBVyxDQUNYLFdBQVksQ0FDWixrZ0ZBQXlELENBQ3pELHlCQUEwQixDQUMxQixxQ0FDRixDQW9EQSwwMkJBQ0UseUJBQ0YsQ0FDQSxrREFDRSxZQUFhLENBQ2Isc0JBQXVCLENBQ3ZCLGtCQUFtQixDQUNuQixVQUFXLENBQ1gsV0FDRixDQUNBLDBDQUNFLGNBQWUsQ0FDZixVQUNGLENBQ0Esc0NBQ0UsY0FBZSxDQUNmLFVBQ0YsQ0FDQSxrREFDRSxpQkFBa0IsQ0FDbEIsUUFBUyxDQUNULFdBQVksQ0FDWixpQkFBa0IsQ0FDbEIsU0FBVSxDQUNWLDBCQUEyQixDQUMzQixxQ0FBMkMsQ0FDM0MsK0JBQW9DLENBQ3BDLGlCQUNGLENBQ0EsK0VBQ0Usa0JBQW1CLENBQ25CLFNBQ0YsQ0FDQSxzQ0FDRSxtQkFBb0IsQ0FDcEIsaUJBQWtCLENBQ2xCLFFBQVMsQ0FDVCxXQUFZLENBQ1osaUJBQWtCLENBQ2xCLFNBQVUsQ0FDViwwQkFBMkIsQ0FDM0IscURBQTJELENBQzNELCtCQUFvQyxDQUNwQyxpQkFDRixDQUNBLGlDQUNFLG9CQUFxQixDQUNyQixnQkFBaUIsQ0FDakIsY0FBZSxDQUNmLGtCQUFtQixDQUNuQixVQUNGLENBQ0EsNkNBQ0UsYUFDRixDQUNBLGtEQUNFLGFBQWMsQ0FDZCxXQUFZLENBQ1osUUFBUyxDQUNULGNBQWUsQ0FDZixjQUFlLENBQ2YsY0FBZSxDQUNmLGlCQUFrQixDQUNsQixVQUFXLENBQ1gsd0JBQStCLENBQy9CLHlDQUNGLENBQ0Esd0RBQ0UsbUNBQ0YsQ0FDQSx3REFDRSxZQUNGLENBQ0EscUZBQ0UsYUFDRixDQUNBLGtEQUNFLGlCQUFrQixDQUNsQixRQUFTLENBQ1QsV0FBWSxDQUNaLGlCQUFrQixDQUNsQixTQUFVLENBQ1YsMENBQTJDLENBQzNDLHFDQUEyQyxDQUMzQywrQkFBb0MsQ0FDcEMsaUJBQWtCLENBQ2xCLFlBQWEsQ0FDYixVQUFXLENBQ1gsZUFDRixDQUNBLG1GQUNFLGtCQUFtQixDQUNuQixTQUNGLENBQ0EsNkNBQ0UsY0FBZSxDQUNmLGlCQUFrQixDQUNsQixRQUFTLENBQ1QsV0FBWSxDQUNaLFVBQVcsQ0FDWCxlQUNGLENBQ0Esa0RBQ0UsaUJBQWtCLENBQ2xCLE1BQU8sQ0FDUCxLQUFNLENBQ04sVUFBVyxDQUNYLFdBQVksQ0FDWixnQkFBaUIsQ0FDakIsaUJBQWtCLENBQ2xCLFVBQVcsQ0FDWCxjQUNGLENBQ0Esb0RBQ0UsaUJBQWtCLENBQ2xCLFFBQVMsQ0FDVCxRQUFTLENBQ1QsVUFBVyxDQUNYLFdBQVksQ0FDWixrQkFBbUIsQ0FDbkIsZ0JBQWlCLENBQ2pCLGVBQ0YsQ0FDQSwyREFDRSxZQUFhLENBQ2IsZUFDRixDQUNBLDBEQUNFLFVBQVcsQ0FDWCw2QkFDRixDQUNBLHFIQUNFLFVBQVcsQ0FDWCxpQkFBa0IsQ0FDbEIsYUFBYyxDQUNkLFFBQVMsQ0FDVCxTQUFVLENBQ1YsZ0JBQWlCLENBQ2pCLFdBQ0YiLCJmaWxlIjoic3R5bGUuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBrZXlmcmFtZXMgcm90YXRpb24ge1xuICBmcm9tIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICB9XG4gIHRvIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtcG9zdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxMDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1wbGF5LWJpZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogbm9uZTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQpO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi9hc3NldHMvcGxheS5wbmdcIik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBiYWNrZ3JvdW5kLXNpemU6IDQ4cHggNDhweDtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtcGxheS1iaWc6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi9hc3NldHMvcGxheS1ob3Zlci5wbmdcIik7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWxvYWRpbmcge1xuICBkaXNwbGF5OiBub25lO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAyMDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtbG9hZGluZy10ZXh0IHtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICNmZmY7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWNvbnRyb2xzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiA0MDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgaGVpZ2h0OiAzOHB4O1xuICBwYWRkaW5nLWxlZnQ6IDEzcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDEzcHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICNmZmY7XG4gIG9wYWNpdHk6IDA7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLWNvbnRyb2xzLWl0ZW0ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAwIDhweDtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtY29udHJvbHMgLmplc3NpYnVjYS1jb250cm9scy1pdGVtOmhvdmVyIC5pY29uLXRpdGxlLXRpcHMge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAxO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLW1pY3JvcGhvbmUtY2xvc2Uge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLWljb24tYXVkaW8ge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLXBsYXkge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLXBhdXNlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtY29udHJvbHMgLmplc3NpYnVjYS1mdWxsc2NyZWVuLWV4aXQge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLXNjcmVlbnNob3Qge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLXJlY29yZCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWNvbnRyb2xzIC5qZXNzaWJ1Y2EtZnVsbHNjcmVlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWNvbnRyb2xzIC5qZXNzaWJ1Y2EtcmVjb3JkLXN0b3Age1xuICBkaXNwbGF5OiBub25lO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLWljb24tYXVkaW8sIC5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtY29udHJvbHMgLmplc3NpYnVjYS1pY29uLW11dGUge1xuICB6LWluZGV4OiAxO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLWNvbnRyb2xzLWJvdHRvbSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWNvbnRyb2xzIC5qZXNzaWJ1Y2EtY29udHJvbHMtYm90dG9tIC5qZXNzaWJ1Y2EtY29udHJvbHMtbGVmdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWNvbnRyb2xzIC5qZXNzaWJ1Y2EtY29udHJvbHMtYm90dG9tIC5qZXNzaWJ1Y2EtY29udHJvbHMtcmlnaHQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLWNvbnRyb2xzLWJvdHRvbSAuamVzc2lidWNhLWNvbnRyb2xzLXJpZ2h0Lmplc3NpYnVjYS1jb250cm9scy1wb3BvdmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMDtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjYpO1xuICBib3R0b206IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAycmVtO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1jb250cm9scyAuamVzc2lidWNhLWNvbnRyb2xzLWJvdHRvbSAuamVzc2lidWNhLWNvbnRyb2xzLXJpZ2h0Lmplc3NpYnVjYS1jb250cm9scy1wb3BvdmVyIC5qZXNzaWJ1Y2EtY29udHJvbHMtaXRlbSB7XG4gIHBhZGRpbmctdG9wOiAwLjRyZW07XG4gIHBhZGRpbmctYm90dG9tOiAwLjRyZW07XG59XG4uamVzc2lidWNhLWNvbnRhaW5lci5qZXNzaWJ1Y2EtY29udHJvbHMtc2hvdzpob3ZlciAuamVzc2lidWNhLWNvbnRyb2xzIHtcbiAgb3BhY2l0eTogMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMiwgMjIsIDIyLCAwLjgpO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIuamVzc2lidWNhLWhpZGUtY3Vyc29yICoge1xuICBjdXJzb3I6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyLmplc3NpYnVjYS1mdWxsc2NyZWVuLXdlYiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogOTk5OTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZDogIzAwMDtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbi1sb2FkaW5nIHtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vYXNzZXRzL2xvYWRpbmcucG5nXCIpIG5vLXJlcGVhdCBjZW50ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xuICBhbmltYXRpb246IHJvdGF0aW9uIDFzIGxpbmVhciBpbmZpbml0ZTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbi1zY3JlZW5zaG90IHtcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWljb24tc2NyZWVuc2hvdDpob3ZlciB7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1pY29uLXBsYXkge1xuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbi1wbGF5OmhvdmVyIHtcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWljb24tcGF1c2Uge1xuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbi1wYXVzZTpob3ZlciB7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1pY29uLXJlY29yZCB7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1pY29uLXJlY29yZDpob3ZlciB7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1pY29uLXJlY29yZFN0b3Age1xuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbi1yZWNvcmRTdG9wOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWljb24tZnVsbHNjcmVlbiB7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1pY29uLWZ1bGxzY3JlZW46aG92ZXIge1xuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbi1mdWxsc2NyZWVuRXhpdCB7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1pY29uLWZ1bGxzY3JlZW5FeGl0OmhvdmVyIHtcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWljb24tYXVkaW8ge1xuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbi1hdWRpbzpob3ZlciB7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS1pY29uLW11dGUge1xuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtaWNvbi1tdXRlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWNvbnRyb2xzLW1pbmltaXplIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLWljb24tdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgd2lkdGg6IDMwcHg7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLXNwZWVkIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogI2ZmZjtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtcXVhbGl0eS1tZW51LWxpc3Qge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgYm90dG9tOiAxMDAlO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAzMDBtcywgb3BhY2l0eSAzMDBtcztcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLXF1YWxpdHktbWVudS1saXN0Lmplc3NpYnVjYS1xdWFsaXR5LW1lbnUtc2hvd24ge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAxO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmljb24tdGl0bGUtdGlwcyB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgYm90dG9tOiAxMDAlO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAzMDBtcyBlYXNlIDBzLCBvcGFjaXR5IDMwMG1zIGVhc2UgMHM7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmljb24tdGl0bGUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtcXVhbGl0eS1tZW51IHtcbiAgcGFkZGluZzogOHB4IDA7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLXF1YWxpdHktbWVudS1pdGVtIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMjVweDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwIDEwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA1MHB4O1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICB0cmFuc2l0aW9uOiBjb2xvciAzMDBtcywgYmFja2dyb3VuZC1jb2xvciAzMDBtcztcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtcXVhbGl0eS1tZW51LWl0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLXF1YWxpdHktbWVudS1pdGVtOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2EtcXVhbGl0eS1tZW51LWl0ZW0uamVzc2lidWNhLXF1YWxpdHktbWVudS1pdGVtLWFjdGl2ZSB7XG4gIGNvbG9yOiAjMjI5OEZDO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS12b2x1bWUtcGFuZWwtd3JhcCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTAlO1xuICBib3R0b206IDEwMCU7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoMjIlKTtcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAzMDBtcywgb3BhY2l0eSAzMDBtcztcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGhlaWdodDogMTIwcHg7XG4gIHdpZHRoOiA1MHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS12b2x1bWUtcGFuZWwtd3JhcC5qZXNzaWJ1Y2Etdm9sdW1lLXBhbmVsLXdyYXAtc2hvdyB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG9wYWNpdHk6IDE7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLXZvbHVtZS1wYW5lbCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDIxcHg7XG4gIGhlaWdodDogNjBweDtcbiAgd2lkdGg6IDUwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLXZvbHVtZS1wYW5lbC10ZXh0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDEycHg7XG59XG4uamVzc2lidWNhLWNvbnRhaW5lciAuamVzc2lidWNhLXZvbHVtZS1wYW5lbC1oYW5kbGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNDhweDtcbiAgbGVmdDogNTAlO1xuICB3aWR0aDogMTJweDtcbiAgaGVpZ2h0OiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tbGVmdDogLTZweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2Etdm9sdW1lLXBhbmVsLWhhbmRsZTo6YmVmb3JlIHtcbiAgYm90dG9tOiAtNTRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2Etdm9sdW1lLXBhbmVsLWhhbmRsZTo6YWZ0ZXIge1xuICBib3R0b206IDZweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xufVxuLmplc3NpYnVjYS1jb250YWluZXIgLmplc3NpYnVjYS12b2x1bWUtcGFuZWwtaGFuZGxlOjpiZWZvcmUsIC5qZXNzaWJ1Y2EtY29udGFpbmVyIC5qZXNzaWJ1Y2Etdm9sdW1lLXBhbmVsLWhhbmRsZTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBsZWZ0OiA1MCU7XG4gIHdpZHRoOiAzcHg7XG4gIG1hcmdpbi1sZWZ0OiAtMXB4O1xuICBoZWlnaHQ6IDYwcHg7XG59Il19 */";
	styleInject(css_248z$1);

	// todo: 待定
	var hotkey = ((player, control) => {
	  const {
	    events: {
	      proxy
	    }
	  } = player;
	  const keys = {};

	  function addHotkey(key, event) {
	    if (keys[key]) {
	      keys[key].push(event);
	    } else {
	      keys[key] = [event];
	    }
	  } //


	  addHotkey(HOT_KEY.esc, () => {
	    if (player.fullscreen) {
	      player.fullscreen = false;
	    }
	  }); //

	  addHotkey(HOT_KEY.arrowUp, () => {
	    player.volume += 0.05;
	  }); //

	  addHotkey(HOT_KEY.arrowDown, () => {
	    player.volume -= 0.05;
	  });
	  proxy(window, 'keydown', event => {
	    if (control.isFocus) {
	      const tag = document.activeElement.tagName.toUpperCase();
	      const editable = document.activeElement.getAttribute('contenteditable');

	      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
	        const events = keys[event.keyCode];

	        if (events) {
	          event.preventDefault();
	          events.forEach(fn => fn());
	        }
	      }
	    }
	  });
	});

	class Control extends Emitter {
	  constructor(player) {
	    super();
	    this.player = player;
	    template(player, this);
	    observer$1(player, this);
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

	var css_248z = ".jessibuca-container{position:relative;width:100%;height:100%;overflow:hidden}.jessibuca-container.jessibuca-fullscreen-web{position:fixed;z-index:9999;left:0;top:0;right:0;bottom:0;width:100%!important;height:100%!important;background:#000}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUJBQ0UsaUJBQWtCLENBQ2xCLFVBQVcsQ0FDWCxXQUFZLENBQ1osZUFDRixDQUNBLDhDQUNFLGNBQWUsQ0FDZixZQUFhLENBQ2IsTUFBTyxDQUNQLEtBQU0sQ0FDTixPQUFRLENBQ1IsUUFBUyxDQUNULG9CQUFzQixDQUN0QixxQkFBdUIsQ0FDdkIsZUFDRiIsImZpbGUiOiJzdHlsZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmplc3NpYnVjYS1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uamVzc2lidWNhLWNvbnRhaW5lci5qZXNzaWJ1Y2EtZnVsbHNjcmVlbi13ZWIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHotaW5kZXg6IDk5OTk7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6ICMwMDA7XG59Il19 */";
	styleInject(css_248z);

	var observer = (player => {
	  const {
	    _opt,
	    debug,
	    events: {
	      proxy
	    }
	  } = player;

	  if (_opt.supportDblclickFullscreen) {
	    proxy(player.$container, 'dblclick', () => {
	      player.fullscreen = !player.fullscreen;
	    });
	  } //


	  proxy(document, 'visibilitychange', () => {
	    if (_opt.hiddenAutoPause) {
	      debug.log('visibilitychange', document.visibilityState, player._isPlayingBeforePageHidden);

	      if ("visible" === document.visibilityState) {
	        if (player._isPlayingBeforePageHidden) {
	          player.play();
	        }
	      } else {
	        player._isPlayingBeforePageHidden = player.playing; // hidden

	        if (player.playing) {
	          player.pause();
	        }
	      }
	    }
	  });
	  proxy(window, 'fullscreenchange', () => {
	    //
	    if (player.keepScreenOn !== null && "visible" === document.visibilityState) {
	      player.enableWakeLock();
	    }
	  });
	});

	// tks: https://github.com/richtr/NoSleep.js
	const WEBM = "data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8oEEQvOBCEKChHdlYm1Ch4EEQoWBAhhTgGcBAAAAAAAVkhFNm3RALE27i1OrhBVJqWZTrIHfTbuMU6uEFlSua1OsggEwTbuMU6uEHFO7a1OsghV17AEAAAAAAACkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmAQAAAAAAAEUq17GDD0JATYCNTGF2ZjU1LjMzLjEwMFdBjUxhdmY1NS4zMy4xMDBzpJBlrrXf3DCDVB8KcgbMpcr+RImIQJBgAAAAAAAWVK5rAQAAAAAAD++uAQAAAAAAADLXgQFzxYEBnIEAIrWcg3VuZIaFVl9WUDiDgQEj44OEAmJaAOABAAAAAAAABrCBsLqBkK4BAAAAAAAPq9eBAnPFgQKcgQAitZyDdW5khohBX1ZPUkJJU4OBAuEBAAAAAAAAEZ+BArWIQOdwAAAAAABiZIEgY6JPbwIeVgF2b3JiaXMAAAAAAoC7AAAAAAAAgLUBAAAAAAC4AQN2b3JiaXMtAAAAWGlwaC5PcmcgbGliVm9yYmlzIEkgMjAxMDExMDEgKFNjaGF1ZmVudWdnZXQpAQAAABUAAABlbmNvZGVyPUxhdmM1NS41Mi4xMDIBBXZvcmJpcyVCQ1YBAEAAACRzGCpGpXMWhBAaQlAZ4xxCzmvsGUJMEYIcMkxbyyVzkCGkoEKIWyiB0JBVAABAAACHQXgUhIpBCCGEJT1YkoMnPQghhIg5eBSEaUEIIYQQQgghhBBCCCGERTlokoMnQQgdhOMwOAyD5Tj4HIRFOVgQgydB6CCED0K4moOsOQghhCQ1SFCDBjnoHITCLCiKgsQwuBaEBDUojILkMMjUgwtCiJqDSTX4GoRnQXgWhGlBCCGEJEFIkIMGQcgYhEZBWJKDBjm4FITLQagahCo5CB+EIDRkFQCQAACgoiiKoigKEBqyCgDIAAAQQFEUx3EcyZEcybEcCwgNWQUAAAEACAAAoEiKpEiO5EiSJFmSJVmSJVmS5omqLMuyLMuyLMsyEBqyCgBIAABQUQxFcRQHCA1ZBQBkAAAIoDiKpViKpWiK54iOCISGrAIAgAAABAAAEDRDUzxHlETPVFXXtm3btm3btm3btm3btm1blmUZCA1ZBQBAAAAQ0mlmqQaIMAMZBkJDVgEACAAAgBGKMMSA0JBVAABAAACAGEoOogmtOd+c46BZDppKsTkdnEi1eZKbirk555xzzsnmnDHOOeecopxZDJoJrTnnnMSgWQqaCa0555wnsXnQmiqtOeeccc7pYJwRxjnnnCateZCajbU555wFrWmOmkuxOeecSLl5UptLtTnnnHPOOeecc84555zqxekcnBPOOeecqL25lpvQxTnnnE/G6d6cEM4555xzzjnnnHPOOeecIDRkFQAABABAEIaNYdwpCNLnaCBGEWIaMulB9+gwCRqDnELq0ehopJQ6CCWVcVJKJwgNWQUAAAIAQAghhRRSSCGFFFJIIYUUYoghhhhyyimnoIJKKqmooowyyyyzzDLLLLPMOuyssw47DDHEEEMrrcRSU2011lhr7jnnmoO0VlprrbVSSimllFIKQkNWAQAgAAAEQgYZZJBRSCGFFGKIKaeccgoqqIDQkFUAACAAgAAAAABP8hzRER3RER3RER3RER3R8RzPESVREiVREi3TMjXTU0VVdWXXlnVZt31b2IVd933d933d+HVhWJZlWZZlWZZlWZZlWZZlWZYgNGQVAAACAAAghBBCSCGFFFJIKcYYc8w56CSUEAgNWQUAAAIACAAAAHAUR3EcyZEcSbIkS9IkzdIsT/M0TxM9URRF0zRV0RVdUTdtUTZl0zVdUzZdVVZtV5ZtW7Z125dl2/d93/d93/d93/d93/d9XQdCQ1YBABIAADqSIymSIimS4ziOJElAaMgqAEAGAEAAAIriKI7jOJIkSZIlaZJneZaomZrpmZ4qqkBoyCoAABAAQAAAAAAAAIqmeIqpeIqoeI7oiJJomZaoqZoryqbsuq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq4LhIasAgAkAAB0JEdyJEdSJEVSJEdygNCQVQCADACAAAAcwzEkRXIsy9I0T/M0TxM90RM901NFV3SB0JBVAAAgAIAAAAAAAAAMybAUy9EcTRIl1VItVVMt1VJF1VNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVN0zRNEwgNWQkAkAEAkBBTLS3GmgmLJGLSaqugYwxS7KWxSCpntbfKMYUYtV4ah5RREHupJGOKQcwtpNApJq3WVEKFFKSYYyoVUg5SIDRkhQAQmgHgcBxAsixAsiwAAAAAAAAAkDQN0DwPsDQPAAAAAAAAACRNAyxPAzTPAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA0jRA8zxA8zwAAAAAAAAA0DwP8DwR8EQRAAAAAAAAACzPAzTRAzxRBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA0jRA8zxA8zwAAAAAAAAAsDwP8EQR0DwRAAAAAAAAACzPAzxRBDzRAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEOAAABBgIRQasiIAiBMAcEgSJAmSBM0DSJYFTYOmwTQBkmVB06BpME0AAAAAAAAAAAAAJE2DpkHTIIoASdOgadA0iCIAAAAAAAAAAAAAkqZB06BpEEWApGnQNGgaRBEAAAAAAAAAAAAAzzQhihBFmCbAM02IIkQRpgkAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAGHAAAAgwoQwUGrIiAIgTAHA4imUBAIDjOJYFAACO41gWAABYliWKAABgWZooAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAYcAAACDChDBQashIAiAIAcCiKZQHHsSzgOJYFJMmyAJYF0DyApgFEEQAIAAAocAAACLBBU2JxgEJDVgIAUQAABsWxLE0TRZKkaZoniiRJ0zxPFGma53meacLzPM80IYqiaJoQRVE0TZimaaoqME1VFQAAUOAAABBgg6bE4gCFhqwEAEICAByKYlma5nmeJ4qmqZokSdM8TxRF0TRNU1VJkqZ5niiKommapqqyLE3zPFEURdNUVVWFpnmeKIqiaaqq6sLzPE8URdE0VdV14XmeJ4qiaJqq6roQRVE0TdNUTVV1XSCKpmmaqqqqrgtETxRNU1Vd13WB54miaaqqq7ouEE3TVFVVdV1ZBpimaaqq68oyQFVV1XVdV5YBqqqqruu6sgxQVdd1XVmWZQCu67qyLMsCAAAOHAAAAoygk4wqi7DRhAsPQKEhKwKAKAAAwBimFFPKMCYhpBAaxiSEFEImJaXSUqogpFJSKRWEVEoqJaOUUmopVRBSKamUCkIqJZVSAADYgQMA2IGFUGjISgAgDwCAMEYpxhhzTiKkFGPOOScRUoox55yTSjHmnHPOSSkZc8w556SUzjnnnHNSSuacc845KaVzzjnnnJRSSuecc05KKSWEzkEnpZTSOeecEwAAVOAAABBgo8jmBCNBhYasBABSAQAMjmNZmuZ5omialiRpmud5niiapiZJmuZ5nieKqsnzPE8URdE0VZXneZ4oiqJpqirXFUXTNE1VVV2yLIqmaZqq6rowTdNUVdd1XZimaaqq67oubFtVVdV1ZRm2raqq6rqyDFzXdWXZloEsu67s2rIAAPAEBwCgAhtWRzgpGgssNGQlAJABAEAYg5BCCCFlEEIKIYSUUggJAAAYcAAACDChDBQashIASAUAAIyx1lprrbXWQGettdZaa62AzFprrbXWWmuttdZaa6211lJrrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmstpZRSSimllFJKKaWUUkoppZRSSgUA+lU4APg/2LA6wknRWGChISsBgHAAAMAYpRhzDEIppVQIMeacdFRai7FCiDHnJKTUWmzFc85BKCGV1mIsnnMOQikpxVZjUSmEUlJKLbZYi0qho5JSSq3VWIwxqaTWWoutxmKMSSm01FqLMRYjbE2ptdhqq7EYY2sqLbQYY4zFCF9kbC2m2moNxggjWywt1VprMMYY3VuLpbaaizE++NpSLDHWXAAAd4MDAESCjTOsJJ0VjgYXGrISAAgJACAQUooxxhhzzjnnpFKMOeaccw5CCKFUijHGnHMOQgghlIwx5pxzEEIIIYRSSsaccxBCCCGEkFLqnHMQQgghhBBKKZ1zDkIIIYQQQimlgxBCCCGEEEoopaQUQgghhBBCCKmklEIIIYRSQighlZRSCCGEEEIpJaSUUgohhFJCCKGElFJKKYUQQgillJJSSimlEkoJJYQSUikppRRKCCGUUkpKKaVUSgmhhBJKKSWllFJKIYQQSikFAAAcOAAABBhBJxlVFmGjCRcegEJDVgIAZAAAkKKUUiktRYIipRikGEtGFXNQWoqocgxSzalSziDmJJaIMYSUk1Qy5hRCDELqHHVMKQYtlRhCxhik2HJLoXMOAAAAQQCAgJAAAAMEBTMAwOAA4XMQdAIERxsAgCBEZohEw0JweFAJEBFTAUBigkIuAFRYXKRdXECXAS7o4q4DIQQhCEEsDqCABByccMMTb3jCDU7QKSp1IAAAAAAADADwAACQXAAREdHMYWRobHB0eHyAhIiMkAgAAAAAABcAfAAAJCVAREQ0cxgZGhscHR4fICEiIyQBAIAAAgAAAAAggAAEBAQAAAAAAAIAAAAEBB9DtnUBAAAAAAAEPueBAKOFggAAgACjzoEAA4BwBwCdASqwAJAAAEcIhYWIhYSIAgIABhwJ7kPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99YAD+/6tQgKOFggADgAqjhYIAD4AOo4WCACSADqOZgQArADECAAEQEAAYABhYL/QACIBDmAYAAKOFggA6gA6jhYIAT4AOo5mBAFMAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAGSADqOFggB6gA6jmYEAewAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIAj4AOo5mBAKMAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAKSADqOFggC6gA6jmYEAywAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIAz4AOo4WCAOSADqOZgQDzADECAAEQEAAYABhYL/QACIBDmAYAAKOFggD6gA6jhYIBD4AOo5iBARsAEQIAARAQFGAAYWC/0AAiAQ5gGACjhYIBJIAOo4WCATqADqOZgQFDADECAAEQEAAYABhYL/QACIBDmAYAAKOFggFPgA6jhYIBZIAOo5mBAWsAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAXqADqOFggGPgA6jmYEBkwAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIBpIAOo4WCAbqADqOZgQG7ADECAAEQEAAYABhYL/QACIBDmAYAAKOFggHPgA6jmYEB4wAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIB5IAOo4WCAfqADqOZgQILADECAAEQEAAYABhYL/QACIBDmAYAAKOFggIPgA6jhYICJIAOo5mBAjMAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAjqADqOFggJPgA6jmYECWwAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYICZIAOo4WCAnqADqOZgQKDADECAAEQEAAYABhYL/QACIBDmAYAAKOFggKPgA6jhYICpIAOo5mBAqsAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCArqADqOFggLPgA6jmIEC0wARAgABEBAUYABhYL/QACIBDmAYAKOFggLkgA6jhYIC+oAOo5mBAvsAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAw+ADqOZgQMjADECAAEQEAAYABhYL/QACIBDmAYAAKOFggMkgA6jhYIDOoAOo5mBA0sAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCA0+ADqOFggNkgA6jmYEDcwAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIDeoAOo4WCA4+ADqOZgQObADECAAEQEAAYABhYL/QACIBDmAYAAKOFggOkgA6jhYIDuoAOo5mBA8MAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCA8+ADqOFggPkgA6jhYID+oAOo4WCBA+ADhxTu2sBAAAAAAAAEbuPs4EDt4r3gQHxghEr8IEK";
	const MP4 = "data:video/mp4;base64,AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw"; // Detect iOS browsers < version 10

	const oldIOS = () => typeof navigator !== "undefined" && parseFloat(("" + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) < 10 && !window.MSStream; // Detect native Wake Lock API support


	const nativeWakeLock = () => "wakeLock" in navigator;

	class NoSleep {
	  constructor(player) {
	    this.player = player;
	    this.enabled = false;

	    if (nativeWakeLock()) {
	      this._wakeLock = null;

	      const handleVisibilityChange = () => {
	        if (this._wakeLock !== null && document.visibilityState === "visible") {
	          this.enable();
	        }
	      };

	      document.addEventListener("visibilitychange", handleVisibilityChange);
	      document.addEventListener("fullscreenchange", handleVisibilityChange);
	    } else if (oldIOS()) {
	      this.noSleepTimer = null;
	    } else {
	      // Set up no sleep video element
	      this.noSleepVideo = document.createElement("video");
	      this.noSleepVideo.setAttribute("title", "No Sleep");
	      this.noSleepVideo.setAttribute("playsinline", "");

	      this._addSourceToVideo(this.noSleepVideo, "webm", WEBM);

	      this._addSourceToVideo(this.noSleepVideo, "mp4", MP4);

	      this.noSleepVideo.addEventListener("loadedmetadata", () => {
	        if (this.noSleepVideo.duration <= 1) {
	          // webm source
	          this.noSleepVideo.setAttribute("loop", "");
	        } else {
	          // mp4 source
	          this.noSleepVideo.addEventListener("timeupdate", () => {
	            if (this.noSleepVideo.currentTime > 0.5) {
	              this.noSleepVideo.currentTime = Math.random();
	            }
	          });
	        }
	      });
	    }
	  }

	  _addSourceToVideo(element, type, dataURI) {
	    var source = document.createElement("source");
	    source.src = dataURI;
	    source.type = `video/${type}`;
	    element.appendChild(source);
	  }

	  get isEnabled() {
	    return this.enabled;
	  }

	  enable() {
	    const debug = this.player.debug;

	    if (nativeWakeLock()) {
	      return navigator.wakeLock.request("screen").then(wakeLock => {
	        this._wakeLock = wakeLock;
	        this.enabled = true;
	        debug.log('wakeLock', 'Wake Lock active.');

	        this._wakeLock.addEventListener("release", () => {
	          // ToDo: Potentially emit an event for the page to observe since
	          // Wake Lock releases happen when page visibility changes.
	          // (https://web.dev/wakelock/#wake-lock-lifecycle)
	          debug.log('wakeLock', 'Wake Lock released.');
	        });
	      }).catch(err => {
	        this.enabled = false;
	        debug.error('wakeLock', `${err.name}, ${err.message}`);
	        throw err;
	      });
	    } else if (oldIOS()) {
	      this.disable();
	      this.noSleepTimer = window.setInterval(() => {
	        if (!document.hidden) {
	          window.location.href = window.location.href.split("#")[0];
	          window.setTimeout(window.stop, 0);
	        }
	      }, 15000);
	      this.enabled = true;
	      return Promise.resolve();
	    } else {
	      let playPromise = this.noSleepVideo.play();
	      return playPromise.then(res => {
	        this.enabled = true;
	        return res;
	      }).catch(err => {
	        this.enabled = false;
	        throw err;
	      });
	    }
	  }

	  disable() {
	    const debug = this.player.debug;

	    if (nativeWakeLock()) {
	      if (this._wakeLock) {
	        this._wakeLock.release();
	      }

	      this._wakeLock = null;
	    } else if (oldIOS()) {
	      if (this.noSleepTimer) {
	        debug.warn('wakeLock', 'NoSleep now disabled for older iOS devices.');
	        window.clearInterval(this.noSleepTimer);
	        this.noSleepTimer = null;
	      }
	    } else {
	      this.noSleepVideo.pause();
	    }

	    this.enabled = false;
	  }

	}

	function WebRtcPeer(option) {
	  this.pc = new RTCPeerConnection(option);
	  this.time = {
	    // 开始时间
	    __start: Date.now(),
	    // 持续时间
	    __duration: null,
	    // 1小时
	    __interval: 1000 * 60 * 60,
	    // 上次清理的时间
	    __prevClear: null
	  };
	}

	function WebRtcPeerRecvOnly(option) {
	  WebRtcPeer.call(this, option);
	  this.pc.addTransceiver('video', {
	    direction: 'recvonly'
	  });
	}

	WebRtcPeerRecvOnly.prototype.generateOffer = async function generateOffer(option, callback) {
	  if (typeof option === 'function') {
	    callback = option;
	    option = undefined;
	  }

	  await this.pc.setLocalDescription(await this.pc.createOffer(option));

	  if (callback) {
	    callback(this.pc.localDescription);
	  }

	  return this.pc.localDescription;
	};

	WebRtcPeerRecvOnly.prototype.processAnswer = async function processAnswer(sdp, callback) {
	  if (typeof sdp === 'string') {
	    sdp = {
	      sdp
	    };
	  }

	  if (!sdp.sdp) {
	    throw new Error('sdp 不能为空！');
	  }

	  await this.pc.setRemoteDescription(new RTCSessionDescription(sdp));

	  if (callback) {
	    callback(true);
	  }

	  return true;
	};

	WebRtcPeerRecvOnly.prototype.destroy = function () {
	  this.pc.close();
	  this.pc = null;
	};

	function assembleUrl(path) {
	  const url = new URL(path);

	  if (url.origin && url.origin !== 'null') {
	    if (path.indexOf('webrtc/play') > -1) {
	      return path;
	    }

	    if (path.startsWith('streamPath')) {
	      return `${window.location.origin}/webrtc-api/webrtc/play${url.search}`;
	    }

	    return `${window.location.origin}/webrtc-api/webrtc/play?streamPath=${url.pathname.substr(1)}`;
	  } else {
	    let pathname = url.pathname;
	    let streamPath = '';
	    let index = 0;

	    if (url.pathname.startsWith('//')) {
	      pathname = url.pathname.substr(2);
	    }

	    index = pathname.indexOf('/');
	    streamPath = pathname.substring(index + 1);

	    if (pathname) {
	      return `${window.location.origin}/webrtc-api/webrtc/play?streamPath=${streamPath}`;
	    } else {
	      console.log('url is Error for webRTC！');
	    }
	  }
	}

	const map = new WeakMap();

	async function WebRTCVideo(player) {
	  const streamPath = assembleUrl(player._opt.url);
	  const timeRefresh = player._opt.timeRefresh;
	  let $webRTCVideo = player.$container.$videoElement;
	  let $oldVideo = $webRTCVideo;
	  map.set($webRTCVideo, new WebRtcPeerRecvOnly());
	  let __timer = null;
	  let __TimerWebRTC = null;

	  function ontrack(event, __webRTCVideo) {
	    clearTimeout(__timer);

	    if (event.track.kind === "video") {
	      player.$container.appendChild(__webRTCVideo);
	      $webRTCVideo.srcObject = event.streams[0];
	      $webRTCVideo.play();

	      if (!player.playing) {
	        player.playing = true;
	      }
	    }
	  }

	  function deleteWebRTC() {
	    clearTimeout(player.__deleteWebRTCTimer);
	    $oldVideo.srcObject = undefined;
	    $oldVideo.src = '';
	    $oldVideo.load(); // 把上一个卸载了。

	    player.video.destroyVideo($oldVideo);

	    if (map.has($oldVideo)) {
	      map.get($oldVideo).destroy();
	      map.delete($oldVideo);
	      $oldVideo = $webRTCVideo;
	    }
	  }

	  function resetWebRTC() {
	    player.__deleteWebRTCTimer = setTimeout(deleteWebRTC, 1000); // 创建新 video

	    player.video = new Video$1(player);
	    $webRTCVideo = player.video.$videoElement;
	    map.set($webRTCVideo, map.get($webRTCVideo));
	    map.delete($webRTCVideo); // player.video = __newVideo

	    map.set($webRTCVideo, new WebRtcPeerRecvOnly());
	    clearTimeout(__TimerWebRTC);

	    map.get($webRTCVideo).pc.ontrack = function (event) {
	      ontrack(event, $webRTCVideo);
	    }; // restartVideo(event.streams[0])
	    // $video = null;


	    fetchRemoteSDP(map.get($webRTCVideo));
	    __TimerWebRTC = setTimeout(resetWebRTC, timeRefresh);
	  }

	  __TimerWebRTC = setTimeout(resetWebRTC, timeRefresh);

	  function fetchRemoteSDP(webRTC) {
	    webRTC.generateOffer(async sdp => {
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
	      result = null;
	      webRTC = null;
	    });
	  }

	  map.get($webRTCVideo).pc.ontrack = function (event) {
	    ontrack(event, $webRTCVideo);
	  };

	  fetchRemoteSDP(map.get($webRTCVideo));
	}

	class Player extends Emitter {
	  constructor(container, options) {
	    super();
	    this.$container = container;
	    this._opt = Object.assign({}, DEFAULT_PLAYER_OPTIONS, options);
	    this.debug = new Debug(this);

	    if (this._opt.useWCS) {
	      this._opt.useWCS = supportWCS();
	    }

	    if (this._opt.useMSE) {
	      this._opt.useMSE = supportMSE();
	    } // 如果使用mse则强制不允许 webcodecs


	    if (this._opt.useMSE) {
	      if (this._opt.useWCS) {
	        this.debug.log('Player', 'useWCS set true->false');
	      }

	      if (!this._opt.forceNoOffscreen) {
	        this.debug.log('Player', 'forceNoOffscreen set false->true');
	      }

	      this._opt.useWCS = false;
	      this._opt.forceNoOffscreen = true;
	    } else if (this._opt.useWCS) ;

	    if (!this._opt.forceNoOffscreen) {
	      if (!supportOffscreenV2()) {
	        this._opt.forceNoOffscreen = true;
	        this._opt.useOffscreen = false;
	      } else {
	        this._opt.useOffscreen = true;
	      }
	    }

	    this._opt.hasControl = this._hasControl(); //

	    this._loading = false;
	    this._playing = false;
	    this._hasLoaded = false; //

	    this._checkHeartTimeout = null;
	    this._checkLoadingTimeout = null; //

	    this._startBpsTime = null;
	    this._isPlayingBeforePageHidden = false;
	    this._stats = {
	      buf: 0,
	      // 当前缓冲区时长，单位毫秒,
	      fps: 0,
	      // 当前视频帧率
	      abps: 0,
	      // 当前音频码率，单位bit
	      vbps: 0,
	      // 当前视频码率，单位bit
	      ts: 0 // 当前视频帧pts，单位毫秒

	    }; // 各个步骤的时间统计

	    this._times = initPlayTimes(); //

	    this._videoTimestamp = 0;
	    this._audioTimestamp = 0;
	    property$1(this);
	    this.events = new Events(this);
	    this.video = new Video$1(this);
	    this.audio = new Audio(this);
	    this.recorder = new Recorder(this);
	    this.decoderWorker = new DecoderWorker(this);
	    this.stream = null;
	    this.demux = null;

	    if (!this._opt.useWebRTC) {
	      if (this._opt.useWCS) {
	        this.webcodecsDecoder = new WebcodecsDecoder(this);
	      }

	      if (this._opt.useMSE) {
	        this.mseDecoder = new MseDecoder(this);
	      }
	    } //


	    this.control = new Control(this);
	    this.keepScreenOn = new NoSleep(this);
	    events$1(this);
	    observer(this);

	    if (this._opt.useWCS) {
	      this.debug.log('Player', 'use WCS');
	    }

	    if (this._opt.useMSE) {
	      this.debug.log('Player', 'use MSE');
	    }

	    if (this._opt.useOffscreen) {
	      this.debug.log('Player', 'use offscreen');
	    }

	    if (typeof this._opt.controlReset === 'function') {
	      this._opt.controlReset(this);
	    }

	    this.debug.log('Player options', this._opt);
	  }

	  destroy() {
	    this._loading = false;
	    this._playing = false;
	    this._hasLoaded = false;
	    this._times = initPlayTimes();

	    if (this.decoderWorker) {
	      this.decoderWorker.destroy();
	      this.decoderWorker = null;
	    }

	    if (this.video) {
	      this.video.destroy();
	      this.video = null;
	    }

	    if (this.audio) {
	      this.audio.destroy();
	      this.audio = null;
	    }

	    if (this.stream) {
	      this.stream.destroy();
	      this.stream = null;
	    }

	    if (this.recorder) {
	      this.recorder.destroy();
	      this.recorder = null;
	    }

	    if (this.control) {
	      this.control.destroy();
	      this.control = null;
	    }

	    if (this.webcodecsDecoder) {
	      this.webcodecsDecoder.destroy();
	      this.webcodecsDecoder = null;
	    }

	    if (this.mseDecoder) {
	      this.mseDecoder.destroy();
	      this.mseDecoder = null;
	    }

	    if (this.demux) {
	      this.demux.destroy();
	      this.demux = null;
	    }

	    if (this.events) {
	      this.events.destroy();
	      this.events = null;
	    }

	    this.clearCheckHeartTimeout();
	    this.clearCheckLoadingTimeout(); //

	    this.releaseWakeLock();
	    this.keepScreenOn = null; // reset stats

	    this.resetStats();
	    this._audioTimestamp = 0;
	    this._videoTimestamp = 0; // 其他没法解耦的，通过 destroy 方式

	    this.emit('destroy'); // 接触所有绑定事件

	    this.off();
	    this.debug.log('play', 'destroy end');
	  }

	  set fullscreen(value) {
	    this.emit(EVENTS.fullscreen, value);
	  }

	  get fullscreen() {
	    return isFullScreen() || this.webFullscreen;
	  }

	  set webFullscreen(value) {
	    this.emit(EVENTS.webFullscreen, value);
	  }

	  get webFullscreen() {
	    return this.$container.classList.contains('jessibuca-fullscreen-web');
	  }

	  get loaded() {
	    return this._hasLoaded;
	  } //


	  set playing(value) {
	    if (value) {
	      // 将loading 设置为 false
	      this.loading = false;
	    }

	    if (this.playing !== value) {
	      this._playing = value;
	      this.emit(EVENTS.playing, value);
	      this.emit(EVENTS.volumechange, this.volume);

	      if (value) {
	        this.emit(EVENTS.play);
	      } else {
	        this.emit(EVENTS.pause);
	      }
	    }
	  }

	  get playing() {
	    return this._playing;
	  }

	  get volume() {
	    return this.audio && this.audio.volume;
	  }

	  set volume(value) {
	    this.audio.setVolume(value);
	  }

	  set loading(value) {
	    if (this.loading !== value) {
	      this._loading = value;
	      this.emit(EVENTS.loading, this._loading);
	    }
	  }

	  get loading() {
	    return this._loading;
	  }

	  set recording(value) {
	    if (this.playing) {
	      if (value) {
	        this.recorder.startRecord();
	      } else {
	        this.recorder.stopRecordAndSave();
	      }
	    }
	  }

	  get recording() {
	    return this.recorder && this.recorder.recording;
	  }

	  set audioTimestamp(value) {
	    if (value === null) {
	      return;
	    }

	    this._audioTimestamp = value;
	  } //


	  get audioTimestamp() {
	    return this._audioTimestamp;
	  } //


	  set videoTimestamp(value) {
	    if (value === null) {
	      return;
	    }

	    this._videoTimestamp = value; // just for wasm

	    if (!this._opt.useWCS && !this._opt.useMSE) {
	      if (this.audioTimestamp && this.videoTimestamp) {
	        this.audio.emit(EVENTS.videoSyncAudio, {
	          audioTimestamp: this.audioTimestamp,
	          videoTimestamp: this.videoTimestamp,
	          diff: this.audioTimestamp - this.videoTimestamp
	        });
	      }
	    }
	  } //


	  get videoTimestamp() {
	    return this._videoTimestamp;
	  }
	  /**
	   *
	   * @param options
	   */


	  updateOption(options) {
	    this._opt = Object.assign({}, this._opt, options);
	  }
	  /**
	   *
	   * @returns {Promise<unknown>}
	   */


	  init() {
	    return new Promise((resolve, reject) => {
	      if (!this.stream) {
	        this.stream = new Stream(this);
	      }

	      if (!this.demux) {
	        this.demux = new Demux(this);
	      }

	      if (this._opt.useWCS) {
	        if (!this.webcodecsDecoder) {
	          this.webcodecsDecoder = new WebcodecsDecoder(this);
	        }
	      }

	      if (this._opt.useMSE) {
	        if (!this.mseDecoder) {
	          this.mseDecoder = new MseDecoder(this);
	        }
	      }

	      if (!this.decoderWorker) {
	        this.decoderWorker = new DecoderWorker(this);
	        this.once(EVENTS.decoderWorkerInit, () => {
	          resolve();
	        });
	      } else {
	        resolve();
	      }
	    });
	  }
	  /**
	   *
	   * @param url
	   * @returns {Promise<unknown>}
	   */


	  play(url) {
	    return new Promise((resolve, reject) => {
	      if (!url && !this._opt.url) {
	        return reject();
	      }

	      this.loading = true;
	      this.playing = false;
	      this._times.playInitStart = now();

	      if (!url) {
	        url = this._opt.url;
	      }

	      this._opt.url = url;
	      this.clearCheckHeartTimeout(); // 使用WebRTC

	      if (this._opt.useWebRTC) {
	        // 不静音
	        this.init().then(() => {
	          this._times.playStart = now(); //

	          if (this._opt.isNotMute) {
	            this.mute(false);
	          }

	          WebRTCVideo(this);
	        });
	      } else {
	        this.init().then(() => {
	          this._times.playStart = now(); //

	          if (this._opt.isNotMute) {
	            this.mute(false);
	          }

	          if (this.webcodecsDecoder) {
	            this.webcodecsDecoder.once(EVENTS_ERROR.webcodecsH265NotSupport, () => {
	              this.emit(EVENTS_ERROR.webcodecsH265NotSupport);
	              this.emit(EVENTS.error, EVENTS_ERROR.webcodecsH265NotSupport);
	            });
	          }

	          if (this.mseDecoder) {
	            this.mseDecoder.once(EVENTS_ERROR.mediaSourceH265NotSupport, () => {
	              this.emit(EVENTS_ERROR.mediaSourceH265NotSupport);
	              this.emit(EVENTS.error, EVENTS_ERROR.mediaSourceH265NotSupport);
	            });
	          }

	          this.enableWakeLock();
	          this.stream.fetchStream(url); // success

	          this.stream.once(EVENTS.streamSuccess, () => {
	            resolve();
	            this._times.streamResponse = now(); //

	            this.checkLoadingTimeout(); // fetch error

	            this.stream.once(EVENTS_ERROR.fetchError, error => {
	              reject(error);
	            }); // ws

	            this.stream.once(EVENTS_ERROR.websocketError, error => {
	              reject(error);
	            }); // success

	            this.stream.once(EVENTS.streamSuccess, () => {
	              resolve(); //

	              if (this._opt.useMSE) {
	                this.video.play();
	              }
	            });
	          }).catch(e => {
	            reject(e);
	          });
	        });
	      }
	    });
	  }
	  /**
	   *
	   */


	  close() {
	    return new Promise((resolve, reject) => {
	      this._close().then(() => {
	        this.video.clearView();
	        resolve();
	      });
	    });
	  }

	  _close() {
	    return new Promise((resolve, reject) => {
	      //
	      if (this.stream) {
	        this.stream.destroy();
	        this.stream = null;
	      }

	      if (this.demux) {
	        this.demux.destroy();
	        this.demux = null;
	      } //


	      if (this.decoderWorker) {
	        this.decoderWorker.destroy();
	        this.decoderWorker = null;
	      }

	      if (this.webcodecsDecoder) {
	        this.webcodecsDecoder.destroy();
	        this.webcodecsDecoder = null;
	      }

	      if (this.mseDecoder) {
	        this.mseDecoder.destroy();
	        this.mseDecoder = null;
	      }

	      this.clearCheckHeartTimeout();
	      this.clearCheckLoadingTimeout();
	      this.playing = false;
	      this.loading = false;
	      this.recording = false; // release audio buffer

	      this.audio.pause(); // release lock

	      this.releaseWakeLock(); // reset stats

	      this.resetStats(); //

	      this._audioTimestamp = 0;
	      this._videoTimestamp = 0; //

	      this._times = initPlayTimes(); //

	      setTimeout(() => {
	        resolve();
	      }, 0);
	    });
	  }
	  /**
	   *
	   * @param flag {boolean} 是否清除画面
	   * @returns {Promise<unknown>}
	   */


	  pause(flag) {
	    if (flag) {
	      return this.close();
	    } else {
	      return this._close();
	    }
	  }
	  /**
	   *
	   * @param flag
	   */


	  mute(flag) {
	    this.audio.mute(flag);
	  }
	  /**
	   *
	   */


	  resize() {
	    this.video && this.video.resize();
	  }
	  /**
	   *
	   * @param fileName
	   * @param fileType
	   */


	  startRecord(fileName, fileType) {
	    if (this.recording) {
	      return;
	    }

	    this.recorder.setFileName(fileName, fileType);
	    this.recording = true;
	  }
	  /**
	   *
	   */


	  stopRecordAndSave() {
	    if (this.recording) {
	      this.recording = false;
	    }
	  }

	  _hasControl() {
	    let result = false;
	    let hasBtnShow = false;
	    Object.keys(this._opt.operateBtns).forEach(key => {
	      if (this._opt.operateBtns[key]) {
	        hasBtnShow = true;
	      }
	    });

	    if (this._opt.showBandwidth || this._opt.text || hasBtnShow) {
	      result = true;
	    }

	    return result;
	  }

	  checkHeart() {
	    this.clearCheckHeartTimeout();
	    this.checkHeartTimeout();
	  } // 心跳检查，如果渲染间隔暂停了多少时间之后，就会抛出异常


	  checkHeartTimeout() {
	    this._checkHeartTimeout = setTimeout(() => {
	      this.pause(false).then(() => {
	        this.emit(EVENTS.timeout, EVENTS.delayTimeout);
	        this.emit(EVENTS.delayTimeout);
	      });
	    }, this._opt.heartTimeout * 1000);
	  } //


	  clearCheckHeartTimeout() {
	    if (this._checkHeartTimeout) {
	      clearTimeout(this._checkHeartTimeout);
	      this._checkHeartTimeout = null;
	    }
	  } // loading 等待时间


	  checkLoadingTimeout() {
	    this._checkLoadingTimeout = setTimeout(() => {
	      this.pause(false).then(() => {
	        this.emit(EVENTS.timeout, EVENTS.loadingTimeout);
	        this.emit(EVENTS.loadingTimeout);
	      });
	    }, this._opt.loadingTimeout * 1000);
	  }

	  clearCheckLoadingTimeout() {
	    if (this._checkLoadingTimeout) {
	      clearTimeout(this._checkLoadingTimeout);
	      this._checkLoadingTimeout = null;
	    }
	  }

	  handleRender() {
	    if (this.loading) {
	      this.emit(EVENTS.start);
	      this.loading = false;
	      this.clearCheckLoadingTimeout();
	    }

	    if (!this.playing) {
	      this.playing = true;
	    }

	    this.checkHeart();
	  } //


	  updateStats(options) {
	    options = options || {};

	    if (!this._startBpsTime) {
	      this._startBpsTime = now();
	    }

	    if (isNotEmpty(options.ts)) {
	      this._stats.ts = options.ts;
	    }

	    if (isNotEmpty(options.buf)) {
	      this._stats.buf = options.buf;
	    }

	    if (options.fps) {
	      this._stats.fps += 1;
	    }

	    if (options.abps) {
	      this._stats.abps += options.abps;
	    }

	    if (options.vbps) {
	      this._stats.vbps += options.vbps;
	    }

	    const _nowTime = now();

	    const timestamp = _nowTime - this._startBpsTime;

	    if (timestamp < 1 * 1000) {
	      return;
	    }

	    this.emit(EVENTS.stats, this._stats);
	    this.emit(EVENTS.performance, fpsStatus(this._stats.fps));
	    this._stats.fps = 0;
	    this._stats.abps = 0;
	    this._stats.vbps = 0;
	    this._startBpsTime = _nowTime;
	  }

	  resetStats() {
	    this._startBpsTime = null;
	    this._stats = {
	      buf: 0,
	      //ms
	      fps: 0,
	      abps: 0,
	      vbps: 0,
	      ts: 0
	    };
	  }

	  enableWakeLock() {
	    if (this._opt.keepScreenOn) {
	      this.keepScreenOn.enable();
	    }
	  }

	  releaseWakeLock() {
	    if (this._opt.keepScreenOn) {
	      this.keepScreenOn.disable();
	    }
	  }

	  handlePlayToRenderTimes() {
	    const _times = this._times;
	    _times.playTimestamp = _times.playStart - _times.playInitStart;
	    _times.streamTimestamp = _times.streamStart - _times.playStart;
	    _times.streamResponseTimestamp = _times.streamResponse - _times.streamStart;
	    _times.demuxTimestamp = _times.demuxStart - _times.streamResponse;
	    _times.decodeTimestamp = _times.decodeStart - _times.demuxStart;
	    _times.videoTimestamp = _times.videoStart - _times.decodeStart;
	    _times.allTimestamp = _times.videoStart - _times.playInitStart;
	    this.emit(EVENTS.playToRenderTimes, _times);
	  }

	}

	class Jessibuca extends Emitter {
	  constructor(options) {
	    super();
	    let _opt = options;
	    let $container = options.container;

	    if (typeof options.container === 'string') {
	      $container = document.querySelector(options.container);
	    }

	    if (!$container) {
	      throw new Error('Jessibuca need container option');
	    }

	    $container.classList.add('jessibuca-container');
	    delete _opt.container; // s -> ms

	    if (isNotEmpty(_opt.videoBuffer)) {
	      _opt.videoBuffer = Number(_opt.videoBuffer) * 1000;
	    } // setting


	    if (isNotEmpty(_opt.timeout)) {
	      if (isEmpty(_opt.loadingTimeout)) {
	        _opt.loadingTimeout = _opt.timeout;
	      }

	      if (isEmpty(_opt.heartTimeout)) {
	        _opt.heartTimeout = _opt.timeout;
	      }
	    }

	    this._opt = _opt;
	    this.$container = $container;
	    this.href = null;
	    this.events = new Events(this);
	    this.player = new Player($container, _opt);

	    this._bindEvents();
	  }
	  /*_initAegis() {
	      const aegis = new Aegis({
	          id: '3ogWGfLmpllRGka9pY', // 上报 id
	          // uin: uuid16(), // 用户唯一 ID（可选）
	          reportApiSpeed: false, // 接口测速
	          reportAssetSpeed: false, // 静态资源测速
	          spa: false // spa 应用页面跳转的时候开启 pv 计算
	  });*/

	  /**
	   *
	   */


	  destroy() {
	    this.player.destroy();
	    this.player = null;
	    this.off();
	  }

	  _bindEvents() {
	    // 对外的事件
	    Object.keys(JESSIBUCA_EVENTS).forEach(key => {
	      this.player.on(JESSIBUCA_EVENTS[key], value => {
	        this.emit(key, value);
	      });
	    });
	  }
	  /**
	   * 是否开启控制台调试打印
	   * @param value {Boolean}
	   */


	  setDebug(value) {
	    this.player.updateOption({
	      isDebug: !!value
	    });
	  }
	  /**
	   *
	   */


	  mute() {
	    this.player.mute(true);
	  }
	  /**
	   *
	   */


	  cancelMute() {
	    this.player.mute(false);
	  }
	  /**
	   *
	   * @param value {number}
	   */


	  setVolume(value) {
	    this.player.volume = value;
	  }
	  /**
	   *
	   */


	  audioResume() {
	    this.player.audio.audioEnabled(true);
	  }
	  /**
	   * 设置超时时长, 单位秒 在连接成功之前和播放中途,如果超过设定时长无数据返回,则回调timeout事件
	   * @param value {number}
	   */


	  setTimeout(time) {
	    time = Number(time);
	    this.player.updateOption({
	      timeout: time,
	      loadingTimeout: time,
	      heartTimeout: time
	    });
	  }
	  /**
	   *
	   * @param type {number}: 0,1,2
	   */


	  setScaleMode(type) {
	    type = Number(type);
	    let options = {
	      isFullResize: false,
	      isResize: false
	    };

	    switch (type) {
	      case SCALE_MODE_TYPE.full:
	        options.isFullResize = false;
	        options.isResize = false;
	        break;

	      case SCALE_MODE_TYPE.auto:
	        options.isFullResize = false;
	        options.isResize = true;
	        break;

	      case SCALE_MODE_TYPE.fullAuto:
	        options.isFullResize = true;
	        options.isResize = true;
	        break;
	    }

	    this.player.updateOption(options);
	    this.resize();
	  }
	  /**
	   *
	   * @returns {Promise<commander.ParseOptionsResult.unknown>}
	   */


	  pause() {
	    return this.player.pause();
	  }
	  /**
	   *
	   */


	  close() {
	    // clear url
	    this._opt.url = '';
	    return this.player.close();
	  }
	  /**
	   *
	   */


	  clearView() {
	    this.player.video.clearView();
	  }
	  /**
	   *
	   * @param url {string}
	   * @returns {Promise<unknown>}
	   */


	  play(url) {
	    // console.log('play')
	    return new Promise((resolve, reject) => {
	      if (!url && !this._opt.url) {
	        this.emit(EVENTS.error, EVENTS_ERROR.playError);
	        reject();
	        return;
	      }

	      if (url) {
	        // url 相等的时候。
	        if (this._opt.url) {
	          // 存在相同的 url
	          if (url === this._opt.url) {
	            // 正在播放
	            if (this.player.playing) {
	              resolve();
	            } else {
	              // pause ->  play
	              this.clearView();
	              this.player.play(this._opt.url).then(() => {
	                resolve();
	              }).catch(() => {
	                this.player.pause().then(() => {
	                  reject();
	                });
	              });
	            }
	          } else {
	            // url 发生改变了
	            this.player.pause().then(() => {
	              // 清除 画面
	              this.clearView();
	              return this._play(url);
	            }).catch(() => {
	              reject();
	            });
	          }
	        } else {
	          return this._play(url);
	        }
	      } else {
	        //  url 不存在的时候
	        //  就是从 play -> pause -> play
	        this.player.play(this._opt.url).then(() => {
	          resolve();
	        }).catch(() => {
	          this.player.pause().then(() => {
	            reject();
	          });
	        });
	      }
	    });
	  }
	  /**
	   *
	   * @param url {string}
	   * @returns {Promise<unknown>}
	   * @private
	   */


	  _play(url) {
	    return new Promise((resolve, reject) => {
	      this._opt.url = url; //  新的url

	      const isHttp = url.indexOf("http") === 0; //

	      const protocol = isHttp ? PLAYER_PLAY_PROTOCOL.fetch : PLAYER_PLAY_PROTOCOL.websocket; //

	      const demuxType = isHttp || url.indexOf(".flv") !== -1 || this._opt.isFlv ? DEMUX_TYPE.flv : DEMUX_TYPE.m7s;
	      this.player.updateOption({
	        protocol,
	        demuxType
	      });
	      this.player.once(EVENTS_ERROR.mediaSourceH265NotSupport, () => {
	        this.close();
	      });
	      this.player.once(EVENTS_ERROR.webcodecsH265NotSupport, () => {
	        this.close();
	      });

	      if (this.hasLoaded()) {
	        this.player.play(url).then(() => {
	          resolve();
	        }).catch(() => {
	          this.player.pause().then(() => {
	            reject();
	          });
	        });
	      } else {
	        this.player.once(EVENTS.decoderWorkerInit, () => {
	          this.player.play(url).then(() => {
	            resolve();
	          }).catch(() => {
	            this.player.pause().then(() => {
	              reject();
	            });
	          });
	        });
	      }
	    });
	  }
	  /**
	   *
	   */


	  resize() {
	    this.player && this.player.resize();
	  }
	  /**
	   *
	   * @param time {number} s
	   */


	  setBufferTime(time) {
	    time = Number(time); // s -> ms

	    this.player.updateOption({
	      videoBuffer: time * 1000
	    });
	  }
	  /**
	   *
	   * @param deg {number}
	   */


	  setRotate(deg) {
	    deg = parseInt(deg, 10);
	    const list = [0, 90, 270];

	    if (this._opt.rotate === deg || list.indexOf(deg) === -1) {
	      return;
	    }

	    this.player.updateOption({
	      rotate: deg
	    });
	    this.resize();
	  }
	  /**
	   *
	   * @returns {boolean}
	   */


	  hasLoaded() {
	    return this.player.loaded;
	  }
	  /**
	   *
	   */


	  setKeepScreenOn() {
	    this.player.updateOption({
	      keepScreenOn: true
	    });
	  }
	  /**
	   *
	   * @param flag {Boolean}
	   */


	  setFullscreen(flag) {
	    const fullscreen = !!flag;

	    if (this.player.fullscreen !== fullscreen) {
	      this.player.fullscreen = fullscreen;
	    }
	  }
	  /**
	   *
	   * @param filename {string}
	   * @param format {string}
	   * @param quality {number}
	   * @param type {string} download,base64,blob
	   */


	  screenshot(filename, format, quality, type) {
	    return this.player.video.screenshot(filename, format, quality, type);
	  }
	  /**
	   *
	   * @param fileName {string}
	   * @param fileType {string}
	   * @returns {Promise<unknown>}
	   */


	  startRecord(fileName, fileType) {
	    return new Promise((resolve, reject) => {
	      if (this.player.playing) {
	        this.player.startRecord(fileName, fileType);
	        resolve();
	      } else {
	        reject();
	      }
	    });
	  }

	  stopRecordAndSave() {
	    if (this.player.recording) {
	      this.player.stopRecordAndSave();
	    }
	  }
	  /**
	   *
	   * @returns {Boolean}
	   */


	  isPlaying() {
	    return this.player.playing;
	  }
	  /**
	   * 是否静音状态
	   * @returns {Boolean}
	   */


	  isMute() {
	    return this.player.audio.isMute;
	  }
	  /**
	   * 是否在录制视频
	   * @returns {*}
	   */


	  isRecording() {
	    return this.player.recorder.recording;
	  }

	}

	_defineProperty(Jessibuca, "ERROR", EVENTS_ERROR);

	_defineProperty(Jessibuca, "TIMEOUT", {
	  loadingTimeout: EVENTS.loadingTimeout,
	  delayTimeout: EVENTS.delayTimeout
	});

	window.Jessibuca = Jessibuca;
	window.Sullivan = Jessibuca;

	return Jessibuca;

}));
//# sourceMappingURL=jessibuca.js.map
