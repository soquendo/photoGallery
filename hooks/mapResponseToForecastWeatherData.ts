import { ForecastWeatherData } from './types';

export const mapResponseToForecastWeatherData = (response: any): ForecastWeatherData => {
  const { forecast, location, current } = response.data;

  return {
    location: {
      name: location.name,
      region: location.region,
      country: location.country,
    },
    current: {
      temp_f: current.temp_f,
      feelslike_f: current.feelslike_f,
      condition: current.condition,
    },
    forecast: {
      forecastday: forecast.forecastday.map((forecastDay: any) => ({
        date: forecastDay.date,
        day: {
          maxtemp_f: forecastDay.day.maxtemp_f,
          mintemp_f: forecastDay.day.mintemp_f,
          avgtemp_f: forecastDay.day.avgtemp_f,
          condition: forecastDay.day.condition,
        },
      })),
    },
  };
};