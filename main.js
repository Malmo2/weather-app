import { getCity } from "./js/weatherService.js";
import { fetchForecastByCoords } from "./js/7dayforecast/7dayforecast.js";
import { forecast } from "./js/7dayforecast/forecastView.js";
import { addToHistory, displayHistory } from "./js/searchHistory.js";
import { removeHistory } from "./js/clearHistory.js";
import { initDarkMode } from "./js/darkmode/darkmode.js";
import { App } from "./js/Hourlyforecast/app.js";
import { updateWeatherCards } from "./js/weatherCards.js";
import { showError } from "./js/utils/errorHandling.js";
import { updateDetailsGrid } from "./js/data/updateDetails.js";
import { buildDetailsData } from "./js/data/buildDetails.js";
import { initCitySuggestions } from "./js/utils/citySuggestion.js";
import { setBackgroundFromWeatherCode } from "./js/backgroundService.js";


const displayCity = document.getElementById("location");
const displayTemp = document.getElementById("mainTemp");
const mainWeatherIcon = document.getElementById("mainWeatherIcon");
const forecastContainer = document.querySelector(".center-column");
const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("searchInput");

// console.log("displayCity:", displayCity);
// console.log("displayTemp:", displayTemp);
// console.log("mainWeatherIcon:", mainWeatherIcon);
// console.log("forecastContainer:", forecastContainer);

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

/**
 * Loads weather for a city name (optionally with a country), then updates the UI:
 * - fetches city coordinates
 * - fetches forecast data by coordinates
 * - renders hourly + daily forecast
 * - updates map, main temperature/icon, cards, details grid, background, and search history
 *
 * If the city is not found or the forecast API returns no data (e.g. rate limit), it shows an error and exits.
 *
 * @param {string} cityName - City name to search for (e.g. "Berlin")
 * @param {string} [countryName] - Optional country name to narrow the search (e.g. "Sweden")
 * @returns {Promise<void>} Resolves when UI updates finish (or exits early after showing an error)
 */

export async function loadWeatherForCity(cityName, countryName) {
  try {
    const city = await getCity(cityName, countryName);

    if (!city.lat || !city.lon) {
      showError("Could not find city. Please enter correct name or try another city.");
      return;
    }

    //! if API raches limit, It would safely exit without crashing UI 
    const forecastData = await fetchForecastByCoords(city.lat, city.lon);
    if (!forecastData) {
      showError("API request limit reached, Please wait a moment....");
      return;
    }

    const { conditions, dailyData, sunrise, sunset } = forecastData;

    hourlyApp.render(conditions, sunrise, sunset);
    initMap(city.lat, city.lon, `${city.city}, ${city.country}`);
    displayCity.textContent = `${city.city}, ${city.country}`;
    displayTemp.textContent = `${Math.round(conditions.temp)}°C`;

    updateWeatherCards({
      humidity: conditions.humidity,
      uvIndex: conditions.uvIndex || 4,
      rain: conditions.rain || 0,
      windSpeed: conditions.windSpeed,
    });

    const detailsData = await buildDetailsData(conditions, dailyData, city);
    // console.log(detailsData);
    updateDetailsGrid(detailsData);

    const iconClass = conditions.icon ?? "fa-sun";
    const iconLabel = conditions.iconLabel ?? "Current weather";

    mainWeatherIcon.className = `main-weather-icon fa-solid ${iconClass}`;
    mainWeatherIcon.setAttribute("aria-label", iconLabel);
    mainWeatherIcon.setAttribute("title", iconLabel);

    try {
      await setBackgroundFromWeatherCode(conditions.weatherCode);
    } catch (backgroundErr) {
      console.error("Could not update background:", backgroundErr);
    }

    const forecastElement = forecast(dailyData);
    forecastContainer.innerHTML = "";
    forecastContainer.appendChild(forecastElement);

    addToHistory(`${city.city}, ${city.country}`);
    displayHistory(loadWeatherForCity);

    cityInput.value = "";
  } catch (err) {
    console.error("Could not fetch data", err);
    if (err && err.stack) {
      console.error(err.stack);
    }

    showError("Failed to load weather data.");
  }
}

displayHistory(loadWeatherForCity);
removeHistory();
initDarkMode();

initCitySuggestions("searchInput", "citySuggestions"); // city suggestion droppdown..

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


