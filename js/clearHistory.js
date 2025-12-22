import { displayHistory } from "./searchHistory.js";

const clearBtn = document.getElementById("clearHistoryBtn");


export function removeHistory() {
  // Guard in case the button isn't present on a different page/template.
  if (!clearBtn) return;

  clearBtn.addEventListener("click", () => {
    // Clear the history from localStorage
    localStorage.removeItem("searchHistory");

    // Update the history display
    displayHistory();
  });
}
