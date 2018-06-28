'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Type = exports.Logger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 个人工具方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Author: chen_huang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Date: 2017-09-20 16:17:55
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Last Modified by: chen_huang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Last Modified time: 2018-06-14 19:04:13
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _brower = require('./brower');

var _number = require('./number');

var _object = require('./object');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INSTANCE = null;
/**
 * Utils2js 单列模式
 * @class Utils2js
 */

var Utils2js = function () {
    function Utils2js() {
        _classCallCheck(this, Utils2js);
    }

    _createClass(Utils2js, [{
        key: 'Logger',

        /**
         * 控制台输出多彩提示信息
         * IE版本默认不支持多彩控制信息，默认输出白底黑字文本
         * @example
         * const channelOne = Logger('频道1')
         * channelOne.info('这是测试文本')
         * @param {string} channel 必须先指定文本属于自身的频道
         * @param {{color?: string}} [options={}] （可选）指定需要展示的颜色值，默认会随机生成
         * @returns {object} 输出{info}格式的对象 通过.info()最终输出的带多彩的类似"['频道1']这是测试文本" 形式
         * @memberof Utils2js
         */
        value: function Logger(channel) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            // 浏览器检测
            function info(message) {
                if (_brower.isIE) {
                    console.log((0, _object.interpolation)('[{0}]', channel), message);
                } else {
                    if (options && options.color) {
                        options.color = options.color;
                    } else {
                        options.color = (0, _number.getRandomBit)(6, 16);
                    }
                    console.log((0, _object.interpolation)('%c[{0}]', channel), (0, _object.interpolation)('color: {0}', options.color), message);
                }
            }
            return {
                info: info
            };
        }
        /**
         * 更准确的类型判定方法
         * 返回类型如下：number/string/boolean/object/function/regexp/null/undefined/array/date/error
         *
         * @param {*} params
         * @returns {string} 统一返回小写的具体类型名称
         * @memberof Utils2js
         */

    }, {
        key: 'Type',
        value: function Type(params) {
            var REGEXP = /^\[object\W([a-zA-Z]+)\]$/g;
            var waitingForReg = Object.prototype.toString.call(params);
            var handleResult = REGEXP.exec(waitingForReg);
            return handleResult[1].toLowerCase();
        }
    }], [{
        key: 'getInstance',
        get: function get() {
            if (!INSTANCE) {
                INSTANCE = new Utils2js();
            }
            return INSTANCE;
        }
    }]);

    return Utils2js;
}();

var STANCE__UTILS2JS = Utils2js.getInstance;
var Logger = exports.Logger = STANCE__UTILS2JS.Logger;
var Type = exports.Type = STANCE__UTILS2JS.Type;