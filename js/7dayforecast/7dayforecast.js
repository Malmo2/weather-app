import { getWeather } from "../weatherService.js"; // go up to js/, then use weatherService.js


const WEATHER_ICON_MAP = [
    { codes: [0], icon: "fa-sun", label: "Clear sky" },
    { codes: [1, 2], icon: "fa-cloud-sun", label: "Partly cloudy" },
    { codes: [3], icon: "fa-cloud", label: "Overcast" },
    { codes: [45, 48], icon: "fa-smog", label: "Foggy" },
    { codes: [51, 53, 55, 56, 57], icon: "fa-cloud-rain", label: "Drizzle" },
    { codes: [61, 63, 65, 80, 81, 82], icon: "fa-cloud-showers-heavy", label: "Rain" },
    { codes: [66, 67], icon: "fa-cloud-meatball", label: "Freezing rain" },
    { codes: [71, 73, 75, 85, 86], icon: "fa-snowflake", label: "Snow" },
    { codes: [95, 96, 99], icon: "fa-cloud-bolt", label: "Thunderstorm" },
];


const DEFAULT_ICON = { icon: "fa-sun", label: "Clear sky" };

export function getWeatherIcon(code) {
    const numericCode = Number(code);
    if (Number.isNaN(numericCode)) {
        return DEFAULT_ICON;
    }


    const mapping =
        WEATHER_ICON_MAP.find(({ codes }) => codes.includes(numericCode)) ??
        DEFAULT_ICON;
    return mapping;
}
export function buildDailyDataFromOpenMeteo(daily) {
    const out = [];


    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(daily.time[i]);
        const timestamp = Math.floor(date.getTime() / 1000);
        const maxTemp = daily.temperature_2m_max[i];
        const minTemp = daily.temperature_2m_min[i];
        const weatherCode = daily.weathercode[i];
        const sunrise = daily.sunrise ? daily.sunrise[i] : null;
        const sunset = daily.sunset ? daily.sunset[i] : null;
        const { icon, label } = getWeatherIcon(weatherCode);

        out.push({
            dt: timestamp,
            temp: { max: maxTemp, min: minTemp, day: maxTemp },
            weather: [{ description: label, icon }],
            sunset,
            sunrise,
        });
    }
    return out;
}
export async function fetchForecastByCoords(lat, lon) {

    const conditions = await getWeather(lat, lon);

    const dailyData = buildDailyDataFromOpenMeteo(conditions.daily);

    const { icon, label } = getWeatherIcon(conditions.weatherCode);

    const sunrise = conditions.sunrise ? conditions.sunrise[0] : null;
    const sunset = conditions.sunset ? conditions.sunset[0] : null;

    return {
        conditions: { ...conditions, icon, iconLabel: label },
        dailyData,
        sunrise,
        sunset,
    };
}
