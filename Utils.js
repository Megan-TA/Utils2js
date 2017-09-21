/*
 * 个人工具方法
 * @Author: chen_huang 
 * @Date: 2017-09-20 16:17:55 
 * @Last Modified by: chen_huang
 * @Last Modified time: 2017-09-21 20:08:23
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? module.exports = factory()
        : typeof define === 'function'
            ? define(factory) : (global.Utils = factory())
}(this, function () {
	Utils = {
		
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
		 * 更简单多色彩的现代浏览器控制台输出显示
		 * IE浏览器则默认输出 [xxx] xxx 黑色信息
		 * var test = new Utils.Logger('box1')
		 * test.info('666')	// [box1] 666
		 */
		Logger: Logger

	}

	function Logger (channel, options) {
		this.channel = channel
		this.options = options || {}
		
		// 浏览器检测
		this.log = function (message) {
			if (Utils.brower.isIE()) {
				console.log(Utils.interpolation('[{0}]', this.channel), message)
			} else {
				if (this.options.color) {
					this.options.color = options.color
				} else {
					this.options.color = Utils.getRandomAssignNum(6)
				}
				console.log(Utils.interpolation('%c[{0}]', this.channel), Utils.interpolation('color: {0}', this.options.color), message)
			}
		}	
	}

	Logger.prototype.info = function (message) {
		this.log(message)
	}

	return Utils
}))