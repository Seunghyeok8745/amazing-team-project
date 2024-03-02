document.addEventListener('DOMContentLoaded', function () {
  const searchIcon = document.querySelector('.search-icon');
  const searchBox = document.querySelector('.search-box');

  searchIcon.addEventListener('click', function () {
    searchBox.classList.toggle('show');
  });
});

async function initMap() {
  const options = await {
    zoom: 10,
    center: { lat: 37.5665, lng: 126.978 },
    //  light mode setting
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#f0f0f0' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#f0f0f0' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#333333' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#666666' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#666666' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#e0e0e0' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#336633' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#e0e0e0' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#666666' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#dadada' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#c0c0c0' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#666666' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#f2f2f2' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#666666' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c7e4f9' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#333333' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#c7e4f9' }],
      },
    ],
  };
  const map = new google.maps.Map(document.getElementById('map'), options);

  // user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const image = new google.maps.MarkerImage("./pin.png", null, null, null, new google.maps.Size(60,60));
        const userMarker = new google.maps.Marker({
          position: userLatLng,
          map: map,
          title: 'Your Location',
          icon: image
        });

        // center to user location
        map.setCenter(userLatLng);
      },
      function () {
        console.error('Error: The Geolocation service failed.');
      }
    );
  } else {
    console.error("Error: Your browser doesn't support geolocation.");
  }
}