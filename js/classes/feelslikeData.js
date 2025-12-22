import { feelslikeAPI } from "../api/feelslikeAPI.js";

export class feelsLikeClass {
    constructor(feelslike) {
        this.currentFeelsLike = feelslike.currentFeelsLike;
        this.hourlyFeelsLike = feelslike.hourlyFeelsLike;
    }
}


export async function feelsLikeData(latitude, longitude) {
    // Pass the selected city's coordinates instead of using a hard-coded location.
    const data = await feelslikeAPI(latitude, longitude);

    const feelsObj = {
        currentFeelsLike: data.current.apparent_temperature,
        hourlyFeelsLike: data.hourly.apparent_temperature
    };

    const feelslike = new feelsLikeClass(feelsObj);

    return feelslike;
}