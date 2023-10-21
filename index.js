const fahrenButton = document.getElementById("FahrenScale");
const celScale = document.getElementById("celScale");
const cityInput = document.getElementById("city");

let fahrenScale = false;
fahrenButton.addEventListener("click", function () {
  // Set the flag to true when the button is clicked
  fahrenScale = true;
  // console.log("fahren");
  document.querySelector(".today-forecast").innerHTML = "";
  document.querySelector(".week-forecast").innerHTML = "";
  fetchData();
  // manipulateData();
  // You can perform other actions here as well
  // alert("Button clicked!");
});
celScale.addEventListener("click", function () {
  // Set the flag to true when the button is clicked
  fahrenScale = false;
  console.log("fahren");
  document.querySelector(".today-forecast").innerHTML = "";
  document.querySelector(".week-forecast").innerHTML = "";
  fetchData();
  // manipulateData();
  // You can perform other actions here as well
  // alert("Button clicked!");
});

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validateCity();
  }
});
function validateCity() {
  // Get the input value
  const cityName = cityInput.value;
  const regex = /^[A-Za-z\s\-]+$/;

  // Check if the input is empty or doesn't match the regex
  if (cityName.trim() === "" || !regex.test(cityName)) {
    // document.getElementById("error-message").innerHTML = "Please enter a valid city name.";
    console.log("empty city");
  } else {
    // document.getElementById("error-message").innerHTML = ""; // Clear any previous error message
    // You can proceed with your validation logic here
    // performValidation(cityName);
    console.log("Validating city: " + cityName);
    document.querySelector(".today-forecast").innerHTML = "";
    document.querySelector(".week-forecast").innerHTML = "";
    fetchData();
  }
  // cityInput.value = "";
}

async function fetchData() {
  try {
    // Make an API request using the fetch function
    // /https://api.weatherapi.com/v1/forecast.json?key=f742d06a81ec4843908103609231910&q=panipat&days=7&aqi=no&alerts=no
    const baseUrl =
      "https://api.weatherapi.com/v1/forecast.json?key=f742d06a81ec4843908103609231910";
    const apiKey = "8fe9a7eefc5dd144e76e6266356b707f";

    const url = baseUrl + "&q=" + cityInput.value + "&days=" + 7;

    const response = await fetch(url);

    // Check if the response status code is OK (200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response data as JSON
    data = await response.json();

    // Use the data in your application
    // console.log(data.name);
    console.log(url);
    // console.log(data.current.condition.text);
    // console.log(url);
    manipulateData(data);
  } catch (error) {
    console.log("error occured");
    console.error("Error:", error);
  }
}

function getWeatherImageUrl(data) {
  console.log(data);
  let weatherImage;

  if (data.includes("rain")) {
    weatherImage = `<img src="/icons/Rain-icon.png" style="height: 40px; width: 60px" />`;
  } else if (
    data.includes("Cloud") ||
    data.includes("cloudy") ||
    data.includes("Overcast")
  ) {
    weatherImage = `<img src="/icons/Cloud-icon.png" style="height: 40px; width: 50px" />`;
  } else if (
    data.includes("Fog") ||
    data.includes("Mist") ||
    data.includes("fog")
  ) {
    weatherImage = `<img src="/icons/Fog-icon.png" style="height: 40px; width: 70px" />`;
  } else if (data.includes("drizzle")) {
    weatherImage = `<img src="/icons/drizzle-icon.png" style="height: 40px; width: 70px" />`;
  } else {
    weatherImage = `<img src="/icons/${data}-icon.png" style="height: 40px; width: 40px" />`;
  }
  return weatherImage;
}

function weatherDay(data) {
  let weatherOfDay;
  if (data.includes("rain")) {
    weatherOfDay = "rain";
  } else if (
    data.includes("Cloud") ||
    data.includes("cloudy") ||
    data.includes("Overcast")
  ) {
    weatherOfDay = "Cloudy";
  } else if (
    data.includes("Fog") ||
    data.includes("Mist") ||
    data.includes("fog")
  ) {
    weatherOfDay = "Fog";
  } else if (data.includes("drizzle")) {
    weatherOfDay = "drizzling";
  } else {
    weatherOfDay = data;
  }
  return weatherOfDay;
}

