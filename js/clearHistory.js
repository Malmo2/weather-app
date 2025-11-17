import { displayHistory } from "./searchHistory.js";

const clearBtn = document.getElementById("clearHistoryBtn");

clearBtn.addEventListener("click", () => {
  // Clear the history from localStorage
  localStorage.removeItem("searchHistory");

  // Update the history display
  displayHistory();
});
