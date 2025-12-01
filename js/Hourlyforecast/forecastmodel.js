export class Forecastmodel {

    static getNextHours(get, count = 12 ) {
        const times = get.hourly.time;
        const temps = get.hourly.temperature_2m;

        const now = Date.now()
        const result = [];

        for(let i = 0; i < times.length && result.length < count; i++) {
            const d = new Date(times[i])
            if(d >= now) {
                result.push({
                    date: d,
                    temp: temps[i]
                })
            }
        }
        return result;
    }
    
}