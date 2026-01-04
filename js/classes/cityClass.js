import { getGeo } from "../api/geoAPI.js";
import { getWeather } from "./weatherClass.js";

/**
 * Extracts city data from a search string and enriches each city with weather data.
 *
 * The search string may contain a city name and an optional country name.
 * The function returns up to three matching cities.
 * 
 * @param {string} search - A user-provided location search string.
 * @returns {Promise<City[]>} - Array of City instances with weather data attached.
 */

export async function extractGeo(search) {

    const split = search.trim().split(" ");
    const cityPart = split[0];
    const countryPart = split.length > 1 ? split.slice(1).join(" ") : undefined;

    const data = await getGeo(cityPart);
    if (!data || !data.results) return [];

    let cities = data.results.map(result => new City(result));

    if (countryPart) {
        const lower = countryPart.toLowerCase();
        const filtered = cities.filter(city => {
            return city.country.toLowerCase().includes(lower);
        });

        cities = filtered;
    }
    cities = cities.slice(0, 3);

    await Promise.all(
        cities.map(async city => {
            const weather = await getWeather(
                city.latitude,
                city.longitude
            );
            city.weather = weather;
        })
    )

    return cities;
};

/**
 * 
 * @class
 * @property {string} name - City name.
 * @property {number} latitude - Geographical latitude.
 * @property {number} longitude - Geographical longitude.
 * @property {string} country - Country name.
 * @property {Weather|null} weather - Weather data for the city, null if not loaded.
 */

export class City {
    constructor(city) {

        this.name = city.name;
        this.latitude = city.latitude;
        this.longitude = city.longitude;
        this.country = city.country;
        this.weather = null;
    }
}