const placeInput = document.getElementById("srcUbicacion");

let autocomplete;
let map;
let position = {
  lat: 14.0818000,
  lng: -87.2068100
};
const center = {
  lat: 15.199999,
  lng: -86.241905
}

let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {

    center: {
      lat: position.lat,
      lng: position.lng
    },
    zoom: 8,
  });
  let infoWindow = new google.maps.InfoWindow({});


  infoWindow.open(map);

  map.addListener("click", (mapsMouseEvent) => {
    infoWindow.close();

    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });

    $("#lat").val(mapsMouseEvent.latLng.lat());
    $("#lon").val(mapsMouseEvent.latLng.lng());
    $("#alt").val(15);

    infoWindow.setContent(
      "Ubicación encontrada."
    );

    infoWindow.open(map);
  });

  const marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(position.lat, position.lng),
    title: 'Honduras'
  });

  const locationButton = document.createElement("button");
  locationButton.textContent = "Ubicación actual";
  locationButton.classList.add("btn", "btn-success", "btn-sm", "mt-2", "mb-2", "mx-2", "text-center", "text-uppercase", "rounded", "border-0", "shadow-sm");
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(placeInput);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          $("#lat").val(pos.lat);
          $("#lon").val(pos.lng);
          
          console.log(pos.lat, pos.lng, pos.place)
          infoWindow.setPosition(pos);
          infoWindow.setContent("Posición encontrada.");
          infoWindow.open(map);
          map.setCenter(pos);


        //   const marker = new google.maps.Marker({
        //     map: map,
        //     position: new google.maps.LatLng(pos.lat, pos.lng),
        //     title: 'Ubicacion actual',
        //     infoWindow: new google.maps.InfoWindow({
        //       content: 'Ubicacion actual'
        //     })
        //   });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  search();
}

const search = () => {
  autocomplete = new google.maps.places.Autocomplete(placeInput);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    map.setCenter(place.geometry.location);
    map.setZoom(15);
  });
}

initMap();