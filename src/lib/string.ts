/*
 * 字符串方法扩展
 * @Author: chen_huang
 * @Date: 2018-06-13 16:00:49
 * @Last Modified by: chen_huang
 * @Last Modified time: 2018-08-31 15:22:31
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

/**
 * 检查字符串结尾
 * 判断一个字符串或者句子(str)是否以指定的字符串(target)结尾。
 * @example
 * confirmEnding("Bastian", "n") 应该返回 true.
 * confirmEnding("Connor", "n") 应该返回 false.
 * confirmEnding("He has to give me a new name", "name") 应该返回 true.
 * confirmEnding("He has to give me a new name", "me") 应该返回 true.
 * @param {string} str 目标字符串
 * @param {string} target 结尾的字符串
 * @returns {boolean}
 */
function confirmEnding(str: string, target: string): boolean {
    var flag = false;
    var newArr = str.split(' ');
    var lastItem = newArr[newArr.length - 1];
    var finalLast = lastItem.split(target);
    if (finalLast[finalLast.length - 1] === '') {
      flag = true;
    }
    return flag;
}

/**
 * 重复输出字符串
 * 重复一个指定的字符串 num次，如果num是一个负数则返回一个空字符串
 * @example
 * repeat("*", 3) 应该返回 "***"
 * repeat("abc", 4) 应该返回 "abcabcabcabc"
 * repeat("abc", -2) 应该返回 ""
 * @param {string} str 原字符串
 * @param {number} num 重复的次数
 * @returns {string}
 */
function repeat(str: string, num: number): string {
    var string = '';
    for (var i = 1; i <= num; i++) {
        string +=str;
    }
    return string;
}

/**
 * 截断字符串
 * 如果字符串的长度比指定的参数num长，则把多余的部分用...来表示。
 * 切记，插入到字符串尾部的三个点号也会计入字符串的长度。
 * 但是，如果指定的参数num小于或等于3，则添加的三个点号不会计入字符串的长度。
 * @example
 * truncate("A-tisket a-tasket A green and yellow basket", 11) 应该返回 "A-tisket..."
 * truncate("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length) 应该返回 "A-tisket a-tasket A green and yellow basket"
 * truncate("A-", 1) 应该返回 "A..."
 * @param {string} str
 * @param {number} num
 * @returns {string}
 */
function truncate(str: string, num: number): string {
    var last = str.length - 1 >= num ? '...' : '';
    if (num <= 3) {
      str = str.substr(0, num) + last;
    } else if (last === '') {
      str = str.substr(0, num) + last;
    } else {
      str = str.substr(0, num - 3) + last;
    }
    return str;
}

export {
    Reverse,
    LimitAndSliceChineseNotSym,
    LimitAndSliceChinese,
    confirmEnding,
    repeat,
    truncate
}
