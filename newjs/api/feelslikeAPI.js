

export async function feelslikeAPI() {
    try {

        const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=apparent_temperature_max,apparent_temperature_min&hourly=apparent_temperature&current=apparent_temperature';
        const res = await fetch(url);
        if(!res.ok) throw new Error('Could not fetch data');
        const data = await res.json();
        return data;

    } catch(err) {
        console.error('Could not fetch feels like data', err.message);
    }
}