import { RegExtension } from './regex';
function Reverse(insert = '') {
    return Array.prototype.reverse.call(insert.split('')).join('');
}
function mapState(nowLen, maxNunLen) {
    const state = {
        eq: '',
        gt: '...',
        lt: ''
    };
    if (nowLen > maxNunLen) {
        return 'gt';
    }
    else if (nowLen == maxNunLen) {
        return 'eq';
    }
    else if (nowLen < maxNunLen) {
        return 'lt';
    }
}
function LimitAndSliceChineseNotSym(waitingForSliceString, maxNumLen = 10) {
    let temp = '';
    let result = '';
    let compareState = '';
    let recodeChineaseNum = 0;
    for (let i = 0; i <= waitingForSliceString.length - 1; i++) {
        temp = waitingForSliceString.charAt(i);
        compareState = mapState(recodeChineaseNum, maxNumLen);
        switch (compareState) {
            case 'lt':
                if (RegExtension
                    .rules
                    .matchSingleChinese
                    .test(temp)) {
                    result += temp;
                    recodeChineaseNum++;
                }
                else {
                    result += temp;
                }
                break;
            case 'eq':
                i == waitingForSliceString.length - 1
                    ? result = result
                    : result += '...';
                recodeChineaseNum++;
                break;
            default:
        }
    }
    return result;
}
function LimitAndSliceChinese(waitingForSliceString, maxNumLen = 10) {
    let temp = 0;
    let result = '';
    let recodeChineaseNum = 0;
    let compareState = '';
    for (let i = 0; i <= waitingForSliceString.length - 1; i++) {
        temp = waitingForSliceString.charCodeAt(i);
        compareState = mapState(recodeChineaseNum, maxNumLen);
        switch (compareState) {
            case 'lt':
                if (temp >= 0 && temp <= 128) {
                    result += waitingForSliceString.charAt(i);
                }
                else {
                    result += waitingForSliceString.charAt(i);
                    recodeChineaseNum++;
                }
                break;
            case 'eq':
                i == waitingForSliceString.length - 1
                    ? result = result
                    : result += '...';
                recodeChineaseNum++;
                break;
            default:
        }
    }
    return result;
}
function confirmEnding(str, target) {
    var flag = false;
    var newArr = str.split(' ');
    var lastItem = newArr[newArr.length - 1];
    var finalLast = lastItem.split(target);
    if (finalLast[finalLast.length - 1] === '') {
        flag = true;
    }
    return flag;
}
function repeat(str, num) {
    var string = '';
    for (var i = 1; i <= num; i++) {
        string += str;
    }
    return string;
}
function truncate(str, num) {
    var last = str.length - 1 >= num ? '...' : '';
    if (num <= 3) {
        str = str.substr(0, num) + last;
    }
    else if (last === '') {
        str = str.substr(0, num) + last;
    }
    else {
        str = str.substr(0, num - 3) + last;
    }
    return str;
}
export { Reverse, LimitAndSliceChineseNotSym, LimitAndSliceChinese, confirmEnding, repeat, truncate };
