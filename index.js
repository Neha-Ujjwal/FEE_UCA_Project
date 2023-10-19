const cityInput = document.getElementById("city");
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validateCity();
  }
});
function validateCity() {
  // Get the input value
  const cityName = cityInput.value;
  const regex = /^[A-Za-z\s]+$/;

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
  cityInput.value = "";
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
    const data = await response.json();

    // Use the data in your application
    // console.log(data.name);
    console.log(url);
    // console.log(data.current.condition.text);
    // console.log(url);
    manipulateData(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function manipulateData(data) {
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
  tempDiv.innerHTML = Math.floor(data.current.temp_c) + "°C";

  const realFeelDiv = document.getElementById("real-feel");
  realFeelDiv.innerHTML = `<b>${Math.floor(data.current.feelslike_c)}°</b>`;

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
    // console.log(hourWiseForecast.hour[i].time);
    const weatherType = hourWiseForecast.hour[i].condition.text;
    // console.log(weatherType + "-icon.png");
    todayForecastDiv.innerHTML += `<div class="forecast-card">
    <div class="cards text-center" id="weather-card">
      <h6 class="day-name">${
        i > 12
          ? hourWiseForecast.hour[i].time.split(" ")[1] + " PM"
          : hourWiseForecast.hour[i].time.split(" ")[1] + " AM"
      }</h6>
   
        <img
          src="/icons/sun/${weatherType}-icon.png"
          style="height: 40px; width: 40px"
        />
      
      <div class="day-temp">
        <h5 class="temp">${Math.floor(hourWiseForecast.hour[i].temp_c)}°C</h5>
        
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
          <img
            src="/icons/sun/Sunny-icon.png"
            style="height: 40px; width: 40px"
          />
        <span class="ml-2">Sunny</span>
        </div>
        <div class="col-4"> <p class="float-end">36/22</p></div>
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
