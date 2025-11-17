export function forecast(dailyData = []) {
  const container = document.createElement("section");
  container.className = "seven-day-forecast";

  const header = document.createElement("div");
  header.className = "forecast-header";

  const title = document.createElement("h2");
  title.textContent = "7-day forecast";

  const subtitle = document.createElement("span");
  subtitle.className = "forecast-subtitle";
  subtitle.textContent = "Daily overview";

  header.append(title, subtitle);
  container.appendChild(header);

  const list = document.createElement("div");
  list.className = "forecast-list";

  dailyData.slice(0, 7).forEach((day, index) => {
    const item = document.createElement("article");
    item.className = "forecast-item";

    const date = new Date((day.dt ?? 0) * 1000);
    const dayLabel =
      index === 0
        ? "Today"
        : date.toLocaleDateString("en-GB", { weekday: "short" });
    const dateLabel = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    const icon = day.weather?.[0]?.icon ?? "01d";
    const desc = day.weather?.[0]?.description ?? "weather icon";

    const maxTempRaw =
      day.temp?.max ?? day.temp?.day ?? day.temp?.eve ?? day.temp ?? 0;
    const minTempRaw =
      day.temp?.min ?? day.temp?.night ?? day.temp?.morn ?? maxTempRaw;
    const maxTemp = Math.round(maxTempRaw);
    const minTemp = Math.round(minTempRaw);

    item.innerHTML = `
      <div class="forecast-day">
        <span class="forecast-day-name">${dayLabel}</span>
        <span class="forecast-date">${dateLabel}</span>
      </div>
      <div class="forecast-summary">
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
      </div>
      <div class="forecast-range">
        <span class="temp-max">Max ${maxTemp}°C</span>
        <span class="temp-min">/ Min ${minTemp}°C</span>
      </div>
    `;

    list.appendChild(item);
  });

  container.appendChild(list);

  return container;
}
