$(document).ready(function () {

    registerStyleChangeEvents();

    $('#search-icon').on('click', performSearch);


    $('#search').keypress(function (e) {
        if(e.which == 13) {
            // ENTER
            performSearch();
        }
    })
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

    // clear table
    var resultTable = $('#search-results');
    resultTable.html("");

    if (data) {
        var searchResultArray = data.query.search;
        var html ="";

        searchResultArray.forEach(function (value) {
            html += "<tr><td><a href=\"https://en.wikipedia.org/wiki/" + value.title + "\" target='_blank'>";
            html+= value.title + "</a>";
            html += "</td><td>";
            html+=value.snippet;
            html+="</td></tr>"

            // console.log(value);
        });

        // console.log(data.query.search);
        resultTable.html(html);
    }
}