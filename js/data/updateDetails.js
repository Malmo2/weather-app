const avgDelta = document.querySelector('.average-card .card-value');
const avgToday = document.querySelector('.average-card .avg-row:nth-child(1) span:last-child');
const avgAverage = document.querySelector('.average-card .avg-row:nth-child(2) span:last-child');

const feelsLikeValue = document.querySelector('.feels-like-card .card-value');
const feelsLikeText = document.querySelector('.feels-like-card .card-subtext');

const uvIndexValue = document.querySelector('.uv-card .card-value');
const uvStatus = document.querySelector('.uv-card .uv-status');
const uvBarFill = document.querySelector('.uv-card .uv-fill');

const visibilityValue = document.querySelector('.visibility-card .card-value');
const visibilityText = document.querySelector('.visibility-card .card-subtext');

const humidityValue = document.querySelector('.humidity-card .card-value');
const humidityText = document.querySelector('.humidity-card .card-subtext');

const pressureGaugeText = document.querySelector('.pressure-card .gauge-value');
const pressureNumber = document.querySelector('.pressure-card .gauge-value').firstChild;
const pressureUnit = document.querySelector('.pressure-card .gauge-value span');

const airQualityValue = document.querySelector('.air-quality-card .card-value');
const airQualityText = document.querySelector('.air-quality-card .card-subtext');
const airQualityDetailsBtn = document.querySelector('.air-quality-card .details-btn');

export function updateDetailsGrid(data) {
    const delta = data.avgDelta;
    avgDelta.textContent = `${delta > 0 ? "+" : ""}${delta}°`;
    avgToday.textContent = `T:${data.todayAvg}°`;
    avgAverage.textContent = `T:${data.normalAvg}°`;

    feelsLikeValue.textContent = `${data.feelsLike}°`;
    feelsLikeText.textContent = data.feelsLikeText;

    uvIndexValue.textContent = data.uvIndex;
    uvStatus.textContent = data.uvStatus;
    uvBarFill.style.width = `${data.uvPercent}%`;

    visibilityValue.textContent = `${data.visibility} km`;
    visibilityText.textContent = data.visibilityText;

    humidityValue.textContent = `${data.humidity}%`;
    humidityText.textContent = data.dewPointText;

    pressureNumber.nodeValue = `${data.pressure} `;
    pressureUnit.textContent = data.pressureUnit;

    airQualityValue.textContent = data.airQualityStatus;
    airQualityText.textContent = data.airQualityDescription;
}
