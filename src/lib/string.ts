/*
 * 字符串方法扩展
 * @Author: chen_huang
 * @Date: 2018-06-13 16:00:49
 * @Last Modified by: chen_huang
 * @Last Modified time: 2018-06-14 10:24:26
 */

/**
 * 字符串倒序
 *
 * @param {string} [insert=''] 传入的字符串
 * @returns {string} 倒序后的字符串
 */
function reverse (insert: string = ''): string {
    return Array.prototype.reverse.call(insert.split('')).join('')
}

export {
    reverse
}
