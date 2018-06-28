'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 判断浏览器类型 返回对应浏览器名称
 * @returns
 */
var finalName = 'IE';
var userAgent = navigator.userAgent;
if (userAgent.indexOf('Chrome') > -1) {
  finalName = 'Chrome';
} else if (userAgent.indexOf('Firefox') > -1) {
  finalName = 'Firefox';
} else if (userAgent.indexOf('Opera') > -1) {
  finalName = 'Opera';
} else if (userAgent.indexOf('Safari') > -1) {
  finalName = 'Safari';
}
/**
 * 是否是IE浏览器
 * @returns {boolean} true 是的 false 不是
 */
var isIE = finalName == 'IE';
/**
 * 是否是Chrome浏览器
 * @returns {boolean} true 是的 false 不是
 */
var isChrome = finalName == 'Chrome';
/**
 * 是否是Firefox浏览器
 * @returns {boolean} true 是的 false 不是
 */
var isFirefox = finalName == 'Firefox';
/**
 * 是否是Opera浏览器
 * @returns {boolean} true 是的 false 不是
 */
var isOpera = finalName == 'Opera';
/**
 * 是否是Safari浏览器
 * @returns {boolean} true 是的 false 不是
 */
var isSafari = finalName == 'Safari';
exports.isIE = isIE;
exports.isChrome = isChrome;
exports.isFirefox = isFirefox;
exports.isOpera = isOpera;
exports.isSafari = isSafari;