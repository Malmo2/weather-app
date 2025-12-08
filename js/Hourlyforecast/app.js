import { Forecastmodel } from "./forecastmodel.js"
import { forecastView } from "./forecastview.js"

export class App {
    constructor() {
        this.view = new forecastView(document.getElementById("hours"))
    }

    render(weatherData) {
        try {
            const hours = Forecastmodel.getNextHours(weatherData, 8)
            this.view.render(hours);
        } catch(e) {
        console.error("Failed to render hourly forecast:", e.message);
        showError("Failed to load hourly forecast."); // <-- UI error
    }
    }
}