import { extractGeo } from "./newjs/classes/cityClass.js";
import { createCities } from "./newjs/rendering/cities.js";
import { createSolarData } from "./newjs/rendering/solar.js";
import { solarData } from "./newjs/classes/solarData.js";
import { precipitationData } from "./newjs/classes/precipitationData.js";
import { createPrecipitation } from "./newjs/rendering/precipitation.js";
import { feelsLikeData } from "./newjs/classes/feelslikeData.js";
import { createFeelslike } from "./newjs/rendering/feelslike.js";

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

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


    createCities(cities);
    createSolarData(sol);
    createPrecipitation(prec);
    createFeelslike(feels)

});