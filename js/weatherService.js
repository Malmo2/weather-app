export async function getCity(name) {
    try {
        const split = name.trim().split(" ");
        const cityName = split.slice(0, -1).join(" ");
        const countryName = split.slice(-1).join(" ");
        const finalCity = cityName || split[0];
        const finalCountry = split.length > 1 ? countryName : undefined;
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(finalCity)}&count=50&language=en&format=json`;
        const res = await fetch(geoUrl);

        if (!res.ok) throw new Error("Could not fetch data");
        const data = await res.json();
        if (!data.results || data.results.length === 0) {
            return { city: null, country: null, lat: null, lon: null };
        }

        let result;
        if (finalCountry === undefined) {
            result = data.results[0];
            return { city: result.name, country: result.country, lat: result.latitude, lon: result.longitude };
        }

        result = data.results.find(c => c.country.toLowerCase().includes(finalCountry.toLowerCase())) || data.results[0];

        return { city: result.name, country: result.country, lat: result.latitude, lon: result.longitude };
    } catch (err) {
        console.error("Could not find data", err.message);
        return { city: null, country: null, lat: null, lon: null };
    }
}

export async function getWeather(lat, lon) {
  try {

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation,rain,showers,snowfall&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto`;
    const res = await fetch(weatherUrl);

    if (!res.ok) throw new Error("Weather data not available. Please try again later.");
    const data = await res.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      temp: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      daily: data.daily,
      sunrise: data.daily.sunrise,
      sunset: data.daily.sunset
    };
  } catch (error) {
    throw new Error("Network error: Unable to fetch weather data");
  }
}

