jQuery(document).ready(function () {
    getRandomQuote();

    // register event handler for button
    $('#get-quote-btn').on('click', getRandomQuote);
});


function getRandomQuote() {
    // call api
    $.ajax({
        headers: {
            "X-Mashape-Key": "yUzR0sW4RamshuS8LpYNdzor19xhp1WKjTtjsndWCRWEDE2xLp",
            Accept: "application/json",
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com',
        success: function (response) {
            // console.log(response);

            json = JSON.parse(response);

            var quote = json.quote;
            var author = json.author;

            // set content
            $('#quote').text(quote);
            $('#author').text(author);

            // Twitter URL
            var twitterUrl = "https://twitter.com/intent/tweet?button_hashtag=randomquote&text=";
            twitterUrl += quote + "\n-" + author;

            $(".twitter-hashtag-button").attr('href', twitterUrl);
        }
    })
}