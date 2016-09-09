function initializeApp() {
    var noSleep = new NoSleep();
    noSleep.enable();

    $(window).resize(function () {
        var h = $(window).height(),
            offsetTop = 60; // Calculate the top offset
        $('#mapPlotting').css('height', (h - offsetTop));
    }).resize();
    $("#btnMapPlotting").click(function (event) {
        $('#mapPlottingPin').show();
        $('#singleTrip').hide();
        $('#singleTripTime').hide();
        $('#grid').hide();
        initMap("plot");
    });
    $("#btnSingleTrip").click(function (event) {
        initMap("trip");
        $('#singleTrip').show();
        $('#mapPlottingPin').hide();
        $('#singleTripTime').hide();
        $('#grid').hide();
    });
    $("#btnGrid").click(function (event) {
        initMap("grid");
        $('#grid').show();
        $('#singleTrip').hide();
        $('#mapPlottingPin').hide();
    });
    $("#btnMapTrip").click(function (event) {
        $('#singleTripTime').show();
        setDirections(map);
    });
     $("#btnResetTrip").click(function (event) {
        $('#singleTripTime').hide();
        document.getElementById('fromLocation').value="";
        document.getElementById('toLocation').value="";
        document.getElementById('fromLatLong').value="";
        document.getElementById('toLatLong').value="";
        initMap("trip"); 
    });
    //$("#btnGetRegion").click(function (event) {
    //    $.getJSON('MappingPOCServices.asmx/GetUserRegions', function (response) {
    //        console.log('Data=', response);
    //    });
    //});
    //$("#btnSaveGrid").click(function (event) {
    //    var data = {};
    //    $.ajax({
    //        url: 'MappingPOCServices.asmx/SaveUserRegion',
    //        type: 'POST',
    //        contentType: 'application/json',
    //        data: JSON.stringify({ location: data }),
    //        dataType: 'json'
    //    });
    //});
    $("#btnCancelGrid").click(function (event) {
        alert('Cancel grid click');
    });

    setInterval(function () {
        getLocation();
    }, 10000);
}