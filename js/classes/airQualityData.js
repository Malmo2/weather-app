import { airQualityAPI } from "../api/airQualityAPI.js";

// Returns current PM10 + PM2.5 values (µg/m³) when available.
// If the API fails or doesn't provide the fields, we return zeros so the UI doesn't crash.

export async function airQualityData(latitude, longitude) {
    const data = await airQualityAPI(latitude, longitude);
    const current = data.current || {};

    const pm10 = typeof current.pm10 === "number" ? current.pm10 : 0;
    const pm25 = typeof current.pm2_5 === "number" ? current.pm2_5 : 0;

    return { pm10, pm25 };
}
