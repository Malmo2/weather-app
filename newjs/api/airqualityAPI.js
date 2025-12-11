

export async function airQualityAPI(lat, lon) {
    try {

        const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Could not fetch air quality data');
        const data = await res.json();
        return data
    } catch (err) {
        console.error('Couldnt fetch air quality data', err.message);
    }
}