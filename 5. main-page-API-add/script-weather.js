//다음 슬라이드에서 날씨 정보가 표시되지 않는다. -> 수정ing

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
    document.getElementById("icon-area").setAttribute(`src`,`https://openweathermap.org/img/wn/${icon}@2x.png`);
}
getWeatherInfo();