function initMap(mapType) {
    alert('initimap');
    console.log(mapType)
    if (mapType == "plot") {
        var map = new google.maps.Map(document.getElementById('mapPlotting'), {
            zoom: 6,
            center: { lat: -33.9, lng: 151.2 }
        });
        getMarkers(map);
    } else if (mapType == "trip") {
        var map = new google.maps.Map(document.getElementById('mapPlotting'), {
            zoom: 6,
            center: { lat: -33.9, lng: 151.2 }
        });
        setDirections(map);
    } else if (mapType == "grid") {
        var map = new google.maps.Map(document.getElementById('mapPlotting'), {
            zoom: 6,
            center: { lat: -33.9, lng: 151.2 }
        });
        getPolygon(map);
        grid(map);
    }
}

// Directions 
function setDirections(map) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var service = new google.maps.DistanceMatrixService;
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(service, directionsService, directionsDisplay);
    };
    document.getElementById('btnMapTrip').addEventListener('click', onChangeHandler);
}

function calculateAndDisplayRoute(service, directionsService, directionsDisplay) {
    var frm = document.getElementById('fromLocation').value;
    var to = document.getElementById('toLocation').value;
    var latfrm = document.getElementById('fromLatLong').value;
    var latto = document.getElementById('toLatLong').value;
    var origin = "";
    var dest = ""
    if (frm == "" && to == "" && latfrm == "" && latto == "") {
        alert("Please Enter Locations");
        return false;
    } else if (frm != "" && to != "") {
        origin = frm;
        dest = to;
    } else if (latfrm != "" && latto != "") {
        origin = latfrm;
        dest = latto;
    } else {
        origin = "";
        dest = "";
    }
    directionsService.route({
        origin: origin,
        destination: dest,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log(response);
        } else {
            window.alert('Directions request failed due to ' + status);
            initMap(trip)
        }
    });
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [dest],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            console.log(response);
            var distance = response.rows[0].elements[0].distance.text;
            var time = response.rows[0].elements[0].duration.text;
            $(singleTripTime).html("Expected Trip Time:" + distance + " : " + time)
        }
    });
}

// Markers 

function setMarkers(map, locas) {

    map.setCenter({ lat: locas[0][3], lng: locas[0][4] });
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    for (var i = 0; i < locas.length; i++) {
        var infowindow = new google.maps.InfoWindow();
        var image = {
            //url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            url: '/MappingPoc/icons/' + locas[i][6] + '.png',
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        };
        var locs = locas[i];
        var details = locs[0] + '</br>' + locs[1] + '</br>' + locs[2];
        var myinfowindow = new google.maps.InfoWindow({
            content: details
        });
        var marker = new google.maps.Marker({
            position: { lat: locs[3], lng: locs[4] },
            map: map,
            icon: image,
            shape: shape,
            zIndex: locs[5],
            infowindow: myinfowindow
        });
        google.maps.event.addListener(marker, 'mouseover', function () {
            this.infowindow.open(map, this);

        });
        google.maps.event.addListener(marker, 'mouseout', function () {

            this.infowindow.close(map, this);

        });
        google.maps.event.addListener(marker, 'click', function () {
            $(selectePin).html("Selected Pin : " + this.infowindow.getContent().split("</br>")[2]);
        });
    }
}

function getMarkers(map) {
    var data = [];
    $.ajax({
        url: 'MappingPOCServices.asmx/GetUsersLocation',
        type: 'POST',
        data: {
            key: "value"
        },
        dataType: "xml",
        async: false
    }).done(function (dataResponse) {
        parse_data = $(dataResponse).find("string").text();
        data = JSON.parse(parse_data);

    });
    //var data = [{"UserID":"8b2001a0-9a10-e611-80c5-00155d5a0823","UserName":"User2","UserIcon":"Icon2","PinLine1":"User 2 Ln1","PinLine2":"Usr2 Ln 2","PinURL":"Usr2 Ln 2","Latitude":"43.6773135","Longitude":"-79.7189257","Mappedon":"2016-08-22T09:32:00"},{"UserID":"8b2001a0-9a10-e611-80c5-00155d5a0824","UserName":"User3","UserIcon":"Icon3","PinLine1":"Usr3 Ln1","PinLine2":"Usr 3 Ln2","PinURL":"Usr 3 Ln2","Latitude":"43.6773175","Longitude":"-79.7189277","Mappedon":"2016-08-22T09:42:00"},{"UserID":"8b2001a0-9a10-e611-80c5-00155d5a0822","UserName":"User1","UserIcon":"Icon1","PinLine1":"Pin Line 1","PinLine2":"PinLine 2","PinURL":"PinLine 2","Latitude":"51.503252","Longitude":"-0.127899","Mappedon":"2016-09-07T17:27:31.77"}]
    breaches = [];
    console.log(data);
    for (i = 0; i < data.length; i++) {
        breaches.push([data[i].PinLine1, data[i].PinLine2, data[i].PinURL, parseFloat(data[i].Latitude), parseFloat(data[i].Longitude), i, data[i].UserIcon])
    }
    setMarkers(map, breaches);
}

