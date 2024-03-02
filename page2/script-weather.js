const API_KEY = `3b56745dd240621d3eaad2aac3d8a827`;

const success = position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeatherInfo(latitude, longitude);
};
const error = async () => {
  console.warning('location permission needed for the precise weather info');
};

const getWeatherInfo = async (latitude, longitude) => {
  console.log('recursive called: getWeatherInfo');
  if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, error);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();

  const location = data.name;
  const description = data.weather[0].description;

  document.getElementById('location-underline').innerHTML = `<h2 id="location-underline">${location}</h2>`;
  document.getElementById('weather-underline').innerHTML = `<h2 id="weather-underline">${description}</h2>`;
};
