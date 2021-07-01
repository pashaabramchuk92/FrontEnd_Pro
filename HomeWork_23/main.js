// 1 task

const string = 'abcd';

const reverseString = (str) => {

    if(str === '') {
        return '';
    }

    return reverseString(str.slice(1)) + str[0];
    
};

console.log(reverseString(string));



// 2 task
const array = [];
for (let i = 1; i <= 100; i++) {
    array.push(i);    
}


const binarySearch = (arr, num, left = 0, right = arr.length - 1) => {

    if(right < left) {
        return -1;
    } 

    const mid = Math.floor((right + left) / 2);

    if(arr[mid] < num) {
        return binarySearch(arr, num, left = mid + 1, right);
    } else if(arr[mid] > num) {
        return binarySearch(arr, num, left, right = mid - 1);
    } else {
        return mid;
    }
    
};

console.log(binarySearch(array, 42));
