

export async function getGeo(cityName) {
    try {
        let url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('could not fetch data');
        return await res.json();
    } catch (err) {
        console.error('error', err.message);
        return null;
    }
}