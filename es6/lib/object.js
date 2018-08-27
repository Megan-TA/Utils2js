function simpleCopy(destination = {}, source) {
    Object.keys(source).forEach((value, key) => {
        if (!destination.hasOwnProperty(key)) {
            return destination[key] = value;
        }
    });
    return destination;
}
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
function deepCopy(data = {}, final = {}) {
    for (let key in data) {
        const keyToVal = data[key];
        const val = Object.prototype.toString.call(keyToVal).match(/^\[object\s(\w+)\]$/)[1];
        switch (val) {
            case 'Object':
                final[key] = deepCopy(keyToVal, {});
                break;
            case 'Array':
                final[key] = deepCopy(keyToVal, []);
                break;
            case 'RegExp':
                final[key] = new RegExp(keyToVal);
                break;
            case 'Undefined':
                final[key] = undefined;
                break;
            case 'Null':
                final[key] = null;
                break;
            default:
                final[key] = keyToVal;
        }
    }
    return final;
}
function interpolation(param, ...options) {
    let arg1 = arguments[0] || '';
    const arg2 = arguments[1] || {};
    let matchArray = [];
    const REG_RULE = /{([a-zA-Z0-9]+)}/;
    const REG_NUM_RULE = /\d+/;
    while ((matchArray = REG_RULE.exec(arg1))) {
        const execTotalVal = matchArray[0];
        const execVal = matchArray[1];
        if (REG_NUM_RULE.test(execVal)) {
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
