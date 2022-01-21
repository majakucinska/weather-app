let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let currentDate = document.querySelector("h2");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

let globalTemp;

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureInCelcius = document.querySelector("#today-temperature");
  let windSpeed = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weatherDescription");
  let iconElement = document.querySelector("#weatherIcon");

  temperatureInCelcius.innerHTML = currentTemperature;
  globalTemp = currentTemperature;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  weatherDescription.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputEmail1");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiKey = "e4ead19c017d9f64a022f432f2068c11";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function displayCurrentLocation(response) {
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;
  showTemperature(response);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e4ead19c017d9f64a022f432f2068c11";
  let apiCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiCoordinates).then(displayCurrentLocation);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureInFahrenheit = document.querySelector("#today-temperature");
  temperatureInFahrenheit.innerHTML = Math.round(globalTemp * 1.8 + 32);
}

function showCelcius(event) {
  event.preventDefault();
  let temperatureInCelcius = document.querySelector("#today-temperature");
  temperatureInCelcius.innerHTML = globalTemp;
}

let form = document.querySelector("#main-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit-units");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celcius-units");
celcius.addEventListener("click", showCelcius);

let currentLocation = document.querySelector("#locationButton");
currentLocation.addEventListener("click", showCurrentLocation);
