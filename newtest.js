import { extractGeo } from "./newjs/classes/cityClass.js";
import { createCities } from "./newjs/rendering/cities.js";

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');


searchBtn.addEventListener('click', async () => {

    const search = searchInput.value.trim();
    const cities = await extractGeo(search);

    createCities(cities);
});
