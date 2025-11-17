import { getWeather } from "../js/weatherService.js";

export function getWeatherIcon(code) {
    return `https://open-meteo.com/images/weather-icons/${code}.png`;
}

export function buildDailyDataFromOpenMeteo(daily) {
    const dailyData = [];
    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(daily.time[i]);
        const timestamp = Math.floor(date.getTime() / 1000);
        const maxTemp = daily.temperature_2m_max[i];
        const minTemp = daily.temperature_2m_min[i];
        const weatherCode = daily.weathercode[i];
        const icon = getWeatherIcon(weatherCode);
        const sunrise = daily.sunrise ? daily.sunrise[i] : null;
        const sunset = daily.sunset ? daily.sunset[i] : null;

        dailyData.push({
            dt: timestamp,
            temp: { day: maxTemp },
            weather: [{ description: `Max ${maxTemp}°C / Min ${minTemp}°C`, icon }],
            sunrise,
            sunset
        });
    }
    return dailyData;
}


export async function fetchForecastByCoords(lat, lon) {
    const conditions = await getWeather(lat, lon);
    const dailyData = buildDailyDataFromOpenMeteo(conditions.daily);
    const sunrise = conditions.sunrise ? conditions.sunrise[0] : null;
    const sunset = conditions.sunset ? conditions.sunset[0] : null;


    return { conditions, dailyData, sunrise, sunset };
}
