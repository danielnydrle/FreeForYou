let center = SMap.Coords.fromWGS84(14.5140225, 50.1036436);
let map = new SMap(JAK.gel("map"), center, 14);
let marker = new SMap.Marker(center, "marker");
map.addDefaultLayer(SMap.DEF_BASE).enable();
var markerLayer = new SMap.Layer.Marker();
map.addLayer(markerLayer);
markerLayer.enable();
markerLayer.addMarker(marker);