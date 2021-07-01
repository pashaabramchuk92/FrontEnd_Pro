// 1 case
var cylinder = {
    radius: 0,
    height: 0,
    getArea: function(r, h) {
        return 2 * Math.PI * r * (h + r);
    },
    getVolume: function(r, h) {
        return Math.PI * r ** 2 * h;
    }
};

var cylinderArea = cylinder.getArea(2, 6);
var cylinderVolume = cylinder.getVolume(2, 6);

console.log(`Площадь цилиндра равна ${cylinderArea.toFixed(2)}.`, `Объем цилиндра равен ${cylinderVolume.toFixed(2)}.`);


// 2 case

function getResult(a, b, mathSing) {
    if(mathSing === '+') {
        return a + b;
    } else if (mathSing === '-') {
        return a - b;
    } else if (mathSing === '*') {
        return a * b;
    } else if (mathSing === '/') {
        return (a / b).toFixed(2);
    } else {
        return 'Error'
    }
}

var res = getResult(5, 6, '$');
console.log(res);


// 3 case

function isCharPresent(str, symbol) {
    var arr = str.split('');
    var res;

    for (var i = 0; i < arr.length; i++) {
        if(arr[i] === symbol) {
            res = arr[i];
            break;
        } else {
            res = 0;
        }
    }
    return res ? true : false;    
}

console.log(isCharPresent('Hello', 'j'));

function charIndexOf(str, symbol) {
    var arr = str.split('');
    var res;

    for (var i = 0; i < arr.length; i++) {
        if(arr[i] === symbol) {
            res = i;
            break;
        } else {
            res = -1;
        }
    }
    return res;
}

console.log(charIndexOf('Hello', 'a'));
