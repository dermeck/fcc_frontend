$(document).ready(function () {

    $.getJSON('http://ipinfo.io', function(data){
        // console.log(data);

        var loc = data.loc.split(",");

        getLocalWeather(loc[0], loc[1]);
    })
});

/**
 * Created by martin on 02.05.16.
 */




// get geo coordinates of user (modernizr?)

/**
 * Call open weather map API and passes response to updateUi
 *
 * @param latitude
 * @param longitude
 */
function getLocalWeather(latitude, longitude) {

// query weather api

// set ui values}}}