import { Weather } from '../classes/weatherClass.js';

describe('Weather class', () => {

    it('Should copy properties from the API weather object', () => {


        const apiWeatherObject = {
            temperature_2m: 15,
            relative_humidity_2m: 60,
            wind_speed_10m: 5,
            weather_code: 3
        };

        const weather = new Weather(apiWeatherObject);

        expect(weather.temperature).toBe(15);
        expect(weather.humidity).toBe(60);
        expect(weather.windSpeed).toBe(5);
        expect(weather.code).toBe(3);
    });
});