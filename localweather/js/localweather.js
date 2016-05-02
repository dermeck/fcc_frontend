$(document).ready(function () {

    $.getJSON('http://ipinfo.io', function(data){
        // console.log(data);

        var loc = data.loc.split(",");

        getLocalWeather(loc[0], loc[1]);
    })
});

/**
 * Populate UI with weather data
 *
 * @param data
 */
function updateUi(data) {

    // city
    var city = data.name;
    var country = data.sys.country;

    var cityStr = city + ", " + country;
    $('#location').text(cityStr);

    // weather condition
    var descr = data.weather[0].description;
    console.log(descr);
    $('#weather-condition').text(descr);




// get geo coordinates of user (modernizr?)
}

/**
 * Call open weather map API and passes response to updateUi
 *
 * @param latitude
 * @param longitude
 */
function getLocalWeather(latitude, longitude) {
    var baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
    var loc = "lat=" + latitude + "&lon=" + longitude;
    var appId= "&APPID=" + "73683088432bf424ffcc937004bd296d";

    var url = baseUrl + loc + appId;
    console.log(url);

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            updateUi(data);
        }
    });
}