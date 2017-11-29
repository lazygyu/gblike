/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Colors */
/* unused harmony export Sprite */
/* unused harmony export GameObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Screen; });
var Colors = [
    { r: 31, g: 31, b: 31 },
    { r: 77, g: 83, b: 60 },
    { r: 139, g: 149, b: 109 },
    { r: 196, g: 207, b: 161 }
];
var Sprite = /** @class */ (function () {
    function Sprite(opt) {
        this.width = opt.width;
        this.height = opt.height;
        this.length = opt.width * opt.height;
        this.data = opt.data;
    }
    return Sprite;
}());

var GameObject = /** @class */ (function () {
    function GameObject(opt) {
        this.x = opt.x | 0;
        this.y = opt.y | 0;
        this.width = opt.width | 0;
        this.height = opt.height | 0;
    }
    GameObject.prototype.hasCollision = function (obj) {
        var tR = this.x + this.width, oR = obj.x + obj.width, tB = this.y + this.height, oB = obj.y + obj.height;
        return this.x <= oR && tR >= obj.x && this.y <= oB && tB >= obj.y;
    };
    return GameObject;
}());

var Screen = /** @class */ (function () {
    function Screen(canv) {
        this.canvas = canv ? canv : document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.buffer = null;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    Screen.prototype.beginScene = function () {
        this.buffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.buffer.data.fill(255);
    };
    Screen.prototype.fill = function (c) {
        for (var i = 0, l = this.buffer.data.length; i < l; i += 4) {
            this.buffer.data[i] = Colors[c].r;
            this.buffer.data[i + 1] = Colors[c].g;
            this.buffer.data[i + 2] = Colors[c].b;
        }
    };
    Screen.prototype.endScene = function () {
        this.ctx.putImageData(this.buffer, 0, 0);
    };
    Screen.prototype.putPixel = function (x, y, c) {
        var t = (x + (y * this.buffer.width)) * 4;
        this.buffer.data[t] = Colors[c].r;
        this.buffer.data[t + 1] = Colors[c].g;
        this.buffer.data[t + 2] = Colors[c].b;
    };
    Screen.prototype.putSprite = function (spr, x, y) {
        var xx = x, yy = y;
        for (var i = 0; i < spr.length; i++) {
            if (i > 0 && i % spr.width == 0) {
                xx = x;
                yy++;
            }
            else {
                xx++;
            }
            if (!(spr.data[i] & 0x80))
                this.putPixel(xx, yy, spr.data[i] & 0x03);
        }
    };
    return Screen;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphic_ts__ = __webpack_require__(0);


let scr = null;

function update(time) {
  scr.beginScene();
  scr.fill( ((time / 250) | 0) % 4);
  scr.endScene();
  requestAnimationFrame(update);
}

window.onload = () => {
  scr = new __WEBPACK_IMPORTED_MODULE_0__graphic_ts__["a" /* Screen */](document.querySelector('#canv'));
  requestAnimationFrame(update);
}

/***/ })
/******/ ]);