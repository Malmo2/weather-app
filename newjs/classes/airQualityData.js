import { airQualityAPI } from "../api/airqualityAPI.js";


export class airQualityClass {
    constructor(pm10, pm25) {
        this.pm10 = pm10;
        this.pm25 = pm25;
    }
}

export async function airQualityData(lat, lon) {


    let data = await airQualityAPI(lat, lon);


    const pm10 = data.hourly.pm10?.[0] ?? 0;
    const pm25 = data.hourly.pm2_5?.[0] ?? 0;

    return new airQualityClass(pm10, pm25);

}