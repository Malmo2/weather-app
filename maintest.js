import { getCity } from "./js/weatherService.js";
import { fetchForecastByCoords } from "./js/7dayforecast/7dayforecast.js";
import { forecast } from "./js/7dayforecast/forecastView.js";
import { addToHistory, displayHistory } from "./js/searchHistory.js";
import { removeHistory } from "./js/clearHistory.js";
import { toTime } from "./js/utils/toTime.js";
import { initDarkMode } from "./js/darkmode/darkmode.js";
import { App } from "./js/Hourlyforecast/app.js";
import { updateWeatherCards } from "./js/weatherCards.js";

const displayCity = document.getElementById("location");
const displayTemp = document.getElementById("mainTemp");
const mainWeatherIcon = document.getElementById("mainWeatherIcon");
const forecastContainer = document.querySelector(".center-column");
const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("searchInput");
const displaySunrise = document.getElementById("sunrise");
const displaySunset = document.getElementById("sunset");

let currentCity = "";
const hourlyApp = new App();
let map = null;

function initMap(lat, lon, cityName) {
  if (map) {
    map.remove();
  }

  map = L.map("map").setView([lat, lon], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.marker([lat, lon]).addTo(map).bindPopup(cityName).openPopup();
}

async function loadWeatherForCity(cityName) {
  try {
    const city = await getCity(cityName);
    if (!city.lat || !city.lon) {
      alert("Could not find city. Please try again.");
      throw new Error("City not found");
    }

    const { conditions, dailyData, sunrise, sunset } =
      await fetchForecastByCoords(city.lat, city.lon);

    hourlyApp.render(conditions);
    initMap(city.lat, city.lon, `${city.city}, ${city.country}`);

    displayCity.textContent = `${city.city}, ${city.country}`;
    displayTemp.textContent = `${Math.round(conditions.temp)}°C`;
    displaySunrise.textContent = toTime(sunrise);
    displaySunset.textContent = toTime(sunset);

    updateWeatherCards({
      humidity: conditions.humidity,
      uvIndex: conditions.uvIndex || 4,
      rain: conditions.rain || 0,
      windSpeed: conditions.windSpeed,
    });

    const iconClass = conditions.icon ?? "fa-sun";
    const iconLabel = conditions.iconLabel ?? "Current weather";

    mainWeatherIcon.className = `main-weather-icon fa-solid ${iconClass}`;
    mainWeatherIcon.setAttribute("aria-label", iconLabel);
    mainWeatherIcon.setAttribute("title", iconLabel);

    const forecastElement = forecast(dailyData);
    forecastContainer.innerHTML = "";
    forecastContainer.appendChild(forecastElement);

    addToHistory(city.city);
    displayHistory(loadWeatherForCity);

    cityInput.value = "";
  } catch (err) {
    console.error("Could not fetch data", err.message);
  }
}

displayHistory(loadWeatherForCity);
removeHistory();
initDarkMode();

btn.addEventListener("click", async () => {
  const input = cityInput.value.trim();
  if (input) {
    currentCity = input;
    await loadWeatherForCity(currentCity);
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

let intervalId = setInterval(async () => {
  if (currentCity) {
    await loadWeatherForCity(currentCity);
  }
}, 15 * 60 * 1000);
