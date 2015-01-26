'use strict';

function initialize() {

	var gm = google.maps;
	var map = new gm.Map(document.getElementById('map-canvas'), {
	  mapTypeId: gm.MapTypeId.ROADMAP,
	  center: new gm.LatLng(50, 0), 
	  zoom: 6
	});

	var markers = { 
		marker : [
			{ 'lat': 50, 'lng': 0, 'h': 'Marker 1', 'd': '<h3>Marker 1</h3>' },
			{ 'lat': 50, 'lng': 0, 'h': 'Marker 2', 'd': '<h3>Marker 2</h3>' },
			{ 'lat': 50, 'lng': 0, 'h': 'Marker 3', 'd': '<h3>Marker 3</h3>' }
		]
	};

	// Create an OverlappingMarkerSpiderfier instance:
	var oms = new OverlappingMarkerSpiderfier(map);

	// Instead of adding click listeners to your markers directly via google.maps.event.addListener, 
	// add a global listener on the OverlappingMarkerSpiderfier instance instead. The listener will be 
	// passed the clicked marker as its first argument, and the Google Maps event object as its second.
	var iw = new gm.InfoWindow();
	oms.addListener('click', function(marker, event) {
	  iw.setContent(marker.desc);
	  iw.open(map, marker);
	});

	// You can also add listeners on the spiderfy and unspiderfy events, which will be passed an array 
	// of the markers affected. In this example, we observe only the spiderfy event, using it to close 
	// any open InfoWindow:
	oms.addListener('spiderfy', function(markers) {
	  iw.close();
	});

	// Finally, tell the OverlappingMarkerSpiderfier instance about each marker as you add it, using 
	// the addMarker method:
	for (var i = 0; i < markers.marker.length; i ++) {
	  var datum = markers.marker[i];
	  var loc = new gm.LatLng(datum.lat, datum.lng);
	  var marker = new gm.Marker({
	    position: loc,
	    title: datum.h,
	    map: map
	  });
	  marker.desc = datum.d;
	  oms.addMarker(marker);  // <-- here
	}
}

google.maps.event.addDomListener(window, 'load', initialize);