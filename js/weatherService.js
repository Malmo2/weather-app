import { checkApiLimit } from "./utils/apiFilter.js";

export async function getCity(cityName, countryName) {
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            cityName
        )}&count=50&language=en&format=json`;

        const res = await fetch(geoUrl);
        if (!res.ok) throw new Error("Could not fetch data");

        const data = await res.json();
        if (!data.results || data.results.length === 0) {
            return { city: null, country: null, lat: null, lon: null };
        }

        let result;

        if (countryName === undefined) {
            result = data.results[0];
        } else {
            result =
                data.results.find(
                    (c) =>
                        c.country.toLowerCase() === countryName.toLowerCase()
                ) || data.results[0]; // fallback if not found
        }

        return {
            city: result.name,
            country: result.country,
            lat: result.latitude,
            lon: result.longitude,
        };
    } catch (err) {
        console.error("Could not find data", err.message);
        return { city: null, country: null, lat: null, lon: null };
    }
}


export async function getWeather(lat, lon) {
    // We request extra "current" variables so the UI can show details without extra API calls.
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,dew_point_2m,wind_speed_10m,surface_pressure,visibility,weather_code,precipitation,rain,showers,snowfall&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,uv_index_max&timezone=auto`;

    //! API LIMIT FILTER
    if (!checkApiLimit(weatherUrl)) {
        return null;
    }

    const res = await fetch(weatherUrl);
    if (!res.ok) throw new Error("Could not fetch data");
    const data = await res.json();

    const latitude = data.latitude;
    const longitude = data.longitude;
    const temp = data.current.temperature_2m;
    const feelsLike = data.current.apparent_temperature;
    const humidity = data.current.relative_humidity_2m;
    const dewPoint = data.current.dew_point_2m;
    const windSpeed = data.current.wind_speed_10m;
    const pressure = data.current.surface_pressure;

    // Open-Meteo returns visibility in meters; convert to km.
    const visibilityKm = typeof data.current.visibility === "number"
        ? Math.round((data.current.visibility / 1000) * 10) / 10
        : null;
    const rain = data.current.rain || 0;
    const uvIndex = data.daily.uv_index_max?.[0] || 0;
    const sunrise = data.daily.sunrise;
    const sunset = data.daily.sunset;
    const weatherCode = data.current.weather_code;

    return {
        latitude,
        longitude,
        temp,
        feelsLike,
        humidity,
        dewPoint,
        windSpeed,
        rain,
        uvIndex,
        pressure,
        visibilityKm,
        daily: data.daily,
        hourly: data.hourly,
        sunrise,
        sunset,
        weatherCode,
    };
}
