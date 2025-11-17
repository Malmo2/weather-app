const historyKey = "searchHistory";
const historyLimit = 3; //limit set to 3 cities.

export function getHistory() {
  const history = localStorage.getItem(historyKey);
  return history ? JSON.parse(history) : [];
}

function saveHistory(history) {
  localStorage.setItem(historyKey, JSON.stringify(history)); // Save as JSON string
}

export function addToHistory(city) {
  try {
    let history = getHistory(); //get existing history

    history = history.filter(
      // filter out duplicates
      (item) => item.toLowerCase() !== city.toLowerCase() //convert to lower case
    );

    history.unshift(city); // Add new city to the beginning

    if (history.length > historyLimit) {
      history = history.slice(0, historyLimit); // Keep only the latest 'historyLimit' starts.
    }

    saveHistory(history); // Save updated history
    console.log("Current history:", history);
  } catch (error) {
    // Catch any errors
    console.error("Couldn't add to history:", error.message);
  }
}

export function displayHistory(onCityClick) {
  const historyContainer = document.getElementById("historyList");
  if (!historyContainer) {
    return;
  }

  const history = getHistory();
  historyContainer.innerHTML = "";

  if (history.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "no-history";
    emptyMessage.textContent = "No search history yet";
    historyContainer.appendChild(emptyMessage);
    return;
  }

  history.forEach((city) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "history-item";
    item.dataset.city = city;
    item.textContent = city;

    if (typeof onCityClick === "function") {
      item.addEventListener("click", () => onCityClick(city));
    }

    historyContainer.appendChild(item);
  });
}
