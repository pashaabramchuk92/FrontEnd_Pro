function padString(str, num, symb, toRight) {
    if(str.length < num) {
        if(toRight) {
            for (var i = (num - str.length); i > 0; i--) {
                str = str + symb;
            }
        } else {
            for (var j = (num - str.length); j > 0; j--) {
                str = symb + str;
            }
        }
    }

    return str;
}

console.log(padString('Ivan', 6, '&', true));
