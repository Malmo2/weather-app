// Open-Meteo "forecast" API helper for pressure + visibility + dew point.
// See: https://open-meteo.com/ (variables: surface_pressure, visibility, dew_point_2m)

export async function pressureVisibilityAPI(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=surface_pressure,visibility,dew_point_2m&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch pressure/visibility: ${res.status} ${res.statusText}`);
    }

    return await res.json();
}
