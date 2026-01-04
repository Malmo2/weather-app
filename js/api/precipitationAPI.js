/**
 * Fetches raw precipitation data from the Open-Meteo API.
 *
 * @param {number} latitude - Geographical latitude.
 * @param {number} longitude - Geographical longitude.
 * @returns {Promise<Object | null>} Raw API response containing hourly precipitation probability, rain, showers, snowfall, and snow depth data.
 */
export async function getPrecipitation(latitude, longitude) {
    try {
        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&hourly=precipitation_probability,precipitation,rain,showers,snowfall,snow_depth`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Could not fetch precipitation data");

        return await res.json();
    } catch (err) {
        console.error("Could not fetch precipitation", err.message);
        return null;
    }
}
