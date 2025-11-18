export function createCities(cities) {

    const cont = document.getElementById("results");

    if (!cities || cities.length === 0) {
        cont.textContent = "No results found.";
        return;
    }

    cont.innerHTML = "";


    cities.forEach(c => {

        const cityName = document.createElement('h3');
        const cityCountry = document.createElement('h3');
        const displayTemp = document.createElement('span');
        const displayHumid = document.createElement('span');
        const displayWind = document.createElement('span');



        const w = c.weather;

        const card = document.createElement("div");
        card.classList.add("city-card");

        cityName.textContent = `${c.name}`;
        cityName.classList.add('city-name');

        cityCountry.textContent = `${c.country}`;
        cityCountry.classList.add('city-country');

        displayTemp.textContent = `${w.temperature}`;

        displayHumid.textContent = `${w.humidity}`;

        displayWind.textContent = `${w.windSpeed}`;

        card.append(cityName, cityCountry, displayTemp, displayHumid, displayWind);
        cont.appendChild(card);
    });
}
