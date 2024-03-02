const apiKey = '3b56745dd240621d3eaad2aac3d8a827';

// const protocol = window.location.protocol;
// const hostname = window.location.hostname;
// const port = window.location.port;
// const basesURL = `${protoco}//${hostname}${port ? `:${port}` : ''}/.netlify/functions`;

const weatherSliderContainer = document.querySelector('#weather-slider-container');

const getCityImgae = async (cityName) => {
  const url = `${basesURL}/photo?city=${cityName}`;
  console.log(`city image: ${url}`);
  const res = await fetch(url);
  if (res.status / 100 !== 2) {
    console.error(`failed to get image: ${url}, ${res.status}`);
    return './image-files/banffPhoto.jpg';
  }
  data = await res.json();
  return await data.photoURL;
};

const weatherCardTemplate = (cityName, state, cityImage, temperature, weatherDescription) => {
  return `<div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 12" style="width: 239.75px; margin-right: 50px;">
  <div class="img_box img_box-deco">
    <div class="weather-city-image-container">
      <img src="${cityImage}" alt="maui" srcset="">
    </div>
    <!--이 부분이 달라-->
    <div class="overlay overlay-deco">
      <div class="slide-content">
        <div id="weather-container" style="color: white;"><div class="weather-card" style="color: white;"><h2 style="color: white;">${cityName}</h2><p style="color: white;">Temperature: ${temperature}°C</p><p style="color: white;">Description: ${weatherDescription}</p></div></div>
      </div>
    </div>
    <!--이 부분이 달라-->
    <div class="slide-title" style="opacity: 1;">${cityName}</div>
    <div class="slide-subtitle" style="opacity: 1;">${state}</div>
  </div>
</div>
`;
};

const insertWeatherCard = (cityName, state, cityImage, temperature, weatherDescription) => {
  weatherSliderContainer.innerHTML += weatherCardTemplate(cityName, state, cityImage, temperature, weatherDescription);

  const swiper = new Swiper('.card_slider', {
    direction: 'horizontal',
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 50,
    loop: false,
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

  function updatePagination() {
    const totalSlides = swiper.length;
    const totalPages = Math.ceil(totalSlides / 4);
    const pagination = document.querySelector('.swiper-pagination');
    const bullets = pagination.querySelectorAll('.swiper-pagination-bullet');
  }

  // 초기 페이지네이션 설정
  updatePagination();
};

function createWeatherCard(city, temperature, description) {
  const weatherContainer = document.getElementById('weather-container');

  const card = document.createElement('div');
  card.className = 'weather-card';

  const cityName = document.createElement('h2');
  cityName.textContent = city;

  const temp = document.createElement('p');
  temp.textContent = `Temperature: ${temperature}°C`;

  const desc = document.createElement('p');
  desc.textContent = `Description: ${description}`;

  card.appendChild(cityName);
  card.appendChild(temp);
  card.appendChild(desc);

  weatherContainer.appendChild(card);
}

const getWeather = async (latitude, longitude, city, country, cityImage) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  const res = await fetch(apiUrl);
  if (res.status / 100 !== 2) console.error(`Error fetching data:, ${res.statusText}`);

  const data = await res.json();
  const main = data?.main;

  if (main) {
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    insertWeatherCard(city, country, cityImage, temperature, weatherDescription);
  }
};

async function getLatLong(city, country, cityImage) {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=AIzaSyAUHg3y4dUwVYEbWmzNxVNaVO38E7ArsKA`;

  const res = await fetch(geocodingUrl);
  const data = await res.json();
  if (data.length == 0) {
    console.error(`failed to get ${city}`);
    return;
  }

  const location = data.results[0].geometry.location;
  const latitude = location.lat;
  const longitude = location.lng;
  cityImage = cityImage ?? (await getCityImgae(city));
  getWeather(latitude, longitude, city, country, cityImage);
}

const main = () => {
  const cityNameList = [
    { city: 'Boracay', country: 'Philippines' },
    { city: 'Seattle', country: 'USA' },
    { city: 'New York', country: 'USA' },
    { city: 'Dubai', country: 'United Arab Emirates' },
    { city: 'Montreal', country: 'Canada' },
    { city: 'Seoul', country: 'South Korea' },
    { city: 'Vancouver', country: 'Canade' },
    { city: 'Hawaii', image: './image-files/hawaiiPhoto.jpg', country: 'USA' },
    { city: 'Jeju', image: './image-files/jejuIslandPhoto.jpg', country: 'South Korea' },
    { city: 'kyoto', image: './image-files/kyotoPhoto.jpg', country: 'Japan' },
    { city: 'London', image: './image-files/englandPhoto.jpg', country: 'England' },
    { city: 'Vancouver', image: './image-files/Vancouver.webp', country: 'Canada' },
  ];
  cityNameList.forEach(city => getLatLong(city.city, city.country, city.image));
};

main();

//getLatLong('Vancouver, BC', 'Vancouver');

// insertWeatherCard('cityName', 'state', './image-files/banffPhoto.jpg', 'temperature', 'weatherDescription');
