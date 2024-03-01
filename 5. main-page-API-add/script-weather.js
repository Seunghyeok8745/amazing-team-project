const API_KEY = `3b56745dd240621d3eaad2aac3d8a827`;

const success = (position) => {
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //alert("Current location is " + latitude + " and, " + longitude);
    getWeatherInfo(latitude,longitude);
}
const error = () => {
    alert("Location can't be found");
}

const getWeatherInfo = async (latitude,longitude) => {
    if(navigator.geolocation) // geolocation 을 지원한다면 위치를 요청한다. {
    navigator.geolocation.getCurrentPosition(success, error);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    //함수를 함수의 인수로 전달하고, 필요하다면 인수로 전달한 그 함수를 "나중에 호출(called back)"하는 것이 콜백 함수의 개념
    const data = await response.json();
    //console.log(data);

    const location = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    
    document.getElementById("location-area").innerHTML = `<id="location-area">location: ${location}</id=>`;
    document.getElementById("feelsLike-area").innerHTML = `<id="feelsLike-area">temperature: ${temperature}°</id=>`;
    document.getElementById("description-area").innerHTML = `<id="description-area">description: ${description}</id=>`;

    document.getElementById("location-area-1").innerHTML = `<id="location-area-1">location: ${location}</id=>`;
    document.getElementById("feelsLike-area-1").innerHTML = `<id="feelsLike-area-1">temperature: ${temperature}°</id=>`;
    document.getElementById("description-area-1").innerHTML = `<id="description-area-1">description: ${description}</id=>`;

    document.getElementById("location-area-2").innerHTML = `<id="location-area-2">location: ${location}</id=>`;
    document.getElementById("feelsLike-area-2").innerHTML = `<id="feelsLike-area-2">temperature: ${temperature}°</id=>`;
    document.getElementById("description-area-2").innerHTML = `<id="description-area-2">description: ${description}</id=>`;
}
getWeatherInfo();