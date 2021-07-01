// 1 task

const $value = $('input.value').val();

$('.minus').click(function() {
    const $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) - 1);

    if($input.val() < 0) {
        $input.val(0);
    }
});

$('.plus').click(function() {
    const $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
});



// 2 task

const $box = $('.box-wrap');
const $boxes = $('.box');

$boxes.each(function(i) {
    $(this).click(() => {
        let value = $(this).data('val');
        const target = $(this);

        $box.append($(target));

        if(value === 0) {
            target.removeClass('yellow');
            target.addClass('blue');
            $(this).data('val', 1);
        }

        if(value === 1) {
            target.removeClass('blue');
            target.addClass('green');
            $(this).data('val', 2);
        }

        if(value === 2) {
            target.removeClass('green');
            target.addClass('yellow');
            $(this).data('val', 0);
        }

    });
});
