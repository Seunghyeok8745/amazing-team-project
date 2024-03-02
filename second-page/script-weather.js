const API_KEY = `3b56745dd240621d3eaad2aac3d8a827`;

const getWeatherInfo = async (lat,lng) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const currentLocation = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            console.log(currentLocation);
        })}
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data);

    const location = data.name;
    const description = data.weather[0].description;

    document.getElementById("location-underline").innerHTML = `<h2 id="location-underline">${location}</h2>`;
    document.getElementById("weather-underline").innerHTML = `<h2 id="weather-underline">${description}</h2>`;
}
getWeatherInfo();