import { pressureVisibilityAPI } from "../api/pressureVisibilityAPI.js";

export class pressureVisibilityClass {
    constructor(pressure, visibility) {
        this.pressure = pressure;
        this.visibility = visibility;
    }
}

export async function pressureVisibilityData(lat, lon) {
    const data = await pressureVisibilityAPI(lat, lon);

    const pressure = data.hourly.surface_pressure[0];
    const visibility = data.hourly.visibility[0];
    const visibilityKm = Math.round(visibility / 1000);

    return new pressureVisibilityClass(pressure, visibilityKm);
}
