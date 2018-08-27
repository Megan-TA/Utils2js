function isInt(Num) {
    return Math.floor(Num) == Num;
}
function toInt(floatNum) {
    const temp = {
        num: floatNum,
        pow: 1
    };
    if (isInt(floatNum)) {
        return temp;
    }
    const stringNum = floatNum + '';
    const len = stringNum.split('.')[1].length;
    const pow = Math.pow(10, len);
    temp.num = Number.parseInt((floatNum * pow).toString(), 10);
    temp.pow = pow;
    return temp;
}
function operate(num1, num2, op) {
    const toInt1 = toInt(num1);
    const toInt2 = toInt(num2);
    const t1 = toInt1.num;
    const t2 = toInt2.num;
    const pow1 = toInt1.pow;
    const pow2 = toInt2.pow;
    switch (op) {
        case 'add':
            if (pow1 == pow2) {
                return (t1 + t2) / pow1;
            }
            if (pow1 > pow2) {
                return (t1 + t2 * (pow1 / pow2)) / pow1;
            }
            else {
                return (t1 * (pow2 / pow1) + t2) / pow2;
            }
        case 'sub':
            if (pow1 == pow2) {
                return (t1 - t2) / pow1;
            }
            if (pow1 > pow2) {
                return (t1 - t2 * (pow1 / pow2)) / pow1;
            }
            else {
                return (t1 * (pow2 / pow1) - t2) / pow2;
            }
        case 'ride':
            return (t1 * t2) / (pow1 * pow2);
        case 'divide':
            return (t1 / t2) * (pow2 / pow1);
    }
}
const float = {
    add(num1, num2) {
        return operate(num1, num2, 'add');
    },
    sub(num1, num2) {
        return operate(num1, num2, 'sub');
    },
    ride(num1, num2) {
        return operate(num1, num2, 'ride');
    },
    divide(num1, num2) {
        return operate(num1, num2, 'divide');
    }
};
function getRandomBit(num, bit = 10) {
    let result = '#';
    if (typeof num != 'number') {
        throw new Error('num类型必须为数字!');
    }
    for (let i = 0; i <= num - 1; i++) {
        result += Math.floor(Math.random() * bit).toString(bit);
    }
    return result;
}
export { float, getRandomBit };