var regions = {};
var regions_count = 0;
function grid(map) {
    document.getElementById('btnGetRegion').addEventListener('click', function () {
        getLoc(document.getElementById('gridLocation').value, map);
    });
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon']
        },
        markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
        polygonOptions: {
            fillColor: 'red',
            fillOpacity: 2,
            strokeWeight: 3,
            clickable: true,
            zIndex: 1
        }
    });

    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
        var a = e.overlay.getPaths().getArray()[0].getArray();
        var r = prompt("Enter The Region Name", "Region 1");
        console.log(r);
        geo = [];
        if (r != null || r.trim() != "") {
            for (i = 0; i < a.length; i++) {
                console.log(a[i].lat(), a[i].lng());
                geo.push({ "lat": a[i].lat(), "lng": a[i].lng() });
            }
            regions.RegionName = r;
            regions.LocationInfo = JSON.stringify(geo);
            setPolygon(regions);

        } else {
            initMap();
        }
    });

}

function getPolygon(map) {
    $.ajax({
        url: 'MappingPOCServices.asmx/GetUserRegions',
        type: 'POST',
        data: {
            key: "value"
        },
        dataType: "xml",
        async: false
    }).done(function (dataResponse) {
        parse_data = $(dataResponse).find("string").text();
        data = JSON.parse(parse_data);
        showPolygon(map, data);
    });
}

function showPolygon(map, data) {
    console.log(data);
    if (data.length) {
        var center = JSON.parse(data[0].LocationInfo);
        map.setCenter(center[0]);
        for (i = 0; i < data.length; i++) {
            var path = JSON.parse(data[i].LocationInfo);
            var AVpoly = new google.maps.Polygon({
                path: path,
                map: map,
                strokeColor: "red",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "red",
                fillOpacity: 0.4
            });
        }
    }
}

function setPolygon(data) {
    $.ajax({
        url: 'MappingPOCServices.asmx/SaveUserRegion',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ regionLocationInfo: data }),
        dataType: "json",

        async: false
    }).done(function (dataResponse) {
        alert("Region Saved succesfully");
        initMap("grid");

    });
}

function getLoc(loc, map) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText.status = "OK") {
                data = JSON.parse(this.responseText);
                if (data.results.length) {
                    location_user = data.results[0].geometry.bounds.northeast;
                    map.setCenter(location_user);
                    var marker = new google.maps.Marker({
                        position: location_user,
                        map: map
                    });
                    console.log(marker);
                    checkReigon(location_user, map)
                } else {
                    initMap('grid');
                }
            }

        } else {
            initMap('grid');
        }
    };
    xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + loc, true);
    xhttp.send();
}

function checkReigon(location_user, map) {
    var curPosition = new google.maps.LatLng(location_user.lat, location_user.lng);
    var data;
    $.ajax({
        url: 'MappingPOCServices.asmx/GetUserRegions',
        type: 'POST',
        data: {
            key: "value"
        },
        dataType: "xml",
        async: false
    }).done(function (dataResponse) {
        parse_data = $(dataResponse).find("string").text();
        data = JSON.parse(parse_data);
    });

    if (data.length) {
        for (i = 0; i < data.length; i++) {
            var path = JSON.parse(data[i].LocationInfo);
            var bermudaTriangle = new google.maps.Polygon({ paths: path });
            if (google.maps.geometry.poly.containsLocation(curPosition, bermudaTriangle)) {
                $("#region").html("Region:" + data[i].RegionName);
                break;
            } else {
                $("#region").html("Region: NONE ");
            }
        }
    }
}

function setLogMessage(message) {
    var para = document.createElement("p");
    document.getElementById('locationRef').innerHTML = message;
    var date = new Date();
    var timeMessage = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    var node = document.createTextNode(timeMessage + ',' + message);
    para.appendChild(node);

    var element = document.getElementById("logsDiv");
    //element.appendChild(para);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        setLogMessage("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var message = "Location=" + position.coords.latitude + "," + position.coords.longitude;
    var data = { 'latitude': position.coords.latitude, 'longitude': position.coords.longitude };
    $.ajax({
        url: 'MappingPOCServices.asmx/SaveUserCurrentLocation',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ location: data }),
        dataType: 'json'
    });
    setLogMessage(message);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            setLogMessage("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            setLogMessage("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            setLogMessage("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            setLogMessage("An unknown error occurred.")
            break;
    }
}