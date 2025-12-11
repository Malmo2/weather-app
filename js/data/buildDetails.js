import { feelsLikeData } from "../../newjs/classes/feelslikeData.js";
import { precipitationData } from "../../newjs/classes/precipitationData.js";
import { pressureVisibilityData } from "../../newjs/classes/pressureVisibilityData.js";
import { airQualityData } from "../../newjs/classes/airQualityData.js";

export async function buildDetailsData(conditions, dailyData, city) {
    let feels = { currentFeelsLike: conditions.feelsLike ?? conditions.temp ?? 0 };
    let precipitation = { precipitationProbability: 0 };
    let pressureVisibility = {
        pressure: conditions.pressure ?? 1013,
        visibility: conditions.visibilityKm ?? 10
    };

    let airQuality = { pm10: 0, pm25: 0 };

    try {
        feels = await feelsLikeData();
    } catch (e) {
        console.error("feelsLikeData failed", e);
    }

    try {
        precipitation = await precipitationData();
    } catch (e) {
        console.error("precipitationData failed", e);
    }

    try {
        pressureVisibility = await pressureVisibilityData(city.lat, city.lon); // ← here
    } catch (e) {
        console.error("pressureVisibilityData failed", e);
    }

    try {
        airQuality = await airQualityData(city.lat, city.lon);
    } catch (e) {
        console.error('airQualityData failed', e);
    }

    const baseTemp = conditions.temp ?? feels.currentFeelsLike ?? 0;
    const temp = Math.round(baseTemp);

    const feelsLike = Math.round(
        feels.currentFeelsLike ?? conditions.feelsLike ?? baseTemp
    );

    const avgDelta = feelsLike - temp;
    const todayAvg = temp;
    const normalAvg = temp;

    const uvIndex = conditions.uvIndex ?? 0;

    let uvStatus = "Low";
    if (uvIndex >= 6) {
        uvStatus = "High";
    } else if (uvIndex >= 3) {
        uvStatus = "Moderate";
    }

    let uvPercent = (uvIndex / 11) * 100;
    if (uvPercent > 100) uvPercent = 100;
    if (uvPercent < 0) uvPercent = 0;

    const visibility = pressureVisibility.visibility ?? 10;
    const visibilityText = "Current horizontal visibility.";

    const humidity = conditions.humidity ?? 0;

    let dewPointText = "Dew point data unavailable.";
    if (typeof conditions.dewPoint === "number") {
        dewPointText =
            "The dew point is currently " +
            Math.round(conditions.dewPoint) +
            "°C.";
    }

    const pressure = pressureVisibility.pressure ?? 1013;
    const pressureUnit = "hPa";

    const airQualityStatus =
        airQuality.pm25 < 12 ? "Good"
            : airQuality.pm25 < 35 ? "Moderate"
                : "Poor";

    const airQualityDescription =
        `PM10: ${airQuality.pm10}, PM2.5: ${airQuality.pm25}`;

    const location =
        "Weather for " + (city?.city ?? "your location");

    const precipitationInfo =
        "Precipitation chance: " +
        (precipitation.precipitationProbability ?? 0) +
        "%";




    return {
        avgDelta,
        todayAvg,
        normalAvg,
        feelsLike,
        feelsLikeText: "Based on current wind and humidity.",
        uvIndex,
        uvStatus,
        uvPercent,
        visibility,
        visibilityText,
        humidity,
        dewPointText,
        pressure,
        pressureUnit,
        airQualityStatus,
        airQualityDescription,
        location,
        precipitationInfo,
    };
}
