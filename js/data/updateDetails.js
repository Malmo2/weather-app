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

const avgDeltaText = document.querySelector('.average-card .card-subtext');

/**
 * @typedef {Object} DetailsGridData
 * @property {number} avgDelta - Difference between today's average and normal average temperature
 * @property {number} todayAvg - Today's average temperature
 * @property {number} normalAvg - Normal average temperature
 * @property {number} feelsLike - Feels-like temperature
 * @property {string} feelsLikeText - Description of how the temperature feels
 * @property {number} uvIndex - UV index value
 * @property {string} uvStatus - Text status for UV level (low, moderate, high)
 * @property {number} uvPercent - UV level as a percentage (used for bar width)
 * @property {number} visibility - Visibility distance in kilometers
 * @property {string} visibilityText - Description of visibility conditions
 * @property {number} humidity - Humidity percentage
 * @property {string} dewPointText - Dew point description
 * @property {number} pressure - Atmospheric pressure value
 * @property {string} pressureUnit - Unit for pressure (e.g. hPa, mb)
 * @property {string} airQualityStatus - Overall air quality status
 * @property {string} airQualityDescription - Description of air quality
 */

/**
 * Updates the weather details grid UI with new data.
 *
 * @param {DetailsGridData} data - Weather data used to populate the details cards
 */

export function updateDetailsGrid(data) {
    const delta = data.avgDelta;
    avgDelta.textContent = `${delta > 0 ? "+" : ""}${delta}°`;

    if (avgDeltaText) {
        avgDeltaText.textContent =
            delta > 0
                ? "Above the average temperature."
                : delta < 0
                    ? "Below the average temperature."
                    : "Same as the average temperature.";
    }

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
    airQualityText.textContent = data.airQualityDescription ?? "";
}