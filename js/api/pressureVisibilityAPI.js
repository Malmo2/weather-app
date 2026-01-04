/**
 * Fetches raw pressure, visibility and dew point data from the Open-Meteo API.
 * @param {number} latitude - Geographical latitude.
 * @param {number} longitude - Geographical longitude.
 * @returns {Promise<Object | null>} - Raw API response containing current surface pressure, visibility and dew point data.
 * 
 */

export async function pressureVisibilityAPI(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=surface_pressure,visibility,dew_point_2m&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch pressure/visibility: ${res.status} ${res.statusText}`);
    }

    return await res.json();
}
