import { feelsLikeData } from "../classes/feelslikeData.js";
import { pressureVisibilityData } from "../classes/pressureVisibilityData.js";
import { airQualityData } from "../classes/airQualityData.js";

/**
 * @typedef {Object} WeatherDetails
 * @property {number} avgDelta - Difference between today's average and normal average temperature.
 * @property {number} todayAvg - Today's average temperature.
 * @property {number} normalAvg - Normal average temperature.
 * @property {number} feelsLike - Feels-like temperature in °C.
 * @property {string} feelsLikeText - Explanation of the feels-like calculation.
 * @property {number} uvIndex - UV index value.
 * @property {string} uvStatus - UV risk level (Low, Moderate, High).
 * @property {number} uvPercent - UV index represented as a percentage (0–100).
 * @property {number} visibility - Visibility in kilometers.
 * @property {string} visibilityText - Description of current visibility.
 * @property {number} humidity - Humidity percentage.
 * @property {string} dewPointText - Dew point description.
 * @property {number} pressure - Atmospheric pressure value.
 * @property {string} pressureUnit - Unit for pressure (hPa).
 * @property {string} airQualityStatus - Air quality level (Good, Moderate, Poor).
 */

/**
 * Builds detailed weather data used by the UI.
 *
 * This function combines current weather conditions, daily forecast data,
 * and city coordinates to calculate temperature averages, UV risk,
 * visibility, pressure, and air quality status.
 *
 * @async
 *
 * @param {Object} conditions - Current weather conditions.
 * @param {number} [conditions.temp] - Current temperature in °C.
 * @param {number} [conditions.feelsLike] - Feels-like temperature in °C.
 * @param {number} [conditions.pressure] - Atmospheric pressure in hPa.
 * @param {number} [conditions.visibilityKm] - Visibility in kilometers.
 * @param {number} [conditions.humidity] - Humidity percentage.
 * @param {number} [conditions.dewPoint] - Dew point temperature in °C.
 * @param {number} [conditions.uvIndex] - UV index value.
 *
 * @param {Array<Object>} dailyData - Array of daily forecast objects.
 * @param {Object} dailyData[].temp - Temperature info for the day.
 * @param {number} dailyData[].temp.max - Maximum daily temperature.
 * @param {number} dailyData[].temp.min - Minimum daily temperature.
 *
 * @param {Object} city - Selected city data.
 * @param {number} city.lat - City latitude.
 * @param {number} city.lon - City longitude.
 *
 * @returns {Promise<WeatherDetails>} Computed weather details.
 */



export async function buildDetailsData(conditions, dailyData, city) {
    let feels = { currentFeelsLike: conditions.feelsLike ?? conditions.temp ?? 0 };

    let pressureVisibility = {

        pressure: conditions.pressure ?? 1013,
        visibilityKm: conditions.visibilityKm ?? 10,
    };

    let airQuality = { pm10: 0, pm25: 0 };

    // If the main weather call already provided a "feels like" value, don't make an extra request.
    if (typeof conditions.feelsLike !== "number") {
        try {
            // Use the selected city coordinates.
            feels = await feelsLikeData(city.lat, city.lon);
        } catch (e) {
            console.error("feelsLikeData failed", e);
        }
    }

    // Same idea for pressure/visibility/dew point: only fetch if missing.
    if (
        typeof conditions.pressure !== "number" ||
        typeof conditions.visibilityKm !== "number" ||
        typeof conditions.dewPoint !== "number"
    ) {
        try {
            pressureVisibility = await pressureVisibilityData(city.lat, city.lon);
        } catch (e) {
            console.error("pressureVisibilityData failed", e);
        }
    }

    try {
        airQuality = await airQualityData(city.lat, city.lon);
    } catch (e) {
        console.error("airQualityData failed", e);
    }

    const baseTemp = conditions.temp ?? feels.currentFeelsLike ?? 0;
    const currentTemp = Math.round(baseTemp);

    const feelsLike = Math.round(
        feels.currentFeelsLike ?? conditions.feelsLike ?? baseTemp
    );

    let todayAvg = currentTemp;
    let normalAvg = currentTemp;

    if (Array.isArray(dailyData) && dailyData.length > 0) {
        const firstDay = dailyData[0];

        const dayMax = firstDay?.temp?.max ?? currentTemp;
        const dayMin = firstDay?.temp?.min ?? currentTemp;

        todayAvg = Math.round((dayMax + dayMin) / 2);

        let sum = 0;
        let count = 0;

        for (const day of dailyData) {
            const max = day?.temp?.max;
            const min = day?.temp?.min;

            if (typeof max === "number" && typeof min === "number") {
                sum += (max + min) / 2;
                count++;
            }
        }

        if (count > 0) {
            normalAvg = Math.round(sum / count);
        }
    }

    const avgDelta = todayAvg - normalAvg;



    const uvIndex = conditions.uvIndex ?? 0;

    let uvStatus = "Low";
    if (uvIndex >= 6) {
        uvStatus = "High";
    } else if (uvIndex >= 3) {
        uvStatus = "Moderate";
    }

    let uvPercent = (uvIndex / 11) * 100;
    if (uvPercent > 100) uvPercent = 100;
    if (uvPercent < 0) uvPercent = 0;

    const visibility = pressureVisibility.visibilityKm ?? 10;
    const visibilityText = "Current horizontal visibility.";

    const humidity = conditions.humidity ?? 0;

    const dewPoint =
        typeof conditions.dewPoint === "number"
            ? conditions.dewPoint
            : pressureVisibility.dewPoint;

    let dewPointText = "Dew point data unavailable.";
    if (typeof dewPoint === "number") {
        dewPointText = `The dew point is currently ${Math.round(dewPoint)}°C.`;
    }

    const pressure = pressureVisibility.pressure ?? 1013;
    const pressureUnit = "hPa";

    const airQualityStatus =
        airQuality.pm25 < 12
            ? "Good"
            : airQuality.pm25 < 35
                ? "Moderate"
                : "Poor";


    return {
        avgDelta,
        todayAvg,
        normalAvg,
        feelsLike,
        feelsLikeText: "Based on current wind and humidity.",
        uvIndex,
        uvStatus,
        uvPercent,
        visibility,
        visibilityText,
        humidity,
        dewPointText,
        pressure,
        pressureUnit,
        airQualityStatus,
    };
}
