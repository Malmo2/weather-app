import { solarAPI } from "../api/solarAPI.js";


export class SolarClass {
    constructor(solar) {
        this.sunrise = solar.sunrise;
        this.sunset = solar.sunset;
        this.daylightDuration = solar.daylightDuration;
        this.sunshineDuration = solar.sunshineDuration;
        this.uvIndex = solar.uvIndex;
        this.uvIndexClear = solar.uvIndexClear;
    }
}


export async function solarData() {
    try {
        const data = await solarAPI();


        let solarArray = data.daily.sunrise.map((_, i) => {
            return new SolarClass({
                sunrise: data.daily.sunrise[i],
                sunset: data.daily.sunset[i],
                daylightDuration: data.daily.daylight_duration[i],
                sunshineDuration: data.daily.sunshine_duration[i],
                uvIndex: data.daily.uv_index_max[i],
                uvIndexClear: data.daily.uv_index_clear_sky_max[i]
            });
        });

        return solarArray;
    } catch (err) {
        console.error('Could not fetch data', err.message);
    }
}