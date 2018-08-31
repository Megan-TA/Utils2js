function chunk(arr, size) {
    var finalArr = [];
    var tempArr = [];
    if (size === 0)
        return arr;
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
function destroyer(arr, any) {
    var args = [];
    if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments, 1, arguments.length);
    }
    var newArr = arr.filter(function (item) {
        return args.indexOf(item) === -1;
    });
    return newArr;
}
function upSet(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
}
export { upSet, destroyer, chunk };
