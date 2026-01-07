const historyKey = "searchHistory";
const historyLimit = 3;

/**
 *
 * @returns {string[]} Array with cities
 */
export function getHistory() {
  const history = localStorage.getItem(historyKey);
  return history ? JSON.parse(history) : [];
}

/**
 * Saves history in localStorage
 * @param {string[]} history - array that saves cities
 */
function saveHistory(history) {
  localStorage.setItem(historyKey, JSON.stringify(history));
}

/**
 * Adding a city into search history.
 * @param {string} city to add.
 */
export function addToHistory(city) {
  try {
    let history = getHistory();

    history = history.filter(
      (item) => item.toLowerCase() !== city.toLowerCase()
    );

    history.unshift(city);

    if (history.length > historyLimit) {
      history = history.slice(0, historyLimit);
    }

    saveHistory(history);
    // console.log("Current history:", history);
  } catch (error) {
    console.error("Couldn't add to history:", error.message);
  }
}

/**
 * Delete a city from search history
 * @param {string} cityToRemove
 * @returns {boolean} True if succeed, false if error occured.
 */
export function removeFromHistory(cityToRemove) {
  try {
    let history = getHistory();

    history = history.filter(
      (item) => item.toLowerCase() !== cityToRemove.toLowerCase()
    );

    saveHistory(history);

    // console.log("Removed from history:", cityToRemove);
    // console.log("Updated history:", history);

    return true;
  } catch (error) {
    console.error("Couldn't remove from history:", error.message);
    return false;
  }
}

/**
 * Show search history with a onclick function.
 * @param {Function} onCityClick - callback function that runs once you cloick on a city
 * @returns
 */
export function displayHistory(onCityClick) {
  let historyContainer = document.getElementById("historyList");
  if (!historyContainer) {
    historyContainer = document.createElement("div");
    historyContainer.id = "searchHistory";

    const searchDiv = document.querySelector(".searchBar");
    if (searchDiv) {
      searchDiv.after(historyContainer);
    }
  }

  historyContainer.setAttribute("role", "region");
  historyContainer.setAttribute("aria-label", "Search History");

  const history = getHistory();
  historyContainer.innerHTML = "";

  if (history.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "no-history";
    emptyMessage.textContent = "No search history yet";
    historyContainer.appendChild(emptyMessage);
    return;
  }

  // console.log("container:", historyContainer);
  // console.log("history:", history);

  const header = document.createElement("h3");
  header.textContent = "Recent Searches:";
  historyContainer.appendChild(header);

  history.forEach((city) => {
    const itemWrapper = document.createElement("div");
    itemWrapper.className = "history-item-wrapper";

    const item = document.createElement("button");
    item.type = "button";
    item.className = "history-item";
    item.dataset.city = city;
    item.textContent = city;

    if (typeof onCityClick === "function") {
      item.addEventListener("click", () => onCityClick(city));
    }

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "history-item-remove";
    removeBtn.innerHTML = "×";
    removeBtn.setAttribute("aria-label", `Remove ${city} from history`);
    removeBtn.title = `Remove ${city}`;

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      itemWrapper.classList.add("removing");

      setTimeout(() => {
        removeFromHistory(city);
        displayHistory(onCityClick);
      }, 200);
    });

    itemWrapper.appendChild(item);
    itemWrapper.appendChild(removeBtn);
    historyContainer.appendChild(itemWrapper);
  });
}
