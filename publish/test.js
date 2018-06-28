'use strict';

var _index = require('./index');

var Logger = _index._Main.Logger,
    Type = _index._Main.Type;

{
    var A = Logger('测试Logger');
    A.info('测试成功了');
}
var isIE = _index._Brower.isIE,
    isChrome = _index._Brower.isChrome,
    isOpera = _index._Brower.isOpera,
    isFirefox = _index._Brower.isFirefox,
    isSafari = _index._Brower.isSafari;

{
    var s = Logger('测试浏览器类型判断');
    s.info(isIE);
    s.info(isChrome);
    s.info(isOpera);
    s.info(isFirefox);
    s.info(isSafari);
    s.info('---------------------');
    var test = [123, '123', true, { name: '张三' }, function name() {
        return '张三';
    }, /^\d+$/, null, undefined, [1, 2, 3], new Date(), new Error()];
    test.forEach(function (item) {
        s.info(Type(item));
    });
}
var float = _index._Number.float,
    getRandomBit = _index._Number.getRandomBit;

{
    var _s = Logger('测试数字方法');
    _s.info(float.add(0.1, 0.2));
    _s.info(float.sub(0.1, 0.2));
    _s.info(float.ride(0.1, 0.2));
    _s.info(float.divide(0.1, 0.2));
}
var Reverse = _index._String.Reverse,
    LimitAndSliceChinese = _index._String.LimitAndSliceChinese,
    LimitAndSliceChineseNotSym = _index._String.LimitAndSliceChineseNotSym;

{
    var _s2 = Logger('测试字符串方法');
    _s2.info(Reverse('qwert1s'));
    _s2.info(LimitAndSliceChinese('你好啊，我是张三！', 4));
    _s2.info(LimitAndSliceChineseNotSym('你好啊，我是张三！', 4));
}
var sliceProtocol = _index._Url.sliceProtocol;

{
    var _s3 = Logger('测试url方法');
    _s3.info(sliceProtocol('http://www.baidu.com'));
    _s3.info(sliceProtocol('https://www.baidu.com'));
}