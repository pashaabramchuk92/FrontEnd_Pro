// 1) map

var arr = [1, 2, 3, 4, 5];

var selfMap = function(array, callback) {
    var result = [];

    for (var i = 0; i < array.length; i++) {
        result.push(callback(array[i]));
    }
    return result;
};

var sqrt = function(num) {
    return num ** 2;
};

var res = selfMap(arr, sqrt);
console.log(res);
console.log(arr);

// 2) filter

var arr = [1, 2, 3, 4, 5];

var selfFilter = function(array, callback) {
    var result = [];

    for (var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            result.push(array[i]);
        }        
    }
    return result;
};


var checkMultiplicity = function (num) {
    return num % 2 === 0;
};

var res = selfFilter(arr, checkMultiplicity);
console.log(res);
console.log(arr);

// 3) main task

var notification = [
    {
        date: '31/07/2019',
        msg: 'message 1'
    },
    {
        date: '31/07/2019',
        msg: 'message 2'
    },
    {
        date: '30/07/2019',
        msg: 'message 3'
    },
    {
        date: '25/09/2019',
        msg: 'message 4'
    }
];

var result = notification.reduce(function(acc, info) {
        if(!acc[info.date]) {
            acc[info.date] = [];
        }
        
        acc[info.date].push(info.msg);
    
    return acc;
}, {});

console.log(result);
