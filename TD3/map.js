var map;
var marker;

var lang = "fr";

function initMap() {
    map = new google.maps.Map(document.getElementById('carte'), {
        center: {lat: 45.5, lng: -73.550003},
        zoom: 10,
        minZoom: 2,
        maxZoom: 19
    });

    map.zoom_changed = function () {
        $("#slider").slider({

            value: map.getZoom()
        });
    };

    marker = new google.maps.Marker();
    marker.setMap(map);
    marker.setDraggable(false);
}

$(document).ready(function(){

    var villes = [];
    var villesData = [];
    var villeActive;
    
    $.getJSON('villes.json', function(data) {

        $.each( data, function( ville, lat, lon ) {
            villes.push(ville);
        });

        villesData = data;
    });

    $("#slider").slider({
        min: 2,
        max: 19,
        value: 10,
        
        slide: function (event, ui) {
            map.setZoom(ui.value);
        }
    });

	$("#btn-fr").click(function(){

        $('.eng').hide();
        $('.fr').show();

        lang = "fr";

        updateCurrentCity();
	});

    $("#btn-en").click(function(){
        
        $('.fr').hide();
        $('.eng').show();

        lang = "en";

        updateCurrentCity();
    });

    function updateCurrentCity () {

        if (lang === "fr" && villeActive !== undefined) {
            $('#nom-ville').html("La ville sélectionnée est : " + villeActive);
        }

        else if (villeActive !== undefined) {

            $('#nom-ville').html("The selected city is : " + villeActive);
        }
    }

    $("#villes").autocomplete({
        source: villes,

        

        select: function(envent, ui){

            villeActive = ui['item'].value;

            var pos = new google.maps.LatLng(villesData[villeActive].lat, villesData[villeActive].lon, true);

            map.panTo(pos);
            marker.setPosition(pos);
            map.setZoom(10);

            $("#slider").slider({
                
                value: 10
            });
            
            updateCurrentCity();
        }
    });
    
    $("#villes").keypress(function (event) {
        
        if (event.keyCode == 13)
            event.preventDefault();
    })
});