import { getCity } from "./js/weatherService.js";
import { fetchForecastByCoords } from "./7dayforecast/7dayforecast.js";
import { forecast } from "./7dayforecast/forecastView.js";
import { addToHistory, displayHistory } from "./js/searchHistory.js";
import { removeHistory } from "./js/clearHistory.js";
import { toTime } from './js/utils/toTime.js';
import { initDarkMode } from './darkmode/darkmode.js';
import { App } from "./Hourlyforecast/app.js"



const displayCity = document.getElementById("location");
const displayTemp = document.getElementById("mainTemp");
const displayHumid = document.getElementById("humidity");
const displayWindSpeed = document.getElementById("windSpeed");
const mainWeatherIcon = document.getElementById("mainWeatherIcon");
const forecastContainer = document.querySelector(".center-column");
const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("searchInput");
const displaySunrise = document.getElementById('sunrise');
const displaySunset = document.getElementById('sunset');



displayHistory();
removeHistory();
initDarkMode();
const hourlyApp = new App();


btn.addEventListener("click", async () => {
  try {
    const input = cityInput.value.trim();
    const city = await getCity(input);
    if (!city.lat || !city.lon) throw new Error("City not found");
    const { conditions, dailyData, sunrise, sunset } = await fetchForecastByCoords(
      city.lat,
      city.lon
    );
    
    hourlyApp.render(conditions);



    displayCity.textContent = `${city.city}, ${city.country}`;
    displayTemp.textContent = `${Math.round(conditions.temp)}°C`;
    displayHumid.textContent = `${Math.round(conditions.humidity)}%`;
    displayWindSpeed.textContent = `${Math.round(conditions.windSpeed)} km/h`;
    displaySunrise.textContent = toTime(sunrise);
    displaySunset.textContent = toTime(sunset);


    const iconClass = conditions.icon ?? "fa-sun";
    const iconLabel = conditions.iconLabel ?? "Current weather";

    mainWeatherIcon.className = `main-weather-icon fa-solid ${iconClass}`;
    mainWeatherIcon.setAttribute("aria-label", iconLabel);
    mainWeatherIcon.setAttribute("title", iconLabel);

    const forecastElement = forecast(dailyData);
    forecastContainer.innerHTML = "";
    forecastContainer.appendChild(forecastElement);

    addToHistory(city.city);

    displayHistory();

    cityInput.value = "";

  } catch (err) {
    console.error("Could not fetch data", err.message);
  }



});
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btn.click()
  }
})