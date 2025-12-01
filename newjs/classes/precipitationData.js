
import { getPrecipitation } from "../api/precipitationAPI.js";

export class precipitationClass {
    constructor(precipitation) {
        this.precipitationProbability = precipitation.precipitationProbability;
        this.precipitationData = precipitation.precipitationData;
        this.precipitationRain = precipitation.precipitationRain;
        this.precipitationShowers = precipitation.precipitationShowers;
        this.precipitationSnowfall = precipitation.precipitationSnowfall;
        this.precipitationSnowDepth = precipitation.precipitationSnowDepth;

    }
}

export async function precipitationData() {
    const data = await getPrecipitation();




    const hourly = data.hourly;

    const index = 0;

    const precipitationObj = {
        precipitationProbability: hourly.precipitation_probability[index],
        precipitationData: hourly.precipitation[index],
        precipitationRain: hourly.rain[index],
        precipitationShowers: hourly.showers[index],
        precipitationSnowfall: hourly.snowfall[index],
        precipitationSnowDepth: hourly.snow_depth[index]
    };

    const precipitation = new precipitationClass(precipitationObj);

    return precipitation;

}