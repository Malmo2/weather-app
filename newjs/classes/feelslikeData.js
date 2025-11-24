import { feelslikeAPI } from "../api/feelslikeAPI.js";

export class feelsLikeClass {
    constructor(feelslike) {
        this.currentFeelsLike = feelslike.currentFeelsLike;
        this.hourlyFeelsLike = feelslike.hourlyFeelsLike;
    }
}


export async function feelsLikeData() {
    const data = await feelslikeAPI();

    const feelsObj = {
        currentFeelsLike: data.current.apparent_temperature,
        hourlyFeelsLike: data.hourly.apparent_temperature
    };

    const feelslike = new feelsLikeClass(feelsObj);

    return feelslike;
}