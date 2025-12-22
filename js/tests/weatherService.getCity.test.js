import { getCity } from '../weatherService.js';
import { jest } from '@jest/globals';

describe('getCity', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    });


    afterEach(() => {
        jest.resetAllMocks();
    });


    it('returns the first result when only city name is provided (no country)', async () => {


        const fakeGeoData = {
            results: [
                { name: "Stockholm", country: "Sweden", latitude: 59.3293, longitude: 18.0686 },
                { name: "Stockholm", country: "United States", latitude: 41.0, longitude: -74.0 },
            ],
        };


        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => fakeGeoData,
        });


        const result = await getCity("Stockholm");

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            city: "Stockholm",
            country: "Sweden",
            lat: 59.3293,
            lon: 18.0686,
        });
    });

    it('tries to match the country when city + country are provided', async () => {
        const fakeGeoData = {
            results: [
                { name: "Paris", country: "United States", latitude: 33.66, longitude: -95.55 },
                { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
            ],
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => fakeGeoData,
        });

        const result = await getCity("Paris", "France");

        expect(result).toEqual({
            city: "Paris",
            country: "France",
            lat: 48.8566,
            lon: 2.3522,
        });

        // We only call fetch once for the geocoding request.
        expect(global.fetch).toHaveBeenCalledTimes(1);


    });
})