var yearsOld = +prompt('Сколько вам лет?');
var result;

if ((yearsOld % 100) >= 5 && (yearsOld % 100) <= 20 || yearsOld == 0) {
    result = 'лет';
} else if (yearsOld == 1 || (yearsOld % 10 == 1)) {
    result = 'год';
} else if ((yearsOld % 10) >= 2 && (yearsOld % 10) <= 4) {
    result = 'года';
} else {
    result = 'лет';
}

alert(`Вам ${yearsOld} ${result}`);
