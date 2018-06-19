/*
 * 字符串方法扩展
 * @Author: chen_huang
 * @Date: 2018-06-13 16:00:49
 * @Last Modified by: chen_huang
 * @Last Modified time: 2018-06-19 15:17:27
 */
import {
    RegExtension
} from './regex'
/**
 * 字符串倒序
 * @example
 * reverse('qwer') => rewq
 * @param {string} [insert=''] 传入的字符串
 * @returns {string} 倒序后的字符串
 */
function Reverse (insert: string = ''): string {
    return Array.prototype.reverse.call(insert.split('')).join('')
}

/**
 * 当前字符串长度与最大限制长度个数作比较
 * @private
 * @param {number} nowLen
 * @param {number} maxNunLen
 * @returns {string} 输出当前长度与最大长度比较后的结果 gt/eq/lt
 */
function mapState (nowLen: number, maxNunLen: number): string {
    const state = {
        // 正好等于最大字数限制
        eq: '',
        // 大于最大字数限制
        gt: '...',
        // 小于最大字数限制
        lt: ''
    }
    if (nowLen > maxNunLen) {
        return 'gt'
    } else
    if (nowLen == maxNunLen) {
        return 'eq'
    } else
    if (nowLen < maxNunLen) {
        return 'lt'
    }
}

/**
 * 限制指定位数的中文 不包括中文符号 超出以 ... 结尾
 * @example
 * LimitAndSliceChineseNotSym('你好啊，我是张三！', 4) => 你好啊，我...
 * @param {*} waitingForSliceString 需要截取指定个数的字符串
 * @param {number} [maxNumLen=10] 指定长度最大个数
 * @returns {string} 输出截取后符合长度的字符串 超过...
 */
function LimitAndSliceChineseNotSym (waitingForSliceString: string, maxNumLen: number = 10): string {
    let temp = ''
    let result = ''
    let compareState = ''
    let recodeChineaseNum = 0
    for (let i = 0; i <= waitingForSliceString.length - 1; i++) {
        temp = waitingForSliceString.charAt(i)

        compareState = mapState(recodeChineaseNum, maxNumLen)

        switch (compareState) {
        case 'lt':
            // 处理是中文的情况
            if (
                RegExtension
                    .rules
                    .matchSingleChinese
                    .test(temp)
            ) {
                result += temp
                recodeChineaseNum++
            } else {
                result += temp
            }
            break
        case 'eq':
            // 等于最大限制字数的时候
            // 判断是否遍历的索引是否是最后一个 如不是加上...
            i == waitingForSliceString.length - 1
                ? result = result
                : result += '...'
            recodeChineaseNum++
            break
        default:
        }
    }
    return result
}

/**
 * 限制指定位数的中文 包括中文符号 超出以 ... 结尾
 * @example
 * LimitAndSliceChinese('你好啊，我是张三！', 4) => 你好啊，...
 * @param {string} waitingForSliceString 需要截取指定个数的字符串
 * @param {number} [maxNumLen=10] 指定长度最大个数
 * @returns {string} 输出截取后符合长度的字符串 超过...
 */
function LimitAndSliceChinese (waitingForSliceString: string, maxNumLen: number = 10): string {
    let temp = 0
    let result = ''
    let recodeChineaseNum = 0
    let compareState = ''
    for (let i = 0; i <= waitingForSliceString.length - 1; i++) {
        temp = waitingForSliceString.charCodeAt(i)

        compareState = mapState(recodeChineaseNum, maxNumLen)

        switch (compareState) {
        case 'lt':
            // 英文
            if (temp >= 0 && temp <= 128) {
                result += waitingForSliceString.charAt(i)
            } else {
                result += waitingForSliceString.charAt(i)
                recodeChineaseNum++
            }
            break
        case 'eq':
            i == waitingForSliceString.length - 1
                ? result = result
                : result += '...'
            recodeChineaseNum++
            break
        default:
        }
    }
    return result
}

export {
    Reverse,
    LimitAndSliceChineseNotSym,
    LimitAndSliceChinese
}
