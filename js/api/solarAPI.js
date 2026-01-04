
/**
 * Fetches raw solar data from the Open-Meteo API.
 * @param {number} latitude - Geographical latitude.
 * @param {number} longitude - Geographical longitude.
 * @returns {Promise<Object | null>} - Raw API response containing daily sunrise, sunset, daylight duration, sunshine duration, uv index maximum, uv index clear sky.
 */


export async function solarAPI(latitude, longitude) {
    try {
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max&timezone=Europe%2FBerlin`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Could not fetch solar data');
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Could not fetch data', err.message);
    }
}