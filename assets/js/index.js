const fahrenButton = document.getElementById("FahrenScale");
const celScale = document.getElementById("celScale");
const cityInput = document.getElementById("city");

/*------------------- Fahrenheit Button is clicked or Not -------------------*/

let fahrenScale = false;
fahrenButton.addEventListener("click", function () {
  fahrenScale = true;
  // console.log("fahren");
  document.querySelector(".today-forecast").innerHTML = "";
  document.querySelector(".week-forecast").innerHTML = "";
  fetchData();
});

/*------------------- Celsius Button is clicked or Not -----------------------*/

celScale.addEventListener("click", function () {
  fahrenScale = false;
  // console.log("fahren");
  document.querySelector(".today-forecast").innerHTML = "";
  document.querySelector(".week-forecast").innerHTML = "";
  fetchData();
  // manipulateData();

  // alert("Button clicked!");
});

/*-------------------constantly Checking the input filed of city----------------*/

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validateCity();
  }
});

/*------------------Validating city whether user enter a valid city-------------*/

function validateCity() {
  // Get the input value
  const cityName = cityInput.value;
  const regex = /^[A-Za-z\s\-]+$/;

  if (cityName.trim() === "" || !regex.test(cityName)) {
    // document.getElementById("error-message").innerHTML = "Please enter a valid city name.";
    alert("please enter a valid city!!");
    console.log("empty city");
  } else {
    // document.getElementById("error-message").innerHTML = ""; //
    // performValidation(cityName);
    console.log("Validating city: " + cityName);
    document.querySelector(".today-forecast").innerHTML = "";
    document.querySelector(".week-forecast").innerHTML = "";
    fetchData();
  }
  // cityInput.value = "";
}

/*--------------------fetching weather data from weather api---------------------*/

async function fetchData() {
  try {
    const baseUrl =
      "https://api.weatherapi.com/v1/forecast.json?key=f742d06a81ec4843908103609231910";
    const apiKey = "8fe9a7eefc5dd144e76e6266356b707f";

    const url = baseUrl + "&q=" + cityInput.value + "&days=" + 7;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    data = await response.json();

    // console.log(data.name);
    console.log(url);
    // console.log(data.current.condition.text);
    // console.log(url);
    manipulateData(data);
  } catch (error) {
    alert("please enter a valid city!!");
    cityInput.value = "";
    // console.log("error occured");
    console.error("Error:", error);
  }
}

/*------------------ To get Weather image url according to current Weather----------*/

function getWeatherImageUrl(data) {
  // console.log(data);
  let weatherImage;

  if (data.text.includes("rain")) {
    weatherImage = `<img src="./assets/icons/weather_icons/Rain-icon.png" style="height: 40px; width: 60px" />`;
  } else if (
    data.text.includes("Cloud") ||
    data.text.includes("cloudy") ||
    data.text.includes("Overcast")
  ) {
    weatherImage = `<img src="./assets/icons/weather_icons/Cloud-icon.png" style="height: 40px; width: 50px" />`;
  } else if (
    data.text.includes("Fog") ||
    data.text.includes("Mist") ||
    data.text.includes("fog")
  ) {
    weatherImage = `<img src="./assets/icons/weather_icons/Fog-icon.png" style="height: 40px; width: 70px" />`;
  } else if (data.text.includes("drizzle")) {
    weatherImage = `<img src="./assets/icons/weather_icons/drizzle-icon.png" style="height: 40px; width: 70px" />`;
  } else if (data.text.includes("snow")) {
    weatherImage = `<img src="./assets/icons/weather_icons/snow-icon.png" style="height: 40px; width: 70px" />`;
  } else if (data.icon.includes("day")) {
    // console.log(data);
    weatherImage = `<img src="./assets/icons/weather_icons/Sunny-icon.png" style="height: 40px; width: 40px" />`;
  } else {
    weatherImage = `<img src="./assets/icons/moon/15.png" style="height: 40px; width: 40px" />`;
  }
  return weatherImage;
}

