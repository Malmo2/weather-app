/**
 * Creates and renders precipitation data cards in the DOM.
 * 
 * Each item is appeded to an html element.
 * @param {PrecipitationClass} precipitation - Normalized precipitation data.
 * @returns {HTMLElement} The container element holding the precipitation card.
 */



export function createPrecipitation(precipitation) {

    const precipitationResults = document.getElementById('precipitationResults');

    const card = document.createElement('div');
    const displayPrecProbability = document.createElement('span');
    const displayPrec = document.createElement('span');
    const displayPrecRain = document.createElement('span');
    const displayPrecShowers = document.createElement('span');
    const displayPrecSnowfall = document.createElement('span');
    const displayPrecSnowDepth = document.createElement('span');

    card.classList.add('city-card');

    displayPrecProbability.textContent = `Precipitation probability: ${precipitation.precipitationProbability}`;
    displayPrec.textContent = `Precipitation: ${precipitation.precipitationData}`;
    displayPrecRain.textContent = `Rain: ${precipitation.precipitationRain}`;
    displayPrecShowers.textContent = `Showers: ${precipitation.precipitationShowers}`;
    displayPrecSnowfall.textContent = `Snowfall: ${precipitation.precipitationSnowfall}`;
    displayPrecSnowDepth.textContent = `Snow depth: ${precipitation.precipitationSnowDepth}`;


    card.append(displayPrecProbability,
        displayPrec,
        displayPrecRain,
        displayPrecShowers,
        displayPrecSnowfall,
        displayPrecSnowDepth);

    precipitationResults.appendChild(card);

    return precipitationResults;
}


