import { displayHistory } from "./searchHistory.js";

const clearBtn = document.getElementById("clearHistoryBtn");


export function removeHistory() {

  clearBtn.addEventListener("click", () => {
    // Clear the history from localStorage
    localStorage.removeItem("searchHistory");

    // Update the history display
    displayHistory();
  });
}
