
$(document).ready(function () {

    $('#search').on('focus', function () {
        $(this).parent('div').addClass('search-active');
    })

    $('#search').on('blur', function () {
        $(this).parent('div').removeClass('search-active');
    })
});