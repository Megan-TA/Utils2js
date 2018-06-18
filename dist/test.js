import { _Brower, _Main, _Number, _String, _Url } from './index';
const { Logger, Type } = _Main;
{
    const A = Logger('测试Logger');
    A.info('测试成功了');
}
const { isIE, isChrome, isOpera, isFirefox, isSafari } = _Brower;
{
    const s = Logger('测试浏览器类型判断');
    s.info(isIE);
    s.info(isChrome);
    s.info(isOpera);
    s.info(isFirefox);
    s.info(isSafari);
    s.info('---------------------');
    const test = [
        123,
        '123',
        true,
        { name: '张三' },
        function name() {
            return '张三';
        },
        /^\d+$/,
        null,
        undefined,
        [1, 2, 3],
        new Date(),
        new Error()
    ];
    test.forEach(item => {
        s.info(Type(item));
    });
}
const { float, getRandomBit } = _Number;
{
    const s = Logger('测试数字方法');
    s.info(float.add(0.1, 0.2));
    s.info(float.sub(0.1, 0.2));
    s.info(float.ride(0.1, 0.2));
    s.info(float.divide(0.1, 0.2));
}
const { reverse } = _String;
{
    const s = Logger('测试字符串方法');
    s.info(reverse('qwert1s'));
}
const { sliceProtocol } = _Url;
{
    const s = Logger('测试url方法');
    s.info(sliceProtocol('http://www.baidu.com'));
    s.info(sliceProtocol('https://www.baidu.com'));
}
