export function createCities(cities) {
    const cont = document.getElementById("results");
    cont.innerHTML = "";

    if (!cities || cities.length === 0) {
        cont.textContent = "No results found.";
        return;
    }

    cities.forEach(city => {
        const w = city.weather;

        const card = document.createElement("div");
        card.classList.add("city-card");

        card.innerHTML = `
            <div class="city-name">${city.name}</div>
            <div class="city-country">${city.country}</div>

            <div class="weather-info">
                <span>Temperature: ${w.temperature}°C</span>
                <span>Humidity: ${w.humidity}%</span>
                <span>Wind: ${w.windSpeed} m/s</span>
            </div>
        `;

        cont.appendChild(card);
    });
}
