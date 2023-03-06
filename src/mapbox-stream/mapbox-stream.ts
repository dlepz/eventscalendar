window.Webflow ||= [];
window.Webflow.push(() => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic29waG9jbGVzZW50ZXJwcmlzZXMiLCJhIjoiY2xlcmNzdTFuMDAydTN3cGpiY2c3cDRlbyJ9.n_vTDXLl9lWQkxrZV-rnvg';

  const nyButton = document.querySelector<HTMLAnchorElement>('[fs-element="button-ny"]');
  if (!nyButton) {
    return;
  }

  const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    zoom: 4,
    center: [30, 50],
    projection: 'globe',
  });

  const boroughs = [
    {
      name: 'Brooklyn',
      color: 'blue',
      lngLat: [-73.96666, 40.647843],
    },
    {
      name: 'Manhattan',
      color: 'red',
      lngLat: [-73.96666, 44.647843],
    },
    {
      name: 'Queens',
      color: 'orange',
      lngLat: [-73.96666, 43.647843],
    },
    {
      name: 'The Bronx',
      color: 'yellow',
      lngLat: [-73.96666, 41.647843],
    },
    {
      name: 'Brooklyn',
      color: 'purple',
      lngLat: [-74.96666, 40.647843],
    },
  ];
  nyButton.addEventListener('click', (e) => {
    e.preventDefault();
    map.setCenter([-73.98932594590487, 40.766870592954014]);
  });

  boroughs.forEach(({ name, color, lngLat }) => {
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

    // Create a default Marker and add it to the map.
    new mapboxgl.Marker({
      scale: 0.6,
      color,
    })
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(map);
  });

  map.on('load', () => {
    // Set the default atmosphere style
    map.setFog({});

    //add a source layer for the nyc borough boundaries
    map.addSource('borough-boundaries', {
      type: 'geojson',
      data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
    });
  });
});