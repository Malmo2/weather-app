
const apiLimitLog = [];

export function checkApiLimit(weatherUrl) {
    if (apiLimitLog[weatherUrl]) {
        let now = new Date().getTime();
        let delta = now - apiLimitLog[weatherUrl];
        if (delta < 10000) { // 60 seconds
            console.log("Rate limit hit for URL:", weatherUrl);
            return false; // blocked
        }
    }
    apiLimitLog[weatherUrl] = new Date().getTime(); //? store timeStamp
    return true; 
}
