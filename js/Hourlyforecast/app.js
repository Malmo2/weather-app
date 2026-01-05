import { Forecastmodel } from "./forecastmodel.js";
import { forecastView } from "./forecastview.js";
import { showError } from "../utils/errorHandling.js";

/**
 * App-klass som binder ihop modellen och vyn för timprognoser.
 * Skapar en `forecastView` riktad mot elementet `#hours`.
 */
export class App {
    constructor() {
        this.view = new forecastView(document.getElementById("hours"));
    }

    /**
     * Renderar kommande timmar i vyn.
     * @param {Array|Object} weatherData - Rå timdata från API.
     * @param {string|number|null} sunrise - Tid för soluppgång.
     * @param {string|number|null} sunset - Tid för solnedgång.
     */
    render(weatherData, sunrise, sunset) {
        try {
            const hours = Forecastmodel.getNextHours(weatherData, 11)
            this.view.render(hours, sunrise, sunset);
        } catch (e) {
            console.error("Failed to render hourly forecast:", e.message);
            showError("Failed to load hourly forecast.");

        }
    }
}