import { getCity } from "./js/weatherService.js";
import { fetchForecastByCoords } from "./7dayforecast/new7dayforecast.js";
import { forecast } from "./7dayforecast/forecastView.js";
import { addToHistory, displayHistory } from "./js/searchHistory.js";
import { toTimeOnly } from "./js/utils/toTime.js";
import "./js/clearHistory.js"

const displayCity = document.getElementById("location");
const displayTemp = document.getElementById("mainTemp");
const displayHumid = document.getElementById("humidity");
const displayWindSpeed = document.getElementById("windSpeed");
const forecastContainer = document.querySelector(".center-column");
const getSunrise = document.getElementById('sunrise');
const getSunset = document.getElementById('sunset');
const errorMessageDiv = document.getElementById("errorMessage");



const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("searchInput");

function showError(message) {
  if (!errorMessageDiv) return;
  errorMessageDiv.textContent = message;
  errorMessageDiv.style.display = "block";
}

function clearError() {
  if (!errorMessageDiv) return;
  errorMessageDiv.textContent = "";
  errorMessageDiv.style.display = "none";
}

displayHistory();

btn.addEventListener("click", async () => {
    clearError();
  try {
    const input = cityInput.value.trim();
    const city = await getCity(input);
    if (!city.lat || !city.lon) throw new Error("City not found");

    const { conditions, dailyData, sunrise, sunset } = await fetchForecastByCoords(
      city.lat,
      city.lon
    );

    displayCity.textContent = `${city.city}, ${city.country}`;
    displayTemp.textContent = `${conditions.temp}°C`;
    displayHumid.textContent = `${conditions.humidity}%`;
    displayWindSpeed.textContent = `${conditions.windSpeed} Km/h`;

    getSunrise.textContent = sunrise ? toTimeOnly(sunrise) : "";
    getSunset.textContent = sunset ? toTimeOnly(sunset) : "";

    const forecastElement = forecast(dailyData);
    forecastContainer.innerHTML = "";
    forecastContainer.appendChild(forecastElement);

    addToHistory(city.city);
    displayHistory();

    cityInput.value = "";
  } catch (err) {
    console.error("Could not fetch data", err.message);
        showError(err.message); 
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
