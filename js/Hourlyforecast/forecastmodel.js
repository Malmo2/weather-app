import { getWeatherIcon } from "../7dayforecast/7dayforecast.js";

export class Forecastmodel {

    static getNextHours(get, count = 8 ) {
        const times = get.hourly.time;
        const temps = get.hourly.temperature_2m;
        const codes = get.hourly.weather_code ?? [];

        const now = Date.now()
        const result = [];

        for(let i = 0; i < times.length && result.length < count; i++) {
            const d = new Date(times[i])
            if(d >= now) {
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