/**
 * 分割数组
 * 把一个数组arr按照指定的数组大小size分割成若干个数组块。
 * @example
 * chunk([1,2,3,4],2) = [[1,2],[3,4]]
 * chunk([1,2,3,4,5],2) = [[1,2],[3,4],[5]]
 * 
 * @param {any[]} arr 原数组
 * @param {number} size 指定位数
 * @returns {any[]} 新数组
 */
function chunk(arr: any[], size: number): any[] {
  var finalArr = [];
  var tempArr = [];
  if (size === 0) return arr
  for (var i = 0; i < arr.length; i++) {
    tempArr.push(arr[i]);
    if ((i + 1) % size === 0) {
      finalArr.push(tempArr);
      tempArr = [];
    }
  }
  if (tempArr.length >= 1) {
    finalArr.push(tempArr);
    tempArr = [];
  }
  return finalArr;
}


/**
 * 摧毁数组指定数值
 * @example
 * destroyer([2,3,1,2], 2) => [3,1]
 *
 * @param {any[]} arr 待摧毁的数组
 * @returns {any[]} 待摧毁的值
 */
function destroyer(arr: any[], any): any[] {
  var args = [];
  if (arguments.length > 1) {
    args = Array.prototype.slice.call(arguments, 1, arguments.length);
  }
  
  var newArr = arr.filter(function (item) {
    return args.indexOf(item) === -1;
  });
  return newArr;
}


/**
 * 打乱一个指定的数组
 * @example
 * upSet([1,6,3,2]) => [1,3,6,2]
 * @param {any[]} arr 待打乱的数组
 * @returns {any[]} 打乱之后的数组
 */
function upSet(arr: any[]): any[] {
  return arr.sort(function () {
    return Math.random() - 0.5
  })
}

export {
  upSet,
  destroyer,
  chunk
}