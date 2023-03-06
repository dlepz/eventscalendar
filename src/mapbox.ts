window.Webflow ||= [];
window.Webflow.push(() => {

//remove map wrapper
$(".locations-map_wrapper").removeClass("is--show");


//-----------MAPBOX SETUP CODE BELOW-----------

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! REPLACE ACCESS TOKEN WITH YOURS HERE !!!
mapboxgl.accessToken = "pk.eyJ1Ijoia2NrYXRjcmVhdGl2ZSIsImEiOiJjbDgzZTc4ZXUwM2NhM3BwY2k1a3dxbXgyIn0.zFz6wTLYXd72krGjtjF-3g";
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// create empty locations geojson object
let mapLocations = {
	type: "FeatureCollection",
	features: [],
};

let selectedMapLocations = [];

// Initialize map and load in #map wrapper
let map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/kckatcreative/clcdprcpm000814n0clb6knwm",
	center: [-85.479, 35.861],
	zoom: 6.59,
});

// Adjust zoom of map for mobile and desktop
let mq = window.matchMedia("(min-width: 480px)");
if (mq.matches) {
	map.setZoom(6.59); //set map zoom level for desktop size
} else {
	map.setZoom(6); //set map zoom level for mobile size
}

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Get cms items
let listLocations = document.getElementById("location-list").childNodes;

// For each colleciton item, grab hidden fields and convert to geojson proerty
function getGeoData() {
	listLocations.forEach(function (location, i) {
		console.log(location);
		let locationLat = location.querySelector("#locationLatitude").value;
		let locationLong = location.querySelector("#locationLongitude").value;
		let locationInfo = location.querySelector(".locations-map_card").innerHTML;
		let coordinates = [locationLong, locationLat];
		let locationID = location.querySelector("#locationID").value;
    //add array ID
    let arrayID = (i + 1) - 1;
		let geoData = {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: coordinates,
			},
			properties: {
				id: locationID,
				description: locationInfo,
        arrayID: arrayID,
			},
     
		};

		if (mapLocations.features.includes(geoData) === false) {
			mapLocations.features.push(geoData);
		}
	});
	console.log(mapLocations);
}

// Invoke function
getGeoData();

// define mapping function to be invoked later
function addMapPoints() {
	/* Add the data to your map as a layer */
	map.addLayer({
		id: "locations",
		type: "circle",
		/* Add a GeoJSON source containing place coordinates and information. */
		source: {
			type: "geojson",
			data: mapLocations,
		},
		paint: {
			"circle-radius": 8,
			"circle-stroke-width": 1,
			"circle-color": "#FF9900",
			"circle-opacity": 1,
			"circle-stroke-color": "#405F3B",
		},
	});
  
  
  
  
 // open a popup with the correct location 
 function addPopup(e) {
		// Copy coordinates array.
		const coordinates = e.features[0].geometry.coordinates.slice();
		const description = e.features[0].properties.description;

		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map); 
 }
 
	// When a click event occurs on a feature in the places layer, open a popup at the
	// location of the feature, with description HTML from its properties.

	map.on("click", "locations", (e) => {
  	//find ID of collection item in array
    const ID = e.features[0].properties.arrayID;
 		//add popup 
     addPopup(e);
    //show webflow Collection module
    $(".locations-map_wrapper").addClass("is--show");
    
    //Check if an item is currently there
    if ($(".locations-map_item.is--show").length) {
    $(".locations-map_item").removeClass("is--show");
  } 
  	//find collection item by array ID and show it
    $(".locations-map_item").eq(ID).addClass("is--show");
	});

   
	// Center the map on the coordinates of any clicked circle from the 'locations' layer.
	map.on("click", "locations", (e) => {
		map.flyTo({
			center: e.features[0].geometry.coordinates,
			speed: 0.5,
			curve: 1,
			easing(t) {
				return t;
			},
		});
	});
  
// Change the cursor to a pointer when the mouse is over the 'locations' layer.
	map.on("mouseenter", "locations", () => {
		map.getCanvas().style.cursor = "pointer";
	});

	// Change it back to a pointer when it leaves.
	map.on("mouseleave", "locations", () => {
		map.getCanvas().style.cursor = "";
	});
}


//When map is loaded initialize with data
map.on("load", function (e) {
	addMapPoints();
});


//close side nav with button
$(".close-block").click(function(){
	$(".locations-map_wrapper").removeClass("is--show");
});


//hover stuff

//set hover popup
const popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});


map.on('mouseenter', 'locations', (e) => {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';
 
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
});
 
map.on('mouseleave', 'locations', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});
});
