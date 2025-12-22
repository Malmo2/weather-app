

export async function getPrecipitation() {

    try {

        const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=precipitation_probability,precipitation,rain,showers,snowfall,snow_depth';
        const res = await fetch(url);
        if(!res.ok) throw new Error('Could not fetch precipitation data');
        const data = await res.json();
        
        return data;

    } catch(err) {
        console.error('Could not fetch precipitation', err.message);
    }
}
