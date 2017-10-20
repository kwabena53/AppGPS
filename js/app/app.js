// Since we will be making use of 3rd party functions (eg. navigator.geolocation.getCurrentPosition) which are not native javascript functions we will need
// to add this function to the list of native javascript functions to allow javascript identify and execute it each time its called.
// This is done by using the addEventListener() function.
//
document.addEventListener("deviceready", onDeviceReady, false);


// //We decide to create a function to handle the 3rd party functions (eg. navigator.geolocation.getCurrentPosition)
// // which we earlier added to the native functions of the javascript
function onDeviceReady() {
 navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError);
}

// // onSuccess Geolocation
// //
// function onSuccess(position) {

//     var element = document.getElementById('geolocation');
//     element.innerHTML = 'Latitude: ' + position.coords.latitude  + '<br />' +
//         'Longitude: '          + position.coords.longitude             + '<br />' +
//         'Altitude: '           + position.coords.altitude              + '<br />' +
//         'Accuracy: '           + position.coords.accuracy              + '<br />' +
//         'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
//         'Heading: '            + position.coords.heading               + '<br />' +
//         'Speed: '              + position.coords.speed                 + '<br />' +
//         'Timestamp: '          + position.timestamp          + '<br />';
// }

// // onError Callback receives a PositionError object
// //
// function onError(error) {
//     if (error.code==1)
//         {
//             alert("Please turn on your location service on your phone before you can enjoy the service");
//         }
//         else
//         {
//             alert('code: '    + error.code    + '\n' +
//             'message: ' + error.message + '\n');    
//         }
    
// }


var Latitude = undefined;
var Longitude = undefined;

// Get geo coordinates

function getMapLocation() {

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}

function onMapError(error) {
    if (error.code==1)
        {
            alert("Please turn on your location service on your phone before you can enjoy the service");
        }
        else
        {
            alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');    
        }
    }

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}
