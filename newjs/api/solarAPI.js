

export async function solarAPI() {
    try {
        let url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max&timezone=Europe%2FBerlin`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Could not fetch solar data');
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Could not fetch data', err.message);
    }
}