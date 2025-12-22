

// Fetch "apparent temperature" (aka "feels like") from Open-Meteo.
// NOTE: This used to be hard-coded to Berlin (52.52, 13.41), which made
// every search return Berlin's "feels like" data. We now accept coordinates.
export async function feelslikeAPI(latitude, longitude) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=apparent_temperature_max,apparent_temperature_min&hourly=apparent_temperature&current=apparent_temperature&timezone=auto`;
        const res = await fetch(url);
        if(!res.ok) throw new Error('Could not fetch data');
        const data = await res.json();
        return data;

    } catch(err) {
        console.error('Could not fetch feels like data', err.message);
    }
}