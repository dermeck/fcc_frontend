$(document).ready(function () {

    registerStyleChangeEvents();
});

function registerStyleChangeEvents() {
    // optical changes if search box is clicked
    $('#search').on('focus', function () {
        $(this).parent('div').addClass('search-active');
    })
    $('#search').on('blur', function () {
        $(this).parent('div').removeClass('search-active');
    })