/*------------------------to get the current weather of the day-------------------------*/

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
  } else if (data.includes("snow")) {
    weatherOfDay = "snow";
  } else {
    weatherOfDay = data;
  }
  return weatherOfDay;
}

/*------------------------  DOM manipulation section --------------------------*/

function manipulateData(data) {
  const weatherImageMain = document.getElementById("weatherImageMain");
  weatherImageMain.innerHTML = getWeatherImageUrl(data.current.condition);
  const images = weatherImageMain.getElementsByTagName("img");

  const cssLink = document.getElementById("cssLink");
  // console.log(data.current.is_day);
  // console.log("bcbcbc");
  // console.log(data.forecast.forecastday[0].day.daily_will_it_rain);

  console.log(data.current.condition.text);

  /*!-------------------- CSS file according to the current weather ---------------!*/

  if (
    data.current.condition.text.includes("Overcast") ||
    data.current.condition.text.includes("Cloud") ||
    data.current.condition.text.includes("cloudy")
  ) {
    cssLink.href = "./assets/css/cloudyWeather.css";
    document.querySelector(".cloud-animation").style.display = "block";
  } else if (data.current.condition.text.includes("rain")) {
    cssLink.href = "./assets/css/rainyWeather.css";
    document.querySelector(".cloud-animation").style.display = "none";
  } else if (data.current.condition.text.includes("snow")) {
    cssLink.href = "./assets/css/snowWeather.css";
    document.querySelector(".cloud-animation").style.display = "none";
  } else if (data.current.is_day === 0) {
    cssLink.href = "./assets/css/night.css";
    document.querySelector(".cloud-animation").style.display = "none";
  } else {
    cssLink.href = "./assets/css/sunnyWeather.css";
    document.querySelector(".cloud-animation").style.display = "none";
  }

  for (const image of images) {
    image.style.height = "200px";
    image.style.width = "270px";
  }

  /*!-------------------  Manipulating the weather info div  ----------------!*/

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

  /*!--------------------- Real feel section manipulation ---------------!*/

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

  //humdidity div

  const humidityDiv = document.getElementById("humidity");
  humidityDiv.innerHTML = `<b>${data.current.humidity}</b>`;

  /*-----------------  Hour wise forecast div manipulation --------------------*/

  const todayForecastDiv = document.querySelector(".today-forecast");

  const hourWiseForecast = data.forecast.forecastday[0];
  // console.log(hourWiseForecast);

  for (let i = 6; i <= 21; i = i + 3) {
    const weatherType = hourWiseForecast.hour[i].condition;

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

  /*-----------------  Week  forecast div manipulation --------------------*/

  const weekForecastDiv = document.querySelector(".week-forecast");
  weekForecastDiv.innerHTML += ` <div>
  <h5>7-day Forecast</h5>
</div>`;
  const weekForecast = data.forecast.forecastday;
  //   day.condition.text
  //   console.log(weekForecast.date);

  for (let i = 0; i < 7; i++) {
    weekForecastDiv.innerHTML += `<div class="week-forecast-div row my-3 py-2">
    <div class="col-12 col-sm-4">
      <p class="day-name m-0">${
        i == 0 ? "today" : dateToDay(weekForecast[i].date.split(" ")[0])
      }</p>
    </div>
    <div class="col-12 col-sm-4 d-flex align-items-center">
      ${getWeatherImageUrl(weekForecast[i].day.condition)}
      <span class="ml-2">${weatherDay(
        weekForecast[i].day.condition.text
      )}</span>
    </div>
    <div class="col-12 col-sm-4">
      <p class="float-end">${
        fahrenScale != true
          ? Math.floor(weekForecast[i].day.maxtemp_c)
          : Math.floor(weekForecast[i].day.maxtemp_f)
      }/${
      fahrenScale != true
        ? Math.floor(weekForecast[i].day.mintemp_c)
        : Math.floor(weekForecast[i].day.maxtemp_f)
    }</p>
    </div>
  </div>
  ${i < 6 ? '<div class="col-12"><hr class="my-2 border" /></div>' : ""}`;
  }
  function dateToDay(dateString) {
    const dayName = new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
    });
    return dayName;
  }
}

// Call the fetchData function
