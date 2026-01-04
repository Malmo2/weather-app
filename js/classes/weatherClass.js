import { weatherAPI } from "../api/weatherAPI.js"


/**
 * Fetches weather data and returns a normalized Weather instance.
 * @param {number} latitude - Geographical latitude.
 * @param {number} longitude - Geographical longitude.
 * @returns {Promise<Weather>} - a Weather instance created from the API response.
 */


export async function getWeather(latitude, longitude) {

    let data = await weatherAPI(latitude, longitude);

    let weather = new Weather(data.current);

    return weather;
}

/**
 * Normalized current weather values.
 * 
 * @class
 * @property {number} temperature - Air temperature in °C.
 * @property {number} humidity - Relative humidity in %.
 * @property {number} windSpeed - Wind speed at 10m height.
 * @property {number} code - Weather condition code.
 */

export class Weather {
    constructor(weather) {
        this.temperature = weather.temperature_2m;
        this.humidity = weather.relative_humidity_2m;
        this.windSpeed = weather.wind_speed_10m;
        this.code = weather.weather_code;
    }
}
