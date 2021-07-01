function isPalindorme(num, count = 0) {
    const numToString = num.toString(),
          numReverse = numToString.split('').reverse().join('');

    const res = {
        result: num,
        step: 0
    };

    if(num < 0 || typeof num != 'number') {
        throw new Error('Wrong argument type');
    }

    if(num >= 0 && num < 10) {
        return res;
    }

    if(numToString === numReverse) {
        res.result = Number(numToString);
        res.step = count
        return res;
    }

    if(numToString !== numReverse) {
        let acc = Number(numToString) + Number(numReverse);
        return isPalindorme(acc, count += 1);
    }
}

const a = isPalindorme(96);
console.log(a);