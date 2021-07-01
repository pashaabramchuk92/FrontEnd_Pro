var obj = {
    name: 'Ivan',
    surname: 'Petrov',
    age: 25
}

// 1

var getValues = function(object) {
    var valuesArr = [];
    for (var key in object) {
        valuesArr.push(object[key]);
    }

    return valuesArr;
}

var getValuesResult = getValues(obj);
console.log(getValuesResult);

// 2

var getKeys = function(object) {
    var keysArr = [];
    for (var key in object) {
        keysArr.push(key);
    }

    return keysArr;
}

var getKeysResult = getKeys(obj);
console.log(getKeysResult);

// 3

var getEntries = function(object) {
    var entriesArr = [];
    var itemArr = [];
    
    for (var key in object) {
        var acc = [];
        acc.push(key, object[key]);
        entriesArr.push(acc);
    }

    return entriesArr;
}

var getEntriesResult = getEntries(obj);
console.log(getEntriesResult);