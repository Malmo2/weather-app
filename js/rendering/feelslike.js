
/**
 * Creates and renders feels-like temperature data in the DOM.
 * @param {FeelsLikeClass} feelslike - Normalized feels-like temperature data.
 * @returns {HTMLElement} - The container element holding the feels-like card.
 */

export function createFeelslike(feelslike) {

    const feelslikeResults = document.getElementById('feelslikeResults');

    const card = document.createElement('div');
    const displayCurrentFeelslike = document.createElement('span');
    const displayHourlyFeelslike = document.createElement('span');

    card.classList.add('city-card');

    displayCurrentFeelslike.textContent = `feels like: ${feelslike.currentFeelsLike}`;
    displayHourlyFeelslike.textContent = `Hourly feels like: ${feelslike.hourlyFeelsLike}`;


    card.append(displayCurrentFeelslike, displayHourlyFeelslike);
    feelslikeResults.appendChild(card);
    return feelslikeResults;

}