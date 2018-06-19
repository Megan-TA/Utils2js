import {
    ItoInt
} from './types/NUMBER'

/**
 * 判断是否是整数
 *
 * @param {number} Num
 * @returns {boolean} true 是整数 false不是
 */
function isInt (Num: number): boolean {
    return Math.floor(Num) == Num
}

/**
 * 强制转换成整数
 * @private
 * @param {number} floatNum
 * @returns {ItoInt}
 */
function toInt (floatNum: number): ItoInt {
    const temp = {
        num: floatNum,
        pow: 1
    }
    // 是整数跳过
    if (isInt(floatNum)) { return temp }

    const stringNum = floatNum + ''
    const len = stringNum.split('.')[1].length
    const pow = Math.pow(10, len)
    // 坑
    // 0.55 * 100 = 55.00000000000001 用parseInt强制转整数
    temp.num = Number.parseInt((floatNum * pow).toString(), 10)
    temp.pow = pow

    return temp
}

/**
 * 比较两个数 取整 取最大幂数
 * @private
 * @param  {number} num1 第一个number
 * @param  {number} num2 第二个number
 * @param  {string} op 指定操作类型
 */
function operate (num1: number, num2: number, op: string): number {
    const toInt1 = toInt(num1)
    const toInt2 = toInt(num2)
    // 取整
    const t1 = toInt1.num
    const t2 = toInt2.num
    // 取幂数
    const pow1 = toInt1.pow
    const pow2 = toInt2.pow

    // 先比较幂数大小 再做处理
    switch (op) {
    case 'add':
        if (pow1 == pow2) { return (t1 + t2) / pow1 }
        if (pow1 > pow2) { return (t1 + t2 * (pow1 / pow2)) / pow1 }
        else { return (t1 * (pow2 / pow1) + t2) / pow2 }
    case 'sub':
        if (pow1 == pow2) { return (t1 - t2) / pow1 }
        if (pow1 > pow2) { return (t1 - t2 * (pow1 / pow2)) / pow1 }
        else { return (t1 * (pow2 / pow1) - t2) / pow2 }
    case 'ride':
        return (t1 * t2) / (pow1 * pow2)
    case 'divide':
        // 参考  55 / 0.22 => ( 55 / 22 ) * (100 / 1)  注意分子和分母顺序
        return (t1 / t2) * (pow2 / pow1)
    }
}

/**
 * float 解决js处理浮点数不精确问题
 * @public
 */
const float = {
    /**
     * 两个浮点数相加
     * @example
     * float.add(0.1, 0.2) => 0.3
     * @param {number} num1 第一个number类型参数
     * @param {number} num2 第二个number类型参数
     * @returns {number} 相加后的结果
     */
    add (num1: number, num2: number): number {
        return operate(num1, num2, 'add')
    },

    /**
     * 两个浮点数相减
     * @example
     * float.sub(0.2, 0.1) => 0.1
     * @param {number} num1 第一个number类型参数
     * @param {number} num2 第二个number类型参数
     * @returns {number} 第一个参数 - 第二个参数 后的结果
     */
    sub (num1: number, num2: number): number {
        return operate(num1, num2, 'sub')
    },

    /**
     * 浮点数相乘
     * @example
     * float.ride(0.2, 0.1) => 0.02
     * @param {number} num1 第一个number类型参数
     * @param {number} num2 第二个number类型参数
     * @returns {number} 第一个参数 * 第二个参数 后的结果
     */
    ride (num1: number, num2: number): number {
        return operate(num1, num2, 'ride')
    },
    /**
     * 浮点数相除
     * @example
     * float.ride(0.2, 0.1) => 2
     * @param {number} num1 第一个number类型参数
     * @param {number} num2 第二个number类型参数
     * @returns {number} 第一个参数 / 第二个参数 后的结果
     */
    divide (num1: number, num2: number): number {
        return operate(num1, num2, 'divide')
    }
}

/**
 * 获取指定位数的X进制数
 * @example
 * getRandomBit(6, 16)
 * @param {number} num 指定输出的位数
 * @param {number} bit 指定进制数 8/10/16进制
 * @returns {string} 输出'#abcwed'形式的指定进制字符串
 */
function getRandomBit (num: number, bit: number = 10): string {
    let result = '#'
    if (typeof num != 'number') {
        throw new Error('num类型必须为数字!')
    }
    for (let i = 0; i <= num - 1; i++) {
        result += Math.floor(Math.random() * bit).toString(bit)
    }
    return result
}

export {
    float,
    getRandomBit
}
