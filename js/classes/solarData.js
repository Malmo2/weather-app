import { solarAPI } from "../api/solarAPI.js";

/**
 * Normalized current solar values.
 *
 * @class
 * @property {number} sunrise - Sunrise time (Unix timestamp or ISO string, depending on API)
 * @property {number} sunset - Sunset time (Unix timestamp or ISO string, depending on API)
 * @property {number} daylightDuration - Total daylight duration in seconds
 * @property {number} sunshineDuration - Sunshine duration in seconds
 * @property {number} uvIndex - Maximum UV index
 * @property {number} uvIndexClear - Maximum clear-sky UV index
 */


export class SolarClass {
    constructor(solar) {
        this.sunrise = solar.sunrise;
        this.sunset = solar.sunset;
        this.daylightDuration = solar.daylightDuration;
        this.sunshineDuration = solar.sunshineDuration;
        this.uvIndex = solar.uvIndex;
        this.uvIndexClear = solar.uvIndexClear;
    }
}

/**
 * Fetches daily solar data and converts it into an array of SolarClass instances.
 *
 * Each array element represents one day and contains normalized solar values
 * such as sunrise, sunset, daylight duration, and UV index.
 *
 * @returns {Promise<SolarClass[]>} Array of normalized daily solar data
 */


export async function solarData() {
    try {
        const data = await solarAPI();


        let solarArray = data.daily.sunrise.map((_, i) => {
            return new SolarClass({
                sunrise: data.daily.sunrise[i],
                sunset: data.daily.sunset[i],
                daylightDuration: data.daily.daylight_duration[i],
                sunshineDuration: data.daily.sunshine_duration[i],
                uvIndex: data.daily.uv_index_max[i],
                uvIndexClear: data.daily.uv_index_clear_sky_max[i]
            });
        });

        return solarArray;
    } catch (err) {
        console.error('Could not fetch data', err.message);
    }
}