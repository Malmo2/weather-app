
import { getPrecipitation } from "../api/precipitationAPI.js";

/**
 * Normalized precipitation values.
 *
 * @class
 * @property {number} precipitationProbability - Probability of precipitation in percent
 * @property {number} precipitationData - Total precipitation amount (mm)
 * @property {number} precipitationRain - Rainfall amount (mm)
 * @property {number} precipitationShowers - Shower precipitation amount (mm)
 * @property {number} precipitationSnowfall - Snowfall amount (mm)
 * @property {number} precipitationSnowDepth - Snow depth (cm)
 * 
 */

export class PrecipitationClass {
    constructor(precipitation) {
        this.precipitationProbability = precipitation.precipitationProbability;
        this.precipitationData = precipitation.precipitationData;
        this.precipitationRain = precipitation.precipitationRain;
        this.precipitationShowers = precipitation.precipitationShowers;
        this.precipitationSnowfall = precipitation.precipitationSnowfall;
        this.precipitationSnowDepth = precipitation.precipitationSnowDepth;

    }
}

/**
 * Fetches current precipitation data and returns normalized precipitation values.
 * @returns {Promise<PrecipitationClass | null>}
 */

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

    const precipitation = new PrecipitationClass(precipitationObj);

    return precipitation;

}