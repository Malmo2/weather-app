import { getWeather } from "../js/weatherService.js";

export function getWeatherIcon(code) {
  if (code === 0) return "01d";
  if (code === 1 || code === 2) return "02d";
  if (code === 3) return "03d";
  if (code === 45 || code === 48) return "50d";
  if (code === 51 || code === 53 || code === 55) return "09d";
  if (code === 61 || code === 63 || code === 65) return "10d";
  if (code === 71 || code === 73 || code === 75) return "13d";
  if (code === 95 || code === 96 || code === 99) return "11d";
  return "01d";
}

export function buildDailyDataFromOpenMeteo(daily) {
  const out = [];
  for (let i = 0; i < daily.time.length; i++) {
    const date = new Date(daily.time[i]);
    const timestamp = Math.floor(date.getTime() / 1000);
    const maxTemp = daily.temperature_2m_max[i];
    const minTemp = daily.temperature_2m_min[i];
    const weatherCode = daily.weathercode[i];
    const icon = getWeatherIcon(weatherCode);
    out.push({
      dt: timestamp,
      temp: { max: maxTemp, min: minTemp, day: maxTemp },
      weather: [
        { description: `Max ${maxTemp}°C / Min ${minTemp}°C`, icon },
      ],
    });
  }
  return out;
}

export async function fetchForecastByCoords(lat, lon) {
  const conditions = await getWeather(lat, lon);
  const dailyData = buildDailyDataFromOpenMeteo(conditions.daily);
  return { conditions, dailyData };
}

