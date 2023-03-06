//AIzaSyAYoBdRVwTksN0uUhmYLE1YbNVvtrxz77g
window.Webflow ||= [];
window.Webflow.push(() => {
  const mapElement = document.querySelector<HTMLElement>('[fs-element="map-target"]');
  if (!mapElement) {
    return;
  }
  const map = new window.google.maps.Map(mapElement, {
    zoom: 11,
    center: { lat: 21.168078829332103, lng: -86.84992237641961 },
  });

  const nyButton = document.querySelector<HTMLAnchorElement>('[fs-element="button-ny"]');
  if (!nyButton) {
    return;
  }

  nyButton.addEventListener('click', (e) => {
    e.preventDefault();

    map.getRenderingType;

    map.setCenter({
      lat: 40.766870592954014,
      lng: -73.98932594590487,
    });
  });

  const form = document.querySelector<HTMLFormElement>('[fs-element="search-form"]');
  const input = document.querySelector<HTMLInputElement>('[fs-element="search-input"]');

  if (!form || !input) {
    return;
  }
  // Add autocompletion to the input
  const autocomplete = new window.google.maps.places.Autocomplete(input, {
    fields: ['geometry'],
    types: ['geocode'],
  });

  //check when the user submits the form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = autocomplete.getPlace();

    map.setCenter(value.geometry.location!);
    console.log(value);
  });
  //get the input value

  //center the map to the user's requested place
});
