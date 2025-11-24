

export function createSolarData(solarArray) {

    const solarResults = document.getElementById('solarResults');

    solarArray.forEach(s => {

        const card = document.createElement('div');
        const displaySunrise = document.createElement('span');
        const displaySunset = document.createElement('span');
        const displayDaylightDuration = document.createElement('span');
        const displaySunshineDuration = document.createElement('span');
        const displayUvIndex = document.createElement('span');
        const displayUvIndexClear = document.createElement('span');


        card.classList.add('city-card');

        displaySunrise.textContent = `Sunrise: ${s.sunrise}`;
        displaySunset.textContent = `Sunset: ${s.sunset}`;
        displayDaylightDuration.textContent = `Daylight Duration: ${s.daylightDuration}`;
        displaySunshineDuration.textContent = `Sunshine Duration: ${s.sunshineDuration}`;
        displayUvIndex.textContent = `UV Index: ${s.uvIndex}`;
        displayUvIndexClear.textContent = `UV Index (Clear Sky): ${s.uvIndexClear}`;

        card.append(displaySunrise, displaySunset,
            displayDaylightDuration, displaySunshineDuration,
            displayUvIndex, displayUvIndexClear
        );

        solarResults.appendChild(card);



    });

    return solarResults;
}