import { extractGeo } from "./classes/cityClass.js";
import { createCities } from "./rendering/cities.js";
import { createSolarData } from "./rendering/solar.js";
import { solarData } from "./classes/solarData.js";
import { precipitationData } from "./classes/precipitationData.js";
import { createPrecipitation } from "./rendering/precipitation.js";
import { feelsLikeData } from "./classes/feelslikeData.js";
import { createFeelslike } from "./rendering/feelslike.js";

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsMsg = document.querySelector('#resultsMsg');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});


searchBtn.addEventListener('click', async () => {

    const search = searchInput.value.trim();
    const cities = await extractGeo(search);
    const sol = await solarData();
    const prec = await precipitationData();
    const feels = await feelsLikeData();

    resultsMsg.textContent = "Loading...";

    setTimeout(() => {
        createCities(cities);
        createSolarData(sol);
        createPrecipitation(prec);
        createFeelslike(feels)
    }, 2000);

});