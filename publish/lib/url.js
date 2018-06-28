'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 截掉url协议名（http|https）以及：
 * @exanple
 * sliceProtocol('http://www.baidu.com') => //www.baidu.com
 * @param {string} [url=''] 待传入需要截取协议的url
 * @returns {string} 正常会输出//www.baidu.com 不是url的字符串原路返回
 */
function sliceProtocol() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return url.replace(/^(http|https):/, '');
}
exports.sliceProtocol = sliceProtocol;