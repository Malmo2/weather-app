import { pressureVisibilityAPI } from "../api/pressureVisibilityAPI.js";

// Small data-wrapper that normalizes Open-Meteo's units for the UI.
// - surface_pressure: hPa
// - visibility: meters (we convert to km)
// - dew_point_2m: °C

export async function pressureVisibilityData(latitude, longitude) {
    const data = await pressureVisibilityAPI(latitude, longitude);
    const current = data.current || {};

    const pressure = typeof current.surface_pressure === "number" ? current.surface_pressure : 1013;

    const visibilityMeters = typeof current.visibility === "number" ? current.visibility : 10000;
    const visibilityKm = Math.round((visibilityMeters / 1000) * 10) / 10; // 1 decimal

    const dewPoint = typeof current.dew_point_2m === "number" ? current.dew_point_2m : null;

    return {
        pressure,
        visibilityKm,
        dewPoint,
    };
}
