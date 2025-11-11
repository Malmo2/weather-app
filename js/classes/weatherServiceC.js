export class WeatherService {
    async getWeather(lat, lon) {
        try {
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

            const res = await fetch(weatherUrl);
            if (!res.ok) throw new Error('Could not fetch data');

            const data = await res.json();
            console.log(data);

            const temp = data.current.temperature_2m;
            const humidity = data.current.relative_humidity_2m;
            const windSpeed = data.current.wind_speed_10m;

            return { temp, humidity, windSpeed, daily: data.daily};
        } catch (err) {
            console.error('Could not find data', err.message);
        }
    }
}
