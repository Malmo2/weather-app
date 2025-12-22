


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