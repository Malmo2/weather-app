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

export function removeFromHistory(cityToRemove) {
  try {
    let history = getHistory();

    history = history.filter(
      (item) => item.toLowerCase() !== cityToRemove.toLowerCase()
    );

    saveHistory(history);

    console.log("Removed from history:", cityToRemove);
    console.log("Updated history:", history);

    return true;
  } catch (error) {
    console.error("Couldn't remove from history:", error.message);
    return false;
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

  // Clear container first
  historyContainer.innerHTML = "";

  if (history.length === 0) {
    // No history. length check
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "no-history";
    emptyMessage.textContent = "No search history yet";
    historyContainer.appendChild(emptyMessage);
    return;
  }

  console.log("container:", historyContainer);
  console.log("history:", history);

  // Header for history section
  const header = document.createElement("h3");
  header.textContent = "Recent Searches:";
  historyContainer.appendChild(header);

  // Loop through each city in history
  history.forEach((city) => {
    //Creating a wrapper for both citybtn and removebtn.
    const itemWrapper = document.createElement("div");
    itemWrapper.className = "history-item-wrapper";

    // City button
    const item = document.createElement("button");
    item.type = "button";
    item.className = "history-item";
    item.dataset.city = city;
    item.textContent = city;

    if (typeof onCityClick === "function") {
      item.addEventListener("click", () => onCityClick(city));
    }

    //Remove/X-button to delete
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "history-item-remove";
    removeBtn.innerHTML = "×";
    removeBtn.setAttribute("aria-label", `Remove ${city} from history`);
    removeBtn.title = `Remove ${city}`;

    // Click handler for X-button
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      // Add animation class
      itemWrapper.classList.add("removing");

      // Remove after short animation
      setTimeout(() => {
        removeFromHistory(city);
        // Update display after removal
        displayHistory(onCityClick);
      }, 200);
    });

    // Add both buttons to wrapper
    itemWrapper.appendChild(item);
    itemWrapper.appendChild(removeBtn);

    // Add wrapper to container
    historyContainer.appendChild(itemWrapper);
  });

  console.log("HTML skapad!");
}
