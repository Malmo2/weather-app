import { getCity, getWeather } from "./weatherService.js";
import { checkApiLimit } from "./utils/ApiFilter.js";

// Mock checkApiLimit
jest.mock("./utils/ApiFilter.js");

// Mock global fetch
global.fetch = jest.fn();

describe("WeatherService", () => {
  beforeEach(() => {
    // Clear all mockdata before each test
    jest.clearAllMocks();
    checkApiLimit.mockReturnValue(true); // Default: API limit OK
  });

  describe("getCity", () => {
    test("Should return city-data when API succeed", async () => {
      const mockResponse = {
        results: [
          {
            name: "Stockholm",
            country: "Sweden",
            latitude: 59.3294,
            longitude: 18.0686,
          },
        ],
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getCity("Stockholm");

      expect(result).toEqual({
        city: "Stockholm",
        country: "Sweden",
        lat: 59.3294,
        lon: 18.0686,
      });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("Should return country once countryName is called", async () => {
      const mockResponse = {
        results: [
          {
            name: "Paris",
            country: "United States",
            latitude: 33.6609,
            longitude: -95.5555,
          },
          {
            name: "Paris",
            country: "France",
            latitude: 48.8566,
            longitude: 2.3522,
          },
        ],
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getCity("Paris", "France");

      expect(result.country).toBe("France");
      expect(result.lat).toBe(48.8566);
    });

    test("Return null when no city is found", async () => {
      const mockResponse = {
        results: [],
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getCity("NonExistentCity");

      expect(result).toEqual({
        city: null,
        country: null,
        lat: null,
        lon: null,
      });
    });

    test("API handling", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      const result = await getCity("Stockholm");

      expect(result).toEqual({
        city: null,
        country: null,
        lat: null,
        lon: null,
      });
    });

    test("Network error", async () => {
      fetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getCity("Stockholm");

      expect(result).toEqual({
        city: null,
        country: null,
        lat: null,
        lon: null,
      });
    });
  });
});
