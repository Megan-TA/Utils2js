/*
 * 对象扩展
 * @Author: chen_huang
 * @Date: 2018-06-13 17:00:34
 * @Last Modified by: chen_huang
 * @Last Modified time: 2018-06-19 15:18:44
 */
/**
 * 浅拷贝（不包括原型链属性拷贝）
 * @example
 * simpleCopy({}, { name: '张三' })
 * @param {object} [destination={}] 默认空对象
 * @param {object} source 待拷贝对象
 * @returns {object} 输出浅拷贝对象
 */
function simpleCopy(destination = {}, source) {
    Object.keys(source).forEach((value, key) => {
        if (!destination.hasOwnProperty(key)) {
            return destination[key] = value;
        }
    });
    return destination;
}
/**
 * 获取指定对象下指定字段的值，支持递归
 * @example
 * prop({a: {b: 1}}, 'a.b') => 1
 * prop({a: {b: 1}}, 'a')   => {b: 1}
 * prop({a: {b: 1}}, 'm')   => null
 * @param {object} [obj={}] 待查找的原始对象
 * @param {string} [path=''] 需要查找的节点
 * @returns {any} 未找到默认输出null
 */
function prop(obj = {}, path = '') {
    let key;
    let pathArray;
    pathArray = path.split('.');
    while ((key = pathArray.shift())) {
        try {
            obj = obj[key];
        }
        catch (err) {
            return null;
        }
    }
    return obj;
}
/**
 * 深拷贝（基于递归）
 * @example
 * deepCopy({name: 'zhansgan', obj: {}, arr: [2, 3]})
 * @param {object} [source={}] 原始对象
 * @param {object} [deepSource] 可选 默认空对象
 * @returns {object} 深拷贝之后的对象
 */
function deepCopy(source = {}, deepSource) {
    for (const key in source) {
        if (typeof source[key] == 'object') {
            deepSource[key] = source[key] instanceof Array ? [] : {};
            deepCopy(source[key], deepSource[key]);
        }
        else {
            deepSource[key] = source[key];
        }
    }
    return deepSource;
}
/**
 * 自定义插值 适用于取到接口返回的JSON根据需要转换成指定格式的字符串
 * @example
 * 基于位置的插值表达式 interpolation('{0}{3}{1}{1}{2}', 'A', 'B', 'C', 'D') => ADBBC
 * 基于字段的插值表达式 interpolation('{name} - {userID}', {name: 'test',userID: 1, age: 12}) =>test - 1
 * @param {string} param  字符串
 * @param {*} options ...options 字符串|对象
 * @returns {string} 最终输出的字符串
 */
function interpolation(param, ...options) {
    let arg1 = arguments[0] || '';
    const arg2 = arguments[1] || {};
    let matchArray = [];
    const REG_RULE = /{([a-zA-Z0-9]+)}/;
    const REG_NUM_RULE = /\d+/;
    while ((matchArray = REG_RULE.exec(arg1))) {
        // matchArray代表符合正则匹配的数组
        // matchArray[0] 代表匹配完整的{1}
        // matchArray[1] 代表{}里面具体的值1
        const execTotalVal = matchArray[0];
        const execVal = matchArray[1];
        if (REG_NUM_RULE.test(execVal)) {
            // 基于位置插值
            arg1 = arg1.replace(execTotalVal, options[Number(execVal)]);
        }
        else {
            if (prop(arg2, matchArray[1]) != null) {
                arg1 = arg1.replace(execTotalVal, prop(arg2, matchArray[1]));
            }
        }
    }
    return arg1;
}
export { interpolation, deepCopy, prop, simpleCopy };
