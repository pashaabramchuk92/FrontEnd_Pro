// 1)

function sum(a) {
    let res = 0;
    return function() {
        return res += x;
    } 
}

const result = sum();

console.log(result(3));
console.log(result(5));
console.log(result(20));

// 2)

function createCounter(start = 1, step = 1) {
    let count = start;
    return function(stop = false) {
        if(!stop) {
            const value = count;
            count += step;
            return value;
        } else {
            const value = count = start;
            count += step;
            return value; 
        }
    }
}

const counter = createCounter(2, 3);

console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter(true));
console.log(counter());
console.log(counter());
console.log(counter());
