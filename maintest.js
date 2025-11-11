import { getCity, getWeather } from "./js/weatherService.js";



const cont = document.createElement('div');
const displayCity = document.createElement('h2');
const displayCountry = document.createElement('h2');
const btn = document.createElement('button');
const displayTemp = document.createElement('p');
const displayHumid = document.createElement('p');
const displayWindSpeed = document.createElement('p');
btn.textContent = "click";
const cityInput = document.createElement('input');
cityInput.placeholder = "Search for a city";

document.body.append(cityInput, btn, cont);

btn.addEventListener('click', async () => {
    try {
        let input = cityInput.value.trim();


        let data = await getCity(input);
        let conditions = await getWeather(data.lat, data.lon);
        displayCity.textContent = `City: ${data.city}`;
        displayCountry.textContent = `Country: ${data.country}`;
        displayTemp.textContent = `Temp: ${conditions.temp}°C`
        displayHumid.textContent = `Humidity: ${conditions.humidity}%`;
        displayWindSpeed.textContent = `Wind speed: ${conditions.windSpeed} m/s`;

        cont.append(displayCity, displayCountry, displayTemp, displayHumid, displayWindSpeed);

    } catch (err) {
        console.error('Could not fetch data', err.message);
    };
});

