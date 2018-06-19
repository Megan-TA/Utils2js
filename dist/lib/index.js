/*
 * 个人工具方法
 * @Author: chen_huang
 * @Date: 2017-09-20 16:17:55
 * @Last Modified by: chen_huang
 * @Last Modified time: 2018-06-14 19:04:13
 */
import { isIE } from './brower';
import { getRandomBit } from './number';
import { interpolation } from './object';
let INSTANCE = null;
/**
 * Utils2js 单列模式
 * @class Utils2js
 */
class Utils2js {
    static get getInstance() {
        if (!INSTANCE) {
            INSTANCE = new Utils2js();
        }
        return INSTANCE;
    }
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
    Logger(channel, options = {}) {
        // 浏览器检测
        function info(message) {
            if (isIE) {
                console.log(interpolation('[{0}]', channel), message);
            }
            else {
                if (options && options.color) {
                    options.color = options.color;
                }
                else {
                    options.color = getRandomBit(6, 16);
                }
                console.log(interpolation('%c[{0}]', channel), interpolation('color: {0}', options.color), message);
            }
        }
        return {
            info
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
    Type(params) {
        const REGEXP = /^\[object\W([a-zA-Z]+)\]$/g;
        const waitingForReg = Object.prototype.toString.call(params);
        const handleResult = REGEXP.exec(waitingForReg);
        return handleResult[1].toLowerCase();
    }
}
const STANCE__UTILS2JS = Utils2js.getInstance;
export const Logger = STANCE__UTILS2JS.Logger;
export const Type = STANCE__UTILS2JS.Type;
