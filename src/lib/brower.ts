/**
 * 判断浏览器类型 返回对应浏览器名称
 * @returns
 */
let finalName = 'IE'
const userAgent = navigator.userAgent
if (userAgent.indexOf('Chrome') > -1) {
    finalName = 'Chrome'
} else if (userAgent.indexOf('Firefox') > -1) {
    finalName = 'Firefox'
} else if (userAgent.indexOf('Opera') > -1) {
    finalName = 'Opera'
} else if (userAgent.indexOf('Safari') > -1) {
    finalName = 'Safari'
}

/**
 * 是否是IE浏览器
 * @returns {boolean} true 是的 false 不是
 */
const isIE = finalName == 'IE'
/**
 * 是否是Chrome浏览器
 * @returns {boolean} true 是的 false 不是
 */
const isChrome = finalName == 'Chrome'
/**
 * 是否是Firefox浏览器
 * @returns {boolean} true 是的 false 不是
 */
const isFirefox = finalName == 'Firefox'
/**
 * 是否是Opera浏览器
 * @returns {boolean} true 是的 false 不是
 */
const isOpera = finalName == 'Opera'
/**
 * 是否是Safari浏览器
 * @returns {boolean} true 是的 false 不是
 */
const isSafari = finalName == 'Safari'

export {
    isIE,
    isChrome,
    isFirefox,
    isOpera,
    isSafari
}
