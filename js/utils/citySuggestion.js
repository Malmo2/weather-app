import { loadWeatherForCity } from "../../maintest.js";

export function initCitySuggestions(inputId, listId) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);

  let debounceTimeout;

  input.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    const query = input.value.trim();
    list.innerHTML = "";

    if (!query) return;

    debounceTimeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            query
          )}&count=10`
        );
        const data = await res.json();
        if (!data.results) return;

        const seen = new Set();

        data.results.forEach((city) => {
          if (!city.name || !city.country) return;
          const key = `${city.name.toLowerCase()},${city.country.toLowerCase()}`;
          if (seen.has(key)) return;
          seen.add(key);

          const li = document.createElement("li");
          li.textContent = `${city.name}, ${city.country}`;
          li.addEventListener("click", async () => {
            const [selectedCity, selectedCountry] = li.textContent
              .split(",")
              .map((s) => s.trim());
            input.value = li.textContent; // <-- corrected
            list.innerHTML = ""; // <-- corrected
            await loadWeatherForCity(selectedCity, selectedCountry);
          });

          list.appendChild(li);
        });
      } catch (err) {
        console.error("City suggestion error:", err);
      }
    }, 300); // debounce 300ms
  });

  // Hide suggestions on click outside
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !list.contains(e.target)) {
      list.innerHTML = "";
    }
  });
}
