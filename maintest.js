import { getCity, getWeather } from "./js/weatherService.js";
import { forecast } from "./7dayforecast/7dayforecast.js";

const cont = document.createElement("div");
const displayCity = document.createElement("h2");
const displayCountry = document.createElement("h2");
// const btn = document.createElement('button');
const displayTemp = document.createElement("p");
const displayHumid = document.createElement("p");
const displayWindSpeed = document.createElement("p");
// btn.textContent = "click";

const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("searchInput");
// const cityInput = document.createElement('input');
// cityInput.placeholder = "Search for a city";

// document.body.append(cityInput, btn, cont);
document.body.append(cont); 

btn.addEventListener("click", async () => {
  try {
    let input = cityInput.value.trim();

    let data = await getCity(input);
    let conditions = await getWeather(data.lat, data.lon);
    displayCity.textContent = `City: ${data.city}`;
    displayCountry.textContent = `Country: ${data.country}`;
    displayTemp.textContent = `Temp: ${conditions.temp}°C`;
    displayHumid.textContent = `Humidity: ${conditions.humidity}%`;
    displayWindSpeed.textContent = `Wind speed: ${conditions.windSpeed} m/s`;

    cont.append(
      displayCity,
      displayCountry,
      displayTemp,
      displayHumid,
      displayWindSpeed
    );
  } catch (err) {
    console.error("Could not fetch data", err.message);
  }
});

const LAT = 59.3293;
const LON = 18.0686;

async function main() {
  try {
    const data = await getWeather(LAT, LON);
    const dailyData = [];

    for (let i = 0; i < data.daily.time.length; i++) {
      const dateString = data.daily.time[i];
      const date = new Date(dateString);
      const timestamp = date.getTime() / 1000; // Används för att göra om UNIX-tid

      const maxTemp = data.daily.temperature_2m_max[i];
      const minTemp = data.daily.temperature_2m_min[i];
      const weatherCode = data.daily.weathercode[i];
      const icon = getWeatherIcon(weatherCode);

      const dayData = {
        dt: timestamp,
        temp: { day: maxTemp },
        weather: [
          {
            description: `Max ${maxTemp}°C / Min ${minTemp}°C`,
            icon: icon,
          },
        ],
      };

      dailyData.push(dayData);
    }

    const forecastElement = forecast(dailyData);
    document.body.appendChild(forecastElement);
  } catch (error) {
    document.body.textContent = "Fel: " + error.message;
  }
}

main();

function getWeatherIcon(code) {
  if (code === 0) return "01d";

  if (code === 1 || code === 2) return "02d";

  if (code === 3) return "03d";

  if (code === 45 || code === 48) return "50d";

  if (code === 51 || code === 53 || code === 55) return "09d";

  if (code === 61 || code === 63 || code === 65) return "10d";

  if (code === 71 || code === 73 || code === 75) return "13d";

  if (code === 95 || code === 96 || code === 99) return "11d";

  return "01d";
}
