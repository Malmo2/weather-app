import { pressureVisibilityAPI } from "../api/pressureVisibilityAPI.js";

/**
 * Air pressure, visibility and dewPoint data.
 * @typedef {Object} PressureVisibilityDewPointData
 * @property {number} pressure - Surface atmospheric pressure in hPa.
 * @property {number} visibilityMeters - Horizontal visibility distance in meters (raw API value).
 * @property {number} visibilityKm - Visibility distance converted to kilometers (rounded to 1 decimal).
 * @property {number|null} dewPoint - Dew point temperature in degrees Celcius, or null if unavailable.
 */

/**
 * Fetches pressure, visibility and dew point data.
 * @param {number} latitude - Geographic latitude.
 * @param {number} longitude - Geographic longitude.
 * @returns {Promise<PressureVisibilityDewPointData>} - pressure, visibilityKm and dewPoint values.
 */

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
