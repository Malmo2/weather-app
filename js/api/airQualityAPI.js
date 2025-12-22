// Open-Meteo Air Quality API helper.
// Endpoint docs: https://open-meteo.com/en/docs/air-quality-api

export async function airQualityAPI(latitude, longitude) {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch air quality: ${res.status} ${res.statusText}`);
    }

    return await res.json();
}
