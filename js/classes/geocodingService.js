export class GeocodingService {
    async getCity(name) {
        try {
            const split = name.trim().split(' ');
            const cityName = split.slice(0, -1).join(' ');
            const countryName = split.slice(-1).join(' ');
            const finalCity = cityName || split[0];
            const finalCountry = split.length > 1 ? countryName : undefined;

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
}