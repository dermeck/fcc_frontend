$(document).ready(function () {

    registerStyleChangeEvents();

    $('#search-icon').on('click', performSearch);


    // performSearch();
});

function registerStyleChangeEvents() {
    // optical changes if search box is clicked
    $('#search').on('focus', function () {
        $(this).parent('div').addClass('search-active');

        // TODO register event handler to trigger search when pressing ENTER

    })
    $('#search').on('blur', function () {
        $(this).parent('div').removeClass('search-active');
    })
}

function performSearch() {
    // show loading indicator

    // get search term
    var searchTerm = $('#search').val();

    // api reference https://www.mediawiki.org/wiki/API:Search

    var url = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + searchTerm + "&utf8=";

    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            displayResults(data);
        }
    });
}

function displayResults(data) {

    var searchResultArray = data.query.search;

    searchResultArray.forEach(function (value) {
        console.log(value);
        console.log(value.title);
    });

    console.log(data.query.search);

    // TODO ... update ui
}