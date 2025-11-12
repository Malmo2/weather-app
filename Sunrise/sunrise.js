import SunCalc from "https://cdn.jsdelivr.net/npm/suncalc@1.9.0/+esm";

export async function sunrise (){
    try {
        const latitude = 59.3293;
        const longitude = 18.0686;


        const times = SunCalc.getTimes(new Date(), latitude, longitude)


        console.log('Sunrise:', times.sunrise);
        console.log('Sunset:', times.sunset);

        return times;

    } catch(error) {
        console.error('Error getting sunrise/sunset', error)
    }

}