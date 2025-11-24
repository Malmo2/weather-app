// weatherByTemp.js

export function getWeatherByTemp(temp) {
    if (temp > 18) return "summer";
    if (temp > 10) return "spring";
    if (temp > 2)  return "autumn";
    return "winter";
}
