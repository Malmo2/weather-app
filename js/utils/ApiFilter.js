/**
 * Stores timestamps of recent API calls per URL.
 * Used to prevent repeated requests to the same endpoint.
 */
const apiLimitLog = {};

/**
 * Time window (in milliseconds) during which repeated calls to the same API URL are blocked.
 */
const THROTTLE_WINDOW_MS = 10_000; // 10 seconds

/**
 * Checks whether an API request to a specific URL is allowed based on a simple client-siide throttle.
 *
 * @param {string} weatherUrl - The full API request URL
 * @returns {boolean} - Returns true if the request is allowed, false if blocked
 *
 * Purpose:
 * - Prevents excessive duplicate API calls
 * - Reduces unnecessary network requests
 */
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
