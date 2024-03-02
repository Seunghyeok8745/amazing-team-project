const API_KEY = `3b56745dd240621d3eaad2aac3d8a827`;
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

const success = position => {
  //console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //alert("Current location is " + latitude + " and, " + longitude);
  getWeatherInfo(latitude, longitude);
};
const error = async () => {
  console.wraning('location permission needed for the precise weather info');
};

const getWeatherInfo = async (latitude, longitude) => {
  console.log('recursive called: getWeatherInfo');
  if (navigator.geolocation)
    // geolocation 을 지원한다면 위치를 요청한다. {
    navigator.geolocation.getCurrentPosition(success, error);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  //함수를 함수의 인수로 전달하고, 필요하다면 인수로 전달한 그 함수를 "나중에 호출(called back)"하는 것이 콜백 함수의 개념
  const data = await response.json();
  //console.log(data);

  const location = data.name;
  const description = data.weather[0].description;

  document.getElementById("location-underline").innerHTML = `<h2 id="location-underline">${location}</h2>`;
  document.getElementById("weather-underline").innerHTML = `<h2 id="weather-underline">${description}</h2>`;
};

getCurrentLocationByIp().then(data => getWeatherInfo(data?.latitude, data?.longitude));
