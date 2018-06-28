/*
 * 正则常用方法
 * @Author: chen_huang
 * @Date: 2018-06-19 14:40:02
 * @Last Modified by: chen_huang
 * @Last Modified time: 2018-06-19 15:56:53
 */
const RegExtension = {
    rules: {
        // 匹配多个中文
        matchMultiChinese: /[\u4e00-\u9fa5]+/g,
        // 匹配单个中文
        matchSingleChinese: /[\u4e00-\u9fa5]/
    }
};
export { RegExtension };
