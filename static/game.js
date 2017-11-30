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
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
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
    Screen.prototype.line = function (x1, y1, x2, y2, c) {
        var dx = Math.abs(x2 - x1);
        var dy = Math.abs(y2 - y1);
        var inc_2dy, inc_2dydx, inc_value, ndx, p_value;
        if (dy <= dx) {
            inc_2dy = 2 * dy;
            inc_2dydx = 2 * (dy - dx);
            if (x2 < x1) {
                ndx = x1;
                x1 = x2;
                x2 = ndx;
                ndx = y1;
                y1 = y2;
                y2 = ndx;
            }
            inc_value = (y1 < y2) ? 1 : -1;
            this.putPixel(x1, y1, c);
            p_value = 2 * dy - dx;
            for (ndx = x1; ndx < x2; ndx++) {
                if (0 > p_value)
                    p_value += inc_2dy;
                else {
                    p_value += inc_2dydx;
                    y1 += inc_value;
                }
                this.putPixel(ndx, y1, c);
            }
        }
        else {
            inc_2dy = 2 * dx;
            inc_2dydx = 2 * (dx - dy);
            if (y2 < y1) {
                ndx = y1;
                y1 = y2;
                y2 = ndx;
                ndx = x1;
                x1 = x2;
                x2 = ndx;
            }
            inc_value = (x1 < x2) ? 1 : -1;
            this.putPixel(x1, y1, c);
            p_value = 2 * dx - dy;
            for (ndx = y1; ndx < y2; ndx++) {
                if (0 > p_value)
                    p_value += inc_2dy;
                else {
                    p_value += inc_2dydx;
                    x1 += inc_value;
                }
                this.putPixel(x1, ndx, c);
            }
        }
    };
    Screen.prototype.endScene = function () {
        this.ctx.putImageData(this.buffer, 0, 0);
    };
    Screen.prototype.putPixel = function (x, y, c) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height)
            return;
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
let t = null;

function update(time) {
  const ang = ((time / 50) % 360) * (Math.PI / 180);
  scr.beginScene();
  scr.fill(0);
  scr.line(80, 72, (Math.sin(ang) * 120 + 80)|0, (Math.cos(ang) * 120 + 72)|0, 3);
  scr.endScene();
  t.innerText = ang * (180/Math.PI);
  requestAnimationFrame(update);
}

window.onload = () => {
  scr = new __WEBPACK_IMPORTED_MODULE_0__graphic_ts__["a" /* Screen */](document.querySelector('#canv'));
  t = document.querySelector('#log');
  requestAnimationFrame(update);
}

/***/ })
/******/ ]);