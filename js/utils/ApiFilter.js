
// Simple per-URL throttle so you don't spam the same Open-Meteo URL repeatedly.
// (This is NOT a true API rate-limit; it's just a client-side guard.)
const apiLimitLog = {};

// Block identical URL calls within this window (milliseconds).
const THROTTLE_WINDOW_MS = 60_000; // 60 seconds

export function checkApiLimit(weatherUrl) {
    if (apiLimitLog[weatherUrl]) {
        let now = new Date().getTime();
        let delta = now - apiLimitLog[weatherUrl];
        if (delta < THROTTLE_WINDOW_MS) {
            console.log("Rate limit hit for URL:", weatherUrl);
            return false; // blocked
        }
    }
    apiLimitLog[weatherUrl] = new Date().getTime(); // store timestamp
    return true;
}
