const apiKey = '3b56745dd240621d3eaad2aac3d8a827';

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

function getWeather(latitude, longitude, city) {
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    if (data.main) {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;

        createWeatherCard(city, temperature, weatherDescription);
    } else {
        console.error('Error fetching weather data.');
    }
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });
}

function getLatLong(address, city) {
const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyAUHg3y4dUwVYEbWmzNxVNaVO38E7ArsKA`;

fetch(geocodingUrl)
    .then(response => response.json())
    .then(data => {
    if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        getWeather(latitude, longitude, city);
    } else {
        console.error('No results found for the given address.');
    }
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });
}

getLatLong('Honolulu, HI', 'Honolulu');

//getLatLong('Vancouver, BC', 'Vancouver');
