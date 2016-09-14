var map;
var existingRegions = [];
var directionsService;
var markersTrip = [];
        var polylines = [];
        var shadows = [];
        var data_dir = [];
        var infowindow;
function initMap(mapType) {
    //geting currrent position for all map
    if (mapType == "plot") {
        map = new google.maps.Map(document.getElementById('mapPlotting'), {
            zoom: 11,
            center: { lat: -33.9, lng: 151.2 }
        });
        setCurrentPosition(map);
        getMarkers(map);
    } else if (mapType == "trip") {
        map = new google.maps.Map(document.getElementById('mapPlotting'), {
            zoom: 11,
            center: { lat: -33.9, lng: 151.2 },
             mapTypeId: 'roadmap'
        });
        var inputFrm = document.getElementById('fromLocation');
        var autocompleteFrm = new google.maps.places.Autocomplete(inputFrm);
        autocompleteFrm.bindTo('bounds', map);
        autocompleteFrm.addListener('place_changed', function () { });
        var inputTo = document.getElementById('toLocation');
        var autocompleteTo = new google.maps.places.Autocomplete(inputTo);
        autocompleteTo.bindTo('bounds', map);
        autocompleteTo.addListener('place_changed', function () { });
        setCurrentPosition(map);
    } else if (mapType == "grid") {
        map = new google.maps.Map(document.getElementById('mapPlotting'), {
            zoom: 11,
            center: { lat: -33.9, lng: 151.2 }
        });
        var regionFrm = document.getElementById('gridLocation');
        var autocompleteregionFrm = new google.maps.places.Autocomplete(regionFrm);
        autocompleteregionFrm.bindTo('bounds', map);
        autocompleteregionFrm.addListener('place_changed', function () { });
        setCurrentPosition(map);
        getPolygon(map);
        grid(map);
    }
}
//Autopopulate Place


// Directions 
function setDirections(map) {
    calculateAndDisplayRoute();
}

//function calculateAndDisplayRoute(service, directionsService, directionsDisplay) {
function calculateAndDisplayRoute() {
    var frm = document.getElementById('fromLocation').value;
    var to = document.getElementById('toLocation').value;
    var latfrm = document.getElementById('fromLatLong').value;
    var latto = document.getElementById('toLatLong').value;
    var origin = "";
    var dest = "";
    if (frm == "" && to == "" && latfrm == "" && latto == "") {
        alert("Please Enter Locations");
        $('#singleTripTime').html("");
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

    directionsService = new google.maps.DirectionsService();
    google.maps.Polyline.prototype.getBounds = function (startBounds) {
        if (startBounds) {
            var bounds = startBounds;
        }
        else {
            var bounds = new google.maps.LatLngBounds();
        }
        this.getPath().forEach(function (item, index) {
            bounds.extend(new google.maps.LatLng(item.lat(), item.lng()));
        });
        return bounds;
    };
    calcRoute(
        origin,
        dest
    );
}

    function calcRoute(start, end) {
        var latlng;
            var request = {
                origin: start,
                destination: end,
                provideRouteAlternatives: true,
                unitSystem: google.maps.UnitSystem.METRIC,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, function (response, status) {
                // clear former polylines
                for(var j in  polylines ) {
                    polylines[j].setMap(null);
                    shadows[j].setMap(null);
                }
                for (var i in markersTrip) {
                    markersTrip[i].setMap(null);
                }
                polylines = [];
                shadows = [];
                data = [];
                if (status == google.maps.DirectionsStatus.OK) {
                    var bounds = new google.maps.LatLngBounds();
                    for (var i in response.routes) {
                        // let's make the first suggestion highlighted;
                        var hide = (i==0 ? false : true);
                        var shadow = drawPolylineShadow(response.routes[i].overview_path, '#606060');
                        var line = drawPolyline(response.routes[i].overview_path, '#0000FF', hide);
                        polylines.push(line);
                        shadows.push(shadow);
                        // let's add some data for the infoWindow
                        data.push({
                            distance: response.routes[i].legs[0].distance,
                            duration: response.routes[i].legs[0].duration,
                            end_address: response.routes[i].legs[0].end_address,
                            start_address: response.routes[i].legs[0].start_address,
                            end_location: response.routes[i].legs[0].end_location,
                            start_location: response.routes[i].legs[0].start_location
                        });
                        bounds = line.getBounds(bounds);
                        google.maps.event.addListener(shadow, 'click', function (e) {
                            // detect which route was clicked on
                            var index = shadows.indexOf(this);
                            highlightRoute(index, e);
                        });

                        if (i == 0) {
                            len = polylines[0].getPath().getArray().length;
                            $(singleTripTime).html("Expected Trip Time:" + response.routes[0].legs[0].distance.text + " : " + response.routes[0].legs[0].duration.text);
                            var contentString =
                                '<span>' + response.routes[0].legs[0].distance.text + '</span><br/>' +
                                '<span>' + response.routes[0].legs[0].duration.text + '</span><br/>' +
                                '<span>route: ' + 0 + '</span><br/>' +
                                '';
                            if (infowindow) {
                                infowindow.close();
                                infowindow = null;
                            }
                            infowindow = new google.maps.InfoWindow({
                                content: contentString,
                                position: { lat: polylines[0].getPath().getArray()[len / 2].lat(), lng: polylines[0].getPath().getArray()[len / 2].lng() },
                                map: map
                            });
                        }

                    }
                    var shape = {
                        coords: [1, 1, 1, 20, 18, 20, 18, 1],
                        type: 'poly'
                    };
                    len = polylines[0].getPath().getArray().length;
                    for (i = 0; i < 2; i++) {
                        if (i==0){
                            var position = { lat: polylines[0].getPath().getArray()[0].lat(), lng: polylines[0].getPath().getArray()[0].lng() }
                        } else {
                            var position = { lat: polylines[0].getPath().getArray()[len-1].lat(), lng: polylines[0].getPath().getArray()[len-1].lng() }
                        }
                        var marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            shape: shape,
                            zIndex: 1
                        });
                        markersTrip.push(marker);
                    }
                    map.fitBounds(bounds);
                } else {
                    alert('There is no route available for this locations.')
                    $(singleTripTime).html("");
                }
            });
        }

        // this makes one of the colored routes visible.
        function highlightRoute(index, e) {
            for(var j in  polylines ) {
                if(j==index) {
                    polylines[j].setMap(map);
                    // feel free to customise this string
                    var contentString =
                        '<span>'+ data[j].distance.text +'</span><br/>'+
                        '<span>'+ data[j].duration.text +'</span><br/>'+
                        '<span>route: '+ j +'</span><br/>'+
                        '';
                    if (e) {
                        $(singleTripTime).html("Expected Trip Time:" + data[j].distance.text + " : " + data[j].duration.text);
                        var position = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                        // it may be needed to close the previous infoWindow
                        if (infowindow) {
                            infowindow.close();
                            infowindow = null;
                        }
                        infowindow = new google.maps.InfoWindow({
                            content: contentString,
                            position: position,
                            map: map
                        });
                    }
                }
                else {
                    polylines[j].setMap(null);
                }
            }
        }
        // returns a polyline.
        // if hide is set to true, the line is not put on the map
        function drawPolyline(path, color, hide) {
            var line = new google.maps.Polyline({
                path: path,
                strokeColor: color,
                strokeOpacity: 0.9,
                strokeWeight: 3
            });
            if(! hide) {
                line.setMap(map);
            }
            return line;
        }
        function drawPolylineShadow(path, color, hide) {
            var line = new google.maps.Polyline({
                path: path,
                strokeColor: color,
                strokeOpacity: 0.4,
                strokeWeight: 7
            });
            if(! hide) {
                line.setMap(map);
            }
            return line;
        }

