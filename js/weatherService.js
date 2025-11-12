export async function getCity(name) {
    try {
        const split = name.trim().split(' ');
        const cityName = split.slice(0, -1).join(' ');
        const countryName = split.slice(-1).join(' ');

        const finalCity = cityName || split[0];
        const finalCountry = split.length > 1 ? countryName : undefined;

        // https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(finalCity)}&count=50

        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(finalCity)}&count=50&language=en&format=json`;

        const res = await fetch(geoUrl);
        if (!res.ok) throw new Error('Could not fetch data');
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            return { city: null, country: null, lat: null, lon: null };
        }

        let result;

        if (finalCountry === undefined) {
            result = data.results[0];
            return { city: result.name, country: result.country, lat: result.latitude, lon: result.longitude };
        }

        result = data.results.find(c => c.country.toLowerCase().includes(finalCountry.toLowerCase()));

        if (!result) {
            result = data.results[0];
        }

        return { city: result.name, country: result.country, lat: result.latitude, lon: result.longitude };

    } catch (err) {
        console.error('Could not find data', err.message);
        return { city: null, country: null, lat: null, lon: null };
    }
}


export async function getWeather(lat, lon) {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

        const res = await fetch(weatherUrl);
        if (!res.ok) throw new Error('Could not fetch data');

        const data = await res.json();
        console.log(data);

        const temp = data.current.temperature_2m;
        const humidity = data.current.relative_humidity_2m;
        const windSpeed = data.current.wind_speed_10m;

        return { temp, humidity, windSpeed, daily: data.daily };

    } catch (err) {
        console.error('Could not find data', err.message);
    }
}
