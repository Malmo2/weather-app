import { weatherAPI } from "../api/weatherAPI.js"

export async function getWeather(latitude, longitude) {

    let data = await weatherAPI(latitude, longitude);

    let weather = new Weather(data.current);

    return weather;
}

export class Weather {
    constructor(weather) {
        this.temperature = weather.temperature_2m;
        this.humidity = weather.relative_humidity_2m;
        this.windSpeed = weather.wind_speed_10m;
        this.code = weather.weather_code;
    }
}
