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

    announceToScreenReader(`${city} added to search history`); // Announce to screen reader
  } catch (error) {
    // Catch any errors
    console.error("Couldn't add to history:", error.message);
  }
}

export function displayHistory(onCityClick) {
  const history = getHistory();

  let historyContainer = document.getElementById("searchHistory");

  if (!historyContainer) {
    //remove this container after Benjame creates it in html.
    historyContainer = document.createElement("div");
    historyContainer.id = "searchHistory";

    const searchDiv = document.querySelector(".searchBar");
    if (searchDiv) {
      searchDiv.after(historyContainer);
    }
  }

  historyContainer.setAttribute("role", "region"); // Accessibility role
  historyContainer.setAttribute("aria-label", "Search History"); // Accessibility label

  if (history.length === 0) {
    // No history. length check
    historyContainer.innerHTML =
      '<p class="no-history">No search history yet</p>';
    return;
  }

  console.log("container:", historyContainer);
  console.log("history:", history);

  let html = "<h3>Recent Searches:</h3>"; // Header for history section
  html += '<ul class="history-list">'; // Start ul tag

  history.forEach((city) => {
    // Loop through each city in history
    html += `
    <li class="history-item"> 
      <span class="city-name" data-city="${city}">${city}</span> 
    </li>
  `;
  });

  html += "</ul>"; // Close the ul tag

  historyContainer.innerHTML = html;

  console.log("HTML skapad!");
}
