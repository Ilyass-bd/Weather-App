import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './WeatherApp.css';
import { motion } from 'framer-motion';

import searchIcon from '../Assets/search.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import rainIcon from '../Assets/rain.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';
import humidityIcon from '../Assets/humidity.png';

export const WeatherApp = () => {
  let api_key = "163cadb7891538577de59bac239472b7";

  const [weatherData, setWeatherData] = useState({
    temperature: '0°C',
    location: 'Enter a city',
    humidity: '0%',
    wind: '0 km/h',
    icon: cloudIcon,
  });

  const search = async () => {
    const element = document.querySelector(".cityInput");
    if (element.value === "") {
      
      Swal.fire({
        icon: 'error',
        title: ' City not found !',
        text: 'Please enter a city !',
      });
      return;
    }

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;

      let response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          
          Swal.fire({
            icon: 'error',
            title: 'ERROR!!',
            text: 'City not found!',
          });
        } else {
          console.error("Error fetching weather data:", response.statusText);
        }
        return;
      }

      let data = await response.json();

      setWeatherData({
        temperature: `${Math.floor(data.main.temp)}°C`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        wind: `${Math.floor(data.wind.speed)} km/h`,
        icon: getWeatherIcon(data.weather[0].icon),
      });
    } catch (error) {
      console.error("An error occurred during the fetch:", error.message);
    }
  };

  const getWeatherIcon = (weatherIconCode) => {
    switch (weatherIconCode) {
      case "01d":
      case "01n":
        return clearIcon;
      case "02d":
      case "02n":
        return cloudIcon;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return drizzleIcon;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return rainIcon;
      case "13d":
      case "13n":
        return snowIcon;
      default:
        return cloudIcon;
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x:-100 }}
        animate={{ opacity: 1, y: 30, x: [-1000, 50] }}
        transition={{ duration: 2 }}
        className='container'
      >
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder='Search' />
          <div className="search-icon" onClick={search}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="weather-image"
        >
          <img src={weatherData.icon} alt="weather" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="weather-temp"
        >
          {weatherData.temperature}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="weather-location"
        >
          {weatherData.location}
        </motion.div>
        <div className="data-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="element"
          >
            <img src={humidityIcon} alt="" className="ion" />
            <div className="data">
              <div className="humidity-percent">{weatherData.humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="element"
          >
            <img src={windIcon} alt="" className="ion" />
            <div className="data">
              <div className="wind-rate">{weatherData.wind}</div>
              <div className="text">Wind Speed</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
