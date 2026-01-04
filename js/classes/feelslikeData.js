import { feelslikeAPI } from "../api/feelslikeAPI.js";

/**
 * Normalized feels-like values.
 *
 * @class
 * @property {number} currentFeelsLike - Current feels-like temperature.
 * @property {number[]} hourlyFeelsLike - Hourly feels-like temperatures.
 */
export class FeelsLikeClass {
    constructor(feelslike) {
        this.currentFeelsLike = feelslike.currentFeelsLike;
        this.hourlyFeelsLike = feelslike.hourlyFeelsLike;
    }
}

/**
 * Fetches current and hourly feels-like data and returns normalized feels-like values.
 *
 * @param {number} latitude - Geographical latitude.
 * @param {number} longitude - Geographical longitude.
 * @returns {Promise<FeelsLikeClass>}
 */
export async function feelsLikeData(latitude, longitude) {
    const data = await feelslikeAPI(latitude, longitude);

    return new FeelsLikeClass({
        currentFeelsLike: data.current.apparent_temperature,
        hourlyFeelsLike: data.hourly.apparent_temperature
    });
}
