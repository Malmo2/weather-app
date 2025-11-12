import { historyKey } from "./searchHistory.js";

// Function to klear the search history
function clearSearchHistory() {
  localStorage.removeItem(historyKey);

  console.log("Search history cleared!");
  alert("Search history cleared!");

  // updates UI for display history
  const historyList = document.getElementById("shistoryList");
  if (historyList) {
    historyList.innerHTML = "";
  }
}

// Attach event listener to your button
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearHistoryBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearSearchHistory);
  }
});