// Markers 
function setMarkers(map, locas) {
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    for (var i = 0; i < locas.length; i++) {
        var infowindow = new google.maps.InfoWindow();
        var image = {
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
    breaches = [];
    for (i = 0; i < data.length; i++) {
        breaches.push([data[i].PinLine1, data[i].PinLine2, data[i].PinURL, parseFloat(data[i].Latitude), parseFloat(data[i].Longitude), i, data[i].UserIcon])
    }
    setMarkers(map, breaches);
}

var regions = {};
var regions_count = 0;
function grid(map) {
    document.getElementById('btnGetRegion').addEventListener('click', function () {
        if (document.getElementById('gridLocation').value === '') {
            alert('Please enter Location.');
        } else {
            getLoc(document.getElementById('gridLocation').value, map);
        }
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
        checkExists(a);
    });
}
function checkExists(a) {
    var r = prompt("Enter The Region Name", "Region 1");
    var isExist = false;
    geo = [];
    if (r != null) {
        if (r.trim() != "") {
            var isExist = false;
            for (var count = 0; count < existingRegions.length ; count++) {
                if (existingRegions[count].RegionName.toLowerCase() === r.toLowerCase()) {
                    alert("Region Name is already exists.")
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                for (i = 0; i < a.length; i++) {
                    geo.push({ "lat": a[i].lat(), "lng": a[i].lng() });
                }
                regions.RegionName = r;
                regions.LocationInfo = JSON.stringify(geo);
                setPolygon(regions);

            } else {
                checkExists(a);
            }
        }
    } else if (r == null) {
        initMap("grid");
    } else {
        initMap("grid");
    }
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
        existingRegions = JSON.parse(parse_data);
        showPolygon(map, existingRegions);
    });
}

function showPolygon(map, data) {
    if (data.length) {
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
    var data = "";
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + loc,
        type: 'GET',
        dataType: "json",
        async: false
    }).done(function (dataResponse) {
        if (dataResponse.status = "OK") {
            if (dataResponse.results.length) {
                location_user = dataResponse.results[0].geometry.bounds.northeast;
                map.setCenter(location_user);
                var marker = new google.maps.Marker({
                    position: location_user,
                    map: map
                });
                checkReigon(location_user, map)
            } else {
                alert("No location Found");
                initMap('grid');
            }
        } else {
            alert("Something Went Wrong");
            initMap('grid');
        };
    })

}

function checkReigon(location_user, map) {
    var curPosition = new google.maps.LatLng(location_user.lat, location_user.lng);
    var data = "";
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
        var RegionName = "";
        for (i = 0; i < data.length; i++) {
            var path = JSON.parse(data[i].LocationInfo);
            var bermudaTriangle = new google.maps.Polygon({ paths: path });
            if (google.maps.geometry.poly.containsLocation(curPosition, bermudaTriangle)) {
                RegionName = RegionName + data[i].RegionName + ", ";
            } 
        }
        if (RegionName !== "") {
            RegionName = RegionName.substring(0, RegionName.length - 2);
        }
        else {
            RegionName = "NONE";
        }
        $("#region").html("Region:" + RegionName);
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

function setCurrentPosition(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        });
    }
}