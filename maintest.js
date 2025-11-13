
import { getCity, getWeather } from "./js/weatherService.js";
import { forecast } from "./7dayforecast/7dayforecast.js";
import { addToHistory, getHistory } from "./js/searchHistory.js";

import { getCity } from "./js/weatherService.js";
import { fetchForecastByCoords } from "./7dayforecast/new7dayforecast.js";
import { forecast } from "./7dayforecast/forecastView.js";



const cont = document.createElement("div");
const displayCity = document.createElement("h2");
const displayCountry = document.createElement("h2");
const displayTemp = document.createElement("p");
const displayHumid = document.createElement("p");
const displayWindSpeed = document.createElement("p");

const displayCity = document.getElementById('location');
const displayTemp = document.getElementById('mainTemp');
const displayHumid = document.getElementById("humidity");
const displayWindSpeed = document.getElementById("windSpeed");
const forecastContainer = document.querySelector('.center-column');


const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("searchInput");


document.body.append(cont);


btn.addEventListener("click", async () => {
  try {
    const input = cityInput.value.trim();
    const city = await getCity(input);
    if (!city.lat || !city.lon) throw new Error("City not found");

    const { conditions, dailyData } = await fetchForecastByCoords(city.lat, city.lon);

    displayCity.textContent = `${city.city}, ${city.country}`;
    displayTemp.textContent = `${conditions.temp}°C`;
    displayHumid.textContent = `${conditions.humidity}%`;
    displayWindSpeed.textContent = `${conditions.windSpeed} Km/h`;;


    const forecastElement = forecast(dailyData);
    forecastContainer.innerHTML = "";
    forecastContainer.appendChild(forecastElement);


    cont.innerHTML = "";

    cont.append(
      displayCity,
      displayCountry,
      displayTemp,
      displayHumid,
      displayWindSpeed,
      forecastElement
    );

    addToHistory(data.city);

    cityInput.value = "";

  } catch (err) {
    console.error("Could not fetch data", err.message);
  }
});

