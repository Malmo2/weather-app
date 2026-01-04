import { airQualityAPI } from "../api/airQualityAPI.js";

/**
 * Normalized air quality particulate data.
 * 
 * @typedef {Object} AirQualityPM
 * @property {number} pm10 - PM10 Particulate concentration.
 * @property {number} pm25 - PM2.5 particulate concentration.
 */

/**
 * Fetches air quality data.
 * @param {number} latitude - Geographic latitude.
 * @param {number} longitude - Geographic longitude.
 * @returns {Promise<AirQualityPM>} - PM10 and PM2.5 Values.
 * */

export async function airQualityData(latitude, longitude) {
    const data = await airQualityAPI(latitude, longitude);
    const current = data.current || {};

    const pm10 = typeof current.pm10 === "number" ? current.pm10 : 0;
    const pm25 = typeof current.pm2_5 === "number" ? current.pm2_5 : 0;

    return { pm10, pm25 };
}
