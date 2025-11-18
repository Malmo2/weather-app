import { extractGeo } from "./newjs/classes/cityClass.js";
import { createCities } from "./newjs/rendering/cities.js";
import { createSolarData } from "./newjs/rendering/solar.js";
import { solarData } from "./newjs/classes/solarData.js";

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


    createCities(cities);
    createSolarData(sol);
});