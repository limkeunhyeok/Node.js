function getCurrentPosition() {
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };
        navigator.geolocation.watchPosition(getUserPosition, trackError, options);
    } else {
        alert('Ops; Geolocation is not supported');
    }
};

function getUserPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    const googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    const mapOptions = {
        zoom: 12,
        center: googlePos,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const mapObj = document.getElementById('map');
    const googleMap = new google.maps.Map(mapObj, mapOptions);
    const markerOption = {
        map: googleMap,
        position: googlePos,
        animation: google.maps.Animation.DROP
    };
    const googleMarker = new google.maps.Marker(markerOption);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': googlePos }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                const popOpts = {
                    content: results[1].formatted_address,
                    position: googlePos
                };
                const popup = new google.maps.InfoWindow(popOpts);
                google.maps.event.addListener(googleMarker, 'click', () => {
                    popup.open(googleMap);
                });
            } else {
                alert('No results found');
            }
        } else {
            alert('Uhh, failed: ' + status)
        }
    });
};

function trackError(error) {
    let err = document.getElementById('map');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            err.innerHTML = "User denied Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            err.innerHTML = "Information is unavailable.";
            break;
        case error.TIMEOUT:
            err.innerHTML = "Location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            err.innerHTML = "An unknown error.";
            break;
    }
};

getCurrentPosition();