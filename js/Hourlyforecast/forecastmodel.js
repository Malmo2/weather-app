import { getWeatherIcon } from "../7dayforecast/7dayforecast.js";

/**
 * Modell för timprognos som hämtar de närmaste timmarna.
 */
export class Forecastmodel {

    /**
     * Hämta de kommande timmarna från Open-Meteo.
     * @param {Object} get - Objekt från vädertjänsten som innehåller `hourly` med `time` och `temperature_2m`.
     * @param {number} [count=11] - Max antal timmar som returneras.
     * @returns {Array<{date: Date, temp: number, icon: string, iconLabel: string}>} En array med förenklade timobjekt.
     */
    static getNextHours(get, count = 11) {
        const times = get.hourly.time;
        const temps = get.hourly.temperature_2m;
        const codes = get.hourly.weather_code ?? [];

        const now = Date.now()
        const result = [];

        for (let i = 0; i < times.length && result.length < count; i++) {
            const d = new Date(times[i])
            if (d >= now) {
                const code = codes[i];
                const { icon, label } = getWeatherIcon(code);
                result.push({
                    date: d,
                    temp: temps[i],
                    icon,
                    iconLabel: label
                })
            }
        }
        return result;
    }

}