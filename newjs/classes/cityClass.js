import { getGeo } from "../api/geoAPI.js";
import { getWeather } from "./weatherClass.js";

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

export class City {
    constructor(city) {

        this.name = city.name;
        this.latitude = city.latitude;
        this.longitude = city.longitude;
        this.country = city.country;
        this.weather = null;
    }
}