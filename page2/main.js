const searchInput = document.querySelector('.search-input');
const searchParam = new URLSearchParams(window.location.search);
const origin = window.location.origin;
const path = window.location.pathname;
const originPath = `${origin}${path}`;

const city = searchParam.has('city') ? searchParam.get('city') : '';
const coutry = searchParam.has('coutry') ? searchParam.get('coutry') : '';
const date = searchParam.has('date') ? searchParam.get('date') : '';

const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
const basesURL = `${protocol}//${hostname}${port ? `:${port}` : ''}/.netlify/functions`;

const getCurrentLocationByIp = async () => {
  const url = `${basesURL}/currentLocation`;
  console.log(`backend: ${url}`);
  const res = await fetch(url);

  //
  if (res.status / 100 !== 2) {
    console.error('cannot find the place by ip');
    return '{}';
  }

  return await res.json();
};

const getCityLat = async cityName => {
  const url = `${basesURL}/locationlat?city=${cityName}`;
  console.log(`backend: ${url}`);
  return fetch(url).then(res => res.json());
};

document.addEventListener('DOMContentLoaded', function () {
  const searchIcon = document.querySelector('.search-icon');
  const searchBox = document.querySelector('.search-box');

  searchIcon.addEventListener('click', function () {
    searchBox.classList.toggle('show');
  });

  // if you want to know previous seach result
  searchInput.value = city;
});

searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    const keyword = searchInput.value;
    console.log(keyword);
    window.open(`${originPath}?city=${keyword}`, '_self');
  }
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

  const drawMap = (latitude, longitude) => {
    console.log(latitude, longitude);
    const userLatLng = {
      lat: latitude,
      lng: longitude,
    };

    const userMarker = new google.maps.Marker({
      position: userLatLng,
      map: map,
      title: 'Your Location',
    });

    // center to user location
    map.setCenter(userLatLng);
  };

  if (city) {
    getCityLat(city).then(loc => drawMap(loc.latitude, loc.longitude));
  } else if (navigator.geolocation) {
    // user location
    navigator.geolocation.getCurrentPosition(
      position => drawMap(position.coords.latitude, position.coords.longitude),
      () => {
        getCurrentLocationByIp().then(data => drawMap(data.latitude, data.longitude));
      }
    );
  } else {
    console.log(await getCurrentLocationByIp());
    console.error("Error: Your browser doesn't support geolocation.");
  }
}
