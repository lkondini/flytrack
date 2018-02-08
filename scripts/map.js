mapboxgl.accessToken = 'pk.eyJ1IjoibGFrc2htYW4zNzgiLCJhIjoiY2pjeG9kc2V0NTZnbTJybnhyMHc5eTU4aSJ9.MGqabj9Cg68xLlFpfr1L0Q';
var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [78.96288,20.593684],
    zoom: 5,
    pitch: 45,
    bearing: 25.6,
    hash: true,
    container: 'map'
});

var coordinatestoFit =[];

// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function() {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;
    
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }
	map.dragRotate.disable();

	// disable map rotation using touch rotation gesture
	map.touchZoomRotate.disableRotation();


	setInterval(function() {
		if (droneData) {
	  		$('.marker').remove();
	  		// droneData = _filter(droneData)
			var mappedDroneData = _.map(droneData, function (item, id) {
				return ({
					id: id,
					type: 'Feature',
					geometry: {
						type: 'point',
						coordinates: [item.long, item.lat],
					},
					properties: item,
				})
			});
			coordinatestoFit = [];


			mappedDroneData.forEach(function(marker) {
			  // create a HTML element for each feature
				var el = document.createElement('div');
				el.className = 'marker ' + _.lowerCase(marker.properties.type);
				el.id = 'marker-' + marker.id;
				// var imgUrl = '../../Assets/marker-green.png';
				// let currentHeightOfDrone = marker.properties['elevation']
				// if(Math.round(currentHeightOfDrone) >= 700){
				// 	$('.marker').css('background-image','url('+imgUrl+')');
				// }
				// make a marker for each feature and add to the map
				const popupId = $('.popup_container').attr('id');
				if (marker.id === popupId) {
					_.keys(marker.properties).forEach(function (key, index) {
						$('#' + key).html(marker.properties[key])
					});
				}
				coordinatestoFit.push(marker.geometry.coordinates);
				console.log(coordinatestoFit);

			  	new mapboxgl.Marker(el)
			    .setLngLat(marker.geometry.coordinates)
			    .setPopup(new mapboxgl.Popup({ closeButton: true, closeOnClick: true, offset: 25})
			  		.setHTML('<div class="popup_container" id="'+ marker.properties.id +'">'+
							'<div class="popup_title">'+
								'<div class="popDetails">'+
									'<p>Drone ID : '+marker.id+'</p>'+
								'</div>'+
							'</div>'+
							'<div class="popup_main_content">'+
							'<table>'+
								_.join(_.map(_.keys(marker.properties), function(key) {
									return(
										'<tr>'+
											'<td>'+key+'</td>'+
											'<td id="'+key+'">'+marker.properties[key]+'</td>'+
										'</tr>');
								}), '') +
							'</table>'+
							'<div class="footer">'+
								'<button id="btn" onclick="opensSideBar('+"'"+marker.properties.pilotId+"'"+')" type="submit"><strong>Notify</strong></button>'+
								'<button><strong>Send location</strong></button>'+
							'</div>'+
						'</div>')
			  		)
	  			.addTo(map);
				if (el.id === 'marker-' + popupId) {
					let clName = $('.mapboxgl-popup').attr('class');
					let istop = _.includes(clName, 'top');
					if(istop === true){
						var markerOffset = $($(el)).offset();
						var popupOffset = {
							top: markerOffset.top + 52,
							left: markerOffset.left - 118
						};
					}
					else{
						var markerOffset = $($(el)).offset();
						var popupOffset = {
							top: markerOffset.top - $('.mapboxgl-popup').height(),
							left: markerOffset.left - 200
						};
					}
					
					var popup = $($('.mapboxgl-popup')[0]);
		  			popup.offset(popupOffset)
				} 
			});
		}
	}, 1000);

    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId);

    document.getElementById('zoomto').addEventListener('click', function() {

        // Geographic coordinates of the LineString
        console.log('abc');
        // Pass the first coordinates in the LineString to `lngLatBounds` &
        // wrap each coordinate pair in `extend` to include them in the bounds
        // result. A variation of this technique could be applied to zooming
        // to the bounds of multiple Points or Polygon geomteries - it just
        // requires wrapping all the coordinates with the extend method.
        var coordinates = coordinatestoFit;
        var bounds = coordinates.reduce(function(bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
        console.log(bounds);
        map.fitBounds(bounds, {
            padding: 20
        });
    });
});




