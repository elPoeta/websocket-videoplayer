/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var socket = new _connection__WEBPACK_IMPORTED_MODULE_0__["default"]();

var VideoPlayer =
/*#__PURE__*/
function () {
  function VideoPlayer() {
    var _this = this;

    _classCallCheck(this, VideoPlayer);

    this.videoPlayer = document.querySelector('#videoPlayer');
    this.player = document.querySelector('.player');
    this.progress = this.player.querySelector('.progress');
    this.progressBar = this.player.querySelector('.progress-bar-fill');
    this.skipButtons = this.player.querySelectorAll('[data-skip]');
    this.toggle = this.player.querySelector('.toggle');
    this.video = this.player.querySelector('.viewer');
    this.volume = this.player.querySelector('.player-slider');
    this.toggle.addEventListener('click', this.togglePlay.bind(this));
    this.video.addEventListener('click', this.togglePlay.bind(this));
    this.video.addEventListener('play', this.updateButton.bind(this));
    this.video.addEventListener('pause', this.updateButton.bind(this));
    this.video.addEventListener('timeupdate', this.handleProgress.bind(this));
    this.skipButtons.forEach(function (button) {
      return button.addEventListener('click', _this.skip.bind(_this));
    });
    this.volume.addEventListener('change', this.handleRangeUpdate.bind(this));
    this.mousedown = false;
    this.progress.addEventListener('click', this.backForward.bind(this));
    this.progress.addEventListener('mousemove', function (e) {
      return _this.mousedown && _this.backForward(e);
    });
    this.progress.addEventListener('mousedown', function () {
      return _this.mousedown = true;
    });
    this.progress.addEventListener('mouseup', function () {
      return _this.mousedown = false;
    });
  }

  _createClass(VideoPlayer, [{
    key: "loadVideo",
    value: function loadVideo(url) {
      this.videoPlayer.src = url;
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      var method = this.video.paused ? 'play' : 'pause';
      socket.getConnection().send(JSON.stringify({
        typeMessage: method,
        message: method
      }));
    }
  }, {
    key: "updateButton",
    value: function updateButton() {
      var icon = this.video.paused ? '►' : '❚ ❚';
      this.toggle.textContent = icon;
    }
  }, {
    key: "skip",
    value: function skip(e) {
      socket.getConnection().send(JSON.stringify({
        typeMessage: "skip",
        message: e.target.dataset.skip
      }));
    }
  }, {
    key: "handleRangeUpdate",
    value: function handleRangeUpdate(e) {
      this.video['volume'] = e.target.value;

      if (this.video['volume'] > 0) {
        this.video.muted = false;
      } else {
        this.video.muted = true;
      }
    }
  }, {
    key: "handleProgress",
    value: function handleProgress() {
      var percent = this.video.currentTime / this.video.duration * 100;
      this.progressBar.style.flexBasis = "".concat(percent, "%");
    }
  }, {
    key: "backForward",
    value: function backForward(e) {
      var time = e.offsetX / this.progress.offsetWidth * this.video.duration;
      socket.getConnection().send(JSON.stringify({
        typeMessage: "backForward",
        message: time
      }));
    }
  }]);

  return VideoPlayer;
}();

/* harmony default export */ __webpack_exports__["default"] = (new VideoPlayer());

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _videoPlayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Connection =
/*#__PURE__*/
function () {
  function Connection() {
    _classCallCheck(this, Connection);

    this.socket = new WebSocket(_util_js__WEBPACK_IMPORTED_MODULE_0__["WS_URL"]);
    this.openConnection = this.socket.addEventListener('open', this.openConnection.bind(this));
    this.handlerMessages = this.socket.addEventListener('message', this.handlerMessages.bind(this));
  }

  _createClass(Connection, [{
    key: "openConnection",
    value: function openConnection() {
      this.socket.send(JSON.stringify({
        typeMessage: 'connected',
        message: "connected"
      }));
      return this;
    }
  }, {
    key: "getConnection",
    value: function getConnection() {
      return this.socket;
    }
  }, {
    key: "handlerMessages",
    value: function handlerMessages(evt) {
      if (evt.data instanceof Blob) {
        this.readFile(evt);
      } else {
        var _parseJsonObject = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseJsonObject"])(evt.data),
            type = _parseJsonObject.type,
            message = _parseJsonObject.message;

        switch (type) {
          case 'playOk':
            {
              _videoPlayer_js__WEBPACK_IMPORTED_MODULE_1__["default"].video[message]();
              break;
            }

          case 'pauseOk':
            {
              _videoPlayer_js__WEBPACK_IMPORTED_MODULE_1__["default"].video[message]();
              break;
            }

          case 'skipOk':
            {
              _videoPlayer_js__WEBPACK_IMPORTED_MODULE_1__["default"].video.currentTime += parseFloat(message);
              break;
            }

          case 'backForwardOk':
            {
              _videoPlayer_js__WEBPACK_IMPORTED_MODULE_1__["default"].video.currentTime = parseFloat(message);
              return;
            }

          default:
            console.log(message);
        }
      }
      /*    if(type == 'playOk'){
               videoPlayer.video[message]();
          }
                if(type == 'pauseOk'){
            videoPlayer.video[message]();
          }
      
          if(type == 'skipOk'){
            videoPlayer.video.currentTime += parseFloat(message);
          }
           if(type == 'backForwardOk') {
            videoPlayer.video.currentTime = parseFloat(message);
          }
                if(type == 'default') {
            console.log(message);
          }
       }*/

    }
  }, {
    key: "readFile",
    value: function readFile(fileData) {
      _videoPlayer_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadVideo(window.URL.createObjectURL(fileData.data));
    }
  }]);

  return Connection;
}();

/* harmony default export */ __webpack_exports__["default"] = (Connection);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WS_URL", function() { return WS_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseJsonObject", function() { return parseJsonObject; });
var WS_URL = location.origin.replace(/^http/, 'ws');

var parseJsonObject = function parseJsonObject(str) {
  try {
    var strParsed = JSON.parse(str);
    return strParsed;
  } catch (error) {
    console.log("Error :: ", error.message);
    return {};
  }
};



/***/ })
/******/ ]);