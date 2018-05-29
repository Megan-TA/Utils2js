/*
 * 个人工具方法
 * @Author: chen_huang 
 * @Date: 2017-09-20 16:17:55 
 * @Last Modified by: chen_huang
 * @Last Modified time: 2018-04-08 15:19:46
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? module.exports = factory()
        : typeof define === 'function'
            ? define(factory) : (window ? window.Utils2js = factory() : global.Utils2js = factory())
}(this, function () {
	Utils2js = {
		
		/**
		 * 获取指定对象下指定字段的值，支持递归
		 * prop({a: {b: 1}}, 'a.b') // 1
		 * prop({a: {b: 1}}, 'a')   // {b: 1}  
		 * prop({a: {b: 1}}, 'm')   // null
		 * @param {any} obj 
		 * @param {any} path 
		 */
		prop: function prop (obj, path) {
			var key
			var pathArray
			if (obj == null) return console.error('obj')
			if (path == null) return console.error('path不能为空')
			if (!(obj instanceof Object)) return console.error('obj参数必须为对象')
			if (typeof path != 'string') return console.error('path参数必须为字符串')
			pathArray = path.split('.')
			while ((key = pathArray.shift())) {
				try {
					obj = obj[key]
				} catch (err) {
					return null
				}
			}
			return obj
		},
		
		/**
		 * 自定义插值
		 * 适用于取到接口返回的JSON根据需要转换成指定格式的字符串
		 * // 基于位置的插值表达式
		 * interpolation('{0}{3}{1}{1}{2}', 'A', 'B', 'C', 'D') // ADBBC
		 * // 基于字段的插值表达式
 		 * interpolation('{name} - {userID}', {name: 'test',userID: 1, age: 12}) // test - 1
		 */
		interpolation: function interpolation () {
			var arg1 = arguments[0] || ''
			var arg2 = arguments[1] || {}
			var matchArray
			var REG_RULE = /{([a-zA-Z0-9]+)}/
			var REG_NUM_RULE = /\d+/
			var that = this
			
			while ((matchArray = REG_RULE.exec(arg1))) {
				// matchArray代表符合正则匹配的数组
				// matchArray[0] 代表匹配完整的{1}
				// matchArray[1] 代表{}里面具体的值1
				var execTotalVal = matchArray[0]
				var execVal = matchArray[1]
				if (REG_NUM_RULE.test(execVal)) {
					// 基于位置插值
					arg1 = arg1.replace(execTotalVal, arguments[Number(execVal) + 1])
				} else {
					that.prop(arg2, matchArray[1]) == null ? arg1 : (arg1 = arg1.replace(execTotalVal, that.prop(arg2, matchArray[1])))
				}
			}
			return arg1
		},
		
		/**
		 * 随机生成指定位数的16进制数
		 * 
		 * @param {any} num 
		 * @returns 
		 */
		getRandomAssignNum: function getRandomAssignNum (num) {
			var result = '#'
			if (typeof num != 'number') return console.error('num类型必须为数字!')
			for (var i = 0; i <= num -1 ; i++) {
				result += Math.floor( Math.random() * 16 ).toString(16)
			}
			return result
		},
		/**
		 * 浏览器类型相关方法
		 * 
		 * @returns 
		 */
		brower: {
			/**
			 * 判断浏览器类型 返回对应浏览器名称
			 * 
			 * @returns 
			 */
			browerVal: function browerVal () {
				var userAgent = navigator.userAgent
				if (userAgent.indexOf('Chrome') > -1) {
					return 'Chrome'
				}
				if (userAgent.indexOf('Firefox') > -1) {
					return 'Firefox'
				}
				if (userAgent.indexOf('Opera') > -1) {
					return 'Opera'
				}
				if (userAgent.indexOf('Safari') > -1) {
					return 'Safari'
				}
				return 'IE'
			},
			isIE: function () {
				return this.browerVal() == 'IE'
			}
		},	
		/**
		 * 对象继承
		 * 用法： 
		 * extend({}, { name: '张三' })
		 * @param {any} destination 
		 * @param {any} source 
		 * @returns 
		 */
		extend: function extend (destination, source) {
			if (destination instanceof Object && source instanceof Object) {
				for (key in source) {
					destination[key] = source[key]
				}
				return destination
			} else {
				console.error('参数必须为对象')
			}	 
		},

		/**
		 * 深拷贝  基于递归
		 * deepCopy({name: 'zhansgan', obj: {}, arr: [2, 3]})
		 * @param {any} source 
		 * @param {any} deepSource 
		 */
		deepCopy: function deepCopy (source, deepSource) {
			deepSource = deepSource || {}
			for ( var key in source) {
				if (typeof source[key] == 'object') {
					deepSource[key] = source[key] instanceof Array ? [] : {}
					deepCopy(source[key], deepSource[key])
				} else {
					deepSource[key] = source[key]
 				}
			}
			return deepSource
		},
		
		/**
		 * 处理js双精度问题
		 * 
		 * @returns 
		 */
		float: (function float () {
			/**
			 * 判断Obj是否是一个整数
			 * 
			 * @param {any} obj 
			 * @returns 
			 */
			function isInt (obj) {
				return Math.floor(obj) == obj
			}

			/**
			 * 双精度数据转整数  输出 整数+10的n次幂 对象
			 * 
			 * @param {any} floatNum 
			 * @returns 
			 */
			function toInt (floatNum) {
				var temp = {
					pow: 1,
					num: floatNum
				}
				// 是整数跳过
				if (isInt(floatNum)) return temp
				
				var stringNum = floatNum + ''
				var len = stringNum.split('.')[1].length
				var pow = Math.pow(10, len)
				// 坑
				// 0.55 * 100 = 55.00000000000001 用parseInt强制转整数
				temp.num = parseInt(floatNum * pow, 10)
				temp.pow = pow

				return temp
			}

			/**
			 * 比较两个数 取整 取最大幂数
			 * 
			 * @param {any} num1 
			 * @param {any} num2 
			 */
			function operate (num1, num2, op) {
				
				var toInt1 = toInt(num1)
				var toInt2 = toInt(num2)
				// 取整
				var t1 = toInt1.num
				var t2 = toInt2.num
				// 取幂数
				var pow1 = toInt1.pow
				var pow2 = toInt2.pow

				// 先比较幂数大小 再做处理
				switch (op) {
					case 'add':
						if (pow1 == pow2) return ( t1 + t2 ) / pow1
						if (pow1 > pow2) return ( t1 + t2 * (pow1 / pow2) ) / pow1
						else return ( t1 * (pow2 / pow1) + t2 ) / pow2
					case 'sub':
						if (pow1 == pow2) return ( t1 - t2 ) / pow1
						if (pow1 > pow2) return ( t1 - t2 * (pow1 / pow2) ) / pow1
						else return ( t1 * (pow2 / pow1) - t2 ) / pow2
					case 'ride':
						return (t1 * t2) / (pow1 * pow2)
					case 'divide':
						// 参考  55 / 0.22 => ( 55 / 22 ) * (100 / 1)  注意分子和分母顺序
						return (t1 / t2) * (pow2 / pow1)   
				}
			}
			
			return {
				add: function (num1, num2) {
					return operate(num1, num2, 'add')
				},
				sub: function (num1, num2) {
					return operate(num1, num2, 'sub')
				},
				ride: function (num1, num2) {
					return operate(num1, num2, 'ride')
				},
				divide: function (num1, num2) {
					return operate(num1, num2, 'divide')
				},
			}

		})(),
		/**
		 * 更简单多色彩的现代浏览器控制台输出显示
		 * IE浏览器则默认输出 [xxx] xxx 黑色信息
		 * var test = new Utils2js.Logger('box1')
		 * test.info('666')	// [box1] 666
		 */
		Logger: function (channel, options) {
			options = options || {}
			var _self = this
			// 浏览器检测
			function info (message) {
				if (_self.brower.isIE()) {
					console.log(_self.interpolation('[{0}]', channel), message)
				} else {
					if (options.color) {
						options.color = options.color
					} else {
						options.color = _self.getRandomAssignNum(6)
					}
					console.log(_self.interpolation('%c[{0}]', channel), _self.interpolation('color: {0}', options.color), message)
				}
			}	

			return {
				info: info
			}
		}

	}

	

	// Logger.prototype.info = function (message) {
	// 	this.log(message)
	// }
	
	// 字符串方法扩展
 
	// 字符串倒序
	String.prototype.reverse = function () {
    	return Array.prototype.reverse.call(this.split('')).join('')
	}
	
	return Utils2js
}))