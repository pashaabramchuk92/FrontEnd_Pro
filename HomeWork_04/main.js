var count = +prompt('Введите число');

while(count < 2 || count > 10) {
    count = +prompt('Введите число от 2 до 10');
}

var star = '*';
var triangle = '';

for(var i = 1; i <= count; i++) {
    for(var j = 1; j <= i; j++) {
        triangle += star;
    }
    triangle += '\n';
}
alert(triangle);
