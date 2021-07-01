//  1 task
 
const $wrap = document.querySelector('.square-wrapper');
const $square = document.querySelectorAll('.square');

$wrap.addEventListener('click', (e) => {
    const target = e.target;
    const i = target.dataset.index;

    $wrap.replaceChild($square[i], $square[i - 1]);
    $wrap.insertBefore($square[i - 1], $square[i + 4]);
    
    $square.forEach(item => {
        if(item === target) {
            let value = target.dataset.val;
            
            if(value === '0') {
                item.classList.add('blue');
                item.classList.remove('yellow');
                item.dataset.val = '1';
            }
            if(value === '1') {
                item.classList.add('green');
                item.classList.remove('blue');
                item.dataset.val = '2';
            }
            if(value === '2') {
                item.classList.add('yellow');
                item.classList.remove('green');
                item.dataset.val = '0';
            }
        }
    });
});

// 2 task

function toggle(elem, newClass) {
    let classes = elem.className;
    const index = classes.indexOf(newClass);

    if(index === -1) {
        classes += ` ${newClass}`;
    } else {
        classes = classes.split(' ').slice(0, -1).join(' ');
    }

    elem.className = classes;
}

document.querySelector('.test-btn').addEventListener('click', () => {
    toggle(document.querySelector('.box'), 'shadow');
});

