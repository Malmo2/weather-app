
/**
 * 
 * Fetches raw air quality data from the open meteo API.
 * @param {number} latitude - Geographical latitude.
 * @param {number} longitude - Geographical longitude.
 * @returns {Promise<Object>} - Raw API response containing current pm10 and pm2.5 data.
 */

export async function airQualityAPI(latitude, longitude) {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch air quality: ${res.status} ${res.statusText}`);
    }

    return await res.json();
}