function manipulateData(data) {
  const weatherImageMain = document.getElementById("weatherImageMain");
  weatherImageMain.innerHTML = getWeatherImageUrl(data.current.condition.text);

  // Get the image element(s) within "weatherImageMain"
  const images = weatherImageMain.getElementsByTagName("img");

  const cssLink = document.getElementById("cssLink");
  console.log(data.current.is_day);
  console.log("bcbcbc");
  console.log(data.forecast.forecastday[0].day.daily_will_it_rain);

  console.log(data.current.condition.text);

  if (data.current.condition.text === "Overcast") {
    cssLink.href = "./css/cloudyWeather.css";
    document.querySelector(".cloud-animation").style.display = "block";
  } else if (data.forecast.forecastday[0].day.daily_will_it_rain === 1) {
    cssLink.href = "./css/rainyWeather.css";
    document.querySelector(".cloud-animation").style.display = "none";
  } else if (data.current.is_day === 0) {
    cssLink.href = "./css/night.css";
    document.querySelector(".cloud-animation").style.display = "none";
  } else {
    cssLink.href = "./css/sunnyWeather.css";
    document.querySelector(".cloud-animation").style.display = "none";
  }

  // images is an HTMLCollection, so you may need to loop through the elements
  for (const image of images) {
    // Set the style properties for each image
    image.style.height = "200px";
    image.style.width = "270px";
  }
  const cityName = document.getElementById("city-name");
  cityName.innerText = data.location.name;

  const dateObj = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = daysOfWeek[dateObj.getDay()];
  const currentHour = dateObj.getHours();
  const currentMinute = dateObj.getMinutes();
  const currentTime =
    currentHour + ":" + (currentMinute < 10 ? "0" : "") + currentMinute;

  const timeDetailsDiv = document.getElementById("time-details");
  timeDetailsDiv.innerHTML = `${currentDay} | ${currentTime}`;

  const tempDiv = document.getElementById("temp");
  tempDiv.innerHTML =
    fahrenScale != true
      ? Math.floor(data.current.temp_c) + "°C"
      : Math.floor(data.current.temp_f) + "°F";

  const realFeelDiv = document.getElementById("real-feel");
  realFeelDiv.innerHTML =
    fahrenScale != true
      ? `<b>${Math.floor(data.current.feelslike_c)}°</b>`
      : `<b>${Math.floor(data.current.feelslike_f)}°</b>`;

  const windSpeedDiv = document.getElementById("wind-speed");
  windSpeedDiv.innerHTML = `<b>${data.current.wind_kph} Km/h</b>`;

  //chance of rain
  const chanceRainDiv = document.getElementById("rain-chance");

  const description = data.current.condition.text;
  const cloudCover = data.current.cloud;
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_kph;
  const pressure = data.current.pressure_mb;

  // Check if rain is likely based on conditions
  if (
    description.includes("rain") ||
    description.includes("showers") ||
    description.includes("thunderstorm")
  ) {
    chanceRainDiv.innerHTML = `<b>80%</b>`;
  } else if (
    cloudCover > 50 &&
    (humidity > 70 || windSpeed > 10 || pressure < 1000)
  ) {
    chanceRainDiv.innerHTML = `<b>40%</b>`;
  } else {
    chanceRainDiv.innerHTML = `<b>0%</b>`;
  }
  // Please note that this is a simplified example, and real-world weather prediction involves more sophisticated algorithms and data analysis. For accurate and reliable weather predictions, it's recommended to use dedicated weather forecasting APIs or services that provide comprehensive weather data and predictions.

  //humdidity div

  const humidityDiv = document.getElementById("humidity");
  humidityDiv.innerHTML = `<b>${data.current.humidity}</b>`;

  //   let time=;
  const todayForecastDiv = document.querySelector(".today-forecast");

  const hourWiseForecast = data.forecast.forecastday[0];
  console.log(hourWiseForecast);

  for (let i = 6; i <= 21; i = i + 3) {
    const weatherType = hourWiseForecast.hour[i].condition.text;

    todayForecastDiv.innerHTML += `<div class="forecast-card">
      <div class="cards text-center" id="weather-card">
        <h6 class="day-name">${
          i > 12
            ? hourWiseForecast.hour[i].time.split(" ")[1] + " PM"
            : hourWiseForecast.hour[i].time.split(" ")[1] + " AM"
        }</h6>
        ${getWeatherImageUrl(weatherType)}
        <div class="day-temp">
          <h5 class="temp">${
            fahrenScale != true
              ? Math.floor(hourWiseForecast.hour[i].temp_c) + "°C"
              : Math.floor(hourWiseForecast.hour[i].temp_f) + "°F"
          }</h5>
        </div>
      </div>
    </div>`;
  }

  //7-day forecast

  const weekForecastDiv = document.querySelector(".week-forecast");
  weekForecastDiv.innerHTML += ` <div>
  <h5>7-day Forecast</h5>
</div>`;
  const weekForecast = data.forecast.forecastday;
  //   day.condition.text
  //   console.log(weekForecast.date);

  for (let i = 0; i < 7; i++) {
    weekForecastDiv.innerHTML += `<div class="week-forecast-div row my-3 py-2">
        <p class="day-name m-0 col-4">${
          i == 0 ? "today" : dateToDay(weekForecast[i].date.split(" ")[0])
        }</p>
        <div class="d-flex align-items-center col-4">
          ${getWeatherImageUrl(weekForecast[i].day.condition.text)}
          <span class="ml-2">${weatherDay(
            weekForecast[i].day.condition.text
          )}</span>
        </div>
        <div class="col-4"> <p class="float-end">${
          fahrenScale != true
            ? Math.floor(weekForecast[i].day.maxtemp_c)
            : Math.floor(weekForecast[i].day.maxtemp_f)
        }/${
      fahrenScale != true
        ? Math.floor(weekForecast[i].day.mintemp_c)
        : Math.floor(weekForecast[i].day.maxtemp_f)
    }</p></div>
      </div>
      ${i < 6 ? '<div style="border-bottom: 1px solid #ffffff85"></div>' : ""}`;
  }
  function dateToDay(dateString) {
    const dayName = new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
    });
    return dayName;
  }
}

// Call the fetchData function

//changing css
const cssLink = document.getElementById("cssLink");

// Change the href attribute to a new CSS file
// console.log(${data.current.is_day});
// console.log("anshbir");
// if(data.current.is_day === 0){
//   cssLink.href = "./css/night.css";
// }
// if(data.current.daily_will_it_rain===1){
//   cssLink.href = "./css/rainyWeather.css";
// }
