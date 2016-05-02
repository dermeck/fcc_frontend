$(document).ready(function () {

    $.getJSON('http://ipinfo.io', function(data){
        // console.log(data);

        var loc = data.loc.split(",");

        getLocalWeather(loc[0], loc[1]);
    })
});

/**
 * Check weatherID and show apprpiate icon.
 *
 * // https://openweathermap.org/weather-conditions
 * @param weatherId
 */
function setWeatherIcon(weatherId) {
    // hide all icons
    $('#weather-icon').children().css('display', 'none');

    if(weatherId == 800) {
        $('#icon-sun').css('display', 'inline-block');
        return;
    }

    // few clouds
    if(weatherId == 801) {
        $('#icon-sun-cloud').css('display', 'inline-block');
        return;
    }

    if((weatherId == 802) || (weatherId == 803) || (weatherId == 804)){
        $('#icon-cloud').css('display', 'inline-block');
        return;
    }

    // drizlle
    if((weatherId >=300) && (weatherId <= 321)) {
        $('#icon-rain').css('display', 'inline-block');
        return;
    }

    // rain
    if((weatherId >=500) && (weatherId <= 531)) {
        $('#icon-rain').css('display', 'inline-block');
        return;
    }

    if ((200 <= weatherId) && (weatherId <= 299)) {
        $('#icon-thunder-storm').css('display', 'inline-block');
        return;
    }

    // snow
    if((weatherId >= 600) && (weatherId <= 700) ) {
        $('#icon-snow').css('display', 'inline-block');
    }
}

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

    setWeatherIcon(data.weather[0].id);




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