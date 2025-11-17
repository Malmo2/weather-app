export function forecast(dailyData) {
    const container = document.createElement('div');
    container.className = "seven-day-forecast";

    const title = document.createElement('h2');
    title.textContent = "7-day forecast"
    container.appendChild(title)

    const sevenDays = dailyData.slice(0, 7);

    sevenDays.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = "forecast-day";

        const date = new Date(day.dt * 1000)  // Ett sätt att omvandla unix-tid
        const weekday = date.toLocaleDateString("en-GB", { weekday: "short" })


        const temp = day.temp.day
        const desc = day.weather[0].description
        const icon = day.weather[0].icon


        dayDiv.innerHTML = `<h3>${weekday}</h3> 
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
            <p>${desc}</p>
            <p>${temp}°C</p> `;

        container.appendChild(dayDiv);

    })

    return container;

}