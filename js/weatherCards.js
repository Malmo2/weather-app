// Function to update weather cards with new data
export function updateWeatherCards(weatherData) {
  const humidityElement = document.querySelector(".humidity-value");
  const uvElement = document.querySelector(".uv-value");
  const rainElement = document.querySelector(".rain-value");
  const windValueElement = document.querySelector(".wind-value");

  if (humidityElement) {
    humidityElement.textContent = `${Math.round(weatherData.humidity)}%`;
  }
  if (uvElement) {
    uvElement.textContent = `${weatherData.uvIndex || 0}/10`;
  }
  if (rainElement) {
    rainElement.textContent = `${weatherData.rain || 0}%`;
  }
  if (windValueElement) {
    windValueElement.textContent = `${Math.round(weatherData.windSpeed)} km/h`;
  }
}
