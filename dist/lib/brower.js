/**
 * 判断浏览器类型 返回对应浏览器名称
 * @returns
 */
let finalName = 'IE';
const userAgent = navigator.userAgent;
if (userAgent.indexOf('Chrome') > -1) {
    finalName = 'Chrome';
}
else if (userAgent.indexOf('Firefox') > -1) {
    finalName = 'Firefox';
}
else if (userAgent.indexOf('Opera') > -1) {
    finalName = 'Opera';
}
else if (userAgent.indexOf('Safari') > -1) {
    finalName = 'Safari';
}
const isIE = finalName == 'IE';
const isChrome = finalName == 'Chrome';
const isFirefox = finalName == 'Firefox';
const isOpera = finalName == 'Opera';
const isSafari = finalName == 'Safari';
export { isIE, isChrome, isFirefox, isOpera, isSafari };
