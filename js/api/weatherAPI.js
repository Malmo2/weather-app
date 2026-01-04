/**
 * Fetches current temperature, relative humidity, wind speed and weather code from the Open-Meteo API.
 * @param {number} latitude - Geographical latitude.
 * @param {number} longitude - Geographical longitude.
 * @returns {Promise<Object | null>} - Raw API response containing current and relative temperature, humidity, wind speed and weather code data.
 * 
 */


export async function weatherAPI(latitude, longitude) {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Could not fetch data');
    return await res.json();
}