
export async function pressureVisibilityAPI(lat, lon) {
    try {
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=surface_pressure,visibility`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Could not fetch data');
        const data = await res.json();

        return data;
    } catch (err) {
        console.error('Could not fetch data', err.message);

    }
}
