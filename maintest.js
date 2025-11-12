import { getCity } from "./js/weatherService.js";
import { fetchForecastByCoords } from "./7dayforecast/new7dayforecast.js";
import { forecast } from "./7dayforecast/forecastView.js";

const cont = document.createElement("div");
const displayCity = document.createElement("h2");
const displayCountry = document.createElement("h2");
const displayTemp = document.createElement("p");
const displayHumid = document.createElement("p");
const displayWindSpeed = document.createElement("p");

const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("searchInput");

document.body.append(cont);

btn.addEventListener("click", async () => {
  try {
    const input = cityInput.value.trim();
    const city = await getCity(input);
    if (!city.lat || !city.lon) throw new Error("City not found");

    const { conditions, dailyData } = await fetchForecastByCoords(city.lat, city.lon);

    displayCity.textContent = `City: ${city.city}`;
    displayCountry.textContent = `Country: ${city.country}`;
    displayTemp.textContent = `Temp: ${conditions.temp}°C`;
    displayHumid.textContent = `Humidity: ${conditions.humidity}%`;
    displayWindSpeed.textContent = `Wind speed: ${conditions.windSpeed} m/s`;

    const forecastElement = forecast(dailyData);

    cont.innerHTML = "";
    cont.append(
      displayCity,
      displayCountry,
      displayTemp,
      displayHumid,
      displayWindSpeed,
      forecastElement
    );
  } catch (err) {
    console.error("Could not fetch data", err.message);
  }
});
