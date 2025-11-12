const historyKey = "searchHistory";
const historyLimit = 3;

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
      (item) => item.toLowerCase() !== city.toLowerCase()
    ); // Remove duplicates (case-insensitive)

    history.unshift(city); // Add new city to the beginning

    if (history.length > historyLimit) {
      history = history.slice(0, historyLimit); // Keep only the latest 'historyLimit' entries
    }

    saveHistory(history); // Save updated history
    console.log("Current history:", history);
  } catch (error) {
    // Catch any errors
    console.error("Couldn't add to history:", error.message);
  }
}

