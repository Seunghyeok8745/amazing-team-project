const API_KEY = `3b56745dd240621d3eaad2aac3d8a827`;

let buttonArea = document.getElementById("button-area");
buttonArea.addEventListener("click", () => {
    console.log(buttonArea);
    navigator.geolocation.getCurrentPosition(success, error);
    //사용자의 실제 위치를 브라우저에게 요청 가능.
});

const success = (position) => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //alert("Current location is " + latitude + " and, " + longitude);
    getWeatherInfo(latitude,longitude);
}
const error = () => {
    alert("Location can't be found");
}

const getWeatherInfo = async (lat,lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    //함수를 함수의 인수로 전달하고, 필요하다면 인수로 전달한 그 함수를 "나중에 호출(called back)"하는 것이 콜백 함수의 개념
    const data = await response.json();
    console.log(data);

    const location = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    document.getElementById("location-area").innerHTML = `<li id="location-area">location: ${location}</li>`;
    document.getElementById("feelsLike-area").innerHTML = `<li id="feelsLike-area">temperature: ${temperature}°</li>`;
    document.getElementById("description-area").innerHTML = `<li id="description-area">description: ${description}</li>`;
}
