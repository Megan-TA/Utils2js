import {
    _Brower,
    _Main,
    _Number,
    _String,
    _Url,
    _Object,
    _Array
} from './index'

const {
    Logger,
    Type
} = _Main

{
    const A = Logger('测试Logger')
    A.info('测试成功了')
    const test = [
        123,
        '123',
        true,
        {name: '张三'},
        function name () {
            return '张三'
        },
        /^\d+$/,
        null,
        undefined,
        [1, 2, 3],
        new Date(),
        new Error()
    ]
    test.forEach(item => {
        A.info(Type(item))
    })
}

const {
    isIE,
    isChrome,
    isOpera,
    isFirefox,
    isSafari
} = _Brower

{
    const s = Logger('测试浏览器类型判断')
    s.info(isIE)
    s.info(isChrome)
    s.info(isOpera)
    s.info(isFirefox)
    s.info(isSafari)
    s.info('---------------------')
}

const {
    deepCopy
} = _Object

{
    const s = Logger('测试对象方法')
    s.info(deepCopy({
        name: '张三',	
        showName: function () {
            console.log(222)
        },
        extra: {
            a: '111'
        },
        a: [2222],
        v: [{
            name: '1111'
        }],
        s: /ssss/g,
        q: null,
        w: undefined
    }))
}

const {
    float,
    getRandomBit
} = _Number

{
    const s = Logger('测试数字方法')
    s.info(float.add(0.1, 0.2))
    s.info(float.sub(0.1, 0.2))
    s.info(float.ride(0.1, 0.2))
    s.info(float.divide(0.1, 0.2))
}

const {
    Reverse,
    LimitAndSliceChinese,
    LimitAndSliceChineseNotSym,
    truncate,
    repeat,
    confirmEnding
} = _String

{
    const s = Logger('测试字符串方法')
    let name = '你好啊，我是张三！'
    s.info(Reverse('qwert1s'))
    s.info(LimitAndSliceChinese(name, 4))
    s.info(LimitAndSliceChineseNotSym(name, 4))
    s.info(truncate(name, 4))
    s.info(repeat(name, 4))
    s.info(confirmEnding(name, '！'))
}

const {
    sliceProtocol
} = _Url

{
    const s = Logger('测试url方法')
    s.info(sliceProtocol('http://www.baidu.com'))
    s.info(sliceProtocol('https://www.baidu.com'))
}


const {
    upSet,
    destroyer,
    chunk
} = _Array

{
    let arr = [5, 2, 5, 6, 1, 2, 3]
    const s = Logger('测试数组方法')
    s.info(upSet(arr))
    s.info(destroyer(arr, 2))
    s.info(chunk(arr, 2))
}