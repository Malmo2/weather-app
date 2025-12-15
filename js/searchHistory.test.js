import {
  getHistory,
  addToHistory,
  removeFromHistory,
  displayHistory,
} from "./searchHistory.js";

// Mocking localStorageData
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null, // Return null if key doesn't exist
    setItem: (key, value) => {
      store[key] = value.toString(); // Ensure value is stored as a string
    },
    removeItem: (key) => {
      delete store[key]; // Remove the key from the store
    },
    clear: () => {
      store = {}; // Clear all items in the store
    },
  };
})();
// Assign the mock to globalThis.localStorage
globalThis.localStorage = localStorageMock;

// Test starts here
describe("SearchHistory", () => {
  //Clear before each test
  beforeEach(() => {
    localStorage.clear();
  });
  // TEST 1 - add a city
  test("Add to search history", () => {
    addToHistory("Malmö");
    const history = getHistory();

    expect(history).toContain("Malmö");
    expect(history.length).toBe(1);
  });
  // TEST 2. Avoid dublicates
  test("No duplicate", () => {
    addToHistory("Malmö");
    addToHistory("Malmö");
    const history = getHistory();

    expect(history.length).toBe(1);
  });

  // TEST 3 - limit of cities is 3
  test("Only 3 cities", () => {
    addToHistory("Malmö");
    addToHistory("Uppsala");
    addToHistory("Västerås");
    addToHistory("Linköping"); // Removes Malmö.

    const history = getHistory();

    expect(history.length).toBe(3);
    expect(history).not.toContain("Malmö"); // First should be removed
    expect(history).toContain("Linköping"); // Last one should be added
  });

  // TEST 4 - The latested searched city should be first
  test("Last searched city first", () => {
    addToHistory("Malmö");
    addToHistory("Göteborg");

    const history = getHistory();
    expect(history[0]).toBe("Göteborg");
  });
});
