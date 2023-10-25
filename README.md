#Weather Forecast App

<img width="1664" alt="image" src="https://github.com/Neha-Ujjwal/FEE_UCA_Project/assets/104856137/d53c428d-6a0a-4b7e-af3c-84ea3a27eb1a">


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [How to Use](#how-to-use)
- [API Usage](#api-usage)

## Introduction

The **Weather Forecast App** is a sophisticated web application that provides users with real-time and precise weather updates. Developed using a combination of HTML, CSS, and JavaScript, the app seamlessly interfaces with a weather API to fetch and display the latest meteorological data. Notably, it goes a step further in enhancing user engagement by incorporating captivating animations, and dynamically adjusting the background to mirror the current weather conditions and the time of day. This holistic approach contributes to an immersive and informative user experience, setting it apart from standard weather applications.

With this app, you can quickly access essential weather details such as the current temperature, the forecast for the next 7 days, wind speed, humidity, and the chances of rain. The entire website is also responsive, making it accessible on various devices and screen sizes.

## Features

- Real-time weather information
- Dynamic background changes based on weather conditions and time of day
- Current temperature display
- 7-day weather forecast
- Wind speed information
- Humidity level
- Probability of rain

## Demo

You can access a live demo of the Weather App [here](https://neha-ujjwal.github.io/FEE_UCA_Project/).

## How to Use

To use the Weather App, follow these simple steps:

1. Visit the [demo link](https://neha-ujjwal.github.io/FEE_UCA_Project/) or host the project on your preferred web server.

2. The app will automatically detect your location and display the current weather conditions.

3. You can enter a specific location or city to view the weather for that area by using the search bar.

4. Scroll down to see the 7-day weather forecast, including temperature, wind speed, humidity, and chances of rain.

5. Enjoy the dynamically changing background, which adapts to the current weather and the time of day.

## API Usage

The Weather App uses a weather API to fetch weather data. You can find detailed documentation on the API and how to set it up in the `api.js` file. By default, it uses a free tier of the weather API, but you can also upgrade to a paid plan for more features and usage.

```javascript
// Example of API request
const apiKey = 'your_api_key_here';
const city = 'New York';

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
  .then(response => response.json())
  .then(data => {
    // Process the weather data here
  })
  .catch(error => console.error('Error fetching data: ', error));
