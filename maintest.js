import { getCity } from "./js/weatherService.js";
import { fetchForecastByCoords } from "./7dayforecast/new7dayforecast.js";
import { forecast } from "./7dayforecast/forecastView.js";
import { addToHistory, displayHistory } from "./js/searchHistory.js";

const displayCity = document.getElementById("location");
const displayTemp = document.getElementById("mainTemp");
const displayHumid = document.getElementById("humidity");
const displayWindSpeed = document.getElementById("windSpeed");
const forecastContainer = document.querySelector(".center-column");

const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("searchInput");

async function searchWeather(cityName) {
  try {
    const city = await getCity(cityName);
    if (!city.lat || !city.lon) throw new Error("City not found");

    const { conditions, dailyData } = await fetchForecastByCoords(
      city.lat,
      city.lon
    );

    displayCity.textContent = `${city.city}, ${city.country}`;
    displayTemp.textContent = `${conditions.temp}°C`;
    displayHumid.textContent = `${conditions.humidity}%`;
    displayWindSpeed.textContent = `${conditions.windSpeed} Km/h`;

    const forecastElement = forecast(dailyData);
    forecastContainer.innerHTML = "";
    forecastContainer.appendChild(forecastElement);

    addToHistory(city.city);

    displayHistory((clickedCity) => {
      cityInput.value = clickedCity;
      searchWeather(clickedCity);
    });

    cityInput.value = "";
  } catch (err) {
    console.error("Could not fetch data", err.message);
    alert("Could not find city. Please try again.");
  }
}

displayHistory((clickedCity) => {
  cityInput.value = clickedCity;
  searchWeather(clickedCity);
});

btn.addEventListener("click", async () => {
  const input = cityInput.value.trim();
  if (input) {
    await searchWeather(input);
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const input = cityInput.value.trim();
    if (input) {
      searchWeather(input);
    }
  }
});
