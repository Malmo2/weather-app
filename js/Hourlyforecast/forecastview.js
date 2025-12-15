export class forecastView {
    constructor(container) {
        this.container = container;
    
    }
    
    render(hours) {
        this.container.innerHTML = "";

        for(const h of hours) {
            const card = document.createElement('div')
            card.className = "hourly-item";

            const time = h.date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})

            card.innerHTML = `
            <div class="hourly-time">${time}</div>
            <div class="hourly-temp">${Math.round(h.temp)}°C</div>
            `   
            this.container.appendChild(card)

        }
        
    }
}