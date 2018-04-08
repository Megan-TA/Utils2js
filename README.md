# UtilsJS
---
### 个人日常使用的工具方法  拒绝造轮子

### API

> 1. prop

获取指定对象下指定字段的值，支持递归

举例：

* prop({a: {b: 1}}, 'a.b') // 1
* prop({a: {b: 1}}, 'a')   // {b: 1}
* prop({a: {b: 1}}, 'm')   // null

---

> 2. interpolation

自定义插值

适用于取到接口返回的JSON根据需要转换成指定格式的字符串

举例：

```
Utils.interpolation('{0}{3}{1}{1}{2}', 'A', 'B', 'C', 'D') // ADBBC
Utils.interpolation('{name} - {userID}', {name: 'test',userID: 1, age: 12}) // test - 1
```

---
> 3. getRandomAssignNum

随机生成指定位数的16进制数

举例：

```
Utils.getRandomAssignNum(6) // 6位数的随机十六进制数
```

---

> 4. Logger

更简单多色彩的现代浏览器控制台输出显示

举例：
```
var test = Utils.Logger('box1')
test.info('666')	// [box1] 666
```
---
> 5. extend

  重名默认覆盖

举例：

```
Utils.extend({name: '张三'}, {age: 12})
```

---

> 6. deepCopy

空值或者undefined默认拷贝为空对象{}

举例：

```
Utils.deepCopy({name: 'zhansgan', obj: {}, arr: [2, 3]})
```

---

> 7. float

举例：

```
Utils.float.add(0.22, 0.1)
Utils.float.sub(0.22, 0.1)
Utils.float.ride(0.22, 0.1)
Utils.float.divide(0.22, 0.1)
```

> 8. 识别浏览器类型

举例：

```
Utils.brower.browerVal()
Utils.brower.isIE()
```