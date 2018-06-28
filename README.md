# Utils2js

一个基于`TypeScript`和`esdoc`编写的工具方法

相应的工具方法已生成文档

安装方式

```shell
npm run utils2js
```

使用方式

```javascript
import {
    _Brower,
    _Main,
    _Number,
    _String,
    _Url
} from 'utils2js'
```

根据自身需求，按需引用对应类型的方法

比如引用_Main对象下的Logger方法

```javascript
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
```