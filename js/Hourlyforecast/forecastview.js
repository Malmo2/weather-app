/**
 * Timprognos som renderar timkort i en container.
 */
export class forecastView {
    constructor(container) {
        this.container = container;

    }

    /**
     * Renderar en lista med timkort i containern.
     * @param {Array<{date: Date, temp: number, icon?: string, iconLabel?: string}>} hours - Array med timobjekt.
     * @param {string|number|null} sunrise - Soluppgångstid.
     * @param {string|number|null} sunset - Solnedgångstid.
     */
    render(hours, sunrise, sunset) {
        this.container.innerHTML = "";

        const sunriseDate = sunrise ? new Date(sunrise) : null;
        const sunsetDate = sunset ? new Date(sunset) : null;

        for (const h of hours) {
            const card = document.createElement('div')
            card.className = "hourly-item";

            const time = h.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            const iconClass = h.icon ?? "fa-sun";
            const iconLabel = h.iconLabel ?? "Weather condition";

            const hourStart = new Date(h.date);
            const hourEnd = new Date(h.date.getTime() + 60 * 60 * 1000);

            let sunIndicator = "";
            if (sunriseDate && sunriseDate >= hourStart && sunriseDate < hourEnd) {
                sunIndicator = '<div class="sun-indicator sunrise"><i class="fa-solid fa-sun"></i></div>';
            }
            if (sunsetDate && sunsetDate >= hourStart && sunsetDate < hourEnd) {
                sunIndicator = '<div class="sun-indicator sunset"><i class="fa-solid fa-moon"></i></div>';
            }

            card.innerHTML = `
            <div class="hourly-time">${time}</div>
            <div class="hourly-icon" role="img" aria-label="${iconLabel}" title="${iconLabel}">
                <i class="fa-solid ${iconClass}" aria-hidden="true"></i>
            </div>
            <div class="hourly-temp">${Math.round(h.temp)}°C</div>
            ${sunIndicator}
            `
            this.container.appendChild(card)

        }

    }
}