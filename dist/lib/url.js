/**
 * 截掉url协议名（http|https）和:
 * @param {string} [url=''] 待传入需要截取协议的url
 * @returns {string} 正常会输出//www.baidu.com 不是url的字符串原路返回
 */
function sliceProtocol(url = '') {
    return url.replace(/^(http|https):/, '');
}
export { sliceProtocol };
