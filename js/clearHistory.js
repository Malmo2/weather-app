import { displayHistory } from "./searchHistory.js";

const clearBtn = document.getElementById("clearHistoryBtn");

/**
 * Removes the stored search history from localStorage
 * and updates the UI when the "Clear History" button is clicked.
 */

export function removeHistory() {

  if (!clearBtn) return;

  clearBtn.addEventListener("click", () => {
    // Clear the history from localStorage
    localStorage.removeItem("searchHistory");

    displayHistory();
  });
}
