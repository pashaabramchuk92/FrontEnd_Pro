//  1 task
const arr = [1, 2, 3, 4, 5, [1.1, 1.2, [2.1, 2.2, [3.1, 3.2, 3.3], 2.3], 1.3, 1.4, 1.5], 6, 7];

const generateList = function generateList(arr) {
    const ul = document.createElement('ul');

    arr.forEach(item => {
        const li = document.createElement('li');
        let acc;

        if(Array.isArray(item)) {
            acc = generateList(item);
        } else {
            acc = document.innerHTML = item;
        }
        li.append(acc);
        ul.append(li);

    });

    return ul;
}

document.body.prepend(generateList(arr));


// 2 task

function generateTable() {
    const table = document.createElement('table');
    let a = 1;
    
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            const col = document.createElement('td');
            const data = document.innerHTML = `${a++} |`;

            col.append(data);
            row.append(col);
        }
        table.append(row);
    }

    document.body.prepend(table);
}
generateTable();
