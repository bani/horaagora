/**
* This script is based on a work by Chester (http://chester.blog.br)
* The globe with clock marker is licensed as CC-BY-SA, based on the work at http://commons.wikimedia.org/wiki/File:Globe_current.svg
*/

var map;
var infowindows = [];
var markers;

function load_map(){
    city_center = new google.maps.LatLng(33.0, 0.0);
    map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 2,
        scaleControl: true,
        center: city_center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    listener = google.maps.event.addListener(map, 'tilesloaded', function(event){
        google.maps.event.removeListener(listener);
        for (i in markers) {
            var m = markers[i];
            if (m && m.lat) {
                add_marker(m.lat, m.lng, m.time, m.location);
            }
        }
    });
}

function add_marker(lat, lng, time, location){
    var latlng = new google.maps.LatLng(lat, lng);
    var infowindow = new google.maps.InfoWindow({
        content: '<div class="div_map_infowindow"><h1>'+time+'</h1><h2>'+location+'</h2></div>'
    });
    infowindows.push(infowindow);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "mapa/marker.png",
        title: location
    });
    google.maps.event.addListener(marker, 'mouseover', function(event){
        for (i in infowindows) {
            infowindows[i].close();
        }
        infowindow.open(map, marker);
    });
	google.maps.event.addListener(marker, 'mouseout', function(event){
		infowindow.close(map, marker);
	});
}


function adjust_map_height(){
    n = $(document).height() - 125;
    $(".div_map").css("height", n + "px");
}

$(document).ready(function(){
	$.getJSON('mapa.json', function(data) {
		markers = eval(data);
	    adjust_map_height();
	    load_map();
	    $(window).resize(function(){
	        adjust_map_height();
	    });
	});
});
