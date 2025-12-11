import { Forecastmodel } from "./forecastmodel.js";
import { forecastView } from "./forecastview.js";

export class App {
  constructor() {
    this.view = new forecastView(document.getElementById("hours"));
  }

    render(weatherData, sunrise, sunset) {
        try {
            const hours = Forecastmodel.getNextHours(weatherData, 11)
            this.view.render(hours, sunrise, sunset);
        } catch(e) {
        console.error("Failed to render hourly forecast:", e.message);
        showError("Failed to load hourly forecast."); // <-- UI error

    }
  }
}
