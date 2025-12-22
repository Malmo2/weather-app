import { feelsLikeData } from "../classes/feelslikeData.js";
import { pressureVisibilityData } from "../classes/pressureVisibilityData.js";
import { airQualityData } from "../classes/airQualityData.js";

export async function buildDetailsData(conditions, dailyData, city) {
    let feels = { currentFeelsLike: conditions.feelsLike ?? conditions.temp ?? 0 };

    let pressureVisibility = {
        pressure: conditions.pressure ?? 1013,
        visibilityKm: conditions.visibilityKm ?? 10,
    };

    let airQuality = { pm10: 0, pm25: 0 };

    // If the main weather call already provided a "feels like" value, don't make an extra request.
    if (typeof conditions.feelsLike !== "number") {
        try {
            // Use the selected city coordinates (the old version was hard-coded to Berlin).
            feels = await feelsLikeData(city.lat, city.lon);
        } catch (e) {
            console.error("feelsLikeData failed", e);
        }
    }

    // Same idea for pressure/visibility/dew point: only fetch if missing.
    if (
        typeof conditions.pressure !== "number" ||
        typeof conditions.visibilityKm !== "number" ||
        typeof conditions.dewPoint !== "number"
    ) {
        try {
            pressureVisibility = await pressureVisibilityData(city.lat, city.lon);
        } catch (e) {
            console.error("pressureVisibilityData failed", e);
        }
    }

    try {
        airQuality = await airQualityData(city.lat, city.lon);
    } catch (e) {
        console.error("airQualityData failed", e);
    }

    const baseTemp = conditions.temp ?? feels.currentFeelsLike ?? 0;
    const currentTemp = Math.round(baseTemp);

    const feelsLike = Math.round(
        feels.currentFeelsLike ?? conditions.feelsLike ?? baseTemp
    );

    let todayAvg = currentTemp;
    let normalAvg = currentTemp;

    if (Array.isArray(dailyData) && dailyData.length > 0) {
        const firstDay = dailyData[0];

        const dayMax = firstDay?.temp?.max ?? currentTemp;
        const dayMin = firstDay?.temp?.min ?? currentTemp;

        todayAvg = Math.round((dayMax + dayMin) / 2);

        let sum = 0;
        let count = 0;

        for (const day of dailyData) {
            const max = day?.temp?.max;
            const min = day?.temp?.min;

            if (typeof max === "number" && typeof min === "number") {
                sum += (max + min) / 2;
                count++;
            }
        }

        if (count > 0) {
            normalAvg = Math.round(sum / count);
        }
    }

    const avgDelta = todayAvg - normalAvg;



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

    const visibility = pressureVisibility.visibilityKm ?? 10;
    const visibilityText = "Current horizontal visibility.";

    const humidity = conditions.humidity ?? 0;

    const dewPoint =
        typeof conditions.dewPoint === "number"
            ? conditions.dewPoint
            : pressureVisibility.dewPoint;

    let dewPointText = "Dew point data unavailable.";
    if (typeof dewPoint === "number") {
        dewPointText = `The dew point is currently ${Math.round(dewPoint)}°C.`;
    }

    const pressure = pressureVisibility.pressure ?? 1013;
    const pressureUnit = "hPa";

    const airQualityStatus =
        airQuality.pm25 < 12
            ? "Good"
            : airQuality.pm25 < 35
                ? "Moderate"
                : "Poor";

    const airQualityDescription = `PM10: ${airQuality.pm10}, PM2.5: ${airQuality.pm25}`;

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
    };
}
