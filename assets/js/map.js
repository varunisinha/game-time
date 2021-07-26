//Map object 
var map = null;
var mapMarker = null;

function initMap() {
    // Where you want to render the map.
    var element = document.getElementById('osm-map');

    // Height has to be set. You can do this in CSS too.
    element.style = 'height:300px;';

    // Create Leaflet map on map element.
    map = L.map(element);

    // Add OSM tile layer to the Leaflet map.
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Target's GPS coordinates.
    var mapTarget = L.latLng(stadiumCoor.NewYork.lat, stadiumCoor.NewYork.lon);

    // Set map's center to target with zoom 14.
    map.setView(mapTarget, 14);
}

function showMap(lat, lon, desc) {
    //Remove the previously added marker
    if (mapMarker != null) {
        L.marker(mapMarker).remove(map);
    }
    // Target's GPS coordinates.
   var  mapTarget = L.latLng(lat, lon);
    // Set map's center to target with zoom 14.
    map.setView(mapTarget, 14);
    // Place a marker on the same location.
    mapMarker = L.marker(mapTarget).addTo(map);
    if (desc) mapMarker.bindPopup(desc).openPopup();

}