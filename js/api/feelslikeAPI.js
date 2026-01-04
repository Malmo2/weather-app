/**
 * Fetches raw feels-like temperature data from the Open-Meteo API.
 * 
 * @param {number} latitude - Geographical latitude.
 * @param {number} longitude - Geographical longitude.
 * @returns {Promise<Object>} - Raw API response containing current, hourly, and daily feels-like data
 */



export async function feelslikeAPI(latitude, longitude) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=apparent_temperature_max,apparent_temperature_min&hourly=apparent_temperature&current=apparent_temperature&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Could not fetch data');
        const data = await res.json();
        return data;

    } catch (err) {
        console.error('Could not fetch feels like data', err.message);
    }
}