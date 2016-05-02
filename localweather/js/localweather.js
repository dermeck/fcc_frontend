
$(document).ready(function () {

    $.getJSON('http://ipinfo.io', function(data){

        var loc = data.loc.split(",");

        getLocalWeather(loc[0], loc[1]);
    })

    $('#temp-unit').on('click', function (data) {
        switchTempUnit(data, $(this));
    });
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

function switchTempUnit(data, target) {
    if (target.hasClass("mdi-temperature-celsius")) {
        // celsius to fahrenheit
        target.removeClass('mdi-temperature-celsius');
        target.addClass('mdi-temperature-fahrenheit');

        var el = $('#temp-value');
        var f = el.text() * 1.800 + 32;
        el.text(round(f, 1));

    } else {
        // fahrenheit to celsius
        if (target.hasClass("mdi-temperature-fahrenheit")) {
            // fahrenheit to celsius
            target.removeClass('mdi-temperature-fahrenheit');
            target.addClass('mdi-temperature-celsius');

            var el = $('#temp-value');
            var c = (el.text() - 32) / 1.800;
            el.text(round(c, 1));
        }
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
    $('#weather-condition').text(descr);

    setWeatherIcon(data.weather[0].id);

    // temperature
    var temp = data.main.temp; // Kelvin

    var tempValue = kelvinToCelsius(temp);
    $('#temp-value').text(round(tempValue, 1));


    // additional data
    $('#wind-speed').text(round(data.wind.speed, 1) + " m/s")

    $('#humidity').text(round(data.main.humidity, 1) + " %")

    var t = new Date(data.sys.sunrise * 1000);
    var formatted = t.getHours() + ":" + t.getMinutes();
    $('#sunset-up').text(formatted);

    t = new Date(data.sys.sunset * 1000);
    formatted = t.getHours() + ":" + t.getMinutes();
    $('#sunset-down').text(formatted);
}

function kelvinToCelsius(temp) {
    return temp -273.15;
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
    // console.log(url);

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

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}